import { useEffect, useState } from "react";
import {
  addStoreAdmin, changeStoreOwner, getStore, removeStoreMember,
} from "@/services/AdminServices/adminStoreService";
import type { Store, StoreDetail } from "@/services/AdminServices/Types/adminStore";
import { getErrorMessage } from "@/utils/getErrorMessage";

/** Carga una sucursal con su equipo y expone las acciones sobre dueño/miembros. */
export function useStoreDetail(storeId: string | null, onUpdated?: (store: Store) => void) {
  const [detail, setDetail] = useState<StoreDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    getStore(storeId)
      .then((d) => !cancelled && setDetail(d))
      .catch((e) => !cancelled && setError(getErrorMessage(e, "No se pudo cargar el local")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [storeId]);

  const apply = async (request: Promise<StoreDetail>) => {
    const d = await request;
    setDetail(d);
    onUpdated?.(d.store);
    return d;
  };

  return {
    detail,
    loading,
    error,
    changeOwner: (userId: string) => apply(changeStoreOwner(storeId!, userId)),
    addAdmin: (userId: string) => apply(addStoreAdmin(storeId!, userId)),
    removeMember: (userId: string) => apply(removeStoreMember(storeId!, userId)),
  };
}
