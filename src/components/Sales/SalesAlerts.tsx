// src/components/Sales/SalesAlerts.tsx
import { RefreshCw, TriangleAlert, Info, X } from "lucide-react";

const retryBtn =
    "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white/70 px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ring-black/5 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";

interface SalesAlertsProps {
    hasMeError: boolean;
    onRetryMe: () => void;
    salesError: string | null;
    onRetrySales: () => void;
    notice: string | null;
    onCloseNotice: () => void;
}

export function SalesAlerts({
    hasMeError,
    onRetryMe,
    salesError,
    onRetrySales,
    notice,
    onCloseNotice,
}: SalesAlertsProps) {
    if (!hasMeError && !salesError && !notice) return null;

    return (
        <div className="space-y-3 border-b border-slate-100 bg-slate-50/50 px-4 py-4 sm:px-5">
            {hasMeError && (
                <div role="alert" className="flex flex-col gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-start gap-2">
                        <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>No se pudieron cargar tus locales.</span>
                    </span>
                    <button type="button" className={retryBtn} onClick={onRetryMe}>
                        <RefreshCw size={14} aria-hidden="true" /> Reintentar
                    </button>
                </div>
            )}

            {salesError && (
                <div role="alert" className="flex flex-col gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-start gap-2">
                        <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="min-w-0">{salesError}</span>
                    </span>
                    <button type="button" className={retryBtn} onClick={onRetrySales}>
                        <RefreshCw size={14} aria-hidden="true" /> Reintentar
                    </button>
                </div>
            )}

            {notice && (
                <div role="status" className="flex flex-col gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 sm:flex-row sm:items-start sm:justify-between">
                    <span className="flex items-start gap-2">
                        <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="min-w-0">{notice}</span>
                    </span>
                    <button type="button" className={retryBtn} onClick={onCloseNotice}>
                        <X size={14} aria-hidden="true" /> Cerrar
                    </button>
                </div>
            )}
        </div>
    );
}