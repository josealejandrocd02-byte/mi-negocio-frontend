import api from "@/api/client";
import type {
  Category,
  CategoryCreatePayload,
  CategoryUpdatePayload,
} from "./Types/catalog";

// Categorías de la sucursal (el backend valida que el usuario sea miembro activo)
const base = (storeId: string) => `/stores/${storeId}/categories`;

export const listCategories = async (storeId: string): Promise<Category[]> => {
  const { data } = await api.get<Category[]>(base(storeId));
  return data;
};

export const createCategory = async (
  storeId: string,
  payload: CategoryCreatePayload,
): Promise<Category> => {
  const { data } = await api.post<Category>(base(storeId), payload);
  return data;
};

export const updateCategory = async (
  storeId: string,
  categoryId: string,
  payload: CategoryUpdatePayload,
): Promise<Category> => {
  const { data } = await api.put<Category>(`${base(storeId)}/${categoryId}`, payload);
  return data;
};

// { "active": false }
export const setCategoryActive = async (
  storeId: string,
  categoryId: string,
  active: boolean,
): Promise<Category> => {
  const { data } = await api.patch<Category>(`${base(storeId)}/${categoryId}/active`, { active });
  return data;
};
