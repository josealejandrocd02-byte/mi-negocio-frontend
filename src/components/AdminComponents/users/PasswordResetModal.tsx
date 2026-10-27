import { useState, type FormEvent } from "react";
import type { AdminUser, PasswordResetPayload } from "@/services/AdminServices/Types/adminUser";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary, inputClass } from "./Modal";

interface Props {
  user: AdminUser;
  onClose: () => void;
  onSubmit: (id: string, p: PasswordResetPayload) => Promise<void>;
}

export default function PasswordResetModal({ user, onClose, onSubmit }: Props) {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (pwd.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    if (pwd !== confirm) return setError("Las contraseñas no coinciden");
    setSaving(true);
    try {
      await onSubmit(user.id, { newPassword: pwd });
      setDone(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Restablecer contraseña"
      description={`Define una nueva contraseña para ${user.fullName}.`}
      onClose={onClose}
      footer={
        done ? (
          <button className={btnPrimary} onClick={onClose}>Listo</button>
        ) : (
          <>
            <button type="button" className={btnGhost} onClick={onClose}>Cancelar</button>
            <button type="submit" form="pwd-form" className={btnPrimary} disabled={saving}>
              {saving ? "Guardando…" : "Cambiar contraseña"}
            </button>
          </>
        )
      }
    >
      {done ? (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Contraseña actualizada.</p>
      ) : (
        <form id="pwd-form" onSubmit={submit} className="space-y-4">
          <input className={inputClass} type="password" placeholder="Nueva contraseña" value={pwd}
            minLength={8} maxLength={100} required onChange={(e) => setPwd(e.target.value)} />
          <input className={inputClass} type="password" placeholder="Repite la contraseña" value={confirm}
            required onChange={(e) => setConfirm(e.target.value)} />
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        </form>
      )}
    </Modal>
  );
}
