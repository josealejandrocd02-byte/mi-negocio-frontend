// src/components/Sales/SalesTable.tsx
import { Eye, Pencil, Ban, Store, ShoppingBag, SearchX } from "lucide-react";
import type { SaleResponse } from "../../types/SalesItems/dtosSale";
import { btnGhost } from "@/components/AdminComponents/users/Modal";

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const thRight = "px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500";
const iconBtn = "rounded-lg p-2 text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
const money = (n: number) => `Bs ${Number(n).toFixed(2)}`;

interface SalesTableProps {
    loading: boolean;
    noStores: boolean;
    blockingError: boolean;
    salesError: boolean;
    sales: SaleResponse[];
    filtered: SaleResponse[];
    onClearFilters: () => void;
    onViewDetails: (id: string) => void;
    onModify: (id: string) => void;
    onCancel: (id: string) => void;
}

export function SalesTable({
    loading,
    noStores,
    blockingError,
    salesError,
    sales,
    filtered,
    onClearFilters,
    onViewDetails,
    onModify,
    onCancel,
}: SalesTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse" aria-busy={loading}>
                {loading && <caption className="sr-only">Cargando ventas…</caption>}
                <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                        <th scope="col" className={th}>ID Venta</th>
                        <th scope="col" className={th}>Vendedor</th>
                        <th scope="col" className={thRight}>Total</th>
                        <th scope="col" className={th}>Estado</th>
                        <th scope="col" className={th}>Fecha</th>
                        <th scope="col" className={thRight}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Skeletons de carga */}
                    {loading && Array.from({ length: 5 }).map((_, index) => (
                        <tr key={`loading-${index}`} aria-hidden="true" className="border-b border-slate-100 last:border-0">
                            <td className="px-4 py-3.5"><div className="skeleton h-3.5 w-28 rounded-full" /></td>
                            <td className="px-4 py-3.5"><div className="skeleton h-3.5 w-32 rounded-full" /></td>
                            <td className="px-4 py-3.5"><div className="skeleton ml-auto h-3.5 w-20 rounded-full" /></td>
                            <td className="px-4 py-3.5"><div className="skeleton h-6 w-20 rounded-full" /></td>
                            <td className="px-4 py-3.5"><div className="skeleton h-3.5 w-36 rounded-full" /></td>
                            <td className="px-4 py-3.5"><div className="skeleton ml-auto h-8 w-24 rounded-lg" /></td>
                        </tr>
                    ))}

                    {/* Sin tiendas asignadas */}
                    {noStores && (
                        <tr>
                            <td colSpan={6} className="px-6 py-14">
                                <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                        <Store size={26} aria-hidden="true" />
                                    </div>
                                    <p className="mt-4 text-sm font-semibold text-slate-700">Sin locales asignados</p>
                                    <p className="mt-1 text-sm text-slate-500">No administras ningún local, por lo que no hay ventas que gestionar.</p>
                                </div>
                            </td>
                        </tr>
                    )}

                    {/* Sin ventas registradas o resultados de búsqueda vacíos */}
                    {!loading && !noStores && !blockingError && !salesError && filtered.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-14">
                                <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                                        {sales.length === 0 ? <ShoppingBag size={26} aria-hidden="true" /> : <SearchX size={26} aria-hidden="true" />}
                                    </div>
                                    <p className="mt-4 text-sm font-semibold text-slate-700">
                                        {sales.length === 0 ? "Aún no hay ventas en este local." : "No hay ventas para mostrar."}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {sales.length === 0 ? "Las ventas registradas aparecerán aquí." : "Prueba con otro término de búsqueda o cambia los filtros."}
                                    </p>
                                    {sales.length > 0 && (
                                        <button type="button" className={`${btnGhost} mt-5`} onClick={onClearFilters}>
                                            Limpiar filtros
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )}

                    {/* Listado de Ventas Filtradas */}
                    {!loading && filtered.map((sale) => (
                        <tr key={sale.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70">
                            <td className="px-4 py-3.5 text-sm font-mono font-medium text-slate-700">
                                {sale.id.substring(0, 8)}...
                            </td>
                            <td className="px-4 py-3.5 text-sm font-semibold text-slate-900">
                                {sale.soldByName}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-bold tabular-nums text-slate-900">
                                {money(sale.total)}
                            </td>
                            <td className="px-4 py-3.5">
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                                    sale.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10' :
                                    sale.status === 'PENDING' ? 'bg-amber-50 text-amber-700 ring-amber-600/10' : 'bg-red-50 text-red-700 ring-red-600/10'
                                }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${
                                        sale.status === 'COMPLETED' ? 'bg-emerald-500' : sale.status === 'PENDING' ? 'bg-amber-500' : 'bg-red-500'
                                    }`} aria-hidden="true" />
                                    {sale.status === 'COMPLETED' ? 'Completada' : sale.status === 'PENDING' ? 'Pendiente' : 'Cancelada'}
                                </span>
                            </td>
                            <td className="px-4 py-3.5 text-sm text-slate-500">
                                {new Date(sale.createdAt).toLocaleString()}
                            </td>
                            <td className="px-4 py-3.5">
                                <div className="flex items-center justify-end gap-1">
                                    <button type="button" className={`${iconBtn} hover:bg-indigo-50 hover:text-indigo-600`} title="Ver detalles" onClick={() => onViewDetails(sale.id)}>
                                        <Eye size={17} aria-hidden="true" />
                                    </button>
                                    <button type="button" className={`${iconBtn} hover:bg-amber-50 hover:text-amber-700 disabled:opacity-30`} title="Modificar venta" disabled={sale.status === 'CANCELLED'} onClick={() => onModify(sale.id)}>
                                        <Pencil size={17} aria-hidden="true" />
                                    </button>
                                    <button type="button" className={`${iconBtn} hover:bg-red-50 hover:text-red-700 disabled:opacity-30`} title="Cancelar venta" disabled={sale.status === 'CANCELLED'} onClick={() => onCancel(sale.id)}>
                                        <Ban size={17} aria-hidden="true" />
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