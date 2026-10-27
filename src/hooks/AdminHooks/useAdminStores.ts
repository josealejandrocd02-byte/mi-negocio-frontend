import { useCallback, useEffect, useState } from "react";
import {
  closeStore, createStore, deleteStore, listStores, reopenStore, setStoreStatus, updateStore,
} from "@/services/AdminServices/adminStoreService";
import type {
  Store, StoreCreatePayload, StoreStatus, StoreUpdatePayload,
} from "@/services/AdminServices/Types/adminStore";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useAdminStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setStores(await listStores());
    } catch (e) {
      setError(getErrorMessage(e, "No se pudo cargar la lista de locales"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Sincroniza una sucursal en la lista (lo usa también el detalle)
  const sync = useCallback((s: Store) => {
    setStores((prev) => prev.map((x) => (x.id === s.id ? { ...x, ...s } : x)));
  }, []);

  // Las mutaciones lanzan el error para que el modal lo muestre.
  const create = async (payload: StoreCreatePayload, logo?: File | null) => {
    const detail = await createStore(payload, logo);
    setStores((prev) => [detail.store, ...prev]);
    return detail;
  };

  const update = async (id: string, payload: StoreUpdatePayload, logo?: File | null) => {
    const detail = await updateStore(id, payload, logo);
    sync(detail.store);
    return detail;
  };

  const setStatus = async (id: string, status: StoreStatus) => {
    const detail = await setStoreStatus(id, status);
    sync(detail.store);
    return detail;
  };

  // Cerrar: la sucursal queda con estado CLOSED (se conserva el historial)
  const close = async (id: string) => {
    await closeStore(id);
    setStores((prev) => prev.map((x) => (x.id === id ? { ...x, status: "CLOSED" } : x)));
  };

  // Reabrir: CLOSED -> ACTIVE
  const reopen = async (id: string) => {
    const detail = await reopenStore(id);
    sync(detail.store);
    return detail;
  };

  // Eliminar definitivamente: la fila desaparece de la lista
  const remove = async (id: string) => {
    await deleteStore(id);
    setStores((prev) => prev.filter((x) => x.id !== id));
  };

  return {
    stores, loading, error, reload, sync,
    create, update, setStatus, close, reopen, remove,
  };
}
