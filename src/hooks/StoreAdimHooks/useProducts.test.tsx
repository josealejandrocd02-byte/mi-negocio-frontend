import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Product } from "@/services/StoreAdminServices/Types/catalog";
import * as productService from "@/services/StoreAdminServices/productService";
import { useProducts } from "./useProducts";

vi.mock("@/services/StoreAdminServices/productService", () => ({
  listProducts: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  setProductActive: vi.fn(),
  uploadProductPhoto: vi.fn(),
  deleteProductPhoto: vi.fn(),
}));

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: "p1",
  name: "Café",
  categoryId: "c1",
  categoryName: "Bebidas",
  price: 12.5,
  active: true,
  imageUrl: null,
  createdAt: "2026-01-01T00:00:00Z",
  ...overrides,
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("useProducts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("no llama al servicio y limpia el estado cuando no hay local", async () => {
    const { result } = renderHook(() => useProducts(undefined));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(productService.listProducts).not.toHaveBeenCalled();
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("carga los productos y apaga el loading", async () => {
    const product = makeProduct();
    vi.mocked(productService.listProducts).mockResolvedValue([product]);

    const { result } = renderHook(() => useProducts("s1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(productService.listProducts).toHaveBeenCalledWith("s1", undefined);
    expect(result.current.products).toEqual([product]);
    expect(result.current.error).toBeNull();
  });

  it("expone el mensaje de error y permite reintentar", async () => {
    vi.mocked(productService.listProducts)
      .mockRejectedValueOnce(new Error("sin conexión"))
      .mockResolvedValueOnce([makeProduct()]);

    const { result } = renderHook(() => useProducts("s1"));

    await waitFor(() => expect(result.current.error).toBe("sin conexión"));
    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.reload();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.products).toHaveLength(1);
  });

  it("ignora la respuesta de una petición anterior (race condition)", async () => {
    const first = deferred<Product[]>();
    const second = deferred<Product[]>();
    const oldProduct = makeProduct({ id: "old", name: "Viejo" });
    const newProduct = makeProduct({ id: "new", name: "Nuevo" });

    vi.mocked(productService.listProducts)
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);

    const { result } = renderHook(() => useProducts("s1"));
    await waitFor(() => expect(productService.listProducts).toHaveBeenCalledTimes(1));

    act(() => {
      void result.current.reload();
    });
    await waitFor(() => expect(productService.listProducts).toHaveBeenCalledTimes(2));

    await act(async () => {
      second.resolve([newProduct]);
    });
    await waitFor(() => expect(result.current.products).toEqual([newProduct]));

    await act(async () => {
      first.resolve([oldProduct]);
    });

    expect(result.current.products).toEqual([newProduct]);
  });

  it("una mutación invalida el reload en vuelo y conserva el producto creado", async () => {
    const pending = deferred<Product[]>();
    const created = makeProduct({ id: "new", name: "Nuevo" });
    vi.mocked(productService.listProducts).mockReturnValueOnce(pending.promise);
    vi.mocked(productService.createProduct).mockResolvedValueOnce(created);

    const { result } = renderHook(() => useProducts("s1"));
    await waitFor(() => expect(productService.listProducts).toHaveBeenCalledTimes(1));

    await act(async () => {
      await result.current.create({ name: "Nuevo", price: 10 });
    });

    expect(result.current.products).toEqual([created]);
    expect(result.current.loading).toBe(false);

    // La respuesta vieja del reload ya no debe pisar el producto recién creado.
    await act(async () => {
      pending.resolve([]);
    });

    expect(result.current.products).toEqual([created]);
  });

  it("rechaza mutaciones sin local en lugar de llamar con un id vacío", async () => {
    const { result } = renderHook(() => useProducts(undefined));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await expect(
      result.current.create({ name: "Producto", price: 10 }),
    ).rejects.toThrow("Selecciona un local para continuar");
    expect(productService.createProduct).not.toHaveBeenCalled();
  });
});
