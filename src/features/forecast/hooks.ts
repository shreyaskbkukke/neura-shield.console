import { useQuery } from "@tanstack/react-query";
import {
  listForecastRuns,
  listHotspotForecasts,
  listForecastEvaluations,
} from "./api";

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
