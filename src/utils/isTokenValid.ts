import { jwtDecode } from "jwt-decode";
import { clearSession, getToken } from "./storage";

// Contenido (claims) del JWT que genera el backend de Mi Negocio
export interface JwtPayload {
  sub: string;    // email del usuario
  role: string;   // SUPER_ADMIN | USER
  userId: string;
  iat: number;
  exp: number;    // segundos desde epoch
}

// Decodifica el token. No verifica la firma: eso lo hace el backend en cada petición.
export const getTokenPayload = (token: string | null = getToken()): JwtPayload | null => {
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  const payload = getTokenPayload(token);
  if (!payload) return false;

  const now = Date.now() / 1000;
  return payload.exp > now;
};

// Fecha en que vence la sesión (para mostrarla en pantalla)
export const getTokenExpiration = (): Date | null => {
  const payload = getTokenPayload();
  return payload?.exp ? new Date(payload.exp * 1000) : null;
};

export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (!token || !isTokenValid(token)) {
    clearSession(); // token, rol y usuario
    return false;
  }

  return true;
};
