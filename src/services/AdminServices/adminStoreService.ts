import api from "@/api/client";
import type {
  Store,
  StoreCreatePayload,
  StoreDetail,
  StoreStatus,
  StoreUpdatePayload,
} from "./Types/adminStore";

const BASE = "/admin/stores";

// Sin status => todas
export const listStores = async (status?: StoreStatus): Promise<Store[]> => {
  const { data } = await api.get<Store[]>(BASE, { params: status ? { status } : undefined });
  return data;
};

// Sucursal + su equipo (dueño, admins y empleados)
export const getStore = async (id: string): Promise<StoreDetail> => {
  const { data } = await api.get<StoreDetail>(`${BASE}/${id}`);
  return data;
};

// POST/PUT multipart: parte "data" (JSON) + parte opcional "logo" (archivo)
const buildForm = (data: object, logo?: File | null): FormData => {
  const form = new FormData();
  form.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
  if (logo) form.append("logo", logo);
  return form;
};
const multipart = { headers: { "Content-Type": "multipart/form-data" } }; // axios añade el boundary

// Crea el local y sube el logo en la misma petición
export const createStore = async (payload: StoreCreatePayload, logo?: File | null): Promise<StoreDetail> => {
  const { data } = await api.post<StoreDetail>(BASE, buildForm(payload, logo), multipart);
  return data;
};

// Actualiza el local; si viene logo, el backend elimina el anterior y sube el nuevo
export const updateStore = async (id: string, payload: StoreUpdatePayload, logo?: File | null): Promise<StoreDetail> => {
  const { data } = await api.put<StoreDetail>(`${BASE}/${id}`, buildForm(payload, logo), multipart);
  return data;
};

// { "status": "SUSPENDED" }
export const setStoreStatus = async (id: string, status: StoreStatus): Promise<StoreDetail> => {
  const { data } = await api.patch<StoreDetail>(`${BASE}/${id}/status`, { status });
  return data;
};

// Cerrar (no borra historial): DELETE /{id}
export const closeStore = async (id: string): Promise<void> => {
  await api.delete(`${BASE}/${id}`);
};

// Reabrir una sucursal cerrada: POST /{id}/reopen
export const reopenStore = async (id: string): Promise<StoreDetail> => {
  const { data } = await api.post<StoreDetail>(`${BASE}/${id}/reopen`);
  return data;
};

// Eliminar DEFINITIVAMENTE (solo cerradas y sin historial): DELETE /{id}/permanent
export const deleteStore = async (id: string): Promise<void> => {
  await api.delete(`${BASE}/${id}/permanent`);
};

// ---------- dueño y administradores ----------

export const changeStoreOwner = async (id: string, userId: string): Promise<StoreDetail> => {
  const { data } = await api.put<StoreDetail>(`${BASE}/${id}/owner`, { userId });
  return data;
};

export const addStoreAdmin = async (id: string, userId: string): Promise<StoreDetail> => {
  const { data } = await api.post<StoreDetail>(`${BASE}/${id}/admins`, { userId });
  return data;
};

// Desvincular a un admin o empleado de la sucursal
export const removeStoreMember = async (id: string, userId: string): Promise<StoreDetail> => {
  const { data } = await api.delete<StoreDetail>(`${BASE}/${id}/members/${userId}`);
  return data;
};
