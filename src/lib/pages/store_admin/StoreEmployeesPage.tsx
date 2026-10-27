import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Ban, CircleCheck, KeyRound, Pencil, Plus, Search, Trash2, UserCheck, Users } from "lucide-react";
import { useMyStores } from "@/hooks/StoreAdimHooks/useMyStores";
import { useStoreEmployees } from "@/hooks/StoreAdimHooks/useStoreEmployees";
import type { StoreMember } from "@/services/AdminServices/Types/adminStore";
import type { AdminUser } from "@/services/AdminServices/Types/adminUser";
import ConfirmDialog from "@/components/AdminComponents/ConfirmDialog";
import { btnPrimary, inputClass } from "@/components/AdminComponents/users/Modal";
import PasswordResetModal from "@/components/AdminComponents/users/PasswordResetModal";
import StatCard from "@/components/AdminComponents/users/StatCard";
import UserFormModal from "@/components/AdminComponents/users/UserFormModal";

// Adaptador: los modales de usuarios esperan AdminUser; solo usan id, fullName y email
const asUser = (m: StoreMember): AdminUser => ({
  id: m.userId, fullName: m.fullName, email: m.email,
  platformRole: "USER", active: m.active, createdAt: "", stores: [],
});

type ModalState =
  | { type: "form"; member: StoreMember | null }
  | { type: "password"; member: StoreMember }
  | { type: "toggle"; member: StoreMember }
  | { type: "remove"; member: StoreMember }
  | null;

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const iconBtn = "rounded-lg p-1.5 text-slate-500 hover:bg-slate-100";
const initials = (n: string) => n.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");

export default function StoreEmployeesPage() {
  const { storeId } = useParams();
  const { adminStores } = useMyStores();
  const storeName = adminStores.find((s) => s.storeId === storeId)?.storeName ?? "Mi local";
  const api = useStoreEmployees(storeId);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "RESTRICTED">("ALL");
  const [modal, setModal] = useState<ModalState>(null);
  const close = () => setModal(null);

  const stats = useMemo(() => {
    const active = api.employees.filter((e) => e.active).length;
    return { total: api.employees.length, active, restricted: api.employees.length - active };
  }, [api.employees]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return api.employees.filter((e) => {
      if (status === "ACTIVE" && !e.active) return false;
      if (status === "RESTRICTED" && e.active) return false;
      return !q || e.fullName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
    });
  }, [api.employees, search, status]);

  return (
    <div className="px-8 py-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Mi negocio <span className="text-slate-400">/</span> {storeName}
      </p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Empleados</h1>
          <p className="mt-2 text-sm text-slate-500">Administra las cuentas y el acceso del equipo de este local.</p>
        </div>
        <button className={btnPrimary} onClick={() => setModal({ type: "form", member: null })}>
          <Plus size={18} /> Nuevo empleado
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard icon={<Users size={20} />} iconClassName="bg-indigo-50 text-indigo-600"
          label="Todo el equipo" value={stats.total} hint="Vinculados a este local" />
        <StatCard icon={<UserCheck size={20} />} iconClassName="bg-emerald-50 text-emerald-600"
          label="Activos" value={stats.active} hint="Acceso habilitado" />
        <StatCard icon={<Ban size={20} />} iconClassName="bg-amber-50 text-amber-600"
          label="Restringidos" value={stats.restricted} hint="Sin acceso a este local" />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} pl-10`} placeholder="Buscar por nombre o correo"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className={`${inputClass} w-auto`} value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="ALL">Todos los estados</option>
            <option value="ACTIVE">Activos</option>
            <option value="RESTRICTED">Restringidos</option>
          </select>
        </div>

        {api.error && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {api.error}
            <button className="font-semibold underline" onClick={api.reload}>Reintentar</button>
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className={`${th} rounded-l-lg`}>Empleado</th>
                <th className={th}>Rol</th>
                <th className={th}>Acceso</th>
                <th className={`${th} rounded-r-lg`}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {api.loading && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-400">Cargando equipo…</td></tr>
              )}
              {!api.loading && filtered.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-400">No hay empleados para mostrar.</td></tr>
              )}
              {!api.loading && filtered.map((m) => {
                const isEmployee = m.role === "EMPLOYEE" && !m.owner; // los admins no se gestionan aquí
                return (
                  <tr key={m.userId} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                          {initials(m.fullName)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{m.fullName}</div>
                          <div className="text-xs text-slate-400">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {m.owner ? "Dueño" : m.role === "STORE_ADMIN" ? "Administrador" : "Empleado"}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        m.active ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {m.active ? "Activo" : "Restringido"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {isEmployee ? (
                        <div className="flex items-center gap-1">
                          <button className={iconBtn} title="Editar" onClick={() => setModal({ type: "form", member: m })}>
                            <Pencil size={17} />
                          </button>
                          <button className={iconBtn} title="Restablecer contraseña" onClick={() => setModal({ type: "password", member: m })}>
                            <KeyRound size={17} />
                          </button>
                          <button className={iconBtn} title={m.active ? "Restringir acceso" : "Devolver acceso"}
                            onClick={() => setModal({ type: "toggle", member: m })}>
                            {m.active ? <Ban size={17} /> : <CircleCheck size={17} />}
                          </button>
                          <button className="rounded-lg p-1.5 text-red-500 hover:bg-red-50" title="Desvincular"
                            onClick={() => setModal({ type: "remove", member: m })}>
                            <Trash2 size={17} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal?.type === "form" && (
        <UserFormModal
          user={modal.member ? asUser(modal.member) : null}
          onClose={close}
          onCreate={api.create}
          onUpdate={api.update}
        />
      )}
      {modal?.type === "password" && (
        <PasswordResetModal user={asUser(modal.member)} onClose={close} onSubmit={api.resetPassword} />
      )}
      {modal?.type === "toggle" && (
        <ConfirmDialog
          title={modal.member.active ? "Restringir acceso" : "Devolver acceso"}
          message={
            modal.member.active
              ? `${modal.member.fullName} no podrá entrar a este local hasta que le devuelvas el acceso.`
              : `${modal.member.fullName} volverá a tener acceso a este local.`
          }
          confirmLabel={modal.member.active ? "Restringir" : "Devolver acceso"}
          danger={modal.member.active}
          onClose={close}
          onConfirm={() => api.setActive(modal.member.userId, !modal.member.active)}
        />
      )}
      {modal?.type === "remove" && (
        <ConfirmDialog
          title="Desvincular empleado"
          message={`${modal.member.fullName} dejará de pertenecer a este local.`}
          confirmLabel="Desvincular"
          danger
          onClose={close}
          onConfirm={() => api.remove(modal.member.userId)}
        />
      )}
    </div>
  );
}
