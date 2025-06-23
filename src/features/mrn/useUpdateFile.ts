// hooks/useCreateFile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFile } from "../../services/apiMRN";
import { MRNType } from "../../interfaces";
import toast from "react-hot-toast";

export const useUpdateFile = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: ({ data, files }: { data: Partial<MRNType>; files: File[] }) =>
      updateFile(id, data, files),
    onSuccess: (data) => {
      const isError = data.status === "error";
      if (!isError) {
        toast.success("successful");
        queryClient.invalidateQueries({ queryKey: ["files"] });
      } else {
        toast.error(`${data.message}`);
      }
    },
  });

  return { update, isPending };
};
