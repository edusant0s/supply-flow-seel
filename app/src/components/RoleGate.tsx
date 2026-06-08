import type { ModuleKey } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { canManage, canView } from "../lib/permissions";

export function RoleGate({
  module,
  mode = "manage",
  children,
  fallback = null,
}: {
  module: ModuleKey;
  mode?: "view" | "manage";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { profile } = useAuth();
  const allowed = mode === "view" ? canView(profile?.role, module) : canManage(profile?.role, module);
  return allowed ? <>{children}</> : <>{fallback}</>;
}
