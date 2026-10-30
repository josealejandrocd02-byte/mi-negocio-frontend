// src/components/Sales/SaleDetailsModal.tsx
import { useEffect, useState } from "react";
import { X, Store, User, Calendar, FileText, ShoppingBag, Loader2 } from "lucide-react";
import { getSaleById } from "@/services/SaleServices/SaleServices";
import type { SaleResponse } from "../../types/SalesItems/dtosSale";

const money = (n: number) => `Bs ${Number(n).toFixed(2)}`;

interface SaleDetailsModalProps {
    isOpen: boolean;
    saleId: string | null;
    onClose: () => void;
}

export function SaleDetailsModal({ isOpen, saleId, onClose }: SaleDetailsModalProps) {
    const [sale, setSale] = useState<SaleResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && saleId) {
            const fetchDetails = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const data = await getSaleById(saleId);
                    setSale(data);
                } catch (err) {
                    console.error(err);
                    setError("No se pudieron cargar los detalles de la venta.");
                } finally {
                    setLoading(false);
                }
            };
            fetchDetails();
        } else {
            setSale(null);
        }
    }, [isOpen, saleId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
                {/* Cabecera del Modal */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <ShoppingBag size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Detalle de Venta</h2>
                            <p className="text-xs font-mono text-slate-500">{saleId}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Contenido */}
                <div className="max-h-[75vh] overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <Loader2 className="animate-spin text-indigo-600" size={32} />
                            <p className="mt-3 text-sm font-medium">Cargando detalles...</p>
                        </div>
                    ) : error ? (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-700">
                            {error}
                        </div>
                    ) : sale ? (
                        <div className="space-y-6">
                            {/* Grid de información general */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                    <Store size={18} className="mt-0.5 text-slate-400" />
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">Sucursal</p>
                                        <p className="text-sm font-semibold text-slate-800">{sale.storeName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                    <User size={18} className="mt-0.5 text-slate-400" />
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">Vendedor</p>
                                        <p className="text-sm font-semibold text-slate-800">{sale.soldByName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                    <Calendar size={18} className="mt-0.5 text-slate-400" />
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">Fecha y Hora</p>
                                        <p className="text-sm font-semibold text-slate-800">
                                            {new Date(sale.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                    <FileText size={18} className="mt-0.5 text-slate-400" />
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">Pedido Asociado</p>
                                        <p className="text-sm font-semibold font-mono text-slate-800">
                                            {sale.orderId ? sale.orderId.substring(0, 8) + "..." : "Venta directa"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Estado y Total */}
                            <div className="flex items-center justify-between rounded-xl bg-indigo-50/60 px-5 py-4 border border-indigo-100">
                                <div>
                                    <p className="text-xs font-medium text-indigo-600/80">Estado Actual</p>
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 ${
                                        sale.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                                        sale.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {sale.status === 'COMPLETED' ? 'Completada' : sale.status === 'PENDING' ? 'Pendiente' : 'Cancelada'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-medium text-indigo-600/80">Total de la Venta</p>
                                    <p className="text-xl font-bold text-indigo-900">{money(sale.total)}</p>
                                </div>
                            </div>

                            {/* Tabla de Productos de la Venta */}
                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-slate-900">Productos en la Venta</h3>
                                <div className="overflow-hidden rounded-xl border border-slate-200">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                            <tr>
                                                <th className="px-4 py-2.5">Producto</th>
                                                <th className="px-4 py-2.5 text-center">Cant.</th>
                                                <th className="px-4 py-2.5 text-right">Precio Unit.</th>
                                                <th className="px-4 py-2.5 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {sale.items.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50/50">
                                                    <td className="px-4 py-3 font-medium text-slate-800">{item.productName}</td>
                                                    <td className="px-4 py-3 text-center tabular-nums text-slate-600">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-right tabular-nums text-slate-600">{money(item.unitPrice)}</td>
                                                    <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">
                                                        {money(item.unitPrice * item.quantity)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Pie del Modal */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}