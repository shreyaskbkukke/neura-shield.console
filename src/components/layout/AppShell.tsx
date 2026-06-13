"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Topbar } from "./Topbar";
import { LeftRail } from "./LeftRail";
import { MegaMenu } from "./MegaMenu";
import { ContentArea } from "./ContentArea";
import { CommandSearch } from "./CommandSearch";

import { useNavigationStore } from "@/stores/navigationStore";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading, loadMe } = useAuthStore();
  const { activeGroupId, clearActiveGroup, megaMenuPinned } = useNavigationStore();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (megaMenuPinned) return;
    timeoutRef.current = setTimeout(() => {
      clearActiveGroup();
    }, 180); // 180ms delay provides a premium, forgiving hover tunnel
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (isLoading || !user) {
    return (
      <div className="h-screen bg-navy-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold tracking-wider">NS</span>
          </div>
          <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest animate-pulse">
            Initializing Platform
          </span>
          {/* Linear Progress Indicator */}
          <div className="w-44 h-1 bg-navy-800 rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 bg-brand-500 rounded-full w-2/5 animate-progress-indeterminate" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-navy-50">
      <Topbar />
      <CommandSearch />
      <div className="flex h-[calc(100vh-56px)] mt-14 relative">
        {/* Navigation Sidebar Wrapper to handle hover state without gap or closing */}
        <div
          className={cn(
            "fixed left-0 top-14 bottom-0 z-40 flex",
            activeGroupId ? "w-[400px]" : "w-20"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <LeftRail />
          <MegaMenu />
        </div>
        <ContentArea
          className={cn(
            "transition-all duration-300 ease-in-out",
            megaMenuPinned && activeGroupId ? "ml-[400px]" : "ml-20"
          )}
        >
          {children}
        </ContentArea>
      </div>
    </div>
  );
}
