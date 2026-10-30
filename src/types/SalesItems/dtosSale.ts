import {SaleStatus} from "../SalesItems/sale.type"
// ==========================================
// RESPUESTAS (Responses)
// ==========================================

export interface SaleItemResponse {
    id: string;          // UUID
    productId: string;   // UUID
    productName: string;
    quantity: number;
    unitPrice: number;   // BigDecimal se maneja como number en TS
    createdAt: string;   // Instant se serializa como string (ISO 8601)
}

export interface SaleResponse {
    id: string;          // UUID
    storeId: string;     // UUID
    storeName: string;
    orderId: string | null; // UUID o null si es venta directa en mostrador
    soldById: string;    // UUID
    soldByName: string;
    total: number;       // BigDecimal
    status: SaleStatus;
    createdAt: string;   // Instant
    items: SaleItemResponse[];
}

// ==========================================
// PETICIONES (Requests / Payloads)
// ==========================================

export interface SaleItemRequest {
    productId: string;   // UUID
    quantity: number;
}

export interface SaleCreateRequest {
    storeId: string;     // UUID
    orderId?: string | null; // UUID (opcional o null para venta directa)
    items: SaleItemRequest[];
}

export interface SaleUpdateRequest {
    items: SaleItemRequest[];
}

export interface SaleStatusRequest {
    status: SaleStatus;
}

export interface SaleItemCreateRequest {
    productId: string;   // UUID
    quantity: number;
}

export interface SaleItemUpdateRequest {
    quantity: number;
}


