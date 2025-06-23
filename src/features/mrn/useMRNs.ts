import { useQuery } from "@tanstack/react-query";
import { MRNQuery } from "../../interfaces";
import { files } from "../../services/apiMRN";

export function useFiles() {
  return useQuery<MRNQuery, Error>({
    queryKey: ["files"],
    queryFn: files,
    staleTime: 0,
  });
}
