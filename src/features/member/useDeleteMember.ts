import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteMember as deleteMemberApi } from "../../services/apiVerificattion";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteMember() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMember,
    isPending: isDeleting,
    isError: isErrorDeleting,
    error: errorDeleting,
  } = useMutation<void, FetchError, string>({
    mutationFn: async (id: string) => {
      await deleteMemberApi(id);
    },
    onSuccess: () => {
      toast.success("Member deleted");

      queryClient.invalidateQueries([`members`] as any);
    },
    onError: (error) => {
      toast.error("Error deleting ");

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while deleting the Member.";
      console.error("Delete student Error:", errorMessage);
    },
  });

  return {
    deleteMember,
    isDeleting,
    isErrorDeleting,
    errorDeleting,
  };
}
