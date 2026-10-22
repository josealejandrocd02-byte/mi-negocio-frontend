import type { PlatformRole } from "@/services/AdminServices/Types/adminUser";

export function UserStatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      Activo
    </span>
  ) : (
    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
      Bloqueado
    </span>
  );
}

export function PlatformRoleBadge({ role }: { role: PlatformRole }) {
  return role === "SUPER_ADMIN" ? (
    <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
      Super admin
    </span>
  ) : (
    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      Usuario
    </span>
  );
}

export const storeRoleLabel = { STORE_ADMIN: "Administrador", EMPLOYEE: "Empleado" } as const;

export const formatDate = (iso: string) =>
  new Date(iso)
    .toLocaleDateString("es-BO", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/\./g, "");
