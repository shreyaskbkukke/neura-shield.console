import { apiGet } from "@/lib/api/client";
import type {
  SociologyInsightListResponse,
  DistrictSocioProfileListResponse,
  RiskFactorListResponse,
  CorrelationListResponse,
} from "./types";

export async function listInsights(page = 1, limit = 20): Promise<SociologyInsightListResponse> {
  return apiGet("/sociology/insights", { page, limit });
}

export async function listDistrictProfiles(page = 1, limit = 20): Promise<DistrictSocioProfileListResponse> {
  return apiGet("/sociology/districts", { page, limit });
}

export async function listRiskFactors(): Promise<RiskFactorListResponse> {
  return apiGet("/sociology/risk-factors");
}

export async function listCorrelations(page = 1, limit = 30): Promise<CorrelationListResponse> {
  return apiGet("/sociology/correlations", { page, limit });
}
