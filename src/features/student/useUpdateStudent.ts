import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updateStudent as updateStudentApi } from "../../services/apiVerificattion";

import toast from "react-hot-toast";
import { StudentType } from "../../interfaces";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateStudent(id: string) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    mutate: updateStudent,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: Partial<StudentType>) => updateStudentApi(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries(["Students"] as any);
        // queryClient.invalidateQueries([`Student-${id}`] as any);
        toast.success("Student updated successfully");
      } else if (data.status !== 200) {
        toast.error("Student update not successful");
        setErrorMessage(data.message);
        console.error("Login Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      toast.error("Error updating Student");
      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { updateStudent, isPending, isError, errorMessage };
}
