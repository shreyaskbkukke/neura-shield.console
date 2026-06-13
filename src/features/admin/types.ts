export interface AdminUser {
  id: string;
  catalyst_user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  designation: string | null;
  department: string | null;
  is_active: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
}

export interface UserListResponse {
  total: number;
  page: number;
  limit: number;
  items: AdminUser[];
}

export interface AdminRole {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface RoleListResponse {
  total: number;
  items: AdminRole[];
}

export interface AdminPermission {
  id: string;
  code: string;
  description: string | null;
  created_at: string;
}

export interface PermissionListResponse {
  total: number;
  items: AdminPermission[];
}

export interface ModelRegistryItem {
  id: string;
  model_name: string;
  model_type: string;
  model_version: string;
  is_active: boolean;
  feature_schema: Record<string, unknown> | null;
  training_metrics: Record<string, unknown> | null;
  created_at: string;
}

export interface ModelRegistryResponse {
  total: number;
  page: number;
  limit: number;
  items: ModelRegistryItem[];
}

export interface JobResult {
  job: string;
  status: string;
  errors?: string[];
  [key: string]: unknown;
}

export interface AdminJobDefinition {
  id: string;
  label: string;
  description: string;
  endpoint: string;
  category: "intelligence" | "criminology" | "graph" | "financial" | "forecast" | "monitoring" | "sociology";
}

export const ADMIN_JOBS: AdminJobDefinition[] = [
  {
    id: "features",
    label: "Feature Generation",
    description: "Compute daily feature snapshots for all districts, stations, and offenders.",
    endpoint: "/admin/jobs/features/run",
    category: "intelligence",
  },
  {
    id: "hotspots",
    label: "Hotspot Refresh",
    description: "Detect crime clusters via DBSCAN. Creates CRITICAL alerts for high-risk hotspots.",
    endpoint: "/admin/jobs/hotspots/run",
    category: "intelligence",
  },
  {
    id: "risk",
    label: "Risk Scoring",
    description: "Score all districts, stations, and offenders using feature snapshots.",
    endpoint: "/admin/jobs/risk/run",
    category: "intelligence",
  },
  {
    id: "anomalies",
    label: "Anomaly Detection",
    description: "Detect advanced anomalies across districts, stations, hotspots, and offenders.",
    endpoint: "/admin/jobs/anomalies/run",
    category: "intelligence",
  },
  {
    id: "patterns",
    label: "Pattern Detection",
    description: "Detect recurring crime patterns across districts and stations.",
    endpoint: "/admin/jobs/patterns/run",
    category: "intelligence",
  },
  {
    id: "graph",
    label: "Graph Refresh",
    description: "Build the criminal relationship graph from crime co-participation and shared activity patterns.",
    endpoint: "/admin/jobs/graph/run",
    category: "graph",
  },
  {
    id: "mo-intelligence",
    label: "MO Intelligence",
    description: "Run rule-based modus operandi extraction and build offender MO profiles.",
    endpoint: "/admin/jobs/mo-intelligence/run",
    category: "criminology",
  },
  {
    id: "behavior-profiles",
    label: "Behavior Profiles",
    description: "Compute behavioral scores for all offenders: habitual, escalation, specialization, and more.",
    endpoint: "/admin/jobs/behavior-profiles/run",
    category: "criminology",
  },
  {
    id: "financial-intelligence",
    label: "Financial Intelligence",
    description: "Build financial entity links, detect suspicious patterns, and compute money trails.",
    endpoint: "/admin/jobs/financial-intelligence/run",
    category: "financial",
  },
  {
    id: "expanded-graph",
    label: "Expanded Graph",
    description: "Build the multi-entity graph with entities, relationships, and organized group candidates.",
    endpoint: "/admin/jobs/expanded-graph/run",
    category: "graph",
  },
  {
    id: "forecast-features",
    label: "Forecast Features",
    description: "Generate weekly forecast feature windows and backtest history.",
    endpoint: "/admin/jobs/forecast-features/run",
    category: "forecast",
  },
  {
    id: "forecasts",
    label: "Crime Forecasts",
    description: "Generate crime volume and hotspot forecasts using statistical models.",
    endpoint: "/admin/jobs/forecasts/run",
    category: "forecast",
  },
  {
    id: "early-warnings",
    label: "Early Warnings",
    description: "Evaluate forecast outputs against thresholds to generate early warning signals.",
    endpoint: "/admin/jobs/early-warnings/run",
    category: "forecast",
  },
  {
    id: "prevention-recommendations",
    label: "Prevention Recommendations",
    description: "Convert open early warnings into decision-support prevention recommendations.",
    endpoint: "/admin/jobs/prevention-recommendations/run",
    category: "forecast",
  },
  {
    id: "model-monitoring",
    label: "Model Monitoring",
    description: "Run quality snapshots, drift metrics, and data freshness checks.",
    endpoint: "/admin/jobs/model-monitoring/run",
    category: "monitoring",
  },
  {
    id: "sociology-insights",
    label: "Sociology Insights",
    description: "Compute district-indicator-crime correlations and generate sociology insight rows.",
    endpoint: "/admin/jobs/sociology-insights/run",
    category: "sociology",
  },
  {
    id: "all",
    label: "Run All Jobs",
    description: "Run all intelligence jobs in sequence: features, hotspots, graph, risk, anomalies, patterns.",
    endpoint: "/admin/jobs/all/run",
    category: "intelligence",
  },
];

export const JOB_CATEGORY_LABELS: Record<string, string> = {
  intelligence: "Intelligence",
  criminology: "Criminology",
  graph: "Graph",
  financial: "Financial",
  forecast: "Forecasting",
  monitoring: "Monitoring",
  sociology: "Sociology",
};
