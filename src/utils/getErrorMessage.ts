// Extrae un mensaje legible de un error de axios / Spring
export function getErrorMessage(error: unknown, fallback = "Ocurrió un error inesperado"): string {
  const e = error as {
    response?: { data?: { message?: string; error?: string; detail?: string } };
    message?: string;
  };
  return e?.response?.data?.message ?? e?.response?.data?.detail ?? e?.response?.data?.error ?? e?.message ?? fallback;
}
