import { useState, type FormEvent, type ReactNode } from "react";
import type { EmployeeCreatePayload, StoreRef } from "@/services/StoreAdminServices/Types/storeEmployee";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";

interface Props {
  stores: StoreRef[]; // sucursales que administras
  defaultStoreId?: string;
  onClose: () => void;
  onCreate: (storeId: string, p: EmployeeCreatePayload) => Promise<unknown>;
}

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
    {children}
  </label>
);

export default function EmployeeCreateModal({ stores, defaultStoreId, onClose, onCreate }: Props) {
  const [storeId, setStoreId] = useState(defaultStoreId ?? "");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!storeId) return setError("Selecciona la sucursal del empleado");
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    setSaving(true);
    try {
      await onCreate(storeId, { fullName: fullName.trim(), email: email.trim(), password });
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Nuevo empleado"
      description="Se crea la cuenta y queda vinculado a la sucursal elegida con rol Empleado."
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnGhost} onClick={onClose}>Cancelar</button>
          <button type="submit" form="employee-create-form" className={btnPrimary} disabled={saving}>
            {saving ? "Guardando…" : "Crear empleado"}
          </button>
        </>
      }
    >
      <form id="employee-create-form" onSubmit={submit} className="space-y-4">
        <Field label="Sucursal">
          <select className={inputClass} value={storeId} onChange={(e) => setStoreId(e.target.value)} required>
            <option value="">Selecciona una sucursal</option>
            {stores.map((s) => (
              <option key={s.storeId} value={s.storeId}>{s.storeName}</option>
            ))}
          </select>
        </Field>
        <Field label="Nombre completo">
          <input className={inputClass} value={fullName} maxLength={150} required
            onChange={(e) => setFullName(e.target.value)} placeholder="Camila Mendoza" />
        </Field>
        <Field label="Correo electrónico">
          <input className={inputClass} type="email" value={email} maxLength={255} required
            onChange={(e) => setEmail(e.target.value)} placeholder="camila@cafecentral.bo" />
        </Field>
        <Field label="Contraseña">
          <input className={inputClass} type="password" value={password} minLength={8} maxLength={100} required
            onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" />
        </Field>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </form>
    </Modal>
  );
}
