// src/pages/SalesPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Ban, Loader2, AlertTriangle, X } from "lucide-react";
import { useMyStores } from "@/hooks/StoreAdimHooks/useMyStores";
import { listSalesByStore, cancelSale } from "../../services/SaleServices/SaleServices";
import type { SaleResponse } from "../../types/SalesItems/dtosSale";
import type { SaleStatus } from "../../types/SalesItems/sale.type";

import { SalesFilters } from "@/components/Sales/SalesFilters";
import { SalesAlerts } from "@/components/Sales/SalesAlerts";
import { SalesTable } from "@/components/Sales/SalesTable";
import { SaleDetailsModal } from "@/components/Sales/SaleDetailsModal";
import { EditSaleModal } from "@/components/Sales/EditSaleModal";

export default function SalesPage() {
    const {
        adminStores,
        isLoading: meLoading,
        isError: meError,
        refetch: refetchMe,
    } = useMyStores();

    const [pickedStoreId, setPickedStoreId] = useState<string>();
    const storeId = adminStores.some((s) => s.storeId === pickedStoreId)
        ? pickedStoreId
        : adminStores[0]?.storeId;

    const [sales, setSales] = useState<SaleResponse[]>([]);
    const [salesLoading, setSalesLoading] = useState<boolean>(false);
    const [salesError, setSalesError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [notice, setNotice] = useState<string | null>(null);

    const previousStoreId = useRef<string | undefined>(undefined);
    useEffect(() => {
        const previous = previousStoreId.current;
        previousStoreId.current = storeId;
        if (previous !== undefined && previous !== storeId) {
            setSearch("");
            setStatusFilter("ALL");
            setNotice(null);
        }
    }, [storeId]);

    const fetchSales = async (currentStoreId: string) => {
        try {
            setSalesLoading(true);
            const data = await listSalesByStore(currentStoreId);
            setSales(data);
            setSalesError(null);
        } catch (err) {
            console.error(err);
            setSalesError("No se pudo cargar el listado de ventas de la sucursal.");
        } finally {
            setSalesLoading(false);
        }
    };

    useEffect(() => {
        if (storeId) {
            fetchSales(storeId);
        } else if (!meLoading && adminStores.length === 0) {
            setSales([]);
            setSalesLoading(false);
        }
    }, [storeId, meLoading, adminStores.length]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return sales.filter((s) => {
            if (statusFilter !== "ALL" && s.status !== statusFilter) return false;
            return (!q || s.id.toLowerCase().includes(q) || s.soldByName.toLowerCase().includes(q));
        });
    }, [sales, search, statusFilter]);

    // Estados para modales
    const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const [editSaleId, setEditSaleId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Estados para el Modal de Cancelación
    const [cancelSaleId, setCancelSaleId] = useState<string | null>(null);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    const handleViewDetails = (id: string) => {
        setSelectedSaleId(id);
        setIsDetailsModalOpen(true);
    };

    const handleModify = (id: string) => {
        setEditSaleId(id);
        setIsEditModalOpen(true);
    };

    const handleCancelClick = (id: string) => {
        setCancelSaleId(id);
        setIsCancelModalOpen(true);
    };

    const confirmCancelSale = async () => {
        if (!cancelSaleId) return;
        try {
            setCancelling(true);
            await cancelSale(cancelSaleId);
            setSales((prevSales) =>
                prevSales.map((sale) =>
                    sale.id === cancelSaleId ? { ...sale, status: "CANCELLED" as SaleStatus } : sale
                )
            );
            setNotice("La venta fue cancelada exitosamente.");
            setIsCancelModalOpen(false);
            setCancelSaleId(null);
        } catch (err) {
            console.error(err);
            alert("Ocurrió un error al intentar cancelar la venta.");
        } finally {
            setCancelling(false);
        }
    };

    const loading = meLoading || salesLoading;
    const noStores = !meLoading && !meError && adminStores.length === 0;
    const hasMeError = !meLoading && meError;
    const blockingError = hasMeError;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
            {/* Migas de pan */}
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest">
                <span className="text-indigo-600">Mi negocio</span>
                <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
                <span className="text-slate-500">Operaciones</span>
                <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
                <span className="text-slate-500" aria-current="page">Ventas</span>
            </nav>

            {/* Cabecera */}
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Ventas</h1>
                        <span aria-hidden="true" className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-600">
                            {loading ? "…" : sales.length}
                        </span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-500 sm:mt-2">Administra y revisa las ventas realizadas en el local.</p>
                </div>
            </div>

            {/* Contenedor principal de Filtros, Alertas y Tabla */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <SalesFilters
                    search={search}
                    onSearchChange={setSearch}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    adminStores={adminStores}
                    storeId={storeId}
                    onStoreChange={setPickedStoreId}
                    loading={loading}
                    filteredCount={filtered.length}
                    totalCount={sales.length}
                    noStores={noStores}
                    hasMeError={Boolean(hasMeError)}
                    salesError={salesError}
                />

                <SalesAlerts
                    hasMeError={Boolean(hasMeError)}
                    onRetryMe={() => refetchMe()}
                    salesError={salesError}
                    onRetrySales={() => storeId && fetchSales(storeId)}
                    notice={notice}
                    onCloseNotice={() => setNotice(null)}
                />

                <SalesTable
                    loading={loading}
                    noStores={noStores}
                    blockingError={Boolean(blockingError)}
                    salesError={Boolean(salesError)}
                    sales={sales}
                    filtered={filtered}
                    onClearFilters={() => { setSearch(""); setStatusFilter("ALL"); }}
                    onViewDetails={handleViewDetails}
                    onModify={handleModify}
                    onCancel={handleCancelClick}
                />

                {/* Modal de Detalles */}
                <SaleDetailsModal
                    isOpen={isDetailsModalOpen}
                    saleId={selectedSaleId}
                    onClose={() => {
                        setIsDetailsModalOpen(false);
                        setSelectedSaleId(null);
                    }}
                />

                {/* Modal de Modificación / Edición */}
                <EditSaleModal
                    isOpen={isEditModalOpen}
                    saleId={editSaleId}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditSaleId(null);
                    }}
                    onSaleUpdated={() => {
                        if (storeId) fetchSales(storeId);
                        setNotice("La venta fue modificada exitosamente.");
                    }}
                />

                {/* Modal de Confirmación de Cancelación */}
                {isCancelModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900">Cancelar Venta</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsCancelModalOpen(false)}
                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-slate-600">
                                    ¿Estás seguro de que deseas cancelar esta venta? Esta acción cambiará su estado a <strong className="text-red-600">CANCELLED</strong> y no se podrá revertir fácilmente.
                                </p>
                                <p className="mt-2 text-xs font-mono text-slate-400">ID: {cancelSaleId}</p>
                            </div>

                            <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsCancelModalOpen(false)}
                                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                                >
                                    Volver
                                </button>
                                <button
                                    type="button"
                                    disabled={cancelling}
                                    onClick={confirmCancelSale}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
                                >
                                    {cancelling && <Loader2 size={16} className="animate-spin" />}
                                    Sí, cancelar venta
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}