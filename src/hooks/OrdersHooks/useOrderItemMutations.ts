// src/hooks/useOrderItemMutations.ts
import { addOrderItem, removeOrderItem, updateOrderItem } from "@/services/OrderServices/orderService";
import { OrderItemRequest } from "@/services/OrderServices/Types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddOrderItem = (storeId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, request }: { orderId: string; request: OrderItemRequest }) =>
      addOrderItem(storeId, orderId, request),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders", storeId] }),
  });
};

export const useUpdateOrderItem = (storeId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      itemId,
      request,
    }: {
      orderId: string;
      itemId: string;
      request: OrderItemRequest;
    }) => updateOrderItem(storeId, orderId, itemId, request),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders", storeId] }),
  });
};

export const useRemoveOrderItem = (storeId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, itemId }: { orderId: string; itemId: string }) =>
      removeOrderItem(storeId, orderId, itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders", storeId] }),
  });
};