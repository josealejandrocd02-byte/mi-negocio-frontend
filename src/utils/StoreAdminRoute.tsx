import type { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useMyStores } from "@/hooks/StoreAdimHooks/useMyStores";

/**
 * Deja pasar solo si el usuario es STORE_ADMIN activo de :storeId.
 * Es solo UX: el backend vuelve a validarlo en cada petición.
 */
export default function StoreAdminRoute({ children }: { children: ReactNode }) {
  const { storeId } = useParams();
  const { isLoading, isStoreAdminOf } = useMyStores();

  if (isLoading) {
    return <div className="p-10 text-center text-sm text-slate-400">Verificando acceso…</div>;
  }
  if (!isStoreAdminOf(storeId)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
