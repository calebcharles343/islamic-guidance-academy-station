import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteStation as deleteStationApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}
export function useDeleteStation() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteStation,
    isPending: isDeleting,
    isError: isErrorDeleting,
    error: errorDeleting,
  } = useMutation<void, FetchError, string>({
    mutationFn: async (id: string) => {
      await deleteStationApi(id);
    },
    onSuccess: () => {
      toast.success("Station deleted");
      queryClient.invalidateQueries(["stations"] as any);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the station.";
      toast.error(errorMessage);
      console.error("Delete Station Error:", errorMessage);
    },
  });

  return {
    deleteStation,
    isDeleting,
    isErrorDeleting,
    errorDeleting,
  };
}
