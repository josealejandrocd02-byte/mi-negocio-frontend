import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ConfirmDialog from "./ConfirmDialog";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe("ConfirmDialog", () => {
  it("ignora una segunda confirmación mientras la primera está pendiente", async () => {
    const pending = deferred();
    const onConfirm = vi.fn().mockReturnValue(pending.promise);
    const onClose = vi.fn();

    render(
      <ConfirmDialog
        title="Ocultar producto"
        message="Dejará de mostrarse."
        confirmLabel="Ocultar"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    const confirm = screen.getByRole("button", { name: "Ocultar" });
    fireEvent.click(confirm);
    fireEvent.click(confirm);

    expect(onConfirm).toHaveBeenCalledTimes(1);

    await act(async () => {
      pending.resolve();
    });
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it("muestra el error y no cierra si la confirmación falla", async () => {
    const onConfirm = vi.fn().mockRejectedValue({ message: "No se pudo actualizar" });
    const onClose = vi.fn();

    render(
      <ConfirmDialog
        title="Ocultar producto"
        message="Dejará de mostrarse."
        confirmLabel="Ocultar"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Ocultar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("No se pudo actualizar");
    expect(onClose).not.toHaveBeenCalled();
  });
});
