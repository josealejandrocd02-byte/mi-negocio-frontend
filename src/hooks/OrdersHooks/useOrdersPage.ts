// src/hooks/useOrdersPage.ts
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { OrderStatus, StoreProductOption,DEFAULT_STORE_PRODUCTS } from "@/services/OrderServices/Types/order";

import { useMe } from "../useMe";
import { useOrders } from "./useOrders";
import {
  useCreateOrder,
  useDeleteOrder,
  useUpdateOrder,
  useUpdateOrderStatus,
} from "./useOrderMutations";
import {
  useAddOrderItem,
  useRemoveOrderItem,
  useUpdateOrderItem,
} from "./useOrderItemMutations";

const DEFAULT_STORE_ID = "44ac42b1-59c0-4929-88ea-9ca9faac29fd";

export const useOrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Sucursal activa ---
  const { data: me, isLoading: loadingMe } = useMe();
  const activeStores = useMemo(() => (me?.stores ?? []).filter((s) => s.active), [me]);

  const [selectedStoreId, setSelectedStoreId] = useState<string>(
    searchParams.get("storeId") || DEFAULT_STORE_ID
  );

  useEffect(() => {
    const fromUrl = searchParams.get("storeId");
    if (fromUrl) {
      setSelectedStoreId(fromUrl);
    } else if (
      activeStores.length > 0 &&
      !activeStores.some((s) => s.storeId === selectedStoreId)
    ) {
      setSelectedStoreId(activeStores[0].storeId);
    }
  }, [activeStores, searchParams, selectedStoreId]);

  const handleStoreChange = (newStoreId: string) => {
    setSelectedStoreId(newStoreId);
    setSearchParams({ storeId: newStoreId });
  };

  // --- Filtros ---
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // --- Query de pedidos ---
  const ordersQuery = useOrders(
    selectedStoreId,
    statusFilter === "ALL" ? undefined : statusFilter
  );
  const orders = ordersQuery.data ?? [];

  // --- Catálogo combinado ---
  const availableProducts = useMemo<StoreProductOption[]>(() => {
    const map = new Map<string, StoreProductOption>();
    for (const p of DEFAULT_STORE_PRODUCTS) map.set(p.id, p);
    for (const o of orders) {
      for (const item of o.items || []) {
        if (!map.has(item.productId)) {
          map.set(item.productId, {
            id: item.productId,
            name: item.productName,
            price: item.unitPrice,
          });
        }
      }
    }
    return Array.from(map.values());
  }, [orders]);

  // --- Filtrado por texto ---
  const filteredOrders = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        (o.customerName ?? "").toLowerCase().includes(q) ||
        (o.customerPhone ?? "").toLowerCase().includes(q) ||
        (o.deliveryAddress ?? "").toLowerCase().includes(q) ||
        (o.notes ?? "").toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.productName.toLowerCase().includes(q))
    );
  }, [orders, searchTerm]);

  // --- Stats ---
  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "PENDING").length,
      preparing: orders.filter((o) => o.status === "PREPARING").length,
      ready: orders.filter((o) => o.status === "READY").length,
      delivered: orders.filter((o) => o.status === "DELIVERED").length,
    }),
    [orders]
  );

  // --- Mutations ---
  const createOrderMutation = useCreateOrder(selectedStoreId);
  const updateOrderMutation = useUpdateOrder(selectedStoreId);
  const updateStatusMutation = useUpdateOrderStatus(selectedStoreId);
  const deleteOrderMutation = useDeleteOrder(selectedStoreId);
  const addItemMutation = useAddOrderItem(selectedStoreId);
  const updateItemMutation = useUpdateOrderItem(selectedStoreId);
  const removeItemMutation = useRemoveOrderItem(selectedStoreId);

  // Derivado: ¿hay alguna mutación en vuelo?
  const busyAction =
    createOrderMutation.isPending ||
    updateOrderMutation.isPending ||
    updateStatusMutation.isPending ||
    deleteOrderMutation.isPending ||
    addItemMutation.isPending ||
    updateItemMutation.isPending ||
    removeItemMutation.isPending;

  return {
    // Sucursal
    activeStores,
    selectedStoreId,
    handleStoreChange,
    loadingMe,

    // Filtros
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,

    // Datos
    orders,
    filteredOrders,
    availableProducts,
    stats,
    loadingOrders: ordersQuery.isLoading,
    errorOrders: ordersQuery.isError,
    ordersErrorObj: ordersQuery.error,
    refetchOrders: ordersQuery.refetch,

    // Mutations (crudas por si necesitas callbacks puntuales)
    createOrderMutation,
    updateOrderMutation,
    updateStatusMutation,
    deleteOrderMutation,
    addItemMutation,
    updateItemMutation,
    removeItemMutation,

    // Estado global
    busyAction,
  };
};