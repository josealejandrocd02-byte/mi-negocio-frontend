// src/hooks/useOrderMutations.ts
import { createOrder, deleteOrder, updateOrder, updateOrderStatus } from "@/services/OrderServices/orderService";
import { OrderRequest, OrderStatus } from "@/services/OrderServices/Types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCreateOrder = (storeId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (request: OrderRequest) => createOrder(storeId, request),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders", storeId] }),
  });
};

export const useUpdateOrder = (storeId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, request }: { orderId: string; request: OrderRequest }) =>
      updateOrder(storeId, orderId, request),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders", storeId] }),
  });
};

export const useUpdateOrderStatus = (storeId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      updateOrderStatus(storeId, orderId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders", storeId] }),
  });
};

export const useDeleteOrder = (storeId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => deleteOrder(storeId, orderId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders", storeId] }),
  });
};