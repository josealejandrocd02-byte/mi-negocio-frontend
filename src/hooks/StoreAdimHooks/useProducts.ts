import { useCallback, useEffect, useRef, useState } from "react";
import {
  createProduct,
  deleteProductPhoto,
  listProducts,
  setProductActive,
  updateProduct,
  uploadProductPhoto,
} from "@/services/StoreAdminServices/productService";
import type {
  Product,
  ProductCreatePayload,
  ProductListParams,
  ProductUpdatePayload,
} from "@/services/StoreAdminServices/Types/catalog";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useProducts(storeId: string | undefined) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Secuencia de peticiones: solo la última puede escribir el estado.
  const requestRef = useRef(0);

  const reload = useCallback(
    async (params?: ProductListParams) => {
      const requestId = ++requestRef.current;
      const isLatest = () => requestId === requestRef.current;

      if (!storeId) {
        setProducts([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await listProducts(storeId, params);
        if (isLatest()) setProducts(data);
      } catch (e) {
        if (isLatest()) {
          // No dejar datos de un local anterior visibles si falla el nuevo.
          setProducts([]);
          setError(getErrorMessage(e, "No se pudieron cargar los productos"));
        }
      } finally {
        if (isLatest()) setLoading(false);
      }
    },
    [storeId],
  );

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

  const replace = (product: Product) =>
    setProducts((prev) => prev.map((x) => (x.id === product.id ? product : x)));

  // Las mutaciones lanzan el error para que el modal lo muestre.
  const create = async (payload: ProductCreatePayload) => {
    const id = requireStoreId();
    invalidatePendingReload();
    const created = await createProduct(id, payload);
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const update = async (productId: string, payload: ProductUpdatePayload) => {
    const id = requireStoreId();
    invalidatePendingReload();
    const updated = await updateProduct(id, productId, payload);
    replace(updated);
    return updated;
  };

  const setActive = async (productId: string, active: boolean) => {
    const id = requireStoreId();
    invalidatePendingReload();
    const updated = await setProductActive(id, productId, active);
    replace(updated);
    return updated;
  };

  const uploadPhoto = async (productId: string, file: File) => {
    const id = requireStoreId();
    invalidatePendingReload();
    const { url } = await uploadProductPhoto(id, productId, file);
    setProducts((prev) => prev.map((x) => (x.id === productId ? { ...x, imageUrl: url } : x)));
  };

  const removePhoto = async (productId: string) => {
    const id = requireStoreId();
    invalidatePendingReload();
    await deleteProductPhoto(id, productId);
    setProducts((prev) => prev.map((x) => (x.id === productId ? { ...x, imageUrl: null } : x)));
  };

  return {
    products,
    loading,
    error,
    reload,
    create,
    update,
    setActive,
    uploadPhoto,
    removePhoto,
  };
}
