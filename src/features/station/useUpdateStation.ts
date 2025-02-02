import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updateStation as updateStationApi } from "../../services/apiAuth";

import toast from "react-hot-toast";
import { SignupTypes } from "../../interfaces";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateStation(id: string) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    mutate: updateStation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: SignupTypes) => updateStationApi(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries(["Staions"] as any);
        // queryClient.invalidateQueries([`Staions-${id}`] as any);
        toast.success("Staion updated successfully");
      } else if (data.status !== 200) {
        toast.error("Staion update not successful");
        setErrorMessage(data.message);
        console.error("Login Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      toast.error("Error updating Staion");
      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { updateStation, isPending, isError, errorMessage };
}
