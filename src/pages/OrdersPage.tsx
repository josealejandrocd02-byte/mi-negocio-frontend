import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CheckCircle2,
  ChefHat,
  Clock,
  Edit3,
  Eye,
  MapPin,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShoppingBag,
  Store as StoreIcon,
  Trash2,
  User,
  XCircle,
} from "lucide-react";

import AppHeader from "@/components/layout/AppHeader";
import BadgeOrder from "@/components/ui/BadgeOrder";
import Modal from "@/components/ui/Modal";
import { getMe } from "@/services/AuthServices/authService";
import {
  addOrderItem,
  createOrder,
   DEFAULT_STORE_PRODUCTS,
  deleteOrder,
  getOrders,
  OrderItemRequest,
  OrderResponse,
  OrderStatus,
  removeOrderItem,
  StoreProductOption,
  updateOrder,
  updateOrderItem,
  updateOrderStatus,
} from "@/services/orderService";

const DEFAULT_STORE_ID = "44ac42b1-59c0-4929-88ea-9ca9faac29fd";

const STATUS_META: Record<
  OrderStatus,
  {
    label: string;
    badge: "warning" | "info" | "success" | "error";
    next?: OrderStatus;
    nextLabel?: string;
  }
> = {
  PENDING: {
    label: "Pendiente",
    badge: "warning",
    next: "PREPARING",
    nextLabel: "Pasar a Cocina",
  },
  PREPARING: {
    label: "En preparación",
    badge: "info",
    next: "READY",
    nextLabel: "Marcar Listo",
  },
  READY: {
    label: "Listo para entregar",
    badge: "info",
    next: "DELIVERED",
    nextLabel: "Entregar (Generar Venta)",
  },
  DELIVERED: {
    label: "Entregado",
    badge: "success",
  },
  CANCELLED: {
    label: "Cancelado",
    badge: "error",
  },
};

const extractApiError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string; errors?: Record<string, string> }
      | undefined;
    if (data?.errors) {
      const first = Object.values(data.errors)[0];
      if (first) return first;
    }
    if (data?.message) return data.message;
    if (err.response?.status === 403) return "No tienes permisos para realizar esta acción en la sucursal.";
    if (err.response?.status === 404) return "Recurso no encontrado en esta sucursal.";
  }
  return "Ocurrió un error al procesar la solicitud.";
};

const formatCurrency = (val: number | undefined | null) =>
  `Bs ${Number(val ?? 0).toFixed(2)}`;

