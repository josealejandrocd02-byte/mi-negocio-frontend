import { useState } from "react";
import { CircleCheck, Plus, Search, ShieldBan, Users } from "lucide-react";
import { useAdminUsers } from "@/hooks/AdminHooks/useAdminUsers";
import { useUserFilters } from "@/hooks/AdminHooks/useUserFilters";
import type { AdminUser, StoreOption, UserStatusFilter } from "@/services/AdminServices/Types/adminUser";
import AssignStoreModal from "@/components/AdminComponents/users/AssignStoreModal";
import ConfirmDialog from "@/components/AdminComponents/users/ConfirmDialog";
import { btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";
import PasswordResetModal from "@/components/AdminComponents/users/PasswordResetModal";
import StatCard from "@/components/AdminComponents/users/StatCard";
import UserDetailModal from "@/components/AdminComponents/users/UserDetailModal";
import UserFormModal from "@/components/AdminComponents/users/UserFormModal";
import UsersTable from "@/components/AdminComponents/users/UsersTable";

type ModalState =
  | { type: "form"; user: AdminUser | null }
  | { type: "detail"; userId: string }
  | { type: "password"; user: AdminUser }
  | { type: "assign"; userId: string }
  | { type: "toggle"; user: AdminUser }
  | { type: "delete"; user: AdminUser }
  | null;

interface Props {
  /** Sucursales disponibles para ligar usuarios. Si no se pasan, se pide el UUID a mano. */
  storeOptions?: StoreOption[];
}

export default function AdminUsersPage({ storeOptions = [] }: Props) {
  const api = useAdminUsers();
  const { search, setSearch, status, setStatus, stats, filtered } = useUserFilters(api.users);
  const [modal, setModal] = useState<ModalState>(null);
  const close = () => setModal(null);

  // Siempre leemos el usuario actualizado desde la lista (se refresca tras asignar sucursal)
  const byId = (id: string) => api.users.find((u) => u.id === id);
  const detailUser = modal?.type === "detail" ? byId(modal.userId) : undefined;
  const assignUser = modal?.type === "assign" ? byId(modal.userId) : undefined;

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Mi negocio <span className="text-slate-400">/</span> Administración
      </p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Usuarios</h1>
          <p className="mt-2 text-sm text-slate-500">
            Consulta y administra los accesos y las sucursales de cada usuario.
          </p>
        </div>
        <button className={btnPrimary} onClick={() => setModal({ type: "form", user: null })}>
          <Plus size={18} /> Nuevo usuario
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard icon={<Users size={20} />} iconClassName="bg-indigo-50 text-indigo-600"
          label="Todos los usuarios" value={stats.total} hint="Registrados en la plataforma" />
        <StatCard icon={<CircleCheck size={20} />} iconClassName="bg-emerald-50 text-emerald-600"
          label="Activos" value={stats.active} hint="Acceso habilitado" />
        <StatCard icon={<ShieldBan size={20} />} iconClassName="bg-amber-50 text-amber-600"
          label="Bloqueados" value={stats.blocked} hint="Acceso temporalmente pausado" />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={`${inputClass} pl-10`}
              placeholder="Buscar por nombre, correo o sucursal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={`${inputClass} w-auto`}
            value={status}
            onChange={(e) => setStatus(e.target.value as UserStatusFilter)}
          >
            <option value="ALL">Todos los estados</option>
            <option value="ACTIVE">Activos</option>
            <option value="BLOCKED">Bloqueados</option>
          </select>
        </div>

        {api.error && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {api.error}
            <button className="font-semibold underline" onClick={api.reload}>Reintentar</button>
          </div>
        )}

        <div className="mt-5">
          <UsersTable
            users={filtered}
            loading={api.loading}
            onView={(u) => setModal({ type: "detail", userId: u.id })}
            onEdit={(u) => setModal({ type: "form", user: u })}
            onResetPassword={(u) => setModal({ type: "password", user: u })}
            onToggleActive={(u) => setModal({ type: "toggle", user: u })}
            onDelete={(u) => setModal({ type: "delete", user: u })}
          />
        </div>
      </div>

      {modal?.type === "form" && (
        <UserFormModal user={modal.user} onClose={close} onCreate={api.create} onUpdate={api.update} />
      )}
      {detailUser && (
        <UserDetailModal user={detailUser} onClose={close}
          onAssignStore={(u) => setModal({ type: "assign", userId: u.id })} />
      )}
      {modal?.type === "password" && (
        <PasswordResetModal user={modal.user} onClose={close} onSubmit={api.resetPassword} />
      )}
      {assignUser && (
        <AssignStoreModal user={assignUser} storeOptions={storeOptions}
          onClose={() => setModal({ type: "detail", userId: assignUser.id })} onSubmit={api.assignStore} />
      )}
      {modal?.type === "toggle" && (
        <ConfirmDialog
          title={modal.user.active ? "Bloquear acceso" : "Desbloquear acceso"}
          message={
            modal.user.active
              ? `${modal.user.fullName} no podrá iniciar sesión hasta que lo desbloquees.`
              : `${modal.user.fullName} podrá volver a iniciar sesión.`
          }
          confirmLabel={modal.user.active ? "Bloquear" : "Desbloquear"}
          danger={modal.user.active}
          onClose={close}
          onConfirm={() => api.setActive(modal.user.id, !modal.user.active)}
        />
      )}
      {modal?.type === "delete" && (
        <ConfirmDialog
          title="Eliminar usuario"
          message={`Se eliminará a ${modal.user.fullName} (${modal.user.email}). Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onClose={close}
          onConfirm={() => api.remove(modal.user.id)}
        />
      )}
    </div>
  );
}
