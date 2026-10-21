import type { StoreStatus } from "@/services/AdminServices/Types/adminStore";

const styles: Record<StoreStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700",
  SUSPENDED: "bg-amber-50 text-amber-700",
  CLOSED: "bg-slate-100 text-slate-500",
};

export const storeStatusLabel: Record<StoreStatus, string> = {
  ACTIVE: "Activo",
  SUSPENDED: "Suspendido",
  CLOSED: "Cerrado",
};

export default function StoreStatusBadge({ status }: { status: StoreStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      {storeStatusLabel[status]}
    </span>
  );
}
