import { useQuery } from "@tanstack/react-query";
import { listUsers, listRoles, listPermissions, listModels } from "./api";

export function useUsers(page = 1) {
  return useQuery({
    queryKey: ["admin", "users", page],
    queryFn: () => listUsers(page),
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ["admin", "roles"],
    queryFn: () => listRoles(),
  });
}

export function usePermissions() {
  return useQuery({
    queryKey: ["admin", "permissions"],
    queryFn: () => listPermissions(),
  });
}

export function useModels(page = 1) {
  return useQuery({
    queryKey: ["admin", "models", page],
    queryFn: () => listModels(page),
  });
}
