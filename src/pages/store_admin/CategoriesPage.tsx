import { useEffect, useMemo, useRef, useState } from "react";
import {
  Ban,
  ChevronRight,
  CircleCheck,
  PackageOpen,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  SearchX,
  Store,
  Tags,
  TriangleAlert,
} from "lucide-react";
import { useMyStores } from "@/hooks/StoreAdimHooks/useMyStores";
import { useCategories } from "@/hooks/StoreAdimHooks/useCategories";
import type { Category } from "@/services/StoreAdminServices/Types/catalog";
import ConfirmDialog from "@/components/AdminComponents/ConfirmDialog";
import CategoryFormModal from "@/components/StoreAdminComponents/CategoryFormModal";
import { btnGhost, btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";

type ModalState =
  | { type: "form"; category: Category | null }
  | { type: "toggle"; category: Category }
  | null;

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const thRight = "px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const iconBtn =
  "rounded-lg p-2 text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
const retryBtn =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white/70 px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ring-black/5 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";

export default function CategoriesPage() {
  const {
    adminStores,
    isLoading: meLoading,
    isError: meError,
    refetch: refetchMe,
  } = useMyStores();
  const [pickedStoreId, setPickedStoreId] = useState<string>();
  // Si la tienda elegida desaparece (p. ej. se revoca el acceso), cae a la primera válida.
  const storeId = adminStores.some((s) => s.storeId === pickedStoreId)
    ? pickedStoreId
    : adminStores[0]?.storeId;

  const api = useCategories(storeId);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalState>(null);
  const close = () => setModal(null);

  // Al cambiar de local, la búsqueda y el modal de la tienda anterior dejan de ser válidos.
  // No se resetea en la transición inicial undefined -> primera tienda.
  const previousStoreId = useRef<string | undefined>(undefined);
  useEffect(() => {
    const previous = previousStoreId.current;
    previousStoreId.current = storeId;
    if (previous !== undefined && previous !== storeId) {
      setSearch("");
      setModal(null);
    }
  }, [storeId]);

  const loading = meLoading || api.loading;
  const noStores = !meLoading && !meError && adminStores.length === 0;
  const hasMeError = !meLoading && meError;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return api.categories.filter((c) => !q || c.name.toLowerCase().includes(q));
  }, [api.categories, search]);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest">
        <span className="text-indigo-600">Mi negocio</span>
        <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
        <span className="text-slate-500">Catálogo</span>
        <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
        <span className="text-slate-500" aria-current="page">Categorías</span>
      </nav>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Categorías</h1>
            <span
              aria-hidden="true"
              className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600"
            >
              {loading ? "…" : api.categories.length}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-500 sm:mt-2">Organiza los productos del local en categorías.</p>
        </div>
        <button
          className={`${btnPrimary} w-full shrink-0 disabled:cursor-not-allowed sm:w-auto`}
          disabled={noStores || !storeId || hasMeError || loading}
          onClick={() => setModal({ type: "form", category: null })}
        >
          <Plus size={18} aria-hidden="true" /> Nueva categoría
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="w-full sm:w-72 lg:w-80">
                <label htmlFor="category-search" className="sr-only">Buscar categoría</label>
                <div className="relative">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    id="category-search"
                    className={`${inputClass} pl-10`}
                    placeholder="Buscar categoría"
                    aria-label="Buscar categoría"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {adminStores.length > 1 && (
                <div className="w-full sm:w-56">
                  <label htmlFor="category-store-filter" className="sr-only">Seleccionar local</label>
                  <select
                    id="category-store-filter"
                    className={inputClass}
                    value={storeId ?? ""}
                    aria-label="Seleccionar local"
                    onChange={(e) => setPickedStoreId(e.target.value)}
                  >
                    {adminStores.map((s) => <option key={s.storeId} value={s.storeId}>{s.storeName}</option>)}
                  </select>
                </div>
              )}
            </div>

            {!noStores && !hasMeError && !api.error && (
              <p className="text-xs text-slate-500 lg:whitespace-nowrap">
                {loading ? (
                  "Cargando categorías…"
                ) : (
                  <>
                    Mostrando <span className="font-semibold tabular-nums text-slate-700">{filtered.length}</span> de{" "}
                    <span className="font-semibold tabular-nums text-slate-700">{api.categories.length}</span> categorías
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        {(hasMeError || api.error) && (
          <div className="space-y-3 border-b border-slate-100 bg-slate-50/50 px-4 py-4 sm:px-5">
            {hasMeError && (
              <div role="alert" className="flex flex-col gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-start gap-2">
                  <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>No se pudieron cargar tus locales.</span>
                </span>
                <button type="button" className={retryBtn} onClick={() => refetchMe()}>
                  <RefreshCw size={14} aria-hidden="true" /> Reintentar
                </button>
              </div>
            )}

            {api.error && (
              <div role="alert" className="flex flex-col gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-start gap-2">
                  <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">{api.error}</span>
                </span>
                <button type="button" className={retryBtn} onClick={() => api.reload()}>
                  <RefreshCw size={14} aria-hidden="true" /> Reintentar
                </button>
              </div>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse" aria-busy={loading}>
            {loading && <caption className="sr-only">Cargando categorías…</caption>}
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th scope="col" className={th}>Categoría</th>
                <th scope="col" className={th}>Estado</th>
                <th scope="col" className={thRight}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 5 }).map((_, index) => (
                <tr key={`loading-${index}`} aria-hidden="true" className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="skeleton h-10 w-10 shrink-0 rounded-xl" />
                      <div className="skeleton h-3.5 w-40 rounded-full" />
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><div className="skeleton h-6 w-20 rounded-full" /></td>
                  <td className="px-4 py-3.5"><div className="skeleton ml-auto h-8 w-20 rounded-lg" /></td>
                </tr>
              ))}

              {noStores && (
                <tr>
                  <td colSpan={3} className="px-6 py-14">
                    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Store size={26} aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-700">Sin locales asignados</p>
                      <p className="mt-1 text-sm text-slate-500">
                        No administras ningún local, así que no hay categorías que gestionar.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && !noStores && !hasMeError && !api.error && filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-14">
                    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                        {api.categories.length === 0
                          ? <PackageOpen size={26} aria-hidden="true" />
                          : <SearchX size={26} aria-hidden="true" />}
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-700">
                        {api.categories.length === 0 ? "Aún no hay categorías en este local." : "No hay categorías para mostrar."}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {api.categories.length === 0
                          ? "Crea tu primera categoría para organizar el catálogo."
                          : "Prueba con otro término de búsqueda o cambia el local."}
                      </p>
                      {api.categories.length === 0 ? (
                        <button
                          type="button"
                          className={`${btnPrimary} mt-5 disabled:cursor-not-allowed`}
                          disabled={!storeId || hasMeError}
                          onClick={() => setModal({ type: "form", category: null })}
                        >
                          <Plus size={16} aria-hidden="true" /> Crear la primera categoría
                        </button>
                      ) : (
                        <button type="button" className={`${btnGhost} mt-5`} onClick={() => setSearch("")}>
                          Limpiar búsqueda
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}

              {!loading && filtered.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                        <Tags size={17} aria-hidden="true" />
                      </div>
                      <span className="max-w-[240px] truncate text-sm font-semibold text-slate-900 sm:max-w-[420px]" title={c.name}>
                        {c.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      c.active
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                        : "bg-amber-50 text-amber-700 ring-amber-600/10"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.active ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden="true" />
                      {c.active ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className={`${iconBtn} hover:bg-indigo-50 hover:text-indigo-600`}
                        title="Editar"
                        aria-label={`Editar ${c.name}`}
                        onClick={() => setModal({ type: "form", category: c })}
                      >
                        <Pencil size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={`${iconBtn} ${c.active ? "hover:bg-amber-50 hover:text-amber-700" : "hover:bg-emerald-50 hover:text-emerald-700"}`}
                        title={c.active ? "Desactivar" : "Activar"}
                        aria-label={`${c.active ? "Desactivar" : "Activar"} ${c.name}`}
                        onClick={() => setModal({ type: "toggle", category: c })}
                      >
                        {c.active ? <Ban size={17} aria-hidden="true" /> : <CircleCheck size={17} aria-hidden="true" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal?.type === "form" && (
        <CategoryFormModal
          category={modal.category}
          onClose={close}
          onCreate={api.create}
          onUpdate={api.update}
        />
      )}
      {modal?.type === "toggle" && (
        <ConfirmDialog
          title={modal.category.active ? "Desactivar categoría" : "Activar categoría"}
          message={
            modal.category.active
              ? `Los productos de "${modal.category.name}" dejarán de mostrarse a los empleados.`
              : `"${modal.category.name}" volverá a estar visible para los empleados.`
          }
          confirmLabel={modal.category.active ? "Desactivar" : "Activar"}
          danger={modal.category.active}
          onClose={close}
          onConfirm={() => api.setActive(modal.category.id, !modal.category.active)}
        />
      )}
    </div>
  );
}
