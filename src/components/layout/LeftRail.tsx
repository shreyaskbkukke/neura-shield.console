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
      className="fixed left-0 top-14 bottom-0 z-40 w-16 flex flex-col items-center py-3 gap-1 bg-navy-950 border-r border-navy-800"
      onMouseLeave={clearActiveGroup}
    >
      {visibleGroups.map((group) => {
        const Icon = group.icon;
        const isHighlighted = activeGroupId === group.id;
        const isPathActive = activePathGroupId === group.id;

        return (
          <button
            key={group.id}
            onMouseEnter={() => setActiveGroup(group.id)}
            onClick={() =>
              activeGroupId === group.id ? clearActiveGroup() : setActiveGroup(group.id)
            }
            title={group.label}
            className={cn(
              "flex flex-col items-center gap-1 w-12 py-2 rounded-lg transition-all text-center cursor-pointer",
              isHighlighted || isPathActive
                ? "bg-navy-800 text-brand-400"
                : "text-navy-400 hover:bg-navy-900 hover:text-navy-200",
            )}
          >
            <Icon size={18} strokeWidth={isPathActive ? 2.5 : 1.75} />
            <span className="text-[9px] font-medium leading-none tracking-wide">
              {group.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
