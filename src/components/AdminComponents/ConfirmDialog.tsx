import { useState } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnDanger, btnGhost, btnPrimary } from "./users/Modal";

interface Props {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<unknown>;
}

export default function ConfirmDialog({ title, message, confirmLabel, danger, onClose, onConfirm }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setError(getErrorMessage(e));
      setBusy(false);
    }
  };

  return (
    <Modal
      size="sm"
      title={title}
      onClose={onClose}
      footer={
        <>
          <button className={btnGhost} onClick={onClose}>Cancelar</button>
          <button className={danger ? btnDanger : btnPrimary} onClick={run} disabled={busy}>
            {busy ? "Procesando…" : confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-slate-600">{message}</p>
      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
    </Modal>
  );
}
