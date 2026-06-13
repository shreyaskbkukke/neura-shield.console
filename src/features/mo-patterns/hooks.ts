import { useQuery } from "@tanstack/react-query";
import { listMOProfiles } from "./api";

export function useMOProfiles(page = 1, mo_category?: string) {
  return useQuery({
    queryKey: ["mo-patterns", page, mo_category],
    queryFn: () => listMOProfiles(page, 30, mo_category),
  });
}
