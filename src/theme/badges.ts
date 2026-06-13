// All badge class strings must appear in full here for Tailwind JIT to pick them up.

export const severityClassMap: Record<string, string> = {
  LOW: "bg-success-50 text-success-700 border-success-200",
  MEDIUM: "bg-warning-50 text-warning-700 border-warning-200",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200",
  CRITICAL: "bg-danger-50 text-danger-700 border-danger-200",
};

export const statusClassMap: Record<string, string> = {
  OPEN: "bg-brand-50 text-brand-700 border-brand-200",
  ACKNOWLEDGED: "bg-purple-50 text-purple-700 border-purple-200",
  UNDER_REVIEW: "bg-warning-50 text-warning-700 border-warning-200",
  RESOLVED: "bg-success-50 text-success-700 border-success-200",
  IMPLEMENTED: "bg-success-50 text-success-700 border-success-200",
  DISMISSED: "bg-navy-100 text-navy-600 border-navy-300",
};

export const riskClassMap: Record<string, string> = {
  LOW: "bg-success-50 text-success-700 border-success-200",
  MEDIUM: "bg-warning-50 text-warning-700 border-warning-200",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200",
  CRITICAL: "bg-danger-50 text-danger-700 border-danger-200",
};

export const qualityClassMap: Record<string, string> = {
  GOOD: "bg-success-50 text-success-700 border-success-200",
  ACCEPTABLE: "bg-brand-50 text-brand-700 border-brand-200",
  WEAK: "bg-warning-50 text-warning-700 border-warning-200",
  INSUFFICIENT_DATA: "bg-navy-100 text-navy-600 border-navy-300",
};

export const freshnessClassMap: Record<string, string> = {
  FRESH: "bg-success-50 text-success-700 border-success-200",
  STALE: "bg-warning-50 text-warning-700 border-warning-200",
  MISSING: "bg-danger-50 text-danger-700 border-danger-200",
  UNKNOWN: "bg-navy-100 text-navy-600 border-navy-300",
};

export const driftSeverityClassMap: Record<string, string> = {
  LOW: "bg-success-50 text-success-700 border-success-200",
  MEDIUM: "bg-warning-50 text-warning-700 border-warning-200",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200",
  CRITICAL: "bg-danger-50 text-danger-700 border-danger-200",
};

export const priorityClassMap: Record<string, string> = {
  LOW: "bg-success-50 text-success-700 border-success-200",
  MEDIUM: "bg-warning-50 text-warning-700 border-warning-200",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200",
  CRITICAL: "bg-danger-50 text-danger-700 border-danger-200",
};
