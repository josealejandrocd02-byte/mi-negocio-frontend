import { useState, type FormEvent } from "react";
import { TriangleAlert } from "lucide-react";
import type { Store } from "@/services/AdminServices/Types/adminStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnDanger, btnGhost, inputClass } from "@/components/AdminComponents/users/Modal";

interface Props {
  store: Store;
  onClose: () => void;
  onConfirm: () => Promise<unknown>;
}

/** Eliminación definitiva: hay que escribir el nombre del local para confirmar. */
export default function DeleteStoreModal({ store, onClose, onConfirm }: Props) {
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const matches = typed.trim().toLowerCase() === store.name.trim().toLowerCase();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!matches) return;
    setBusy(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
      setBusy(false);
    }
  };

  return (
    <Modal
      title="Eliminar local definitivamente"
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnGhost} onClick={onClose}>Cancelar</button>
          <button type="submit" form="delete-store-form" className={btnDanger} disabled={!matches || busy}>
            {busy ? "Eliminando…" : "Eliminar definitivamente"}
          </button>
        </>
      }
    >
      <form id="delete-store-form" onSubmit={submit} className="space-y-4">
        <div className="flex gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" />
          <p>
            Se eliminará <strong>{store.name}</strong>, sus vínculos de equipo y su logo. Esta acción no se puede
            deshacer. Si el local tiene historial (ventas, pedidos), no se podrá eliminar y seguirá cerrado.
          </p>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Escribe <span className="font-bold">{store.name}</span> para confirmar
          </span>
          <input className={inputClass} value={typed} onChange={(e) => setTyped(e.target.value)}
            autoFocus placeholder={store.name} />
        </label>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </form>
    </Modal>
  );
}
