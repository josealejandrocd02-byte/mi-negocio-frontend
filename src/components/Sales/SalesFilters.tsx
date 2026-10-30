// src/components/Sales/SalesFilters.tsx
import { Search } from "lucide-react";
import { inputClass } from "@/components/AdminComponents/users/Modal";
//import type { StoreAdmin } from "@/types/..."; // Ajusta tu tipo de tienda si es necesario

interface SalesFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    adminStores: { storeId: string; storeName: string }[];
    storeId?: string;
    onStoreChange: (value: string) => void;
    loading: boolean;
    filteredCount: number;
    totalCount: number;
    noStores: boolean;
    hasMeError: boolean;
    salesError: string | null;
}

export function SalesFilters({
    search,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    adminStores,
    storeId,
    onStoreChange,
    loading,
    filteredCount,
    totalCount,
    noStores,
    hasMeError,
    salesError,
}: SalesFiltersProps) {
    return (
        <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    {/* Buscador */}
                    <div className="w-full sm:w-72 lg:w-80">
                        <label htmlFor="sale-search" className="sr-only">Buscar venta</label>
                        <div className="relative">
                            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                            <input
                                id="sale-search"
                                className={`${inputClass} pl-10`}
                                placeholder="Buscar por ID o vendedor"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filtro por Estado */}
                    <div className="w-full sm:w-56">
                        <label htmlFor="sale-status-filter" className="sr-only">Filtrar por estado</label>
                        <select
                            id="sale-status-filter"
                            className={inputClass}
                            value={statusFilter}
                            onChange={(e) => onStatusFilterChange(e.target.value)}
                        >
                            <option value="ALL">Todos los estados</option>
                            <option value="PENDING">Pendiente</option>
                            <option value="COMPLETED">Completada</option>
                            <option value="CANCELLED">Cancelada</option>
                        </select>
                    </div>

                    {/* Selector de Tienda */}
                    {adminStores.length > 1 && (
                        <div className="w-full sm:w-56">
                            <label htmlFor="sale-store-filter" className="sr-only">Seleccionar local</label>
                            <select
                                id="sale-store-filter"
                                className={inputClass}
                                value={storeId ?? ""}
                                onChange={(e) => onStoreChange(e.target.value)}
                            >
                                {adminStores.map((s) => (
                                    <option key={s.storeId} value={s.storeId}>{s.storeName}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {!noStores && !hasMeError && !salesError && (
                    <p className="text-xs text-slate-500 lg:whitespace-nowrap">
                        {loading ? (
                            "Cargando ventas…"
                        ) : (
                            <>
                                Mostrando <span className="font-semibold tabular-nums text-slate-700">{filteredCount}</span> de{" "}
                                <span className="font-semibold tabular-nums text-slate-700">{totalCount}</span> ventas
                            </>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
}