import api from "@/api/client";
import type {
  PhotoResponse,
  Product,
  ProductCreatePayload,
  ProductListParams,
  ProductUpdatePayload,
} from "./Types/catalog";

// Productos de la sucursal (sin control de stock)
const base = (storeId: string) => `/stores/${storeId}/products`;

// La foto vive en el controlador foto-config, no en ProductController
const photoBase = (storeId: string, productId: string) =>
  `/stores/${storeId}/foto-config/products/${productId}/photo`;

export const listProducts = async (
  storeId: string,
  params?: ProductListParams,
): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(base(storeId), {
    params: {
      categoryId: params?.categoryId || undefined,
      q: params?.q?.trim() || undefined,
    },
  });
  return data;
};

export const getProduct = async (storeId: string, productId: string): Promise<Product> => {
  const { data } = await api.get<Product>(`${base(storeId)}/${productId}`);
  return data;
};

export const createProduct = async (
  storeId: string,
  payload: ProductCreatePayload,
): Promise<Product> => {
  const { data } = await api.post<Product>(base(storeId), payload);
  return data;
};

export const updateProduct = async (
  storeId: string,
  productId: string,
  payload: ProductUpdatePayload,
): Promise<Product> => {
  const { data } = await api.put<Product>(`${base(storeId)}/${productId}`, payload);
  return data;
};

// { "active": false } -> ocultar producto agotado
export const setProductActive = async (
  storeId: string,
  productId: string,
  active: boolean,
): Promise<Product> => {
  const { data } = await api.patch<Product>(`${base(storeId)}/${productId}/active`, { active });
  return data;
};

// multipart/form-data con el campo "file"
export const uploadProductPhoto = async (
  storeId: string,
  productId: string,
  file: File,
): Promise<PhotoResponse> => {
  const form = new FormData();
  form.append("file", file);
  // No fijar Content-Type manualmente: Axios/browser generan el boundary del multipart.
  const { data } = await api.post<PhotoResponse>(photoBase(storeId, productId), form);
  return data;
};

export const deleteProductPhoto = async (storeId: string, productId: string): Promise<void> => {
  await api.delete(photoBase(storeId, productId));
};
