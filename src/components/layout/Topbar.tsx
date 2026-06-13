"use client";

import { Bell, LogOut, Search, User } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useCommandStore } from "@/stores/commandStore";
import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { user, logout } = useAuthStore();
  const { open: openCommand } = useCommandStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center gap-3 px-4 bg-white border-b border-navy-200">
      {/* Logo */}
      <div className="flex items-center gap-2 w-16 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
          <span className="text-white text-[10px] font-bold tracking-tight">NS</span>
        </div>
      </div>

      {/* App name */}
      <div className="hidden lg:flex items-baseline gap-1.5">
        <span className="text-sm font-semibold text-navy-900">NeuraShield</span>
        <span className="text-xs text-navy-400">Intelligence Platform</span>
      </div>

      <div className="flex-1" />

      {/* Command search trigger */}
      <button
        onClick={openCommand}
        className={cn(
          "hidden md:flex items-center gap-2 h-8 px-3 rounded-md",
          "border border-navy-200 bg-navy-50 text-navy-400",
          "hover:bg-navy-100 hover:text-navy-600 transition-colors",
          "text-sm w-56",
        )}
      >
        <Search size={13} />
        <span className="flex-1 text-left text-xs">Search pages, modules…</span>
        <kbd className="text-[10px] bg-white border border-navy-200 rounded px-1 py-0.5">
          ⌘K
        </kbd>
      </button>

      {/* Mobile search trigger */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={openCommand}
        className="md:hidden"
        aria-label="Search"
      >
        <Search size={16} />
      </Button>

      {/* Notifications */}
      <Button variant="ghost" size="icon-sm" aria-label="Notifications">
        <Bell size={16} />
      </Button>

      {/* User */}
      {user ? (
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-medium text-navy-800 leading-none">
              {user.full_name}
            </span>
            <span className="text-[10px] text-navy-500 leading-none mt-0.5">
              {user.role}
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center">
            <User size={14} className="text-brand-600" />
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={logout}
            aria-label="Sign out"
          >
            <LogOut size={15} />
          </Button>
        </div>
      ) : (
        <div className="h-8 w-8 rounded-full bg-navy-100 animate-pulse" />
      )}
    </header>
  );
}
