// src/services/SaleServices/SaleItemServices.ts
import api from "@/api/client";
import type {
    SaleItemCreateRequest,
    SaleItemUpdateRequest,
    SaleItemResponse,
} from "../../types/SalesItems/dtosSaleItem"; // Ajusta tu ruta de tipos si es necesario

const base = "/sales";

// POST /api/sales/{saleId}/items -> Agregar un ítem a la venta
export const addItemToSale = async (
    saleId: string,
    payload: SaleItemCreateRequest
): Promise<SaleItemResponse> => {
    const { data } = await api.post<SaleItemResponse>(`${base}/${saleId}/items`, payload);
    return data;
};

// GET /api/sales/{saleId}/items -> Listar todos los ítems de una venta
export const listItemsBySale = async (saleId: string): Promise<SaleItemResponse[]> => {
    const { data } = await api.get<SaleItemResponse[]>(`${base}/${saleId}/items`);
    return data;
};

// GET /api/sales/items/{itemId} -> Obtener detalle de un ítem por su ID
export const getItemById = async (itemId: string): Promise<SaleItemResponse> => {
    const { data } = await api.get<SaleItemResponse>(`${base}/items/${itemId}`);
    return data;
};

// PUT /api/sales/items/{itemId} -> Modificar la cantidad de un ítem existente
export const updateSaleItem = async (
    itemId: string,
    payload: SaleItemUpdateRequest
): Promise<SaleItemResponse> => {
    const { data } = await api.put<SaleItemResponse>(`${base}/items/${itemId}`, payload);
    return data;
};

// DELETE /api/sales/items/{itemId} -> Eliminar un ítem de la venta
export const deleteSaleItem = async (itemId: string): Promise<void> => {
    await api.delete(`${base}/items/${itemId}`);
};