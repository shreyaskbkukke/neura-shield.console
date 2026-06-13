import { useQuery } from "@tanstack/react-query";
import {
  fetchSuspiciousPatterns,
  fetchTransactionNetwork,
  fetchFinancialAccount,
  fetchCaseMoneyTrail,
} from "./api";

export function useSuspiciousPatterns(params: Record<string, string | number> = {}) {
  return useQuery({
    queryKey: ["financial", "patterns", params],
    queryFn: () => fetchSuspiciousPatterns(params),
  });
}

export function useTransactionNetwork() {
  return useQuery({
    queryKey: ["financial", "network"],
    queryFn: fetchTransactionNetwork,
  });
}

export function useFinancialAccount(accountId: string | null) {
  return useQuery({
    queryKey: ["financial", "account", accountId],
    queryFn: () => fetchFinancialAccount(accountId!),
    enabled: !!accountId,
  });
}

export function useCaseMoneyTrail(caseId: string | null) {
  return useQuery({
    queryKey: ["financial", "money-trail", caseId],
    queryFn: () => fetchCaseMoneyTrail(caseId!),
    enabled: !!caseId,
  });
}
