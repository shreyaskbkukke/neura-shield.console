"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNavigationStore } from "@/stores/navigationStore";
import { navGroups } from "@/lib/navigation/navConfig";
import { cn } from "@/lib/utils";

export function LeftRail() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { activeGroupId, setActiveGroup, clearActiveGroup } = useNavigationStore();

  const visibleGroups = navGroups.filter((group) =>
    group.items.some(
      (item) => !item.permission || user?.permissions.includes(item.permission),
    ),
  );

  const activePathGroupId = navGroups.find((g) =>
    g.items.some((item) => pathname.startsWith(item.href) && item.href !== "/"),
  )?.id;

  return (
    <aside
      className="w-20 h-full flex flex-col items-center py-4 gap-2 bg-navy-950 border-r border-navy-850"
    >
      {visibleGroups.map((group) => {
        const Icon = group.icon;
        const isHighlighted = activeGroupId === group.id;
        const isPathActive = activePathGroupId === group.id;
        const isActive = isHighlighted || isPathActive;

        return (
          <button
            key={group.id}
            onMouseEnter={() => setActiveGroup(group.id)}
            onClick={() =>
              activeGroupId === group.id ? clearActiveGroup() : setActiveGroup(group.id)
            }
            title={group.label}
            className="group flex flex-col items-center w-full py-1 text-center cursor-pointer focus:outline-none"
          >
            {/* Material 3 Active Indicator Pill */}
            <div
              className={cn(
                "flex items-center justify-center w-14 h-8 rounded-full transition-all duration-250 ease-out",
                isActive
                  ? "bg-brand-500/15 text-brand-400"
                  : "text-navy-400 hover:bg-navy-900/50 hover:text-navy-200 group-hover:scale-105"
              )}
            >
              <Icon size={20} strokeWidth={isPathActive ? 2.25 : 1.75} />
            </div>
            {/* M3 Navigation Label */}
            <span
              className={cn(
                "mt-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200 px-1 leading-tight",
                isActive
                  ? "text-brand-400 font-semibold"
                  : "text-navy-400 group-hover:text-navy-200"
              )}
            >
              {group.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