const OrdersPage = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Obtener sucursales del usuario logueado (GET /api/me)
  const { data: me, isLoading: loadingMe } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  const activeStores = useMemo(
    () => (me?.stores ?? []).filter((s) => s.active),
    [me]
  );

  const [selectedStoreId, setSelectedStoreId] = useState<string>(
    searchParams.get("storeId") || DEFAULT_STORE_ID
  );

  useEffect(() => {
    const fromUrl = searchParams.get("storeId");
    if (fromUrl) {
      setSelectedStoreId(fromUrl);
    } else if (activeStores.length > 0 && !activeStores.some((s) => s.storeId === selectedStoreId)) {
      setSelectedStoreId(activeStores[0].storeId);
    }
  }, [activeStores, searchParams, selectedStoreId]);

  const handleStoreChange = (newStoreId: string) => {
    setSelectedStoreId(newStoreId);
    setSearchParams({ storeId: newStoreId });
  };

  // 2. Filtros y búsqueda
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [busyAction, setBusyAction] = useState(false);

  // 3. Consultar pedidos de la sucursal (GET /api/stores/{storeId}/orders)
  const {
    data: orders = [],
    isLoading: loadingOrders,
    isError: errorOrders,
    error: ordersErrorObj,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders", selectedStoreId, statusFilter],
    queryFn: () =>
      getOrders(selectedStoreId, statusFilter === "ALL" ? undefined : statusFilter),
    enabled: Boolean(selectedStoreId),
  });

  // 4. Catálogo de productos conocidos (combina los del seed con cualquier producto que venga en los pedidos)
  const availableProducts = useMemo<StoreProductOption[]>(() => {
    const map = new Map<string, StoreProductOption>();
    for (const p of DEFAULT_STORE_PRODUCTS) {
      map.set(p.id, p);
    }
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

  // 5. Filtrado por texto en el buscador
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

  // Resumen de contadores
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "PENDING").length,
      preparing: orders.filter((o) => o.status === "PREPARING").length,
      ready: orders.filter((o) => o.status === "READY").length,
      delivered: orders.filter((o) => o.status === "DELIVERED").length,
    };
  }, [orders]);

  // ================= MODAL 1: CREAR NUEVO PEDIDO (POST /orders) =================
  const [createOpen, setCreateOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newDeliveryAddress, setNewDeliveryAddress] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [draftItems, setDraftItems] = useState<{ productId: string; quantity: number }[]>([
    { productId: DEFAULT_STORE_PRODUCTS[1].id, quantity: 1 },
  ]);

  const openCreateModal = () => {
    setNewCustomerName("");
    setNewCustomerPhone("");
    setNewDeliveryAddress("");
    setNewNotes("");
    setDraftItems([{ productId: availableProducts[0]?.id ?? "", quantity: 1 }]);
    setCreateOpen(true);
  };

  const draftTotal = useMemo(() => {
    return draftItems.reduce((acc, row) => {
      const prod = availableProducts.find((p) => p.id === row.productId);
      return acc + (prod ? prod.price * row.quantity : 0);
    }, 0);
  }, [draftItems, availableProducts]);

  const handleCreateOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (busyAction) return;
    setBusyAction(true);
    setFeedback(null);

    try {
      const validItems: OrderItemRequest[] = draftItems
        .filter((i) => i.productId && i.quantity > 0)
        .map((i) => ({ productId: i.productId, quantity: Number(i.quantity) }));

      await createOrder(selectedStoreId, {
        customerName: newCustomerName,
        customerPhone: newCustomerPhone,
        deliveryAddress: newDeliveryAddress,
        notes: newNotes,
        items: validItems,
      });

      setCreateOpen(false);
      setFeedback({ type: "ok", text: "Pedido creado correctamente." });
      await queryClient.invalidateQueries({ queryKey: ["orders", selectedStoreId] });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    } finally {
      setBusyAction(false);
    }
  };

  // ================= MODAL 2: DETALLE Y CRUD DE ITEMS (order_items) =================
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const activeOrder = useMemo(
    () => orders.find((o) => o.id === activeOrderId) ?? null,
    [orders, activeOrderId]
  );

  const [addItemProductId, setAddItemProductId] = useState<string>(
    DEFAULT_STORE_PRODUCTS[0].id
  );
  const [addItemQty, setAddItemQty] = useState<number>(1);

  const isOrderEditable = (order: OrderResponse | null) =>
    Boolean(order && order.status !== "DELIVERED" && order.status !== "CANCELLED");

  const handleAddItemToOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeOrder || busyAction) return;
    setBusyAction(true);
    setFeedback(null);

    try {
      await addOrderItem(selectedStoreId, activeOrder.id, {
        productId: addItemProductId,
        quantity: Number(addItemQty),
      });
      setAddItemQty(1);
      setFeedback({ type: "ok", text: "Producto añadido al pedido." });
      await queryClient.invalidateQueries({ queryKey: ["orders", selectedStoreId] });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    } finally {
      setBusyAction(false);
    }
  };

  const handleUpdateItemQuantity = async (
    order: OrderResponse,
    itemId: string,
    productId: string,
    newQty: number
  ) => {
    if (newQty < 1 || busyAction) return;
    setBusyAction(true);
    setFeedback(null);

    try {
      await updateOrderItem(selectedStoreId, order.id, itemId, {
        productId,
        quantity: newQty,
      });
      setFeedback({ type: "ok", text: "Cantidad actualizada." });
      await queryClient.invalidateQueries({ queryKey: ["orders", selectedStoreId] });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    } finally {
      setBusyAction(false);
    }
  };

  const handleRemoveItemFromOrder = async (order: OrderResponse, itemId: string) => {
    if (busyAction) return;
    setBusyAction(true);
    setFeedback(null);

    try {
      await removeOrderItem(selectedStoreId, order.id, itemId);
      setFeedback({ type: "ok", text: "Ítem eliminado del pedido." });
      await queryClient.invalidateQueries({ queryKey: ["orders", selectedStoreId] });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    } finally {
      setBusyAction(false);
    }
  };

  // ================= MODAL 3: EDITAR DATOS DEL CLIENTE (PUT /orders/{id}) =================
  const [editingOrder, setEditingOrder] = useState<OrderResponse | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const openEditModal = (order: OrderResponse) => {
    setEditingOrder(order);
    setEditName(order.customerName ?? "");
    setEditPhone(order.customerPhone ?? "");
    setEditAddress(order.deliveryAddress ?? "");
    setEditNotes(order.notes ?? "");
  };

  const handleUpdateOrderHeader = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingOrder || busyAction) return;
    setBusyAction(true);
    setFeedback(null);

    try {
      await updateOrder(selectedStoreId, editingOrder.id, {
        customerName: editName,
        customerPhone: editPhone,
        deliveryAddress: editAddress,
        notes: editNotes,
      });
      setEditingOrder(null);
      setFeedback({ type: "ok", text: "Datos del cliente actualizados." });
      await queryClient.invalidateQueries({ queryKey: ["orders", selectedStoreId] });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    } finally {
      setBusyAction(false);
    }
  };

  // ================= CAMBIAR ESTADO (PATCH /status) Y ELIMINAR (DELETE) =================
  const handleStatusChange = async (order: OrderResponse, newStatus: OrderStatus) => {
    if (busyAction) return;
    setBusyAction(true);
    setFeedback(null);

    try {
      await updateOrderStatus(selectedStoreId, order.id, newStatus);
      setFeedback({
        type: "ok",
        text:
          newStatus === "DELIVERED"
            ? "Pedido entregado: se descontó el stock y se generó la venta automáticamente."
            : `Estado actualizado a ${STATUS_META[newStatus].label}.`,
      });
      await queryClient.invalidateQueries({ queryKey: ["orders", selectedStoreId] });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    } finally {
      setBusyAction(false);
    }
  };

  const handleDeleteOrder = async (order: OrderResponse) => {
    if (busyAction) return;
    if (!window.confirm(`¿Seguro que deseas eliminar el pedido de ${order.customerName || "este cliente"}?`)) {
      return;
    }
    setBusyAction(true);
    setFeedback(null);

    try {
      await deleteOrder(selectedStoreId, order.id);
      if (activeOrderId === order.id) setActiveOrderId(null);
      setFeedback({ type: "ok", text: "Pedido eliminado correctamente." });
      await queryClient.invalidateQueries({ queryKey: ["orders", selectedStoreId] });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    } finally {
      setBusyAction(false);
    }
  };

  const filterButtons: { value: OrderStatus | "ALL"; label: string }[] = [
    { value: "ALL", label: "Todos" },
    { value: "PENDING", label: "Pendientes" },
    { value: "PREPARING", label: "En preparación" },
    { value: "READY", label: "Listos" },
    { value: "DELIVERED", label: "Entregados" },
    { value: "CANCELLED", label: "Cancelados" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans pb-16">
      <AppHeader />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Encabezado y selector de sucursal */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5b4bdf]">
              Módulo de Pedidos
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Órdenes y Detalle de Ítems
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Selector de sucursal activa */}
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-xs">
              <StoreIcon className="h-4 w-4 text-[#5b4bdf] shrink-0" />
              <select
                aria-label="Seleccionar sucursal"
                value={selectedStoreId}
                onChange={(e) => handleStoreChange(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-800 focus:outline-none"
              >
                {activeStores.length > 0 ? (
                  activeStores.map((s) => (
                    <option key={s.storeId} value={s.storeId}>
                      {s.storeName} ({s.role === "STORE_ADMIN" ? "Admin" : "Empleado"})
                    </option>
                  ))
                ) : (
                  <option value={DEFAULT_STORE_ID}>Tienda Central (Por defecto)</option>
                )}
              </select>
            </div>

            <button
              type="button"
              onClick={() => refetchOrders()}
              title="Refrescar pedidos"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-xs transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loadingOrders ? "animate-spin" : ""}`} />
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-[#5b4bdf] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#4a3bc7] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Nuevo Pedido
            </button>
          </div>
        </div>

        {/* Notificación de feedback */}
        {feedback && (
          <div
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
              feedback.type === "ok"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <span>{feedback.text}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="ml-4 text-xs font-semibold underline"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Tarjetas de resumen (Responsivo: 2 columnas en móvil, 5 en escritorio) */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Total Pedidos</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-600">Pendientes</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.pending}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600">En Cocina</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.preparing}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">Listos</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.ready}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase tracking-wide text-green-600">Entregados</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.delivered}</p>
          </div>
        </section>

        {/* Barra de filtros por estado + buscador */}
        <section className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
          {/* Pastillas de estado desplazables en móvil */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {filterButtons.map((fb) => {
              const active = statusFilter === fb.value;
              return (
                <button
                  key={fb.value}
                  type="button"
                  onClick={() => setStatusFilter(fb.value)}
                  className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-[#1e1b4b] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {fb.label}
                </button>
              );
            })}
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cliente, teléfono o producto..."
              className="w-full rounded-xl border border-gray-200 bg-[#f8f9fc] py-2 pl-9 pr-3 text-sm text-gray-900 focus:border-[#5b4bdf] focus:bg-white focus:outline-none"
            />
          </div>
        </section>

        {/* Estado de carga o error */}
        {(loadingOrders || loadingMe) && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            Cargando órdenes de la sucursal...
          </div>
        )}

        {errorOrders && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p className="font-semibold">No se pudieron cargar los pedidos:</p>
            <p className="mt-1">{extractApiError(ordersErrorObj)}</p>
          </div>
        )}

        {!loadingOrders && !errorOrders && filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-[#5b4bdf]" />
            <h3 className="mt-3 text-base font-semibold text-gray-900">
              No hay órdenes para mostrar
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Crea un nuevo pedido o cambia el filtro de estado para ver más resultados.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5b4bdf] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a3bc7]"
            >
              <Plus className="h-4 w-4" />
              Crear primer pedido
            </button>
          </div>
        )}

        {/* ================= VISTA MÓVIL (TARJETAS RESPONSIVAS < md) ================= */}
        {!loadingOrders && !errorOrders && filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredOrders.map((order) => {
              const meta = STATUS_META[order.status];
              const editable = isOrderEditable(order);
              return (
                <article
                  key={order.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-[#5b4bdf]" />
                        <h3 className="font-semibold text-gray-900">
                          {order.customerName || "Cliente en mostrador"}
                        </h3>
                      </div>
                      <p className="mt-0.5 text-[11px] text-gray-400">
                        ID: {order.id.slice(0, 8)}... • Por {order.createdByName}
                      </p>
                    </div>
                    <BadgeOrder variant={meta.badge}>{meta.label}</BadgeOrder>
                  </div>

                  {/* Datos de contacto y entrega */}
                  <div className="space-y-1 text-xs text-gray-600">
                    {order.customerPhone && (
                      <p className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {order.customerPhone}
                      </p>
                    )}
                    {order.deliveryAddress && (
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        {order.deliveryAddress}
                      </p>
                    )}
                    {order.notes && (
                      <p className="rounded-lg bg-amber-50/70 px-2.5 py-1 text-amber-800">
                        Nota: {order.notes}
                      </p>
                    )}
                  </div>

                  {/* Resumen rápido de order_items */}
                  <div className="rounded-xl bg-[#f8f9fc] p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                      <span>Productos ({order.items.length})</span>
                      <span className="text-sm font-bold text-gray-900">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span className="truncate pr-2">
                            <strong>{item.quantity}x</strong> {item.productName}
                          </span>
                          <span className="shrink-0 font-medium">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botones de acción en móvil */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveOrderId(order.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#f0f2fa] px-3 py-2 text-xs font-semibold text-[#5b4bdf] hover:bg-[#e4e8f7]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Ítems ({order.items.length})
                    </button>

                    {meta.next && (
                      <button
                        type="button"
                        disabled={busyAction}
                        onClick={() => handleStatusChange(order, meta.next!)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#5b4bdf] px-3 py-2 text-xs font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {meta.nextLabel}
                      </button>
                    )}

                    {editable && (
                      <button
                        type="button"
                        onClick={() => openEditModal(order)}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
                        title="Editar datos del cliente"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}

                    {order.status !== "DELIVERED" && (
                      <button
                        type="button"
                        disabled={busyAction}
                        onClick={() => handleDeleteOrder(order)}
                        className="inline-flex items-center justify-center rounded-xl border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        title="Eliminar pedido"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ================= VISTA ESCRITORIO (TABLA >= md) ================= */}
        {!loadingOrders && !errorOrders && filteredOrders.length > 0 && (
          <section className="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#f8f9fc] text-xs uppercase tracking-wide text-gray-400">
                    <th className="py-3.5 pl-6 pr-4 font-semibold">Cliente / Entrega</th>
                    <th className="py-3.5 px-4 font-semibold">Detalle (order_items)</th>
                    <th className="py-3.5 px-4 font-semibold">Estado</th>
                    <th className="py-3.5 px-4 font-semibold">Total</th>
                    <th className="py-3.5 pl-4 pr-6 text-right font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => {
                    const meta = STATUS_META[order.status];
                    const editable = isOrderEditable(order);
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/70 transition-colors align-top">
                        <td className="py-4 pl-6 pr-4">
                          <p className="font-semibold text-gray-900">
                            {order.customerName || "Cliente en mostrador"}
                          </p>
                          {order.customerPhone && (
                            <p className="mt-0.5 text-xs text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" /> {order.customerPhone}
                            </p>
                          )}
                          {order.deliveryAddress && (
                            <p className="mt-0.5 text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3 shrink-0" /> {order.deliveryAddress}
                            </p>
                          )}
                          {order.notes && (
                            <p className="mt-1 inline-block rounded bg-amber-50 px-2 py-0.5 text-[11px] text-amber-800">
                              Nota: {order.notes}
                            </p>
                          )}
                          <p className="mt-1 text-[11px] text-gray-400">
                            Atendido por: {order.createdByName}
                          </p>
                        </td>

                        <td className="py-4 px-4">
                          <ul className="space-y-1 text-xs text-gray-700">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex items-center gap-1.5">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[#f0f2fa] text-[11px] font-bold text-[#5b4bdf]">
                                  {item.quantity}x
                                </span>
                                <span className="font-medium text-gray-800">{item.productName}</span>
                                <span className="text-gray-400">({formatCurrency(item.subtotal)})</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            onClick={() => setActiveOrderId(order.id)}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#5b4bdf] hover:underline"
                          >
                            <Package className="h-3.5 w-3.5" />
                            Gestionar ítems ({order.items.length})
                          </button>
                        </td>

                        <td className="py-4 px-4">
                          <BadgeOrder variant={meta.badge}>{meta.label}</BadgeOrder>
                          {order.createdAt && (
                            <p className="mt-1.5 text-[11px] text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(order.createdAt).toLocaleString("es-BO", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </p>
                          )}
                        </td>

                        <td className="py-4 px-4 font-bold text-gray-900">
                          {formatCurrency(order.total)}
                        </td>

                        <td className="py-4 pl-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {meta.next && (
                              <button
                                type="button"
                                disabled={busyAction}
                                onClick={() => handleStatusChange(order, meta.next!)}
                                className="rounded-lg bg-[#5b4bdf] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50"
                              >
                                {meta.nextLabel}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => setActiveOrderId(order.id)}
                              className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                              title="Ver y editar ítems del pedido"
                            >
                              Ítems
                            </button>

                            {editable && (
                              <button
                                type="button"
                                onClick={() => openEditModal(order)}
                                className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-100"
                                title="Editar cliente y dirección"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                            )}

                            {order.status !== "DELIVERED" && (
                              <button
                                type="button"
                                disabled={busyAction}
                                onClick={() => handleDeleteOrder(order)}
                                className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50"
                                title="Eliminar pedido"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* ================= MODAL 1: CREAR NUEVO PEDIDO ================= */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Registrar Nuevo Pedido"
        size="lg"
      >
        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Nombre del cliente
              </label>
              <input
                type="text"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                placeholder="Ej. Diego Morales"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Teléfono / Celular
              </label>
              <input
                type="text"
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
                placeholder="Ej. 70112233"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Dirección de entrega
              </label>
              <input
                type="text"
                value={newDeliveryAddress}
                onChange={(e) => setNewDeliveryAddress(e.target.value)}
                placeholder="Ej. Av. Arce 2140"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                Notas del pedido
              </label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Ej. Sin mayonesa, llamar al llegar"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
              />
            </div>
          </div>

          {/* Lista dinámica de productos (order_items) */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase text-gray-600">
                Productos del pedido (order_items)
              </label>
              <button
                type="button"
                onClick={() =>
                  setDraftItems((prev) => [
                    ...prev,
                    { productId: availableProducts[0]?.id ?? "", quantity: 1 },
                  ])
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#5b4bdf] hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Añadir línea
              </button>
            </div>

            <div className="space-y-2.5">
              {draftItems.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 rounded-xl bg-[#f8f9fc] p-2.5 sm:flex-row sm:items-center"
                >
                  <select
                    value={row.productId}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDraftItems((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, productId: val } : item))
                      );
                    }}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
                  >
                    {availableProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — Bs {p.price.toFixed(2)}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-500">Cant:</span>
                      <input
                        type="number"
                        min={1}
                        value={row.quantity}
                        onChange={(e) => {
                          const qty = Math.max(1, Number(e.target.value) || 1);
                          setDraftItems((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, quantity: qty } : item))
                          );
                        }}
                        className="w-20 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-center text-sm font-semibold text-gray-900"
                      />
                    </div>

                    {draftItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setDraftItems((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                        title="Quitar producto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#f0f2fa] px-4 py-3">
            <span className="text-sm font-medium text-gray-700">Total estimado:</span>
            <span className="text-lg font-bold text-[#5b4bdf]">{formatCurrency(draftTotal)}</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={busyAction}
              className="rounded-lg bg-[#5b4bdf] px-5 py-2 text-sm font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50"
            >
              {busyAction ? "Guardando..." : "Guardar Pedido"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL 2: GESTIÓN DE ÍTEMS (order_items) Y ESTADO ================= */}
      <Modal
        isOpen={Boolean(activeOrder)}
        onClose={() => setActiveOrderId(null)}
        title={
          activeOrder
            ? `Pedido de ${activeOrder.customerName || "Cliente"}`
            : "Detalle del Pedido"
        }
        size="lg"
      >
        {activeOrder && (
          <div className="space-y-5">
            {/* Cabecera del pedido */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f8f9fc] p-3.5 border border-gray-200">
              <div>
                <p className="text-xs text-gray-500">
                  ID: <code className="text-gray-700">{activeOrder.id}</code>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Dirección: <strong className="text-gray-800">{activeOrder.deliveryAddress || "En local"}</strong>
                </p>
              </div>
              <BadgeOrder variant={STATUS_META[activeOrder.status].badge}>
                {STATUS_META[activeOrder.status].label}
              </BadgeOrder>
            </div>

            {/* Botonera para cambiar estado (PATCH /orders/{id}/status) */}
            {isOrderEditable(activeOrder) && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
                  Cambiar estado del pedido
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["PENDING", "PREPARING", "READY", "DELIVERED", "CANCELLED"] as OrderStatus[]).map(
                    (st) => {
                      const current = activeOrder.status === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          disabled={current || busyAction}
                          onClick={() => handleStatusChange(activeOrder, st)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                            current
                              ? "bg-[#1e1b4b] text-white cursor-default"
                              : st === "DELIVERED"
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : st === "CANCELLED"
                              ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {st === "PREPARING" && <ChefHat className="h-3.5 w-3.5" />}
                          {st === "DELIVERED" && <CheckCircle2 className="h-3.5 w-3.5" />}
                          {st === "CANCELLED" && <XCircle className="h-3.5 w-3.5" />}
                          {STATUS_META[st].label}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Tabla / tarjetas de ítems (order_items) */}
            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                Ítems del pedido (`order_items`)
              </h4>

              <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                {activeOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.productName}</p>
                      <p className="text-xs text-gray-500">
                        Precio unitario: {formatCurrency(item.unitPrice)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      {isOrderEditable(activeOrder) ? (
                        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50">
                          <button
                            type="button"
                            disabled={busyAction || item.quantity <= 1}
                            onClick={() =>
                              handleUpdateItemQuantity(
                                activeOrder,
                                item.id,
                                item.productId,
                                item.quantity - 1
                              )
                            }
                            className="px-2.5 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-40"
                          >
                            -
                          </button>
                          <span className="px-3 text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={busyAction}
                            onClick={() =>
                              handleUpdateItemQuantity(
                                activeOrder,
                                item.id,
                                item.productId,
                                item.quantity + 1
                              )
                            }
                            className="px-2.5 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-gray-700">
                          Cant: {item.quantity}
                        </span>
                      )}

                      <span className="w-24 text-right text-sm font-bold text-gray-900">
                        {formatCurrency(item.subtotal)}
                      </span>

                      {isOrderEditable(activeOrder) && activeOrder.items.length > 1 && (
                        <button
                          type="button"
                          disabled={busyAction}
                          onClick={() => handleRemoveItemFromOrder(activeOrder, item.id)}
                          className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"
                          title="Quitar este ítem del pedido"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario para agregar un nuevo ítem al pedido (POST /orders/{id}/items) */}
            {isOrderEditable(activeOrder) && (
              <form
                onSubmit={handleAddItemToOrder}
                className="rounded-xl border border-indigo-100 bg-[#f0f2fa]/60 p-3.5 space-y-2.5"
              >
                <p className="text-xs font-semibold uppercase text-[#5b4bdf]">
                  Añadir otro producto a este pedido (`POST /items`)
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={addItemProductId}
                    onChange={(e) => setAddItemProductId(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
                  >
                    {availableProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — Bs {p.price.toFixed(2)}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={addItemQty}
                      onChange={(e) => setAddItemQty(Math.max(1, Number(e.target.value) || 1))}
                      className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900"
                    />
                    <button
                      type="submit"
                      disabled={busyAction}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#5b4bdf] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                      Añadir
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Total del pedido */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-sm font-semibold text-gray-600">Total del Pedido:</span>
              <span className="text-xl font-bold text-[#1e1b4b]">
                {formatCurrency(activeOrder.total)}
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* ================= MODAL 3: EDITAR DATOS DEL CLIENTE ================= */}
      <Modal
        isOpen={Boolean(editingOrder)}
        onClose={() => setEditingOrder(null)}
        title="Editar Datos del Cliente"
        size="md"
      >
        <form onSubmit={handleUpdateOrderHeader} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Nombre del cliente
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Dirección de entrega
            </label>
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Notas
            </label>
            <textarea
              rows={2}
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingOrder(null)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={busyAction}
              className="rounded-lg bg-[#5b4bdf] px-5 py-2 text-sm font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OrdersPage;