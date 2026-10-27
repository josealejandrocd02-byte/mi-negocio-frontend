
export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

export interface OrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  productImageUrl: string | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponse {
  id: string;
  storeId: string;
  storeName: string;
  createdByUserId: string;
  createdByName: string;
  customerName: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  notes: string | null;
  status: OrderStatus;
  total: number;
  createdAt: string | null;
  items: OrderItemResponse[];
}

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  items?: OrderItemRequest[];
}

export interface StoreProductOption {
  id: string;
  name: string;
  price: number;
  stockQuantity?: number;
}

// Catálogo base sincronizado con los productos de prueba en la BD 'minegocio'
export const DEFAULT_STORE_PRODUCTS: StoreProductOption[] = [
  { id: "b0000000-0000-0000-0000-000000000001", name: "Coca-Cola 2L", price: 15.0 },
  { id: "b0000000-0000-0000-0000-000000000002", name: "Hamburguesa Doble Queso", price: 35.0 },
  { id: "b0000000-0000-0000-0000-000000000003", name: "Pizza Napolitana Familiar", price: 65.0 },
  { id: "b0000000-0000-0000-0000-000000000004", name: "Torta Helada de Chocolate", price: 20.0 },
  { id: "b0000000-0000-0000-0000-000000000005", name: "Combo Familiar Fin de Semana", price: 110.0 },
  { id: "b0000000-0000-0000-0000-000000000006", name: "Jugo Natural de Maracuya 1L", price: 18.0 },
];
