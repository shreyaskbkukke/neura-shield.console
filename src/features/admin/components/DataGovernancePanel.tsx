"use client";

import { useState } from "react";
import { Shield, AlertTriangle, Scale, Lock, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/foundation/Card";

export function DataGovernancePanel() {
  const [activeTab, setActiveTab] = useState<"rbac" | "safety" | "disclaimers">("rbac");

  const tabs = [
    { id: "rbac", label: "RBAC & Jurisdiction Scoping", icon: Lock },
    { id: "safety", label: "AI Safety Guardrails", icon: Shield },
    { id: "disclaimers", label: "Disclaimers & Limits", icon: AlertTriangle },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-navy-900">Governance & Safety Policies</h2>
        <p className="text-xs text-navy-500">Legal, administrative, and algorithmic guidelines for Crime Lens operations.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-navy-200 gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors -mb-[2px] ${
                activeTab === t.id
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-navy-500 hover:text-navy-800"
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <Card>
        <CardContent className="p-6">
          {activeTab === "rbac" && (
            <div className="space-y-6">
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-navy-900">
                  <Lock className="text-brand-600" size={16} />
                  <h3 className="text-sm font-bold">Role-Based Access Controls (RBAC)</h3>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Crime Lens operates a strict Role-Based Access Control model to gate operational actions and dashboard scopes. 
                  Users are assigned specifically configured roles (e.g. `ADMIN`, `STATE_OFFICER`, `ANALYST`) matching their official level.
                </p>
                <div className="p-3 rounded-lg bg-navy-50 border border-navy-100 text-[11px] text-navy-700 leading-relaxed">
                  <strong>Access Gating:</strong> All API requests are intercept-validated on the server. Attempting to access metrics or trigger batch operations without the necessary permission code results in an immediate <code>HTTP 403 Forbidden</code> response, logged automatically in the audit log registry.
                </div>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-navy-900">
                  <Eye className="text-brand-600" size={16} />
                  <h3 className="text-sm font-bold">Jurisdiction Filtering & Spatial Bounds</h3>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  To prevent unauthorized data exposure, analytics summaries and investigations are scoped to the operator&apos;s jurisdiction.
                </p>
                <ul className="list-disc pl-5 text-[11px] text-navy-600 space-y-1">
                  <li><strong>State Officers & Analysts:</strong> Access is open across all state districts.</li>
                  <li><strong>District Officers:</strong> Data queries automatically inject filters matching their assigned <code>district_id</code>.</li>
                  <li><strong>Station Officers:</strong> Operational view is confined to the specific bounds of their assigned <code>police_station_id</code>.</li>
                </ul>
              </section>
            </div>
          )}

          {activeTab === "safety" && (
            <div className="space-y-6">
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-navy-900">
                  <Scale className="text-brand-600" size={16} />
                  <h3 className="text-sm font-bold">Conversational Safety Policy</h3>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  The conversational AI assistant is built to support investigations, not automate legal judgments. To ensure compliance with legal and human rights standards, the LLM is bounded by system-level guardrails:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded-lg border border-warning-200 bg-warning-50/50 space-y-1">
                    <h4 className="text-xs font-bold text-warning-800">No Guilt Determination</h4>
                    <p className="text-[10px] text-warning-700 leading-snug">
                      The assistant is explicitly forbidden from making pronouncements of guilt, suspect categorization, or final judgements.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-warning-200 bg-warning-50/50 space-y-1">
                    <h4 className="text-xs font-bold text-warning-800">No Claims of Fraud/Neglect</h4>
                    <p className="text-[10px] text-warning-700 leading-snug">
                      The assistant cannot make formal claims of administrative fraud or negligence without human corroboration.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-warning-200 bg-warning-50/50 space-y-1">
                    <h4 className="text-xs font-bold text-warning-800">No Future Crime Guarantees</h4>
                    <p className="text-[10px] text-warning-700 leading-snug">
                      Predictive analytics represent statistical risk profiles, not absolute forecasts or future-crime guarantees.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-warning-200 bg-warning-50/50 space-y-1">
                    <h4 className="text-xs font-bold text-warning-800">Human Approval for Actions</h4>
                    <p className="text-[10px] text-warning-700 leading-snug">
                      Any operational action (alerts, alerts dispatch, cases assignment) requires manual approval by an authorized officer.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-navy-900">
                  <Lock className="text-brand-600" size={16} />
                  <h3 className="text-sm font-bold">PII Protection Policy</h3>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Personally Identifiable Information (PII) including phone numbers, emails, and home addresses are masked when processed by foreign or cloud-based LLM APIs. System administrators monitor API logs to prevent unauthorized transmission of raw data.
                </p>
              </section>
            </div>
          )}

          {activeTab === "disclaimers" && (
            <div className="space-y-6">
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-navy-900">
                  <AlertCircle className="text-brand-600" size={16} />
                  <h3 className="text-sm font-bold">Statistical Disclaimer & Disclaimers</h3>
                </div>
                <p className="text-xs text-navy-600 leading-relaxed">
                  Users of the Crime Lens dashboard must acknowledge the statistical boundaries of predictive and simulated data:
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-navy-100 bg-navy-50 space-y-1">
                    <h4 className="text-xs font-semibold text-navy-800">Synthetic Data Simulation</h4>
                    <p className="text-[11px] text-navy-600 leading-relaxed">
                      All incident logs, offender profiles, and financial transactions displayed in this environment are synthetic and simulated for demo evaluation. Any resemblance to real persons, entities, or incidents is entirely coincidental.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-navy-100 bg-navy-50 space-y-1">
                    <h4 className="text-xs font-semibold text-navy-800">Forecasting & Risk Assessment Limits</h4>
                    <p className="text-[11px] text-navy-600 leading-relaxed">
                      Crime forecasts, hotspots, and risk scores are derived from historical patterns. They do not constitute absolute guarantees of future activity. Local deployment decisions must incorporate field reporting and tactical intelligence.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-navy-100 bg-navy-50 space-y-1">
                    <h4 className="text-xs font-semibold text-navy-800">Exported Reports Classified Status</h4>
                    <p className="text-[11px] text-navy-600 leading-relaxed">
                      PDF and CSV files exported from the Crime Lens workspace are classified for official use only. System audit logs track the downloading user&apos;s details, and unauthorized dissemination is subject to policy violations.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
