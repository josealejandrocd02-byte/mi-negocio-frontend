// Reutiliza StoreMember (StoreMemberResponse), UserUpdatePayload y PasswordResetPayload
import type { StoreMember } from "@/services/AdminServices/Types/adminStore";
export type { StoreMember };
export type { UserUpdatePayload, PasswordResetPayload } from "@/services/AdminServices/Types/adminUser";

// EmployeeCreateRequest
export interface EmployeeCreatePayload {
  fullName: string;
  email: string;
  password: string;
}

// Empleado + la sucursal a la que pertenece (para la vista global de empleados)
export interface EmployeeWithStore extends StoreMember {
  storeId: string;
  storeName: string;
}

export interface StoreRef {
  storeId: string;
  storeName: string;
}
