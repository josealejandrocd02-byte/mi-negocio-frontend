// src/components/Sales/EditSaleModal.tsx
import { useEffect, useState } from "react";
import { X, ShoppingBag, Trash2, Loader2, Save, AlertCircle } from "lucide-react";
import { getSaleById, updateSale } from "@/services/SaleServices/SaleServices";
import type { SaleResponse } from "../../types/SalesItems/dtosSale";
import { isAxiosError } from "axios";
const money = (n: number) => `Bs ${Number(n).toFixed(2)}`;

interface EditSaleModalProps {
    isOpen: boolean;
    saleId: string | null;
    onClose: () => void;
    onSaleUpdated: () => void;
}

export function EditSaleModal({ isOpen, saleId, onClose, onSaleUpdated }: EditSaleModalProps) {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sale, setSale] = useState<SaleResponse | null>(null);

    // Estado local editable para los ítems de la venta
    const [items, setItems] = useState<
        { productId: string; productName: string; quantity: number; unitPrice: number }[]
    >([]);

    useEffect(() => {
        if (isOpen && saleId) {
            const fetchSale = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const data = await getSaleById(saleId);
                    setSale(data);
                    setItems(
                        data.items.map((item) => ({
                            productId: item.productId,
                            productName: item.productName,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                        }))
                    );
                } catch (err) {
                    console.error(err);
                    setError("No se pudo cargar la venta para su edición.");
                } finally {
                    setLoading(false);
                }
            };
            fetchSale();
        } else {
            setSale(null);
            setItems([]);
        }
    }, [isOpen, saleId]);

    const handleQuantityChange = (index: number, newQty: number) => {
        if (newQty < 1) return;
        const updated = [...items];
        updated[index].quantity = newQty;
        setItems(updated);
    };

    const handleRemoveItem = (index: number) => {
        if (items.length <= 1) {
            setError("La venta debe tener al menos un producto.");
            return;
        }
        setError(null);
        setItems(items.filter((_, i) => i !== index));
    };

    const calculatedTotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!saleId) return;

        try {
            setSaving(true);
            setError(null);
            await updateSale(saleId, {
                items: items.map((i) => ({
                    productId: i.productId,
                    quantity: i.quantity,
                })),
            });
            onSaleUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || "Ocurrió un error al actualizar la venta.");
            } else {
                setError("Ocurrió un error inesperado al actualizar la venta.");
            }
        } finally {
            setSaving(false);
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
                {/* Cabecera */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <ShoppingBag size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Modificar Venta</h2>
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

                {/* Formulario */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <Loader2 className="animate-spin text-amber-600" size={32} />
                        <p className="mt-3 text-sm font-medium">Cargando datos de la venta...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                                    <AlertCircle size={18} className="shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {sale && (
                                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 text-sm space-y-1">
                                    <p><strong className="text-slate-700">Sucursal:</strong> {sale.storeName}</p>
                                    <p><strong className="text-slate-700">Vendedor:</strong> {sale.soldByName}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-slate-900">Editar Productos y Cantidades</h3>
                                <div className="overflow-hidden rounded-xl border border-slate-200">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                            <tr>
                                                <th className="px-4 py-2.5">Producto</th>
                                                <th className="px-4 py-2.5 text-center">Cantidad</th>
                                                <th className="px-4 py-2.5 text-right">Precio Unit.</th>
                                                <th className="px-4 py-2.5 text-right">Subtotal</th>
                                                <th className="px-4 py-2.5 text-center">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {items.map((item, index) => (
                                                <tr key={item.productId} className="hover:bg-slate-50/50">
                                                    <td className="px-4 py-3 font-medium text-slate-800">{item.productName}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            max={10000}
                                                            className="w-16 rounded-lg border border-slate-300 px-2 py-1 text-center text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-right tabular-nums text-slate-600">{money(item.unitPrice)}</td>
                                                    <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">
                                                        {money(item.unitPrice * item.quantity)}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveItem(index)}
                                                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                            title="Eliminar producto"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Total recalculado */}
                            <div className="flex items-center justify-between rounded-xl bg-amber-50/60 px-5 py-4 border border-amber-100">
                                <span className="text-sm font-semibold text-amber-900">Total Recalculado</span>
                                <span className="text-lg font-bold text-amber-900">{money(calculatedTotal)}</span>
                            </div>
                        </div>

                        {/* Pie del Modal */}
                        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={saving || items.length === 0}
                                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}