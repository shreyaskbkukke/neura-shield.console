"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/foundation/Button";
import { ApiClientError } from "@/types/api";
import { apiPost } from "@/lib/api/client";
import logoImg from "../../../../public/logo-192.png";

interface LoginResponse {
  token: string;
  user_id: string;
  email: string;
  full_name: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { setToken, loadMe, user } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If a token is already stored and valid, skip straight to dashboard.
  useEffect(() => {
    const token =
      globalThis.window === undefined
        ? null
        : localStorage.getItem("ns_auth_token");

    if (token) {
      loadMe().then(() => {
        const { user: currentUser } = useAuthStore.getState();
        if (currentUser) {
          router.replace("/dashboard");
        } else {
          setIsChecking(false);
        }
      });
    } else {
      setIsChecking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Also redirect when user lands in state already populated (e.g. back button).
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await apiPost<LoginResponse>("/auth/login", {
        email: email.trim(),
        password,
      });
      setToken(res.token);
      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError("Could not connect. Check that the backend is running.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <img src={logoImg.src} alt="Crime Lens" className="w-10 h-10 object-contain shadow-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy-900 border border-navy-700">
            <img src={logoImg.src} alt="Crime Lens" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Crime Lens</h1>
            <p className="text-sm text-navy-400">Intelligence Platform</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-navy-700 bg-navy-900 p-7 space-y-5">
          <div className="flex items-center gap-2 text-brand-400">
            <Lock size={13} />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Sign In
            </span>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-navy-300"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500 pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@crimelens.local"
                  className="w-full rounded-lg bg-navy-800 border border-navy-600 pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-navy-500 focus:outline-none focus:border-brand-500"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-navy-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500 pointer-events-none"
                />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-navy-800 border border-navy-600 pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-navy-500 focus:outline-none focus:border-brand-500"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-danger-400">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!email.trim() || !password}
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
