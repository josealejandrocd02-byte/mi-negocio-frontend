import { useEffect, useMemo, useRef, useState } from "react";
import {
  Ban,
  ChevronRight,
  CircleCheck,
  Info,
  PackageOpen,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  SearchX,
  ShoppingBag,
  Store,
  TriangleAlert,
  X,
} from "lucide-react";
import { useMyStores } from "@/hooks/StoreAdimHooks/useMyStores";
import { useProducts } from "@/hooks/ProductCategoryHooks/useProducts";
import { useCategories } from "@/hooks/ProductCategoryHooks/useCategories";
import type {
  Product,
  ProductCreatePayload,
  ProductUpdatePayload,
} from "@/services/ProductCategoryServices/Types/catalog";
import ConfirmDialog from "@/components/AdminComponents/ConfirmDialog";
import ProductFormModal from "@/components/ProductAndCategoryComponents/ProductFormModal";
import { btnGhost, btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";
import { getErrorMessage } from "@/utils/getErrorMessage";

type ModalState =
  | { type: "form"; product: Product | null }
  | { type: "toggle"; product: Product }
  | null;

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const thRight = "px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const iconBtn =
  "rounded-lg p-2 text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
const retryBtn =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white/70 px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ring-black/5 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
const money = (n: number) => `Bs ${Number(n).toFixed(2)}`;

export default function ProductsPage() {
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

  const api = useProducts(storeId);
  const {
    categories,
    error: categoriesError,
    reload: reloadCategories,
  } = useCategories(storeId);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [modal, setModal] = useState<ModalState>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const close = () => setModal(null);

  // Al cambiar de local, los filtros y el modal de la tienda anterior dejan de ser válidos.
  // No se resetea en la transición inicial undefined -> primera tienda (evita borrar lo que el usuario escribe).
  const previousStoreId = useRef<string | undefined>(undefined);
  useEffect(() => {
    const previous = previousStoreId.current;
    previousStoreId.current = storeId;
    if (previous !== undefined && previous !== storeId) {
      setSearch("");
      setCategoryFilter("ALL");
      setModal(null);
      setNotice(null);
    }
  }, [storeId]);

  // El aviso de la operación anterior no debe quedar visible al abrir otro formulario.
  useEffect(() => {
    if (modal) setNotice(null);
  }, [modal]);

  const loading = meLoading || api.loading;
  const noStores = !meLoading && !meError && adminStores.length === 0;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return api.products.filter((p) => {
      if (categoryFilter === "NONE" && p.categoryId) return false;
      if (categoryFilter !== "ALL" && categoryFilter !== "NONE" && p.categoryId !== categoryFilter) return false;
      return !q || p.name.toLowerCase().includes(q)
        || (p.categoryName ?? "").toLowerCase().includes(q);
    });
  }, [api.products, search, categoryFilter]);

  // Al crear hay que esperar el id para poder subir la foto.
  // Si la foto falla, el producto ya existe: se avisa sin reabrir el formulario
  // para que reintentar no genere un duplicado.
  const handleCreate = async (payload: ProductCreatePayload, file?: File | null) => {
    const created = await api.create(payload);
    if (file) {
      try {
        await api.uploadPhoto(created.id, file);
      } catch (e) {
        setNotice(
          `El producto "${created.name}" se creó, pero la foto no se pudo subir. ${getErrorMessage(e, "")}`.trim(),
        );
      }
    }
    return created;
  };

  const handleUpdate = async (
    id: string,
    payload: ProductUpdatePayload,
    file?: File | null,
    removePhoto?: boolean,
  ) => {
    const updated = await api.update(id, payload);
    if (file) {
      try {
        await api.uploadPhoto(id, file);
      } catch (e) {
        setNotice(
          `El producto "${updated.name}" se actualizó, pero la foto no se pudo subir. ${getErrorMessage(e, "")}`.trim(),
        );
      }
    } else if (removePhoto) {
      try {
        await api.removePhoto(id);
      } catch (e) {
        setNotice(
          `El producto "${updated.name}" se actualizó, pero no se pudo quitar la foto. ${getErrorMessage(e, "")}`.trim(),
        );
      }
    }
    return updated;
  };

  const hasMeError = !meLoading && meError;
  const blockingError = hasMeError;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest">
        <span className="text-indigo-600">Mi negocio</span>
        <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
        <span className="text-slate-500">Catálogo</span>
        <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
        <span className="text-slate-500" aria-current="page">Productos</span>
      </nav>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Productos</h1>
            <span
              aria-hidden="true"
              className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600"
            >
              {loading ? "…" : api.products.length}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-500 sm:mt-2">Administra el catálogo de productos del local.</p>
        </div>
        <button
          className={`${btnPrimary} w-full shrink-0 disabled:cursor-not-allowed sm:w-auto`}
          disabled={noStores || !storeId || blockingError || loading}
          onClick={() => setModal({ type: "form", product: null })}
        >
          <Plus size={18} aria-hidden="true" /> Nuevo producto
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="w-full sm:w-72 lg:w-80">
                <label htmlFor="product-search" className="sr-only">Buscar producto</label>
                <div className="relative">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    id="product-search"
                    className={`${inputClass} pl-10`}
                    placeholder="Buscar producto"
                    aria-label="Buscar producto"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full sm:w-56">
                <label htmlFor="product-category-filter" className="sr-only">Filtrar por categoría</label>
                <select
                  id="product-category-filter"
                  className={inputClass}
                  value={categoryFilter}
                  aria-label="Filtrar por categoría"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="ALL">Todas las categorías</option>
                  <option value="NONE">Sin categoría</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {adminStores.length > 1 && (
                <div className="w-full sm:w-56">
                  <label htmlFor="product-store-filter" className="sr-only">Seleccionar local</label>
                  <select
                    id="product-store-filter"
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
                  "Cargando catálogo…"
                ) : (
                  <>
                    Mostrando <span className="font-semibold tabular-nums text-slate-700">{filtered.length}</span> de{" "}
                    <span className="font-semibold tabular-nums text-slate-700">{api.products.length}</span> productos
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        {(hasMeError || categoriesError || api.error || notice) && (
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

            {categoriesError && (
              <div role="alert" className="flex flex-col gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-start gap-2">
                  <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">No se pudieron cargar las categorías. {categoriesError}</span>
                </span>
                <button type="button" className={retryBtn} onClick={() => reloadCategories()}>
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

            {notice && (
              <div role="status" className="flex flex-col gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:flex-row sm:items-start sm:justify-between">
                <span className="flex items-start gap-2">
                  <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">{notice}</span>
                </span>
                <button type="button" className={retryBtn} onClick={() => setNotice(null)}>
                  <X size={14} aria-hidden="true" /> Cerrar
                </button>
              </div>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse" aria-busy={loading}>
            {loading && <caption className="sr-only">Cargando productos…</caption>}
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th scope="col" className={th}>Producto</th>
                <th scope="col" className={thRight}>Precio</th>
                <th scope="col" className={th}>Estado</th>
                <th scope="col" className={thRight}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 5 }).map((_, index) => (
                <tr key={`loading-${index}`} aria-hidden="true" className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />
                      <div className="space-y-2">
                        <div className="skeleton h-3.5 w-36 rounded-full" />
                        <div className="skeleton h-3 w-24 rounded-full" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><div className="skeleton ml-auto h-3.5 w-20 rounded-full" /></td>
                  <td className="px-4 py-3.5"><div className="skeleton h-6 w-20 rounded-full" /></td>
                  <td className="px-4 py-3.5"><div className="skeleton ml-auto h-8 w-20 rounded-lg" /></td>
                </tr>
              ))}

              {noStores && (
                <tr>
                  <td colSpan={4} className="px-6 py-14">
                    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Store size={26} aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-700">Sin locales asignados</p>
                      <p className="mt-1 text-sm text-slate-500">
                        No administras ningún local, así que no hay productos que gestionar.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && !noStores && !blockingError && !api.error && filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-14">
                    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                        {api.products.length === 0
                          ? <PackageOpen size={26} aria-hidden="true" />
                          : <SearchX size={26} aria-hidden="true" />}
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-700">
                        {api.products.length === 0 ? "Aún no hay productos en este local." : "No hay productos para mostrar."}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {api.products.length === 0
                          ? "Crea tu primer producto para empezar a vender."
                          : "Prueba con otro término de búsqueda o cambia los filtros."}
                      </p>
                      {api.products.length === 0 ? (
                        <button
                          type="button"
                          className={`${btnPrimary} mt-5 disabled:cursor-not-allowed`}
                          disabled={!storeId || blockingError}
                          onClick={() => setModal({ type: "form", product: null })}
                        >
                          <Plus size={16} aria-hidden="true" /> Crear el primer producto
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={`${btnGhost} mt-5`}
                          onClick={() => { setSearch(""); setCategoryFilter("ALL"); }}
                        >
                          Limpiar filtros
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}

              {!loading && filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 ring-1 ring-inset ring-slate-200">
                        {p.imageUrl
                          ? <img src={p.imageUrl} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                          : <ShoppingBag size={19} aria-hidden="true" />}
                      </div>
                      <div className="min-w-0">
                        <div className="max-w-[220px] truncate text-sm font-semibold text-slate-900 sm:max-w-[320px]" title={p.name}>
                          {p.name}
                        </div>
                        <div className="mt-0.5 max-w-[220px] truncate text-xs text-slate-500 sm:max-w-[320px]" title={p.categoryName ?? "Sin categoría"}>
                          {p.categoryName ?? "Sin categoría"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-semibold tabular-nums text-slate-700">
                    {money(p.price)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      p.active
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                        : "bg-amber-50 text-amber-700 ring-amber-600/10"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${p.active ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden="true" />
                      {p.active ? "Disponible" : "Oculto"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className={`${iconBtn} hover:bg-indigo-50 hover:text-indigo-600`}
                        title="Editar"
                        aria-label={`Editar ${p.name}`}
                        onClick={() => setModal({ type: "form", product: p })}
                      >
                        <Pencil size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={`${iconBtn} ${p.active ? "hover:bg-amber-50 hover:text-amber-700" : "hover:bg-emerald-50 hover:text-emerald-700"}`}
                        title={p.active ? "Ocultar producto" : "Mostrar producto"}
                        aria-label={`${p.active ? "Ocultar" : "Mostrar"} ${p.name}`}
                        onClick={() => setModal({ type: "toggle", product: p })}
                      >
                        {p.active ? <Ban size={17} aria-hidden="true" /> : <CircleCheck size={17} aria-hidden="true" />}
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
        <ProductFormModal
          product={modal.product}
          categories={categories}
          onClose={close}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
      {modal?.type === "toggle" && (
        <ConfirmDialog
          title={modal.product.active ? "Ocultar producto" : "Mostrar producto"}
          message={
            modal.product.active
              ? `"${modal.product.name}" dejará de mostrarse a los empleados hasta que lo vuelvas a mostrar.`
              : `"${modal.product.name}" volverá a estar disponible para los empleados.`
          }
          confirmLabel={modal.product.active ? "Ocultar" : "Mostrar"}
          danger={modal.product.active}
          onClose={close}
          onConfirm={() => api.setActive(modal.product.id, !modal.product.active)}
        />
      )}
    </div>
  );
}
