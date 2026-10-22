import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Category } from "@/services/StoreAdminServices/Types/catalog";
import * as categoryService from "@/services/StoreAdminServices/categoryService";
import { useCategories } from "./useCategories";

vi.mock("@/services/StoreAdminServices/categoryService", () => ({
  listCategories: vi.fn(),
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
  setCategoryActive: vi.fn(),
}));

const category = (overrides: Partial<Category> = {}): Category => ({
  id: "c1",
  name: "Bebidas",
  active: true,
  ...overrides,
});

describe("useCategories", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("ordena las categorías también en la carga inicial", async () => {
    vi.mocked(categoryService.listCategories).mockResolvedValue([
      category({ id: "c2", name: "Postres" }),
      category({ id: "c1", name: "Bebidas" }),
    ]);

    const { result } = renderHook(() => useCategories("s1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories.map((c) => c.name)).toEqual(["Bebidas", "Postres"]);
  });

  it("no llama al servicio cuando no hay local", async () => {
    const { result } = renderHook(() => useCategories(undefined));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(categoryService.listCategories).not.toHaveBeenCalled();
    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("expone el error de carga", async () => {
    vi.mocked(categoryService.listCategories).mockRejectedValue(new Error("boom"));

    const { result } = renderHook(() => useCategories("s1"));

    await waitFor(() => expect(result.current.error).toBe("boom"));
    expect(result.current.loading).toBe(false);
  });
});
