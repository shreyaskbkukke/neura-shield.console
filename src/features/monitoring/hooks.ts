import { useQuery } from "@tanstack/react-query";
import {
  listForecastQuality,
  listModelDrift,
  listDataFreshness,
  getMonitoringSummary,
} from "./api";

export function useForecastQuality() {
  return useQuery({
    queryKey: ["monitoring", "forecast-quality"],
    queryFn: () => listForecastQuality(),
  });
}

export function useModelDrift() {
  return useQuery({
    queryKey: ["monitoring", "model-drift"],
    queryFn: () => listModelDrift(),
  });
}

export function useDataFreshness() {
  return useQuery({
    queryKey: ["monitoring", "data-freshness"],
    queryFn: () => listDataFreshness(),
  });
}

export function useMonitoringSummary() {
  return useQuery({
    queryKey: ["monitoring", "summary"],
    queryFn: () => getMonitoringSummary(),
  });
}
