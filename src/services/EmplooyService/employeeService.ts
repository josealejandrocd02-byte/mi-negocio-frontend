import api from "@/api/client";
import type { Product } from "../ProductCategoryServices/Types/catalog";

const BASE = "/emplooy";

export const listEmployeeProducts = async (
  categoryId?: string,
  q?: string
): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(
    `${BASE}/list-products`,
    {
      params: {
        ...(categoryId ? { categoryId } : {}),
        ...(q?.trim() ? { q: q.trim() } : {}),
      },
    }
  );

  return data;
};
