import { Archive, Ban, CircleCheck, Eye, Pencil, RotateCcw, Store as StoreIcon, Trash2 } from "lucide-react";
import type { Store } from "@/services/AdminServices/Types/adminStore";
import { formatDate } from "@/components/AdminComponents/users/StatusBadge";
import StoreStatusBadge from "./StoreStatusBadge";

interface Props {
  stores: Store[];
  loading: boolean;
  onView: (s: Store) => void;
  onEdit: (s: Store) => void;
  onToggleStatus: (s: Store) => void; // suspender / reactivar
  onCloseStore: (s: Store) => void; // cerrar (conserva historial)
  onReopen: (s: Store) => void; // reabrir una cerrada
  onDelete: (s: Store) => void; // eliminar definitivamente (solo cerradas)
}

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const iconBtn = "rounded-lg p-1.5 text-slate-500 hover:bg-slate-100";

export default function StoresTable({
  stores, loading, onView, onEdit, onToggleStatus, onCloseStore, onReopen, onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className={`${th} rounded-l-lg`}>Local</th>
            <th className={th}>Administrador</th>
            <th className={th}>Miembros</th>
            <th className={th}>Estado</th>
            <th className={th}>Alta</th>
            <th className={`${th} rounded-r-lg`}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">Cargando locales…</td></tr>
          )}
          {!loading && stores.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                No hay locales que coincidan con la búsqueda.
              </td>
            </tr>
          )}
          {!loading &&
            stores.map((s) => {
              const closed = s.status === "CLOSED";
              return (
                <tr key={s.id} className={`border-b border-slate-100 last:border-0 ${closed ? "opacity-80" : ""}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {s.logoUrl ? (
                        <img src={s.logoUrl} alt={`Logo de ${s.name}`}
                          className="h-10 w-10 shrink-0 rounded-xl border border-slate-200 object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <StoreIcon size={18} />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-bold text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.address ?? "Sin dirección"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-slate-800">{s.ownerName}</div>
                    <div className="text-xs text-slate-400">{s.ownerEmail}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{s.memberCount ?? "—"}</td>
                  <td className="px-4 py-4"><StoreStatusBadge status={s.status} /></td>
                  <td className="px-4 py-4 text-xs text-slate-500">{formatDate(s.createdAt)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button className={iconBtn} title="Ver detalle" onClick={() => onView(s)}><Eye size={17} /></button>

                      {closed ? (
                        <>
                          <button className={`${iconBtn} text-emerald-600`} title="Reabrir local" onClick={() => onReopen(s)}>
                            <RotateCcw size={17} />
                          </button>
                          <button className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                            title="Eliminar definitivamente" onClick={() => onDelete(s)}>
                            <Trash2 size={17} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className={iconBtn} title="Editar" onClick={() => onEdit(s)}><Pencil size={17} /></button>
                          <button className={iconBtn} title={s.status === "ACTIVE" ? "Suspender" : "Reactivar"}
                            onClick={() => onToggleStatus(s)}>
                            {s.status === "ACTIVE" ? <Ban size={17} /> : <CircleCheck size={17} />}
                          </button>
                          <button className="rounded-lg p-1.5 text-amber-600 hover:bg-amber-50"
                            title="Cerrar local" onClick={() => onCloseStore(s)}>
                            <Archive size={17} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
