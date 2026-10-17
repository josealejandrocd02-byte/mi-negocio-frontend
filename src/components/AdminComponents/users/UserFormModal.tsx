import { useState, type FormEvent } from "react";
import type { AdminUser, UserCreatePayload, UserUpdatePayload } from "@/services/AdminServices/Types/adminUser";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary, inputClass } from "./Modal";

interface Props {
  user?: AdminUser | null; // si viene => edición; si no => creación
  onClose: () => void;
  onCreate: (p: UserCreatePayload) => Promise<unknown>;
  onUpdate: (id: string, p: UserUpdatePayload) => Promise<unknown>;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
    {children}
  </label>
);

export default function UserFormModal({ user, onClose, onCreate, onUpdate }: Props) {
  const isEdit = !!user;
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isEdit && password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    setSaving(true);
    try {
      if (isEdit) await onUpdate(user!.id, { fullName: fullName.trim(), email: email.trim() });
      else await onCreate({ fullName: fullName.trim(), email: email.trim(), password });
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Editar usuario" : "Nuevo usuario"}
      description={isEdit ? "Actualiza el nombre y el correo." : "Crea el acceso; luego podrás ligarlo a sucursales."}
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnGhost} onClick={onClose}>Cancelar</button>
          <button type="submit" form="user-form" className={btnPrimary} disabled={saving}>
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear usuario"}
          </button>
        </>
      }
    >
      <form id="user-form" onSubmit={submit} className="space-y-4">
        <Field label="Nombre completo">
          <input className={inputClass} value={fullName} maxLength={150} required
            onChange={(e) => setFullName(e.target.value)} placeholder="Martín Salazar" />
        </Field>
        <Field label="Correo electrónico">
          <input className={inputClass} type="email" value={email} maxLength={255} required
            onChange={(e) => setEmail(e.target.value)} placeholder="martin@cafecentral.bo" />
        </Field>
        {!isEdit && (
          <Field label="Contraseña">
            <input className={inputClass} type="password" value={password} minLength={8} maxLength={100} required
              onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" />
          </Field>
        )}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </form>
    </Modal>
  );
}
