import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Product } from "@/services/StoreAdminServices/Types/catalog";
import ProductFormModal from "./ProductFormModal";

const newProduct: Product = {
  id: "p1",
  name: "Café",
  categoryId: null,
  categoryName: null,
  price: 12.5,
  active: true,
  imageUrl: null,
  createdAt: "2026-01-01T00:00:00Z",
};

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

function renderModal(
  onCreate = vi.fn().mockResolvedValue(newProduct),
  product: Product | null = null,
  onUpdate = vi.fn().mockResolvedValue(newProduct),
) {
  const onClose = vi.fn();
  const utils = render(
    <ProductFormModal
      product={product}
      categories={[]}
      onClose={onClose}
      onCreate={onCreate}
      onUpdate={onUpdate}
    />,
  );
  const form = utils.container.querySelector("form#product-form") as HTMLFormElement;
  return { ...utils, form, onClose, onCreate, onUpdate };
}

describe("ProductFormModal", () => {
  it("exige nombre y precio válidos", async () => {
    const { form, onCreate } = renderModal();

    fireEvent.submit(form);
    expect(await screen.findByRole("alert")).toHaveTextContent("Escribe el nombre del producto");

    fireEvent.change(screen.getByPlaceholderText("Café americano"), {
      target: { value: "Café" },
    });
    fireEvent.change(screen.getByPlaceholderText("0.00"), { target: { value: "0" } });
    fireEvent.submit(form);

    expect(await screen.findByRole("alert")).toHaveTextContent("El precio debe ser mayor a cero");
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("rechaza archivos que no son imagen", async () => {
    const { container } = renderModal();
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(fileInput, {
      target: { files: [new File(["texto"], "nota.txt", { type: "text/plain" })] },
    });

    expect(await screen.findByRole("alert")).toHaveTextContent("Selecciona un archivo de imagen válido");
  });

  it("delega el borrado de foto a onUpdate en edición", async () => {
    const existing: Product = { ...newProduct, imageUrl: "https://example.com/foto.jpg" };
    const onUpdate = vi.fn().mockResolvedValue({ ...existing, imageUrl: null });
    const { form } = renderModal(vi.fn().mockResolvedValue(newProduct), existing, onUpdate);

    fireEvent.click(screen.getByLabelText("Quitar la foto actual"));
    fireEvent.submit(form);

    await waitFor(() =>
      expect(onUpdate).toHaveBeenCalledWith(
        "p1",
        { name: "Café", categoryId: null, price: 12.5 },
        null,
        true,
      ),
    );
  });

  it("ignora un segundo submit mientras el primero está pendiente", async () => {
    const pending = deferred<Product>();
    const onCreate = vi.fn().mockReturnValue(pending.promise);
    const { form, onClose } = renderModal(onCreate);

    fireEvent.change(screen.getByPlaceholderText("Café americano"), {
      target: { value: "Café" },
    });
    fireEvent.change(screen.getByPlaceholderText("0.00"), { target: { value: "12.5" } });
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(onCreate).toHaveBeenCalledTimes(1);

    await act(async () => {
      pending.resolve(newProduct);
    });
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });
});
