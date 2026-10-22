import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./getErrorMessage";

describe("getErrorMessage", () => {
  it("devuelve un string no vacío tal cual", () => {
    expect(getErrorMessage("  boom  ")).toBe("boom");
  });

  it("prioriza response.data.message y recorta espacios", () => {
    const error = { response: { data: { message: "  Nombre duplicado  " } } };
    expect(getErrorMessage(error)).toBe("Nombre duplicado");
  });

  it("usa response.data.detail y response.data.error como alternativas", () => {
    expect(getErrorMessage({ response: { data: { detail: "Detalle" } } })).toBe("Detalle");
    expect(getErrorMessage({ response: { data: { error: "Error de servidor" } } })).toBe("Error de servidor");
  });

  it("ignora mensajes vacíos y cae a error.message", () => {
    const error = { response: { data: { message: "   " } }, message: "Fallback del Error" };
    expect(getErrorMessage(error)).toBe("Fallback del Error");
  });

  it("devuelve el fallback cuando no hay mensaje utilizable", () => {
    expect(getErrorMessage({}, "Mensaje por defecto")).toBe("Mensaje por defecto");
    expect(getErrorMessage(null, "Mensaje por defecto")).toBe("Mensaje por defecto");
    expect(getErrorMessage("", "Mensaje por defecto")).toBe("Mensaje por defecto");
  });
});
