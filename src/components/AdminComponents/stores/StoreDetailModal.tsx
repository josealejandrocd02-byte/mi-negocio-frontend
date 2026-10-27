import { useState } from "react";
import { Trash2, MapPin, Phone } from "lucide-react";
import type { Store } from "@/services/AdminServices/Types/adminStore";
import { useStoreDetail } from "@/hooks/AdminHooks/useStoreDetail";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Modal, { btnGhost, btnPrimary } from "@/components/AdminComponents/users/Modal";
import { formatDate, storeRoleLabel, UserStatusBadge } from "@/components/AdminComponents/users/StatusBadge";
import StoreStatusBadge from "./StoreStatusBadge";
import UserSelect from "./UserSelect";

interface Props {
  storeId: string;
  onClose: () => void;
  onStoreUpdated: (s: Store) => void;
}

export default function StoreDetailModal({ storeId, onClose, onStoreUpdated }: Props) {
  const { detail, loading, error, changeOwner, addAdmin, removeMember } = useStoreDetail(storeId, onStoreUpdated);
  const [ownerPick, setOwnerPick] = useState("");
  const [adminPick, setAdminPick] = useState("");
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const run = async (fn: () => Promise<unknown>, after?: () => void) => {
    setBusy(true);
    setActionError(null);
    try {
      await fn();
      after?.();
    } catch (e) {
      setActionError(getErrorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const store = detail?.store;
  const members = detail?.members ?? [];
  const memberIds = members.map((m) => m.userId);

  return (
    <Modal
      size="lg"
      title={store?.name ?? "Detalle del local"}
      onClose={onClose}
      footer={<button className={btnGhost} onClick={onClose}>Cerrar</button>}
    
    >
      {loading && <p className="py-8 text-center text-sm text-slate-400">Cargando…</p>}
      {error && <p className="m-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {store && (
        <>
          {/* Banner simple */}
          <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100 p-5">
            {store.logoUrl && (
              <img
                src={store.logoUrl}
                alt={`Logo de ${store.name}`}
                className="h-16 w-16 rounded-xl border border-slate-200 bg-white object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-bold text-slate-900">{store.name}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                {store.address && (
                  <span className="inline-flex items-center gap-1"><MapPin size={12} /> {store.address}</span>
                )}
                {store.phone && (
                  <span className="inline-flex items-center gap-1"><Phone size={12} /> {store.phone}</span>
                )}
                <span>Alta {formatDate(store.createdAt)}</span>
              </div>
            </div>
            <StoreStatusBadge status={store.status} />
          </div>

          {/* Contenido */}
          <div className="space-y-5 p-5">
            {/* Dueño */}
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Dueño</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{store.ownerName}</p>
              <p className="text-xs text-slate-400">{store.ownerEmail}</p>
              <div className="mt-3 flex gap-2">
                <div className="min-w-0 flex-1">
                  <UserSelect value={ownerPick} onChange={setOwnerPick} excludeIds={[store.ownerId]} />
                </div>
                <button
                  className={btnPrimary}
                  disabled={!ownerPick || busy}
                  onClick={() => run(() => changeOwner(ownerPick), () => setOwnerPick(""))}
                >
                  Cambiar dueño
                </button>
              </div>
            </div>

            {/* Equipo */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Equipo ({members.length})</h3>
              {members.length === 0 ? (
                <p className="mt-3 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
                  Este local aún no tiene miembros.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
                  {members.map((m) => {
                    const isOwner = m.owner || m.userId === store.ownerId;
                    return (
                      <li key={m.userId} className="flex items-center justify-between gap-3 px-4 py-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">{m.fullName}</div>
                          <div className="truncate text-xs text-slate-400">
                            {m.email} · {isOwner ? "Dueño" : storeRoleLabel[m.role]}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserStatusBadge active={m.active} />
                          {!isOwner &&
                            (confirmId === m.userId ? (
                              <>
                                <button className="text-xs font-semibold text-red-600" disabled={busy}
                                  onClick={() => run(() => removeMember(m.userId), () => setConfirmId(null))}>
                                  Quitar
                                </button>
                                <button className="text-xs text-slate-500" onClick={() => setConfirmId(null)}>No</button>
                              </>
                            ) : (
                              <button className="rounded-lg p-1.5 text-red-500 hover:bg-red-50" title="Desvincular"
                                onClick={() => setConfirmId(m.userId)}>
                                <Trash2 size={16} />
                              </button>
                            ))}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Agregar admin */}
            <div className="flex gap-2">
              <div className="min-w-0 flex-1">
                <UserSelect value={adminPick} onChange={setAdminPick} excludeIds={memberIds} />
              </div>
              <button className={btnGhost} disabled={!adminPick || busy}
                onClick={() => run(() => addAdmin(adminPick), () => setAdminPick(""))}>
                Vincular administrador
              </button>
            </div>

            {actionError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{actionError}</p>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}