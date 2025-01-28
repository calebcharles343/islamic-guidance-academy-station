import { useQuery } from "@tanstack/react-query";
import { VerifiedMembersType } from "../../interfaces";
import { verifiedMembers } from "../../services/apiVerificattion";

export function useMembers() {
  return useQuery<VerifiedMembersType, Error>({
    queryKey: ["members"],
    queryFn: verifiedMembers,
    staleTime: 0,
  });
}
