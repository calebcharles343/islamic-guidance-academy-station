import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteFile as deleteFileApi } from "../../services/apiMRN";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteFile() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteFile,
    isPending: isDeleting,
    isError: isErrorDeleting,
    error: errorDeleting,
  } = useMutation<void, FetchError, string>({
    mutationFn: async (id: string) => {
      await deleteFileApi(id);
    },
    onSuccess: () => {
      toast.success("File deleted");
      queryClient.invalidateQueries([`files`] as any);
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
    deleteFile,
    isDeleting,
    isErrorDeleting,
    errorDeleting,
  };
}
