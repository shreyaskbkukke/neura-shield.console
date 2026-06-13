import { apiGet } from "@/lib/api/client";
import type {
  SuspiciousPatternListResponse,
  TransactionNetworkResponse,
  FinancialAccountSchema,
  CaseMoneyTrailResponse,
} from "./types";

export function fetchSuspiciousPatterns(params: Record<string, string | number> = {}) {
  return apiGet<SuspiciousPatternListResponse>("/financial/suspicious-patterns", { limit: 20, ...params });
}

export function fetchTransactionNetwork() {
  return apiGet<TransactionNetworkResponse>("/financial/transaction-network");
}

export function fetchFinancialAccount(accountId: string) {
  return apiGet<FinancialAccountSchema>(`/financial/accounts/${accountId}`);
}

export function fetchCaseMoneyTrail(caseId: string) {
  return apiGet<CaseMoneyTrailResponse>(`/financial/cases/${caseId}/money-trail`);
}
