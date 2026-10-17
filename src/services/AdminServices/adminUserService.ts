import api from "@/api/client";
import type {
  AdminUser,
  PasswordResetPayload,
  StoreAssignmentPayload,
  UserCreatePayload,
  UserUpdatePayload,
} from "./Types/adminUser";

const BASE = "/admin/users";

export const listUsers = async (): Promise<AdminUser[]> => {
  const { data } = await api.get<AdminUser[]>(BASE);
  return data;
};

export const getUser = async (id: string): Promise<AdminUser> => {
  const { data } = await api.get<AdminUser>(`${BASE}/${id}`);
  return data;
};

export const createUser = async (payload: UserCreatePayload): Promise<AdminUser> => {
  const { data } = await api.post<AdminUser>(BASE, payload);
  return data;
};

export const updateUser = async (id: string, payload: UserUpdatePayload): Promise<AdminUser> => {
  const { data } = await api.put<AdminUser>(`${BASE}/${id}`, payload);
  return data;
};

export const resetUserPassword = async (id: string, payload: PasswordResetPayload): Promise<void> => {
  await api.patch(`${BASE}/${id}/password`, payload);
};

// Bloquear / desbloquear el acceso al sistema
export const setUserActive = async (id: string, active: boolean): Promise<AdminUser> => {
  const { data } = await api.patch<AdminUser>(`${BASE}/${id}/active`, { active });
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`${BASE}/${id}`);
};

// Ligar a una sucursal (o cambiar su rol en ella)
export const assignUserStore = async (id: string, payload: StoreAssignmentPayload): Promise<AdminUser> => {
  const { data } = await api.post<AdminUser>(`${BASE}/${id}/stores`, payload);
  return data;
};

// Pendientes (ignorados por ahora):
// DELETE /{id}/stores/{storeId}          -> unassignStore
// PATCH  /{id}/stores/{storeId}/active   -> setStoreAccess
