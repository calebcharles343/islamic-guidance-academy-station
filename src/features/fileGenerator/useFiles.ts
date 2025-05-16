import { useQuery } from "@tanstack/react-query";
import { FilesQuery } from "../../interfaces";
import { files } from "../../services/apiFileGenerator";

export function useFiles() {
  return useQuery<FilesQuery, Error>({
    queryKey: ["files"],
    queryFn: files,
    staleTime: 0,
  });
}
