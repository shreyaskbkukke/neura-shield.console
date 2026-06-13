"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Topbar } from "./Topbar";
import { LeftRail } from "./LeftRail";
import { MegaMenu } from "./MegaMenu";
import { ContentArea } from "./ContentArea";
import { CommandSearch } from "./CommandSearch";
import { Skeleton } from "@/components/foundation/Skeleton";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading, loadMe, devUserId } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devUserId]);

  if (isLoading) {
    return (
      <div className="h-screen bg-navy-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">NS</span>
          </div>
          <Skeleton className="w-32 h-2 bg-navy-800" />
        </div>
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <div className="h-screen overflow-hidden bg-navy-50">
      <Topbar />
      <CommandSearch />
      <div className="flex h-[calc(100vh-56px)] mt-14">
        <LeftRail />
        <MegaMenu />
        <ContentArea className="ml-16">{children}</ContentArea>
      </div>
    </div>
  );
}
