// hooks/useCreateFile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFile } from "../../services/apiFileGenerator";
import { FileGenerator } from "../../interfaces";
import toast from "react-hot-toast";

export const useCreateFile = () => {
  const queryClient = useQueryClient();

  const { mutate: create, isPending } = useMutation({
    mutationFn: ({
      data,
      files,
    }: {
      data: Partial<FileGenerator>;
      files: File[];
    }) => createFile(data, files),
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

  return { create, isPending };
};
