import { useState } from "react";
import { Ban, CircleCheck, Plus, Search, Store as StoreIcon } from "lucide-react";
import { useAdminStores } from "@/hooks/AdminHooks/useAdminStores";
import { useStoreFilters } from "@/hooks/AdminHooks/useStoreFilters";
import type { Store, StoreStatusFilter } from "@/services/AdminServices/Types/adminStore";
import ConfirmDialog from "@/components/AdminComponents/ConfirmDialog";
import { btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";
import StatCard from "@/components/AdminComponents/users/StatCard";
import DeleteStoreModal from "@/components/AdminComponents/stores/DeleteStoreModal";
import StoreDetailModal from "@/components/AdminComponents/stores/StoreDetailModal";
import StoreFormModal from "@/components/AdminComponents/stores/StoreFormModal";
import StoresTable from "@/components/AdminComponents/stores/StoresTable";

type ModalState =
  | { type: "form"; store: Store | null }
  | { type: "detail"; storeId: string }
  | { type: "toggle"; store: Store }
  | { type: "close"; store: Store }
  | { type: "reopen"; store: Store }
  | { type: "delete"; store: Store }
  | null;

export default function AdminStoresPage() {
  const api = useAdminStores();
  const { search, setSearch, status, setStatus, stats, filtered } = useStoreFilters(api.stores);
  const [modal, setModal] = useState<ModalState>(null);
  const closeModal = () => setModal(null);

  return (
    <div className="px-8 py-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Mi negocio <span className="text-slate-400">/</span> Operaciones
      </p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Locales</h1>
          <p className="mt-2 text-sm text-slate-500">Consulta y administra los negocios registrados en la plataforma.</p>
        </div>
        <button className={btnPrimary} onClick={() => setModal({ type: "form", store: null })}>
          <Plus size={18} /> Nuevo local
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard icon={<StoreIcon size={20} />} iconClassName="bg-indigo-50 text-indigo-600"
          label="Todos los locales" value={stats.total} hint="Registrados en la plataforma" />
        <StatCard icon={<CircleCheck size={20} />} iconClassName="bg-emerald-50 text-emerald-600"
          label="Activos" value={stats.active} hint="Operación habilitada" />
        <StatCard icon={<Ban size={20} />} iconClassName="bg-amber-50 text-amber-600"
          label="Suspendidos" value={stats.suspended} hint="Acceso temporalmente pausado" />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} pl-10`} placeholder="Buscar por local o dirección"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className={`${inputClass} w-auto`} value={status}
            onChange={(e) => setStatus(e.target.value as StoreStatusFilter)}>
            <option value="ALL">Todos los estados</option>
            <option value="ACTIVE">Activos</option>
            <option value="SUSPENDED">Suspendidos</option>
            <option value="CLOSED">Cerrados</option>
          </select>
        </div>

        {api.error && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {api.error}
            <button className="font-semibold underline" onClick={api.reload}>Reintentar</button>
          </div>
        )}

        <div className="mt-5">
          <StoresTable
            stores={filtered}
            loading={api.loading}
            onView={(s) => setModal({ type: "detail", storeId: s.id })}
            onEdit={(s) => setModal({ type: "form", store: s })}
            onToggleStatus={(s) => setModal({ type: "toggle", store: s })}
            onCloseStore={(s) => setModal({ type: "close", store: s })}
            onReopen={(s) => setModal({ type: "reopen", store: s })}
            onDelete={(s) => setModal({ type: "delete", store: s })}
          />
        </div>
      </div>

      {modal?.type === "form" && (
        <StoreFormModal store={modal.store} onClose={closeModal} onCreate={api.create} onUpdate={api.update} />
      )}
      {modal?.type === "detail" && (
        <StoreDetailModal storeId={modal.storeId} onClose={closeModal} onStoreUpdated={api.sync} />
      )}
      {modal?.type === "toggle" && (
        <ConfirmDialog
          title={modal.store.status === "ACTIVE" ? "Suspender local" : "Reactivar local"}
          message={
            modal.store.status === "ACTIVE"
              ? `${modal.store.name} quedará con el acceso pausado hasta que lo reactives.`
              : `${modal.store.name} volverá a operar con normalidad.`
          }
          confirmLabel={modal.store.status === "ACTIVE" ? "Suspender" : "Reactivar"}
          danger={modal.store.status === "ACTIVE"}
          onClose={closeModal}
          onConfirm={() => api.setStatus(modal.store.id, modal.store.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE")}
        />
      )}
      {modal?.type === "close" && (
        <ConfirmDialog
          title="Cerrar local"
          message={`Se cerrará ${modal.store.name}. El historial se conserva y podrás reabrirlo o eliminarlo después.`}
          confirmLabel="Cerrar local"
          danger
          onClose={closeModal}
          onConfirm={() => api.close(modal.store.id)}
        />
      )}
      {modal?.type === "reopen" && (
        <ConfirmDialog
          title="Reabrir local"
          message={`${modal.store.name} volverá a estar activo y su equipo recuperará el acceso.`}
          confirmLabel="Reabrir"
          onClose={closeModal}
          onConfirm={() => api.reopen(modal.store.id)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteStoreModal store={modal.store} onClose={closeModal} onConfirm={() => api.remove(modal.store.id)} />
      )}
    </div>
  );
}
