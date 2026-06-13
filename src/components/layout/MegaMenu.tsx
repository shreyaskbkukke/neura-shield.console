"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNavigationStore } from "@/stores/navigationStore";
import { navGroups } from "@/lib/navigation/navConfig";
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";

export function MegaMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { activeGroupId, clearActiveGroup, megaMenuPinned, togglePinMegaMenu } = useNavigationStore();

  if (!activeGroupId) return null;

  const group = navGroups.find((g) => g.id === activeGroupId);
  if (!group) return null;

  const visibleItems = group.items.filter(
    (item) => !item.permission || user?.permissions.includes(item.permission),
  );

  if (visibleItems.length === 0) return null;

  return (
    <div
      className="w-80 h-full flex flex-col bg-white border-r border-navy-150 shadow-lg rounded-r-3xl animate-drawer-in overflow-hidden select-none"
    >
      {/* Group header in Material 3 style */}
      <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
            <group.icon size={18} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-navy-900 leading-tight">
              {group.label}
            </h2>
            {group.description && (
              <p className="mt-0.5 text-[11px] text-navy-500 leading-none">
                {group.description}
              </p>
            )}
          </div>
        </div>

        {/* Pin button */}
        <button
          onClick={togglePinMegaMenu}
          className={cn(
            "p-1.5 rounded-full transition-colors focus:outline-none",
            megaMenuPinned
              ? "text-brand-600 bg-brand-50 hover:bg-brand-100"
              : "text-navy-400 hover:bg-navy-50 hover:text-navy-600"
          )}
          title={megaMenuPinned ? "Unpin side panel" : "Pin side panel"}
        >
          {megaMenuPinned ? <PinOff size={14} /> : <Pin size={14} />}
        </button>
      </div>

      {/* Navigation List items in M3 Rounded style */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <button
              key={item.href}
              onClick={() => {
                router.push(item.href);
                // Only clear if not pinned
                if (!megaMenuPinned) {
                  clearActiveGroup();
                }
              }}
              className={cn(
                "group w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-left transition-all duration-200 focus:outline-none",
                isActive
                  ? "bg-brand-50 text-brand-700 font-semibold"
                  : "hover:bg-navy-50 text-navy-700 hover:text-navy-950",
              )}
            >
              <div
                className={cn(
                  "shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive
                    ? "text-brand-600"
                    : "text-navy-400 group-hover:text-brand-500",
                )}
              >
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "text-xs font-medium leading-none",
                    isActive ? "text-brand-800" : "text-navy-800 group-hover:text-navy-950",
                  )}
                >
                  {item.title}
                </div>
                {item.description && (
                  <div className="mt-1 text-[10px] text-navy-500 leading-snug line-clamp-1 group-hover:text-navy-600">
                    {item.description}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
