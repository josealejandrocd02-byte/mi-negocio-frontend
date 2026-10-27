import React from 'react'

import { useMemo, useState } from "react";
import { KeyRound, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMyStores } from '@/hooks/StoreAdimHooks/useMyStores';
import { useAllEmployees } from '@/hooks/StoreAdimHooks/useAllEmployees';
import type { EmployeeWithStore } from '@/services/StoreAdminServices/Types/storeEmployee';
import type { AdminUser } from "@/services/AdminServices/Types/adminUser";
import ConfirmDialog from '@/components/AdminComponents/ConfirmDialog';
import { btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";
import PasswordResetModal from "@/components/AdminComponents/users/PasswordResetModal";
import { formatDate } from "@/components/AdminComponents/users/StatusBadge";
import UserFormModal from "@/components/AdminComponents/users/UserFormModal";
import EmployeeCreateModal from '@/components/StoreAdminComponents/EmployeeCreateModal';

// Los modales de usuarios esperan AdminUser; solo usan id, fullName y email
const asUser = (e: EmployeeWithStore): AdminUser => ({
  id: e.userId, fullName: e.fullName, email: e.email,
  platformRole: "USER", active: e.userActive, createdAt: e.joinedAt, stores: [],
});

type ModalState =
  | { type: "create" }
  | { type: "edit"; emp: EmployeeWithStore }
  | { type: "password"; emp: EmployeeWithStore }
  | { type: "toggle"; emp: EmployeeWithStore }
  | { type: "remove"; emp: EmployeeWithStore }
  | null;

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const iconBtn = "rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";
const rowKey = (e: EmployeeWithStore) => `${e.storeId}:${e.userId}`;

export default function EmployeesPage() {
  const { adminStores, isLoading: meLoading } = useMyStores();
  const api = useAllEmployees(adminStores);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [storeFilter, setStoreFilter] = useState("ALL");
  const [modal, setModal] = useState<ModalState>(null);
  const close = () => setModal(null);

  const loading = meLoading || api.loading;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return api.employees.filter((e) => {
      if (storeFilter !== "ALL" && e.storeId !== storeFilter) return false;
      if (status === "ACTIVE" && !(e.active && e.userActive)) return false;
      if (status === "INACTIVE" && e.active && e.userActive) return false;
      return !q || e.fullName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
        || e.storeName.toLowerCase().includes(q);
    });
  }, [api.employees, search, status, storeFilter]);

  const noStores = !meLoading && adminStores.length === 0;

  return (
    <div className="px-8 py-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Mi negocio <span className="text-slate-400">/</span> Operaciones
      </p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Empleados</h1>
          <p className="mt-2 text-sm text-slate-500">
            Gestiona el equipo de {adminStores.length > 1 ? "tus locales" : adminStores[0]?.storeName ?? "tu local"} y sus permisos de acceso.
          </p>
        </div>
        <button className={btnPrimary} disabled={noStores} onClick={() => setModal({ type: "create" })}>
          <Plus size={18} /> Nuevo empleado
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} pl-10`} placeholder="Buscar por nombre, correo o sucursal"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {adminStores.length > 1 && (
            <select className={`${inputClass} w-auto`} value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}>
              <option value="ALL">Todas las sucursales</option>
              {adminStores.map((s) => <option key={s.storeId} value={s.storeId}>{s.storeName}</option>)}
            </select>
          )}
          <select className={`${inputClass} w-auto`} value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="ALL">Todos los estados</option>
            <option value="ACTIVE">Activos</option>
            <option value="INACTIVE">Inactivos</option>
          </select>
        </div>

        {api.error && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {api.error}
            <button className="font-semibold underline" onClick={api.reload}>Reintentar</button>
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className={`${th} rounded-l-lg`}>Empleado</th>
                <th className={th}>Sucursal</th>
                <th className={th}>Rol</th>
                <th className={th}>Estado</th>
                <th className={th}>Fecha de alta</th>
                <th className={`${th} rounded-r-lg`}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">Cargando empleados…</td></tr>
              )}
              {noStores && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                    No administras ningún local, así que no hay empleados que gestionar.
                  </td>
                </tr>
              )}
              {!loading && !noStores && filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">No hay empleados para mostrar.</td></tr>
              )}
              {!loading && filtered.map((e) => {
                const shared = api.sharedUserIds.has(e.userId);
                const sharedHint = "Trabaja en varias sucursales: solo el administrador de la plataforma puede modificar su cuenta";
                return (
                  <tr key={rowKey(e)} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-4">
                      <div className="text-sm font-bold text-slate-900">{e.fullName}</div>
                      <div className="text-xs text-slate-500">{e.email}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{e.storeName}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        Empleado
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {!e.userActive ? (
                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700"
                          title="La cuenta está bloqueada en toda la plataforma">
                          Cuenta bloqueada
                        </span>
                      ) : e.active ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Activo</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">Inactivo</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">{formatDate(e.joinedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <button className={iconBtn} title={shared ? sharedHint : "Editar"} disabled={shared}
                          onClick={() => setModal({ type: "edit", emp: e })}>
                          <Pencil size={17} />
                        </button>
                        <button className={iconBtn} title={shared ? sharedHint : "Restablecer contraseña"} disabled={shared}
                          onClick={() => setModal({ type: "password", emp: e })}>
                          <KeyRound size={17} />
                        </button>
                        <button
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                            e.active ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}
                          onClick={() => setModal({ type: "toggle", emp: e })}
                        >
                          {e.active ? "Desactivar" : "Activar"}
                        </button>
                        <button className="rounded-lg p-1.5 text-red-500 hover:bg-red-50" title="Desvincular de la sucursal"
                          onClick={() => setModal({ type: "remove", emp: e })}>
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Los empleados pueden registrar ventas y consultar productos e inventario de su local.
      </p>

      {modal?.type === "create" && (
        <EmployeeCreateModal
          stores={adminStores}
          defaultStoreId={storeFilter !== "ALL" ? storeFilter : adminStores.length === 1 ? adminStores[0].storeId : undefined}
          onClose={close}
          onCreate={api.create}
        />
      )}
      {modal?.type === "edit" && (
        <UserFormModal
          user={asUser(modal.emp)}
          onClose={close}
          onCreate={async () => undefined /* solo edición aquí */}
          onUpdate={(id, p) => api.update(modal.emp.storeId, id, p)}
        />
      )}
      {modal?.type === "password" && (
        <PasswordResetModal
          user={asUser(modal.emp)}
          onClose={close}
          onSubmit={(id, p) => api.resetPassword(modal.emp.storeId, id, p)}
        />
      )}
      {modal?.type === "toggle" && (
        <ConfirmDialog
          title={modal.emp.active ? "Desactivar empleado" : "Activar empleado"}
          message={
            modal.emp.active
              ? `${modal.emp.fullName} no podrá entrar a ${modal.emp.storeName} hasta que lo actives de nuevo.`
              : `${modal.emp.fullName} volverá a tener acceso a ${modal.emp.storeName}.`
          }
          confirmLabel={modal.emp.active ? "Desactivar" : "Activar"}
          danger={modal.emp.active}
          onClose={close}
          onConfirm={() => api.setActive(modal.emp.storeId, modal.emp.userId, !modal.emp.active)}
        />
      )}
      {modal?.type === "remove" && (
        <ConfirmDialog
          title="Desvincular empleado"
          message={`${modal.emp.fullName} dejará de pertenecer a ${modal.emp.storeName}. Su cuenta se conserva.`}
          confirmLabel="Desvincular"
          danger
          onClose={close}
          onConfirm={() => api.remove(modal.emp.storeId, modal.emp.userId)}
        />
      )}
    </div>
  );
}

