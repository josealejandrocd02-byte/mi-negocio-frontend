import type { StoreRole } from "./adminUser";

export type StoreStatus = "ACTIVE" | "SUSPENDED" | "CLOSED";

// GET /api/admin/stores
export interface Store {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  logoUrl: string | null; // URL de Cloudinary (la gestiona el backend)
  status: StoreStatus;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  createdAt: string; // ISO (Instant)
  memberCount?: number; // (?) el DTO actual no lo trae
}

// StoreMemberResponse
export interface StoreMember {
  userId: string;
  fullName: string;
  email: string;
  role: StoreRole; // STORE_ADMIN | EMPLOYEE
  userActive: boolean; // cuenta bloqueada o no en todo el sistema
  active: boolean; // acceso a ESTA sucursal
  joinedAt: string; // ISO (Instant)
  owner?: boolean; // (no lo envía el backend; el dueño se detecta con store.ownerId)
}

// GET /api/admin/stores/{id} y respuesta de las mutaciones
export interface StoreDetail {
  store: Store;
  members: StoreMember[];
}

// StoreCreateRequest — viaja en la parte "data" del multipart; el archivo va en la parte "logo"
export interface StoreCreatePayload {
  name: string;
  address?: string;
  phone?: string;
  ownerUserId: string;
}

// StoreUpdateRequest
export interface StoreUpdatePayload {
  name: string;
  address?: string;
  phone?: string;
  removeLogo?: boolean; // true => borra el logo actual (si no se envía uno nuevo)
}

export type StoreStatusFilter = "ALL" | StoreStatus;
