// src/utils/extractApiError.ts
import axios from "axios";

export const extractApiError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string; errors?: Record<string, string> }
      | undefined;
    if (data?.errors) {
      const first = Object.values(data.errors)[0];
      if (first) return first;
    }
    if (data?.message) return data.message;
    if (err.response?.status === 403)
      return "No tienes permisos para realizar esta acción en la sucursal.";
    if (err.response?.status === 404)
      return "Recurso no encontrado en esta sucursal.";
  }
  return "Ocurrió un error al procesar la solicitud.";
};