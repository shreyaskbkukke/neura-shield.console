export interface SuspiciousPatternSchema {
  id: string;
  pattern_key: string;
  pattern_type: string;
  title: string;
  summary: string;
  confidence_score: number;
  severity: string;
  involved_account_ids: string[];
  involved_transaction_ids: string[];
  linked_crime_ids: string[];
  evidence: Record<string, unknown>;
  disclaimer: string;
  created_at: string;
}

export interface SuspiciousPatternListResponse {
  items: SuspiciousPatternSchema[];
  total: number;
  page: number;
  limit: number;
}

export interface FinancialNode {
  id: string;
  account_ref: string;
  account_type: string;
  holder_type: string | null;
  holder_name: string | null;
  risk_score: number;
  linked_crime_id: string | null;
  linked_offender_id: string | null;
}

export interface FinancialEdge {
  source: string;
  target: string;
  transaction_count: number;
  total_amount: string;
  strength_score: number;
  link_type: string;
}

export interface TransactionNetworkResponse {
  nodes: FinancialNode[];
  edges: FinancialEdge[];
  disclaimer: string;
}

export interface FinancialAccountSchema {
  id: string;
  account_ref: string;
  account_type: string;
  holder_type: string | null;
  holder_name: string | null;
  bank_name: string | null;
  risk_score: number;
  status: string;
  created_at: string;
}

export interface MoneyTrailNode {
  account_id: string;
  account_ref: string;
  holder_type: string | null;
  holder_name: string | null;
}

export interface MoneyTrailEdge {
  transaction_id: string;
  transaction_ref: string;
  amount: string;
  occurred_at: string;
  channel: string | null;
}

export interface MoneyTrailResult {
  source_account_id: string;
  destination_account_id: string;
  hop_count: number;
  path_nodes: MoneyTrailNode[];
  path_edges: MoneyTrailEdge[];
  total_amount: string;
  confidence_score: number;
  disclaimer: string;
}

export interface CaseMoneyTrailResponse {
  crime_id: string;
  trails: MoneyTrailResult[];
  disclaimer: string;
}
