// src/hooks/useUserSession.ts
import { useQuery } from "@tanstack/react-query";
import { getMe, MeResponse, MeStore } from "@/services/AuthServices/authService"; 
import { getUser, StoredUser } from "@/utils/storage"; // Asegúrate de exportar StoredUser

// 1. Función auxiliar para convertir StoredUser a MeResponse de forma segura
const mapStoredUserToMeResponse = (stored: StoredUser | null): MeResponse | undefined => {
  if (!stored) return undefined;

  // Forzamos el tipo de platformRole para que coincida con la interfaz estricta
  const platformRole = (stored.platformRole === "SUPER_ADMIN" ? "SUPER_ADMIN" : "USER") as "SUPER_ADMIN" | "USER";

  return {
    id: stored.userId,
    fullName: stored.fullName,
    email: stored.email,
    platformRole,
    active: true, // Asumimos activo si está en localStorage
    createdAt: new Date().toISOString(), // Valor por defecto
    stores: [], // No tenemos tiendas en el storage local, se cargarán del backend
  };
};

export const useUserSession = () => {
  const stored = getUser(); // Datos cacheados localmente

  // 2. Obtenemos el placeholder tipado correctamente
  const placeholderData = mapStoredUserToMeResponse(stored);

  const { data: me, isLoading, isError } = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    // 3. TypeScript ahora acepta esto porque placeholderData es MeResponse | undefined
    placeholderData: placeholderData, 
  });

  // Determinamos el rol efectivo (Backend > LocalStorage)
  // Nota: me.platformRole ya es del tipo correcto gracias a la interfaz
  const platformRole = me?.platformRole ?? "USER";
  const isSuperAdmin = platformRole === "SUPER_ADMIN";
  
  // Si es USER, revisamos si tiene tiendas asignadas
  // Usamos optional chaining y aseguramos el tipo
  const storeRole = me?.stores?.[0]?.role; 
  const isStoreAdmin = storeRole === "STORE_ADMIN";
  const isEmployee = storeRole === "EMPLOYEE";

  // Datos para mostrar en UI
  const fullName = me?.fullName ?? stored?.fullName ?? "Usuario";
  
  const initials = fullName
    .split(" ")
    .filter(Boolean) // Evita errores si hay espacios dobles
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return {
    user: me,
    isLoading,
    isError,
    platformRole,
    isSuperAdmin,
    isStoreAdmin,
    isEmployee,
    fullName,
    initials,
    // Exponemos las tiendas para el Header
    stores: me?.stores ?? [],
  };
};