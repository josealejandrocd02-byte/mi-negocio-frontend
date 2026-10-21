import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Store as StoreIcon, Trash2 } from "lucide-react";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5; // igual que MAX_LOGO_SIZE del backend

interface Props {
  currentUrl?: string | null; // logo ya guardado (edición)
  file: File | null; // archivo nuevo elegido
  removed: boolean; // el usuario quiere quitar el logo actual
  onFileChange: (file: File | null) => void;
  onRemovedChange: (removed: boolean) => void;
  disabled?: boolean;
}

export default function LogoUploader({
  currentUrl, file, removed, onFileChange, onRemovedChange, disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const shown = previewUrl ?? (removed ? null : currentUrl ?? null);

  const pick = (f: File | undefined) => {
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) return setError("Formato inválido. Usa JPG, PNG o WEBP.");
    if (f.size > MAX_MB * 1024 * 1024) return setError(`La imagen supera ${MAX_MB} MB.`);
    setError(null);
    onRemovedChange(false);
    onFileChange(f);
  };

  const clear = () => {
    setError(null);
    if (file) onFileChange(null); // descarta la nueva selección
    else if (currentUrl) onRemovedChange(true); // quita el logo guardado al guardar
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">Logo (opcional)</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 hover:border-indigo-400 hover:text-indigo-500"
          aria-label="Elegir imagen"
        >
          {shown ? (
            <img src={shown} alt="Logo del local" className="h-full w-full object-cover" />
          ) : (
            <StoreIcon size={26} />
          )}
        </button>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <ImagePlus size={15} /> {shown ? "Cambiar imagen" : "Subir imagen"}
            </button>
            {shown && (
              <button
                type="button"
                disabled={disabled}
                onClick={clear}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={15} /> Quitar
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400">JPG, PNG o WEBP · máx. {MAX_MB} MB · mín. 100×100 px</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
