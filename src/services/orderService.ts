import api from "@/api/client";

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

// ================= PEDIDOS (orders) =================

export const getOrders = async (storeId: string, status?: OrderStatus): Promise<OrderResponse[]> => {
  const params = status ? { status } : undefined;
  const response = await api.get<OrderResponse[]>(`/stores/${storeId}/orders`, { params });
  return response.data;
};

export const getOrderById = async (storeId: string, orderId: string): Promise<OrderResponse> => {
  const response = await api.get<OrderResponse>(`/stores/${storeId}/orders/${orderId}`);
  return response.data;
};

export const createOrder = async (storeId: string, request: OrderRequest): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>(`/stores/${storeId}/orders`, request);
  return response.data;
};

export const updateOrder = async (
  storeId: string,
  orderId: string,
  request: OrderRequest
): Promise<OrderResponse> => {
  const response = await api.put<OrderResponse>(`/stores/${storeId}/orders/${orderId}`, request);
  return response.data;
};

export const updateOrderStatus = async (
  storeId: string,
  orderId: string,
  status: OrderStatus
): Promise<OrderResponse> => {
  const response = await api.patch<OrderResponse>(`/stores/${storeId}/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

export const deleteOrder = async (storeId: string, orderId: string): Promise<void> => {
  await api.delete(`/stores/${storeId}/orders/${orderId}`);
};

// ================= ITEMS DEL PEDIDO (order_items) =================

export const getOrderItems = async (
  storeId: string,
  orderId: string
): Promise<OrderItemResponse[]> => {
  const response = await api.get<OrderItemResponse[]>(`/stores/${storeId}/orders/${orderId}/items`);
  return response.data;
};

export const addOrderItem = async (
  storeId: string,
  orderId: string,
  request: OrderItemRequest
): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>(
    `/stores/${storeId}/orders/${orderId}/items`,
    request
  );
  return response.data;
};

export const updateOrderItem = async (
  storeId: string,
  orderId: string,
  itemId: string,
  request: OrderItemRequest
): Promise<OrderResponse> => {
  const response = await api.put<OrderResponse>(
    `/stores/${storeId}/orders/${orderId}/items/${itemId}`,
    request
  );
  return response.data;
};

export const removeOrderItem = async (
  storeId: string,
  orderId: string,
  itemId: string
): Promise<OrderResponse> => {
  const response = await api.delete<OrderResponse>(
    `/stores/${storeId}/orders/${orderId}/items/${itemId}`
  );
  return response.data;
};