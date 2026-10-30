// src/types/SalesItems/dtosSaleItem.ts

export interface SaleItemCreateRequest {
    productId: string; // UUID
    quantity: number;
}

export interface SaleItemUpdateRequest {
    quantity: number;
}

export interface SaleItemResponse {
    id: string;          // UUID
    productId: string;   // UUID
    productName: string;
    quantity: number;
    unitPrice: number;   // BigDecimal manejado como number
    createdAt: string;   // Instant (ISO 8601 string)
}