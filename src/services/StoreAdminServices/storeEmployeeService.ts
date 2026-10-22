import api from "@/api/client";
import type {
  EmployeeCreatePayload,
  PasswordResetPayload,
  StoreMember,
  UserUpdatePayload,
} from "./Types/storeEmployee";

// Para el STORE_ADMIN de la sucursal (el backend valida que lo sea y esté activo)
const base = (storeId: string) => `/stores/${storeId}/employees`;

export const listEmployees = async (storeId: string): Promise<StoreMember[]> => {
  const { data } = await api.get<StoreMember[]>(base(storeId));
  return data;
};

// Crea la cuenta del empleado y lo vincula a la sucursal con rol EMPLOYEE
export const createEmployee = async (storeId: string, payload: EmployeeCreatePayload): Promise<StoreMember> => {
  const { data } = await api.post<StoreMember>(base(storeId), payload);
  return data;
};

export const updateEmployee = async (
  storeId: string,
  userId: string,
  payload: UserUpdatePayload,
): Promise<StoreMember> => {
  const { data } = await api.put<StoreMember>(`${base(storeId)}/${userId}`, payload);
  return data;
};

export const resetEmployeePassword = async (
  storeId: string,
  userId: string,
  payload: PasswordResetPayload,
): Promise<void> => {
  await api.patch(`${base(storeId)}/${userId}/password`, payload);
};

// Restringir / devolver acceso a ESTA sucursal
export const setEmployeeActive = async (storeId: string, userId: string, active: boolean): Promise<StoreMember> => {
  const { data } = await api.patch<StoreMember>(`${base(storeId)}/${userId}/active`, { active });
  return data;
};

// Desvincular de la sucursal
export const removeEmployee = async (storeId: string, userId: string): Promise<void> => {
  await api.delete(`${base(storeId)}/${userId}`);
};
