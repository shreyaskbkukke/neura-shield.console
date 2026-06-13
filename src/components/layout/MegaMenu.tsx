"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNavigationStore } from "@/stores/navigationStore";
import { navGroups } from "@/lib/navigation/navConfig";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { activeGroupId, clearActiveGroup } = useNavigationStore();

  if (!activeGroupId) return null;

  const group = navGroups.find((g) => g.id === activeGroupId);
  if (!group) return null;

  const visibleItems = group.items.filter(
    (item) => !item.permission || user?.permissions.includes(item.permission),
  );

  if (visibleItems.length === 0) return null;

  return (
    <div
      className="fixed left-16 top-14 bottom-0 z-30 w-72 flex flex-col bg-white border-r border-navy-200 shadow-lg"
      onMouseEnter={() => {/* keep menu open while hovering */}}
      onMouseLeave={clearActiveGroup}
    >
      {/* Group header */}
      <div className="px-4 py-4 border-b border-navy-100">
        <div className="flex items-center gap-2">
          <group.icon size={16} className="text-brand-600" />
          <h2 className="text-sm font-semibold text-navy-900">{group.label}</h2>
        </div>
        {group.description && (
          <p className="mt-1 text-xs text-navy-500">{group.description}</p>
        )}
      </div>

      {/* Items */}
      <nav className="flex-1 overflow-y-auto p-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <button
              key={item.href}
              onClick={() => {
                router.push(item.href);
                clearActiveGroup();
              }}
              className={cn(
                "group w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "hover:bg-navy-50 text-navy-700 hover:text-navy-900",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 shrink-0 transition-colors",
                  isActive
                    ? "text-brand-600"
                    : "text-navy-400 group-hover:text-brand-500",
                )}
              >
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <div
                  className={cn(
                    "text-sm font-medium leading-none",
                    isActive ? "text-brand-700" : "text-navy-800",
                  )}
                >
                  {item.title}
                </div>
                {item.description && (
                  <div className="mt-1 text-xs text-navy-500 leading-snug line-clamp-2">
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
