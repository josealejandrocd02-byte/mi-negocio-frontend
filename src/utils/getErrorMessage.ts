// Extrae un mensaje legible de un error de axios / Spring
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

// Lee un campo de texto del body de respuesta sin asumir su forma
const readBodyField = (data: unknown, key: string): string | undefined => {
  if (typeof data !== "object" || data === null) return undefined;
  const value = (data as Record<string, unknown>)[key];
  return isNonEmptyString(value) ? value.trim() : undefined;
};

export function getErrorMessage(error: unknown, fallback = "Ocurrió un error inesperado"): string {
  if (isNonEmptyString(error)) return error.trim();

  if (typeof error === "object" && error !== null) {
    const response = (error as Record<string, unknown>).response;
    if (typeof response === "object" && response !== null) {
      const data = (response as Record<string, unknown>).data;
      // Spring suele responder { message } | { detail } | { error }
      for (const key of ["message", "detail", "error"]) {
        const message = readBodyField(data, key);
        if (message) return message;
      }
    }

    const message = (error as Record<string, unknown>).message;
    if (isNonEmptyString(message)) return message.trim();
  }

  return fallback;
}
