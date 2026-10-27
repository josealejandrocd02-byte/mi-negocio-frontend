import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleAlert, ImagePlus } from "lucide-react";
import type {
  Category,
  Product,
  ProductCreatePayload,
  ProductUpdatePayload,
} from "@/services/ProductCategoryServices/Types/catalog";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

interface Props {
  product?: Product | null; // con valor => edición
  categories: Category[];
  onClose: () => void;
  onCreate: (p: ProductCreatePayload, file?: File | null) => Promise<Product>;
  onUpdate: (
    id: string,
    p: ProductUpdatePayload,
    file?: File | null,
    removePhoto?: boolean,
  ) => Promise<Product>;
}

export default function ProductFormModal({
  product,
  categories,
  onClose,
  onCreate,
  onUpdate,
}: Props) {
  const isEdit = !!product;
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [active, setActive] = useState(product?.active ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [preview, setPreview] = useState<string | null>(product?.imageUrl ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Ref para bloquear dobles submits antes de que React re-renderice.
  const savingRef = useRef(false);

  useEffect(() => {
    if (!file) {
      setPreview(removePhoto ? null : product?.imageUrl ?? null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, removePhoto, product?.imageUrl]);

  // Evita cerrar el modal (Escape, backdrop o Cancelar) mientras hay una operación en curso.
  const safeClose = () => {
    if (!savingRef.current) onClose();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (savingRef.current) return;
    setError(null);

    const value = Number(price);
    if (!name.trim()) return setError("Escribe el nombre del producto");
    if (!Number.isFinite(value) || value <= 0) return setError("El precio debe ser mayor a cero");

    savingRef.current = true;
    setSaving(true);
    const base = {
      name: name.trim(),
      categoryId: categoryId || null,
      price: value,
    };

    try {
      if (isEdit) {
        await onUpdate(product!.id, base, file, removePhoto && !file);
      } else {
        await onCreate({ ...base, active }, file);
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
      size="lg"
      title={isEdit ? "Editar producto" : "Nuevo producto"}
      description={isEdit ? "Actualiza los datos del producto." : "Agrega un producto al catálogo del local."}
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
            form="product-form"
            className={`${btnPrimary} disabled:cursor-not-allowed`}
            disabled={saving}
          >
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
          </button>
        </>
      }
    >
      <form
        id="product-form"
        onSubmit={submit}
        aria-busy={saving}
        className="-mx-0.5 max-h-[calc(100dvh_-_16rem)] space-y-5 overflow-y-auto overscroll-contain px-0.5 py-0.5"
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm">
              {preview ? (
                <img src={preview} alt="Foto del producto" className="h-full w-full object-cover" />
              ) : (
                <span className="flex flex-col items-center gap-1">
                  <ImagePlus size={22} aria-hidden="true" />
                  <span className="text-[11px] font-medium">Sin foto</span>
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-2.5">
              <div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Foto (opcional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={saving}
                    className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-white text-sm text-slate-600 transition-colors file:mr-3 file:rounded-l-xl file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    onChange={(e) => {
                      const selected = e.target.files?.[0] ?? null;
                      if (!selected) {
                        setFile(null);
                        return;
                      }
                      if (!selected.type.startsWith("image/")) {
                        setFile(null);
                        setError("Selecciona un archivo de imagen válido");
                        e.target.value = "";
                        return;
                      }
                      if (selected.size > MAX_PHOTO_BYTES) {
                        setFile(null);
                        setError("La imagen no puede superar los 5 MB");
                        e.target.value = "";
                        return;
                      }
                      setError(null);
                      setFile(selected);
                      setRemovePhoto(false);
                    }}
                  />
                </label>
                <p className="mt-1.5 text-xs text-slate-500">
                  Imagen hasta 5 MB. Se usará como miniatura en el catálogo.
                </p>
              </div>

              {isEdit && product?.imageUrl && !file && (
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    checked={removePhoto}
                    disabled={saving}
                    onChange={(e) => setRemovePhoto(e.target.checked)}
                  />
                  Quitar la foto actual
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Información del producto
          </p>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Nombre</span>
            <input
              className={inputClass}
              value={name}
              required
              maxLength={150}
              disabled={saving}
              placeholder="Café americano"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Precio</span>
              <div className="relative">
                <span
                  className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm font-medium text-slate-400"
                  aria-hidden="true"
                >
                  Bs
                </span>
                <input
                  className={`${inputClass} pl-10 tabular-nums`}
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  disabled={saving}
                  value={price}
                  placeholder="0.00"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Categoría (opcional)</span>
              <select
                className={inputClass}
                value={categoryId}
                disabled={saving}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Sin categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
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
            <span>Disponible (visible para los empleados)</span>
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
