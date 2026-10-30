import api from "@/api/client";
import type {
    SaleCreateRequest,
    SaleResponse,
    SaleUpdateRequest,
    SaleStatusRequest,
} from "../../types/SalesItems/dtosSale"; // Ajusta la ruta de tus tipos según tu estructura de carpetas

const base = "/sales";

// POST /api/sales -> Crear venta
export const createSale = async (payload: SaleCreateRequest): Promise<SaleResponse> => {
    const { data } = await api.post<SaleResponse>(base, payload);
    return data;
};

// GET /api/sales/store/{storeId} -> Listado de ventas por tienda
export const listSalesByStore = async (storeId: string): Promise<SaleResponse[]> => {
    const { data } = await api.get<SaleResponse[]>(`${base}/store/${storeId}`);
    return data;
};

// GET /api/sales/{id} -> Obtener detalle de una venta por ID
export const getSaleById = async (id: string): Promise<SaleResponse> => {
    const { data } = await api.get<SaleResponse>(`${base}/${id}`);
    return data;
};

// PUT /api/sales/{id} -> Modificar items de la venta (recalcula el total)
export const updateSale = async (
    id: string,
    payload: SaleUpdateRequest,
): Promise<SaleResponse> => {
    const { data } = await api.put<SaleResponse>(`${base}/${id}`, payload);
    return data;
};

// PATCH /api/sales/{id}/status -> Modificar el estado de la venta
export const changeSaleStatus = async (
    id: string,
    payload: SaleStatusRequest,
): Promise<SaleResponse> => {
    const { data } = await api.patch<SaleResponse>(`${base}/${id}/status`, payload);
    return data;
};

// PATCH /api/sales/{id}/cancel -> Cancelación lógica (estado CANCELLED)
export const cancelSale = async (id: string): Promise<SaleResponse> => {
    const { data } = await api.patch<SaleResponse>(`${base}/${id}/cancel`);
    return data;
};

// DELETE /api/sales/{id} -> Eliminar venta (solo PENDING o CANCELLED)
export const deleteSale = async (id: string): Promise<void> => {
    await api.delete(`${base}/${id}`);
};