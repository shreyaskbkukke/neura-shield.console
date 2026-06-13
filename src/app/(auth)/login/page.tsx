"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/foundation/Button";
import { ApiClientError } from "@/types/api";

export default function LoginPage() {
  const router = useRouter();
  const { setDevUser } = useAuthStore();
  const [uuid, setUuid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = uuid.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    try {
      const { apiGet } = await import("@/lib/api/client");
      // Temporarily set UUID in localStorage so apiGet picks it up
      if (typeof window !== "undefined") {
        localStorage.setItem("ns_dev_user_id", trimmed);
      }
      await apiGet("/auth/me");
      setDevUser(trimmed);
      router.replace("/dashboard");
    } catch (err) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ns_dev_user_id");
      }
      if (err instanceof ApiClientError) {
        setError(`${err.code}: ${err.message}`);
      } else {
        setError("Could not connect to backend. Is the server running?");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">NeuraShield</h1>
            <p className="text-sm text-navy-400">Intelligence Platform</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-navy-700 bg-navy-900 p-7 space-y-5">
          <div className="flex items-center gap-2 text-intelligence-400">
            <Terminal size={13} />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Developer Mode
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-white font-semibold">Connect as demo user</h2>
            <p className="text-xs text-navy-400">
              Paste a user UUID from the backend database to sign in.
            </p>
          </div>

          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-navy-300">
                User UUID
              </label>
              <input
                value={uuid}
                onChange={(e) => setUuid(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full h-10 rounded-lg bg-navy-800 border border-navy-600 px-3 text-sm text-white placeholder:text-navy-500 focus:outline-none focus:border-brand-500 font-mono"
                autoComplete="off"
                spellCheck={false}
              />
              {error && (
                <p className="text-xs text-danger-400">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!uuid.trim()}
            >
              Connect
              <ArrowRight size={14} />
            </Button>
          </form>

          {/* Help */}
          <div className="rounded-lg bg-navy-800 px-3 py-3 space-y-2">
            <p className="text-[10px] text-navy-400 font-semibold uppercase tracking-wide">
              Get user UUIDs
            </p>
            <code className="block text-[10px] text-intelligence-300 font-mono leading-relaxed">
              cd neura-shield.backend<br />
              .venv/bin/python -c &quot;<br />
              &nbsp;&nbsp;import sys; sys.path.insert(0, &apos;src&apos;)<br />
              &nbsp;&nbsp;from sqlalchemy import create_engine, select, text<br />
              &nbsp;&nbsp;from core.config import settings<br />
              &nbsp;&nbsp;e = create_engine(settings.SYNC_DATABASE_URL)<br />
              &nbsp;&nbsp;with e.connect() as c:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;for r in c.execute(text(&apos;SELECT id,email FROM users&apos;)):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(r.id, r.email)<br />
              &quot;
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
