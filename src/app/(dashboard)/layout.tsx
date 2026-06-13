import { AppShell } from "@/components/layout/AppShell";
import { DevUserSwitcher } from "@/components/dev/DevUserSwitcher";
import { config } from "@/lib/config";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      {children}
      {config.devAuthEnabled && <DevUserSwitcher />}
    </AppShell>
  );
}
