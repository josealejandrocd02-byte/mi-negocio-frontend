import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Category } from "@/services/StoreAdminServices/Types/catalog";
import CategoryFormModal from "./CategoryFormModal";

const newCategory: Category = { id: "c1", name: "Bebidas", active: true };

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

function renderModal(
  onCreate = vi.fn().mockResolvedValue(newCategory),
  onUpdate = vi.fn().mockResolvedValue(newCategory),
) {
  const onClose = vi.fn();
  const utils = render(
    <CategoryFormModal onClose={onClose} onCreate={onCreate} onUpdate={onUpdate} />,
  );
  const form = utils.container.querySelector("form#category-form") as HTMLFormElement;
  return { ...utils, form, onClose, onCreate, onUpdate };
}

describe("CategoryFormModal", () => {
  it("bloquea un submit con nombre vacío aunque se dispare el formulario", async () => {
    const { form, onCreate } = renderModal();

    fireEvent.submit(form);

    expect(await screen.findByRole("alert")).toHaveTextContent("Escribe el nombre de la categoría");
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("recorta el nombre antes de enviarlo", async () => {
    const { form, onCreate } = renderModal();

    fireEvent.change(screen.getByPlaceholderText("Bebidas"), {
      target: { value: "  Bebidas  " },
    });
    fireEvent.submit(form);

    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith({ name: "Bebidas", active: true }),
    );
  });

  it("ignora un segundo submit mientras el primero está pendiente", async () => {
    const pending = deferred<Category>();
    const onCreate = vi.fn().mockReturnValue(pending.promise);
    const { form, onClose } = renderModal(onCreate);

    fireEvent.change(screen.getByPlaceholderText("Bebidas"), {
      target: { value: "Bebidas" },
    });
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(onCreate).toHaveBeenCalledTimes(1);

    await act(async () => {
      pending.resolve(newCategory);
    });
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });
});
