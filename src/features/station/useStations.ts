import { useQuery } from "@tanstack/react-query";
import { getStations } from "../../services/apiAuth";

export function useStations() {
  return useQuery<any, Error>({
    queryKey: ["stations"],
    queryFn: () => getStations(),
    staleTime: 0,
  });
}
