"use client";

import { DetailDrawer } from "@/components/grounded/DetailDrawer";
import { Badge } from "@/components/foundation/Badge";
import type { AdminUser } from "../types";

interface Props {
  user: AdminUser;
  onClose: () => void;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-navy-400 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-navy-800">{value ?? "—"}</span>
    </div>
  );
}

export function UserDetailDrawer({ user, onClose }: Props) {
  return (
    <DetailDrawer isOpen title={user.full_name} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Row label="Email" value={user.email} />
          <Row label="Phone" value={user.phone} />
          <Row label="Designation" value={user.designation} />
          <Row label="Department" value={user.department} />
          <Row
            label="Status"
            value={
              <Badge variant={user.is_active ? "success" : "default"} >
                {user.is_active ? "Active" : "Inactive"}
              </Badge>
            }
          />
          <Row label="Catalyst ID" value={
            <span className="font-mono text-xs">{user.catalyst_user_id}</span>
          } />
        </div>

        <div>
          <span className="text-xs text-navy-400 uppercase tracking-wide">Roles</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {user.roles.length === 0 ? (
              <span className="text-sm text-navy-400">No roles assigned</span>
            ) : (
              user.roles.map((r) => (
                <Badge key={r} variant="default" >
                  {r.replace(/_/g, " ")}
                </Badge>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-navy-100 pt-4">
          <Row
            label="Created"
            value={new Date(user.created_at).toLocaleDateString()}
          />
          <Row
            label="Updated"
            value={new Date(user.updated_at).toLocaleDateString()}
          />
        </div>
      </div>
    </DetailDrawer>
  );
}
