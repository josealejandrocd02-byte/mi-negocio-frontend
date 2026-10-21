import { useState, type FormEvent, type ReactNode } from "react";
import type { Store, StoreCreatePayload, StoreDetail, StoreUpdatePayload } from "@/services/AdminServices/Types/adminStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";
import UserSelect from "./UserSelect";
import LogoUploader from "./LogoUploader";

interface Props {
  store?: Store | null; // con valor => edición
  onClose: () => void;
  onCreate: (p: StoreCreatePayload, logo?: File | null) => Promise<StoreDetail>;
  onUpdate: (id: string, p: StoreUpdatePayload, logo?: File | null) => Promise<StoreDetail>;
}

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
    {children}
  </label>
);

export default function StoreFormModal({ store, onClose, onCreate, onUpdate }: Props) {
  const isEdit = !!store;
  const [name, setName] = useState(store?.name ?? "");
  const [address, setAddress] = useState(store?.address ?? "");
  const [phone, setPhone] = useState(store?.phone ?? "");
  const [ownerId, setOwnerId] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isEdit && !ownerId) return setError("Selecciona el dueño del local");
    setSaving(true);

    const base = {
      name: name.trim(),
      address: address.trim() || undefined,
      phone: phone.trim() || undefined,
    };

    try {
      if (isEdit) {
        // Con archivo nuevo el backend reemplaza el logo; con "Quitar" y sin archivo, lo elimina
        await onUpdate(store!.id, { ...base, removeLogo: removeLogo && !logoFile }, logoFile);
      } else {
        await onCreate({ ...base, ownerUserId: ownerId }, logoFile);
      }
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Editar local" : "Nuevo local"}
      description={isEdit ? "Actualiza los datos del local." : "El dueño quedará vinculado como administrador del local."}
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnGhost} onClick={onClose}>Cancelar</button>
          <button type="submit" form="store-form" className={btnPrimary} disabled={saving}>
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear local"}
          </button>
        </>
      }
    >
      <form id="store-form" onSubmit={submit} className="space-y-4">
        <LogoUploader
          currentUrl={store?.logoUrl}
          file={logoFile}
          removed={removeLogo}
          onFileChange={setLogoFile}
          onRemovedChange={setRemoveLogo}
          disabled={saving}
        />
        <Field label="Nombre del local">
          <input className={inputClass} value={name} required maxLength={150}
            onChange={(e) => setName(e.target.value)} placeholder="Café Central" />
        </Field>
        <Field label="Dirección (opcional)">
          <input className={inputClass} value={address}
            onChange={(e) => setAddress(e.target.value)} placeholder="Av. 16 de Julio 145, La Paz" />
        </Field>
        <Field label="Teléfono (opcional)">
          <input className={inputClass} value={phone} maxLength={30}
            onChange={(e) => setPhone(e.target.value)} />
        </Field>
        {!isEdit && (
          <Field label="Dueño del local">
            <UserSelect value={ownerId} onChange={setOwnerId} />
          </Field>
        )}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </form>
    </Modal>
  );
}
