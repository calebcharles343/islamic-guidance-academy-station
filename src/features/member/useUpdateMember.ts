import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updateMember as updateMemberApi } from "../../services/apiVerificattion";

import toast from "react-hot-toast";
import { MemberType } from "../../interfaces";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateMember(id: string) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    mutate: updateMember,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: Partial<MemberType>) => updateMemberApi(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries(["members"] as any);
        // queryClient.invalidateQueries([`Members-${id}`] as any);
        toast.success("Member updated successfully");
      } else if (data.status !== 200) {
        toast.error("Member update not successful");
        setErrorMessage(data.message);
        console.error("Login Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      toast.error("Error updating Member");
      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { updateMember, isPending, isError, errorMessage };
}
