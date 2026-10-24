// =========================
// CLAVES DE localStorage
// =========================
// Prefijo "mn_" para no chocar con otros proyectos que corran en el mismo localhost
const KEYS = {
  token: "mn_token",
  role: "mn_role",
  user: "mn_user",
} as const;

// =========================
// TIPOS
// =========================
export interface StoredUser {
  userId: string;
  email: string;
  fullName: string;
  platformRole: string; // Aquí es string, pero lo normalizamos en el hook
}
// =========================
// TOKEN
// =========================
export const saveToken = (token: string) => {
  localStorage.setItem(KEYS.token, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(KEYS.token);
};

export const removeToken = () => {
  localStorage.removeItem(KEYS.token);
};

// =========================
// ROL DE PLATAFORMA
// =========================
export const saveRole = (role: string) => {
  localStorage.setItem(KEYS.role, role);
};

export const getRole = (): string | null => {
  return localStorage.getItem(KEYS.role);
};

export const removeRole = () => {
  localStorage.removeItem(KEYS.role);
};

// =========================
// USUARIO (reemplaza a username)
// =========================
export const saveUser = (user: StoredUser) => {
  localStorage.setItem(KEYS.user, JSON.stringify(user));
};

export const getUser = (): StoredUser | null => {
  try {
    const raw = localStorage.getItem(KEYS.user);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(KEYS.user);
};

// =========================
// SESIÓN
// =========================
export const clearSession = () => {
  removeToken();
  removeRole();
  removeUser();
};

// =========================
// ROLES
// =========================

// Rol de PLATAFORMA: viaja en el token (users.platform_role)
export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  USER: "USER",
} as const;

// Rol dentro de una SUCURSAL: NO viaja en el token, llega en GET /api/me (stores[].role)
export const STORE_ROLES = {
  STORE_ADMIN: "STORE_ADMIN",
  EMPLOYEE: "EMPLOYEE",
} as const;

export type PlatformRole = (typeof ROLES)[keyof typeof ROLES];
export type StoreRole = (typeof STORE_ROLES)[keyof typeof STORE_ROLES];

// Normaliza por si algún día el backend manda "ROLE_SUPER_ADMIN" o minúsculas
const normalizeRole = (role: string | null): string | null =>
  role ? role.replace(/^ROLE_/i, "").toUpperCase() : null;

/** ✅ ¿El usuario actual es el dueño del SaaS? */
export const isSuperAdmin = (): boolean => {
  return normalizeRole(getRole()) === ROLES.SUPER_ADMIN;
};

/** ✅ ¿El rol de plataforma del usuario está entre los indicados? */
export const hasRole = (...roles: string[]): boolean => {
  const role = normalizeRole(getRole());
  return role !== null && roles.includes(role);
};
