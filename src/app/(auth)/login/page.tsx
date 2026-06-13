"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/foundation/Button";
import { ApiClientError } from "@/types/api";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [tokenInput, setTokenInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = tokenInput.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    try {
      // Temporarily store token so apiGet picks it up for validation
      if (globalThis.window !== undefined) {
        localStorage.setItem("ns_auth_token", trimmed);
      }
      const { apiGet } = await import("@/lib/api/client");
      await apiGet("/auth/me");
      setToken(trimmed);
      router.replace("/dashboard");
    } catch (err) {
      if (globalThis.window !== undefined) {
        localStorage.removeItem("ns_auth_token");
      }
      if (err instanceof ApiClientError) {
        setError(`${err.code}: ${err.message}`);
      } else {
        setError("Could not connect. Check that the backend is running.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">NeuraShield</h1>
            <p className="text-sm text-navy-400">Intelligence Platform</p>
          </div>
        </div>

        <div className="rounded-2xl border border-navy-700 bg-navy-900 p-7 space-y-5">
          <div className="flex items-center gap-2 text-brand-400">
            <KeyRound size={13} />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Sign In
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-white font-semibold">Enter your access token</h2>
            <p className="text-xs text-navy-400">
              Paste the Bearer token issued by the Catalyst identity provider.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="bearer-token" className="text-xs font-medium text-navy-300">
                Bearer Token
              </label>
              <textarea
                id="bearer-token"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste your token here…"
                rows={3}
                className="w-full rounded-lg bg-navy-800 border border-navy-600 px-3 py-2.5 text-sm text-white placeholder:text-navy-500 focus:outline-none focus:border-brand-500 font-mono resize-none"
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
              disabled={!tokenInput.trim()}
            >
              Sign In
              <ArrowRight size={14} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
