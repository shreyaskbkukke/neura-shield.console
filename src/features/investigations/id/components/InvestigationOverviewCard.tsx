import { Card, CardContent } from "@/components/foundation/Card";
import { formatDateTime } from "@/lib/formatters";
import type { Investigation } from "../../types";

interface InvestigationOverviewCardProps {
  investigation: Investigation;
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] text-navy-400">{label}</p>
      <p className="text-xs font-medium text-navy-800 mt-0.5">{value ?? "—"}</p>
    </div>
  );
}

export function InvestigationOverviewCard({ investigation }: InvestigationOverviewCardProps) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Opened" value={formatDateTime(investigation.created_at)} />
          <Field label="Last updated" value={formatDateTime(investigation.updated_at)} />
          {investigation.closed_at && (
            <Field label="Closed" value={formatDateTime(investigation.closed_at)} />
          )}
          <Field
            label="Linked incident"
            value={
              investigation.crime_incident_id ? (
                <span className="font-mono text-[11px] text-brand-600">
                  {investigation.crime_incident_id.slice(0, 8)}…
                </span>
              ) : (
                "None"
              )
            }
          />
          <Field
            label="Alert"
            value={
              investigation.alert_id ? (
                <span className="font-mono text-[11px] text-warning-600">
                  {investigation.alert_id.slice(0, 8)}…
                </span>
              ) : (
                "None"
              )
            }
          />
          <Field
            label="Assigned to"
            value={
              investigation.assigned_to_user_id ? (
                <span className="font-mono text-[11px]">
                  {investigation.assigned_to_user_id.slice(0, 8)}…
                </span>
              ) : (
                "Unassigned"
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
