export type PlatformRole = "SUPER_ADMIN" | "USER";
export type StoreRole = "STORE_ADMIN" | "EMPLOYEE";

// Elemento de UserResponse.stores (UserStoreResponse)
export interface AdminUserStore {
  storeId: string;
  storeName: string;
  role: StoreRole;
  active: boolean;
}

// GET /api/admin/users, GET /api/admin/users/{id}, y respuesta de las mutaciones
export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  platformRole: PlatformRole;
  active: boolean;
  createdAt: string; // ISO (Instant)
  stores: AdminUserStore[];
}

export interface StoreAssignmentPayload {
  storeId: string;
  role: StoreRole;
}

export interface UserCreatePayload {
  fullName: string;
  email: string;
  password: string;
  stores?: StoreAssignmentPayload[];
}

export interface UserUpdatePayload {
  fullName: string;
  email: string;
}

export interface PasswordResetPayload {
  newPassword: string;
}

export type UserStatusFilter = "ALL" | "ACTIVE" | "BLOCKED";

// Opciones de sucursal para el selector de asignación
export interface StoreOption {
  id: string;
  name: string;
}
