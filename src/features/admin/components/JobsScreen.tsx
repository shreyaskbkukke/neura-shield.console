"use client";

import { useState } from "react";
import { Play, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/foundation/Button";
import { Card, CardContent } from "@/components/foundation/Card";
import { runJob } from "../api";
import { ADMIN_JOBS, JOB_CATEGORY_LABELS } from "../types";
import type { JobResult, AdminJobDefinition } from "../types";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  intelligence: "text-brand-600 bg-brand-50 border-brand-200",
  criminology: "text-purple-600 bg-purple-50 border-purple-200",
  graph: "text-warning-600 bg-warning-50 border-warning-200",
  financial: "text-success-600 bg-success-50 border-success-200",
  forecast: "text-orange-600 bg-orange-50 border-orange-200",
  monitoring: "text-navy-600 bg-navy-50 border-navy-200",
};

interface JobCardProps {
  job: AdminJobDefinition;
}

function JobCard({ job }: JobCardProps) {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<JobResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    setRunning(true);
    setResult(null);
    setError(null);
    try {
      const res = await runJob(job.endpoint);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Job failed");
    } finally {
      setRunning(false);
    }
  }

  const tagClass = cn(
    "text-xs font-medium px-2 py-0.5 rounded-full border",
    CATEGORY_COLORS[job.category] ?? "text-navy-600 bg-navy-50 border-navy-200",
  );

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-navy-900">{job.label}</span>
              <span className={tagClass}>{JOB_CATEGORY_LABELS[job.category]}</span>
            </div>
            <p className="mt-1 text-xs text-navy-500">{job.description}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRun}
            disabled={running}
            className="flex-shrink-0"
          >
            {running ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Play size={13} />
            )}
            {running ? "Running…" : "Run"}
          </Button>
        </div>

        {result && (
          <div className="mt-3 rounded-lg bg-success-50 border border-success-200 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-success-700 font-medium">
              <CheckCircle size={12} />
              {result.status ?? "OK"}
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
              {Object.entries(result)
                .filter(([k]) => !["job", "status", "errors"].includes(k) && result[k] !== null && result[k] !== undefined)
                .map(([k, v]) => (
                  <span key={k} className="text-xs text-navy-600">
                    <span className="text-navy-400">{k.replace(/_/g, " ")}: </span>
                    {String(v)}
                  </span>
                ))}
            </div>
            {(result.errors as string[] | undefined)?.length ? (
              <div className="mt-1 text-xs text-danger-600">
                {(result.errors as string[]).slice(0, 3).join(", ")}
              </div>
            ) : null}
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-lg bg-danger-50 border border-danger-200 px-3 py-2 flex items-center gap-1.5 text-xs text-danger-700">
            <XCircle size={12} />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function JobsScreen() {
  const categories = Array.from(new Set(ADMIN_JOBS.map((j) => j.category)));

  return (
    <div className="flex flex-col gap-8">
      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="text-sm font-semibold text-navy-700 mb-3">
            {JOB_CATEGORY_LABELS[cat]}
          </h2>
          <div className="flex flex-col gap-3">
            {ADMIN_JOBS.filter((j) => j.category === cat).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
