// src/hooks/useOrders.ts
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/OrderServices/orderService";
import { OrderStatus } from "@/services/OrderServices/Types/order";

export const useOrders = (storeId: string, status?: OrderStatus) =>
  useQuery({
    queryKey: ["orders", storeId, status ?? "ALL"],
    queryFn: () => getOrders(storeId, status),
    enabled: Boolean(storeId),
  });