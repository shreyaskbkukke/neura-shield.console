export interface MOProfile {
  id: string;
  mo_code: string;
  mo_name: string;
  mo_category: string;
  description: string;
  keywords: string[];
  severity_weight: number;
  created_at: string;
}

export interface MOProfileListResponse {
  items: MOProfile[];
  page: number;
  limit: number;
  total: number;
}
