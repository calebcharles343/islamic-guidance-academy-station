import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteStudent as deleteStudentApi } from "../../services/apiVerificattion";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteStudent,
    isPending: isDeleting,
    isError: isErrorDeleting,
    error: errorDeleting,
  } = useMutation<void, FetchError, string>({
    mutationFn: async (id: string) => {
      await deleteStudentApi(id);
    },
    onSuccess: () => {
      toast.success("Student deleted");

      queryClient.invalidateQueries([`student`] as any);
    },
    onError: (error) => {
      toast.error("Error deleting ");

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while deleting the student.";
      console.error("Delete student Error:", errorMessage);
    },
  });

  return {
    deleteStudent,
    isDeleting,
    isErrorDeleting,
    errorDeleting,
  };
}
