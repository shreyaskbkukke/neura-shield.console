import type { CurrentUser } from "@/types/auth";
import { navGroups } from "@/lib/navigation/navConfig";

export function canAccessRoute(user: CurrentUser | null, href: string): boolean {
  if (!user) return false;

  // Find the nav item for this route
  for (const group of navGroups) {
    const item = group.items.find((i) => i.href === href);
    if (item) {
      if (!item.permission) return true;
      return user.permissions.includes(item.permission);
    }
  }

  // Route not in nav config — allow by default (handled by page-level guards)
  return true;
}

export function getAccessibleGroups(user: CurrentUser | null) {
  if (!user) return [];
  return navGroups.filter((group) =>
    group.items.some(
      (item) => !item.permission || user.permissions.includes(item.permission),
    ),
  );
}

export function getAccessibleItems(user: CurrentUser | null, groupId: string) {
  if (!user) return [];
  const group = navGroups.find((g) => g.id === groupId);
  if (!group) return [];
  return group.items.filter(
    (item) => !item.permission || user.permissions.includes(item.permission),
  );
}
