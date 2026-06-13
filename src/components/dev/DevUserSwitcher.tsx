"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/utils";

interface DevUserSwitcherProps {
  className?: string;
}

const KNOWN_ROLES = [
  { label: "Super Admin", email: "admin@neurashield.local" },
  { label: "Analyst", email: "analyst@neurashield.local" },
  { label: "District Officer 1", email: "district_officer_1@neurashield.local" },
  { label: "District Officer 2", email: "district_officer_2@neurashield.local" },
  { label: "Station Officer 1", email: "station_officer_1@neurashield.local" },
  { label: "Investigator", email: "investigator@neurashield.local" },
  { label: "Supervisor", email: "supervisor@neurashield.local" },
  { label: "Viewer", email: "viewer@neurashield.local" },
];

export function DevUserSwitcher({ className }: DevUserSwitcherProps) {
  const { user, setDevUser } = useAuthStore();
  const [uuid, setUuid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  async function handleConnect() {
    const trimmed = uuid.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setDevUser(trimmed);
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 bg-navy-900 border border-navy-700 rounded-xl shadow-xl text-white",
        isExpanded ? "w-80 p-4" : "p-3",
        className,
      )}
    >
      {/* Toggle header */}
      <button
        onClick={() => setIsExpanded((v) => !v)}
        className="flex items-center gap-2 w-full text-left"
      >
        <Terminal size={14} className="text-intelligence-400 shrink-0" />
        {isExpanded ? (
          <span className="text-xs font-semibold text-intelligence-300">Dev Mode</span>
        ) : (
          <span className="text-[10px] text-navy-400">DEV</span>
        )}
        {user && isExpanded && (
          <span className="ml-auto text-[10px] text-success-400 truncate max-w-[120px]">
            {user.role}
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3">
          {/* Current user */}
          {user && (
            <div className="rounded-lg bg-navy-800 px-3 py-2 text-xs">
              <p className="text-navy-400">Signed in as</p>
              <p className="font-medium text-white truncate">{user.full_name}</p>
              <p className="text-navy-400 truncate">{user.email}</p>
            </div>
          )}

          {/* UUID input */}
          <div className="space-y-2">
            <label className="text-[10px] text-navy-400 uppercase tracking-wide">
              User UUID
            </label>
            <input
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Paste UUID from backend…"
              className="w-full h-7 rounded bg-navy-800 border border-navy-600 px-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-brand-500"
            />
            <Button
              size="sm"
              className="w-full h-7 text-xs"
              onClick={handleConnect}
              isLoading={isLoading}
              disabled={!uuid.trim()}
            >
              Connect
            </Button>
          </div>

          {/* Role quick reference */}
          <div>
            <p className="text-[10px] text-navy-400 uppercase tracking-wide mb-1.5">
              Demo users
            </p>
            <div className="space-y-0.5">
              {KNOWN_ROLES.map((r) => (
                <div key={r.email} className="flex items-center gap-2 text-[10px]">
                  <span className="text-navy-300 w-28 shrink-0">{r.label}</span>
                  <span className="text-navy-500 truncate">{r.email}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[9px] text-navy-600 leading-snug">
              Get UUIDs: <code className="font-mono text-navy-500">psql -c &quot;SELECT id,email FROM users&quot;</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
