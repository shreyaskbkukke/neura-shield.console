"use client";

import { InsightSection } from "@/components/grounded/InsightSection";
import { Skeleton } from "@/components/foundation/Skeleton";
import { useNotificationPreferences, useUpdatePreference } from "../hooks";
import { Settings2 } from "lucide-react";

export function NotificationPreferencesPanel() {
  const prefsQuery = useNotificationPreferences();
  const updateMutation = useUpdatePreference();

  return (
    <InsightSection title="Notification Preferences" icon={Settings2}>
      {prefsQuery.isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
      ) : !prefsQuery.data?.length ? (
        <p className="text-xs text-navy-400">No preferences configured.</p>
      ) : (
        <div className="space-y-2">
          {prefsQuery.data.map((pref) => (
            <div
              key={pref.id}
              className="flex items-center justify-between rounded-lg border border-navy-100 bg-white px-3 py-2"
            >
              <div>
                <p className="text-xs font-medium text-navy-800">
                  {pref.notification_type.replace(/_/g, " ")}
                </p>
                <p className="text-[11px] text-navy-400">{pref.channel}</p>
              </div>
              <button
                role="switch"
                aria-checked={pref.is_enabled}
                onClick={() =>
                  updateMutation.mutate({
                    notification_type: pref.notification_type,
                    channel: pref.channel,
                    is_enabled: !pref.is_enabled,
                  })
                }
                disabled={updateMutation.isPending}
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                  pref.is_enabled ? "bg-brand-600" : "bg-navy-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${
                    pref.is_enabled ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </InsightSection>
  );
}
