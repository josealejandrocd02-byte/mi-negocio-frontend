import api from "@/api/client";
import { OrderItemRequest, OrderItemResponse, OrderRequest, OrderResponse, OrderStatus, StoreProductOption } from "./Types/order";



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