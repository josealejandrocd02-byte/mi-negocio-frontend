// src/hooks/useMyStores.ts
import { useMe } from "../useMe";

/**
 * Sucursales del usuario logueado (GET /api/me, misma query ["me"] que ya usas).
 * adminStores = solo donde es STORE_ADMIN con acceso activo.
 */
export function useMyStores() {
  const query = useMe();

  const stores = query.data?.stores ?? [];
  const adminStores = stores.filter((s) => s.role === "STORE_ADMIN" && s.active);
  const restrictedAdminStores = stores.filter((s) => s.role === "STORE_ADMIN" && !s.active);

  return {
    me: query.data,
    stores,
    adminStores,
    restrictedAdminStores,
    isStoreAdminOf: (storeId?: string) =>
      !!storeId && adminStores.some((s) => s.storeId === storeId),
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}