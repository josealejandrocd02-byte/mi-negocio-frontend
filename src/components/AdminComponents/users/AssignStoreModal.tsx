import { useState, type FormEvent } from "react";
import type { AdminUser, StoreAssignmentPayload, StoreOption, StoreRole } from "@/services/AdminServices/Types/adminUser";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary, inputClass } from "./Modal";

interface Props {
  user: AdminUser;
  storeOptions: StoreOption[]; // si viene vacío se pide el UUID manualmente
  onClose: () => void;
  onSubmit: (id: string, p: StoreAssignmentPayload) => Promise<unknown>;
}

export default function AssignStoreModal({ user, storeOptions, onClose, onSubmit }: Props) {
  const [storeId, setStoreId] = useState(storeOptions[0]?.id ?? "");
  const [role, setRole] = useState<StoreRole>("EMPLOYEE");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!storeId.trim()) return setError("Selecciona una sucursal");
    setSaving(true);
    setError(null);
    try {
      await onSubmit(user.id, { storeId: storeId.trim(), role });
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Ligar a una sucursal"
      description={`Si ${user.fullName} ya pertenece a la sucursal, se cambia su rol.`}
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnGhost} onClick={onClose}>Cancelar</button>
          <button type="submit" form="assign-form" className={btnPrimary} disabled={saving}>
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </>
      }
    >
      <form id="assign-form" onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Sucursal</span>
          {storeOptions.length > 0 ? (
            <select className={inputClass} value={storeId} onChange={(e) => setStoreId(e.target.value)}>
              {storeOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          ) : (
            <input className={inputClass} value={storeId} onChange={(e) => setStoreId(e.target.value)}
              placeholder="ID (UUID) de la sucursal" />
          )}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Rol en la sucursal</span>
          <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value as StoreRole)}>
            <option value="STORE_ADMIN">Administrador</option>
            <option value="EMPLOYEE">Empleado</option>
          </select>
        </label>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </form>
    </Modal>
  );
}
