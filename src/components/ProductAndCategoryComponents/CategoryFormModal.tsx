import { useRef, useState, type FormEvent } from "react";
import { CircleAlert, Tags } from "lucide-react";
import type {
  Category,
  CategoryCreatePayload,
  CategoryUpdatePayload,
} from "@/services/ProductCategoryServices/Types/catalog";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";

interface Props {
  category?: Category | null; // con valor => edición
  onClose: () => void;
  onCreate: (p: CategoryCreatePayload) => Promise<Category>;
  onUpdate: (id: string, p: CategoryUpdatePayload) => Promise<Category>;
}

export default function CategoryFormModal({ category, onClose, onCreate, onUpdate }: Props) {
  const isEdit = !!category;
  const [name, setName] = useState(category?.name ?? "");
  const [active, setActive] = useState(category?.active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Ref para bloquear dobles submits antes de que React re-renderice.
  const savingRef = useRef(false);

  // Evita cerrar el modal (Escape, backdrop o Cancelar) mientras hay una operación en curso.
  const safeClose = () => {
    if (!savingRef.current) onClose();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (savingRef.current) return;
    setError(null);

    const trimmed = name.trim();
    // La validación no depende solo del botón: cubre Enter y submits programáticos.
    if (!trimmed) {
      setError("Escribe el nombre de la categoría");
      return;
    }

    savingRef.current = true;
    setSaving(true);
    try {
      if (isEdit) {
        await onUpdate(category!.id, { name: trimmed });
      } else {
        await onCreate({ name: trimmed, active });
      }
      onClose();
    } catch (err) {
      savingRef.current = false;
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Editar categoría" : "Nueva categoría"}
      description={isEdit ? "Actualiza el nombre de la categoría." : "Agrupa los productos de este local."}
      onClose={safeClose}
      footer={
        <>
          <button
            type="button"
            className={`${btnGhost} disabled:cursor-not-allowed`}
            onClick={safeClose}
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="category-form"
            className={`${btnPrimary} disabled:cursor-not-allowed`}
            disabled={saving || !name.trim()}
          >
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear categoría"}
          </button>
        </>
      }
    >
      <form
        id="category-form"
        onSubmit={submit}
        aria-busy={saving}
        className="-mx-0.5 max-h-[calc(100dvh_-_16rem)] space-y-4 overflow-y-auto overscroll-contain px-0.5 py-0.5"
      >
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
            <Tags size={18} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-700">Datos de la categoría</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Se usará para agrupar los productos del catálogo.
            </p>
          </div>
        </div>

        <div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Nombre</span>
            <input
              className={inputClass}
              value={name}
              required
              maxLength={100}
              autoFocus
              disabled={saving}
              aria-describedby="category-name-help"
              placeholder="Bebidas"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p id="category-name-help" className="mt-1.5 text-xs text-slate-500">
            Máximo 100 caracteres.
          </p>
        </div>

        {!isEdit && (
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-sm text-slate-700 transition-colors hover:bg-slate-50">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              checked={active}
              disabled={saving}
              onChange={(e) => setActive(e.target.checked)}
            />
            <span>Activa (visible para los empleados)</span>
          </label>
        )}

        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span className="min-w-0">{error}</span>
          </div>
        )}
      </form>
    </Modal>
  );
}
