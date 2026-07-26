import { useQuery } from "@tanstack/react-query";
import {
  listForecastRuns,
  listHotspotForecasts,
  listForecastEvaluations,
  listForecastFeatures,
  listBacktestWindows,
} from "./api";
import type { ForecastFeatureFilters } from "./types";

export function useForecastRuns() {
  return useQuery({
    queryKey: ["forecast", "runs"],
    queryFn: () => listForecastRuns(),
  });
}

export function useHotspotForecasts() {
  return useQuery({
    queryKey: ["forecast", "hotspots"],
    queryFn: () => listHotspotForecasts(),
  });
}

export function useForecastEvaluations() {
  return useQuery({
    queryKey: ["forecast", "evaluations"],
    queryFn: () => listForecastEvaluations(),
  });
}

export function useForecastFeatures(filters: ForecastFeatureFilters = {}) {
  return useQuery({
    queryKey: ["forecast", "features", filters],
    queryFn: () => listForecastFeatures(filters),
  });
}

export function useBacktestWindows() {
  return useQuery({
    queryKey: ["forecast", "backtest-windows"],
    queryFn: () => listBacktestWindows(),
  });
}
