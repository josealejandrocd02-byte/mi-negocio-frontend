import api from "@/api/client";

// Respuesta de POST /api/auth/login
export interface LoginResponse {
  token: string;
  tokenType: string; // "Bearer"
  userId: string;
  email: string;
  fullName: string;
  platformRole: "SUPER_ADMIN" | "USER";
}

export interface MeStore {
  storeId: string;
  storeName: string;
  role: "STORE_ADMIN" | "EMPLOYEE" | string;
  active: boolean;
}

// Respuesta de GET /api/me
export interface MeResponse {
  id: string;
  fullName: string;
  email: string;
  platformRole: "SUPER_ADMIN" | "USER";
  active: boolean;
  createdAt: string;
  stores: MeStore[];
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  return response.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>("/me");
  return response.data;
};
