import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updateStationPassword as updateStationPasswordApi } from "../../services/apiAuth";

import toast from "react-hot-toast";
import { StationTypes } from "../../interfaces";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateStationPassword(id: string) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    mutate: updateStationPassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: Partial<StationTypes>) =>
      updateStationPasswordApi(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries(["Staions"] as any);
        // queryClient.invalidateQueries([`Staions-${id}`] as any);
        toast.success("Staion password updated successfully");
      } else if (data.status !== 200) {
        toast.error("Staion password update not successful");
        setErrorMessage(data.message);
        console.error("Login Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      toast.error("Error updating staion password");
      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { updateStationPassword, isPending, isError, errorMessage };
}
