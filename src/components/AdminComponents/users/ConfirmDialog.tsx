import { useRef, useState } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnDanger, btnGhost, btnPrimary } from "./Modal";

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
  const busyRef = useRef(false);

  const run = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      busyRef.current = false;
      setError(getErrorMessage(e));
      setBusy(false);
    }
  };

  const safeClose = () => {
    if (!busyRef.current) onClose();
  };

  return (
    <Modal
      size="sm"
      title={title}
      onClose={safeClose}
      footer={
        <>
          <button className={btnGhost} onClick={safeClose} disabled={busy}>Cancelar</button>
          <button className={danger ? btnDanger : btnPrimary} onClick={run} disabled={busy}>
            {busy ? "Procesando…" : confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-slate-600">{message}</p>
      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
    </Modal>
  );
}
