import { Plus } from "lucide-react";
import type { AdminUser } from "@/services/AdminServices/Types/adminUser";
import Modal, { btnGhost } from "./Modal";
import { formatDate, PlatformRoleBadge, storeRoleLabel, UserStatusBadge } from "./StatusBadge";

interface Props {
  user: AdminUser;
  onClose: () => void;
  onAssignStore: (u: AdminUser) => void;
}

export default function UserDetailModal({ user, onClose, onAssignStore }: Props) {
  return (
    <Modal
      title={user.fullName}
      description={user.email}
      size="lg"
      onClose={onClose}
      footer={<button className={btnGhost} onClick={onClose}>Cerrar</button>}
    >
      <div className="flex flex-wrap items-center gap-2">
        <PlatformRoleBadge role={user.platformRole} />
        <UserStatusBadge active={user.active} />
        <span className="text-xs text-slate-400">Alta {formatDate(user.createdAt)}</span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Sucursales ({user.stores.length})</h3>
        <button
          onClick={() => onAssignStore(user)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
        >
          <Plus size={16} /> Ligar sucursal
        </button>
      </div>

      {user.stores.length === 0 ? (
        <p className="mt-3 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
          Este usuario aún no pertenece a ninguna sucursal.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
          {user.stores.map((s) => (
            <li key={s.storeId} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">{s.storeName}</div>
                <div className="text-xs text-slate-400">{storeRoleLabel[s.role]}</div>
              </div>
              <UserStatusBadge active={s.active} />
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
