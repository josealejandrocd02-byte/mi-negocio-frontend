import { Ban, CircleCheck, Eye, KeyRound, Pencil, Trash2 } from "lucide-react";
import type { AdminUser } from "@/services/AdminServices/Types/adminUser";
import { formatDate, PlatformRoleBadge, UserStatusBadge } from "./StatusBadge";

interface Props {
  users: AdminUser[];
  loading: boolean;
  onView: (u: AdminUser) => void;
  onEdit: (u: AdminUser) => void;
  onResetPassword: (u: AdminUser) => void;
  onToggleActive: (u: AdminUser) => void;
  onDelete: (u: AdminUser) => void;
}

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const iconBtn = "rounded-lg p-1.5 text-slate-500 hover:bg-slate-100";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

function StoresCell({ user }: { user: AdminUser }) {
  if (user.stores.length === 0) return <span className="text-sm text-slate-400">Sin sucursales</span>;
  const [first, ...rest] = user.stores;
  return (
    <div className="text-sm text-slate-700">
      {first.storeName}
      {rest.length > 0 && <span className="ml-1.5 text-xs text-slate-400">+{rest.length}</span>}
    </div>
  );
}

export default function UsersTable({
  users, loading, onView, onEdit, onResetPassword, onToggleActive, onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className={`${th} rounded-l-lg`}>Usuario</th>
            <th className={th}>Rol</th>
            <th className={th}>Sucursales</th>
            <th className={th}>Estado</th>
            <th className={th}>Alta</th>
            <th className={`${th} rounded-r-lg`}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">Cargando usuarios…</td>
            </tr>
          )}
          {!loading && users.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                No hay usuarios que coincidan con la búsqueda.
              </td>
            </tr>
          )}
          {!loading &&
            users.map((u) => (
              <tr key={u.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                      {initials(u.fullName)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{u.fullName}</div>
                      <div className="text-xs text-slate-400">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4"><PlatformRoleBadge role={u.platformRole} /></td>
                <td className="px-4 py-4"><StoresCell user={u} /></td>
                <td className="px-4 py-4"><UserStatusBadge active={u.active} /></td>
                <td className="px-4 py-4 text-xs text-slate-500">{formatDate(u.createdAt)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <button className={iconBtn} title="Ver detalle" onClick={() => onView(u)}><Eye size={17} /></button>
                    <button className={iconBtn} title="Editar" onClick={() => onEdit(u)}><Pencil size={17} /></button>
                    <button className={iconBtn} title="Restablecer contraseña" onClick={() => onResetPassword(u)}>
                      <KeyRound size={17} />
                    </button>
                    <button
                      className={iconBtn}
                      title={u.active ? "Bloquear acceso" : "Desbloquear acceso"}
                      onClick={() => onToggleActive(u)}
                    >
                      {u.active ? <Ban size={17} /> : <CircleCheck size={17} />}
                    </button>
                    <button
                      className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                      title="Eliminar"
                      onClick={() => onDelete(u)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
