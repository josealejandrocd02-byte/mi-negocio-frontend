
import { useCallback, useEffect, useState } from "react";
import { listEmployeeProducts } from "@/services/EmplooyService/employeeService";
import type { Product } from "@/services/ProductCategoryServices/Types/catalog";

interface UseEmployeeProductsOptions {
  categoryId?: string;
  q?: string;
}

export function useEmployeeProducts({
  categoryId,
  q,
}: UseEmployeeProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await listEmployeeProducts(categoryId, q);
      setProducts(data);
    } catch {
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, [categoryId, q]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}
