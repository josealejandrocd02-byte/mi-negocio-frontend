import { useCallback, useEffect, useRef, useState } from "react";
import {
  createCategory,
  listCategories,
  setCategoryActive,
  updateCategory,
} from "@/services/StoreAdminServices/categoryService";
import type {
  Category,
  CategoryCreatePayload,
  CategoryUpdatePayload,
} from "@/services/StoreAdminServices/Types/catalog";
import { getErrorMessage } from "@/utils/getErrorMessage";

const byName = (a: Category, b: Category) => a.name.localeCompare(b.name);

export function useCategories(storeId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Secuencia de peticiones: solo la última puede escribir el estado.
  const requestRef = useRef(0);

  const reload = useCallback(async () => {
    const requestId = ++requestRef.current;
    const isLatest = () => requestId === requestRef.current;

    if (!storeId) {
      setCategories([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await listCategories(storeId);
      if (isLatest()) setCategories([...data].sort(byName));
    } catch (e) {
      if (isLatest()) {
        // No dejar datos de un local anterior visibles si falla el nuevo.
        setCategories([]);
        setError(getErrorMessage(e, "No se pudieron cargar las categorías"));
      }
    } finally {
      if (isLatest()) setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    reload();
  }, [reload]);

  // Al desmontar, invalida cualquier respuesta en vuelo.
  useEffect(() => () => {
    requestRef.current += 1;
  }, []);

  const requireStoreId = (): string => {
    if (!storeId) throw new Error("Selecciona un local para continuar");
    return storeId;
  };

  // Una mutación invalida cualquier reload en vuelo para que no pise su resultado.
  const invalidatePendingReload = () => {
    requestRef.current += 1;
    setLoading(false);
    setError(null);
  };

  const replace = (category: Category) =>
    setCategories((prev) =>
      prev.map((x) => (x.id === category.id ? category : x)).sort(byName),
    );

  // Las mutaciones lanzan el error para que el modal lo muestre.
  const create = async (payload: CategoryCreatePayload) => {
    const id = requireStoreId();
    invalidatePendingReload();
    const created = await createCategory(id, payload);
    setCategories((prev) => [...prev, created].sort(byName));
    return created;
  };

  const update = async (categoryId: string, payload: CategoryUpdatePayload) => {
    const id = requireStoreId();
    invalidatePendingReload();
    const updated = await updateCategory(id, categoryId, payload);
    replace(updated);
    return updated;
  };

  const setActive = async (categoryId: string, active: boolean) => {
    const id = requireStoreId();
    invalidatePendingReload();
    const updated = await setCategoryActive(id, categoryId, active);
    replace(updated);
    return updated;
  };

  return { categories, loading, error, reload, create, update, setActive };
}
