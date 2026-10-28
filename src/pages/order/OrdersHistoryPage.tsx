import { FormEvent, useEffect, useMemo, useState } from "react";
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
  Loader2,
} from "lucide-react";
import BadgeOrder from "@/components/ui/BadgeOrder";
import Modal from "@/components/ui/Modal";
import { extractApiError } from "@/utils/extractApiError";
import { OrderResponse, OrderStatus } from "@/services/OrderServices/Types/order";

// Hooks reales del backend
import { useMe } from "@/hooks/useMe";
import { useOrders } from "@/hooks/OrdersHooks/useOrders";
import { useEmployeeProducts } from "@/hooks/EmplooyHooks/useEmployeeProducts";
import {
  useCreateOrder,
  useDeleteOrder,
  useUpdateOrder,
  useUpdateOrderStatus,
} from "@/hooks/OrdersHooks/useOrderMutations";
import {
  useAddOrderItem,
  useRemoveOrderItem,
  useUpdateOrderItem,
} from "@/hooks/OrdersHooks/useOrderItemMutations";

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
  DELIVERED: { label: "Entregado", badge: "success" },
  CANCELLED: { label: "Cancelado", badge: "error" },
};

const formatCurrency = (val: number | undefined | null) =>
  `Bs ${Number(val ?? 0).toFixed(2)}`;

const OrdersHistoryPage = () => {
  // ============ SUCURSALES REALES ============
  const { data: me, isLoading: loadingMe } = useMe();
  const activeStores = useMemo(
    () => (me?.stores ?? []).filter((s) => s.active),
    [me]
  );
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");

  useEffect(() => {
    if (activeStores.length > 0 && !selectedStoreId) {
      setSelectedStoreId(activeStores[0].storeId);
    }
  }, [activeStores, selectedStoreId]);

  const handleStoreChange = (id: string) => setSelectedStoreId(id);

  // ============ FILTROS ============
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // ============ ÓRDENES REALES ============
  const ordersQuery = useOrders(
    selectedStoreId,
    statusFilter === "ALL" ? undefined : statusFilter
  );
  const orders = ordersQuery.data ?? [];

  // Filtrado por texto en frontend
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

  // Stats
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

  // ============ CATÁLOGO REAL (para modal de añadir ítem) ============
  const { products: catalogProducts, loading: loadingCatalog } =
    useEmployeeProducts();

  // ============ MUTACIONES ============
  const createOrderMutation = useCreateOrder(selectedStoreId); // no se usa aquí pero puede servir a futuro
  const updateOrderMutation = useUpdateOrder(selectedStoreId);
  const updateStatusMutation = useUpdateOrderStatus(selectedStoreId);
  const deleteOrderMutation = useDeleteOrder(selectedStoreId);
  const addItemMutation = useAddOrderItem(selectedStoreId);
  const updateItemMutation = useUpdateOrderItem(selectedStoreId);
  const removeItemMutation = useRemoveOrderItem(selectedStoreId);

  const busyAction =
    createOrderMutation.isPending ||
    updateOrderMutation.isPending ||
    updateStatusMutation.isPending ||
    deleteOrderMutation.isPending ||
    addItemMutation.isPending ||
    updateItemMutation.isPending ||
    removeItemMutation.isPending;

  // ============ FEEDBACK ============
  const [feedback, setFeedback] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  // ============ MODAL DETALLE / ITEMS ============
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const activeOrder = useMemo<OrderResponse | null>(
    () => filteredOrders.find((o) => o.id === activeOrderId) ?? null,
    [filteredOrders, activeOrderId]
  );

  const [addItemProductId, setAddItemProductId] = useState<string>("");
  const [addItemQty, setAddItemQty] = useState<number>(1);

  useEffect(() => {
    if (!addItemProductId && catalogProducts.length > 0) {
      setAddItemProductId(catalogProducts[0].id);
    }
  }, [catalogProducts, addItemProductId]);

  const isOrderEditable = (order: OrderResponse | null) =>
    Boolean(
      order && order.status !== "DELIVERED" && order.status !== "CANCELLED"
    );

  const handleAddItemToOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeOrder || !addItemProductId) return;
    setFeedback(null);
    try {
      await addItemMutation.mutateAsync({
        orderId: activeOrder.id,
        request: { productId: addItemProductId, quantity: Number(addItemQty) },
      });
      setAddItemQty(1);
      setFeedback({ type: "ok", text: "Producto añadido al pedido." });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    }
  };

  const handleUpdateItemQuantity = async (
    order: OrderResponse,
    itemId: string,
    productId: string,
    newQty: number
  ) => {
    if (newQty < 1) return;
    setFeedback(null);
    try {
      await updateItemMutation.mutateAsync({
        orderId: order.id,
        itemId,
        request: { productId, quantity: newQty },
      });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    }
  };

  const handleRemoveItemFromOrder = async (
    order: OrderResponse,
    itemId: string
  ) => {
    setFeedback(null);
    try {
      await removeItemMutation.mutateAsync({ orderId: order.id, itemId });
      setFeedback({ type: "ok", text: "Ítem eliminado del pedido." });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    }
  };

  // ============ MODAL EDITAR CLIENTE ============
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
    if (!editingOrder) return;
    setFeedback(null);
    try {
      await updateOrderMutation.mutateAsync({
        orderId: editingOrder.id,
        request: {
          customerName: editName,
          customerPhone: editPhone,
          deliveryAddress: editAddress,
          notes: editNotes,
        },
      });
      setEditingOrder(null);
      setFeedback({ type: "ok", text: "Datos del cliente actualizados." });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    }
  };

  // ============ ESTADO / DELETE ============
  const handleStatusChange = async (
    order: OrderResponse,
    newStatus: OrderStatus
  ) => {
    setFeedback(null);
    try {
      await updateStatusMutation.mutateAsync({
        orderId: order.id,
        status: newStatus,
      });
      setFeedback({
        type: "ok",
        text:
          newStatus === "DELIVERED"
            ? "Pedido entregado: stock actualizado."
            : `Estado actualizado.`,
      });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    }
  };

  const handleDeleteOrder = async (order: OrderResponse) => {
    if (
      !window.confirm(
        `¿Seguro que deseas eliminar el pedido de ${
          order.customerName || "este cliente"
        }?`
      )
    )
      return;
    setFeedback(null);
    try {
      await deleteOrderMutation.mutateAsync(order.id);
      if (activeOrderId === order.id) setActiveOrderId(null);
      setFeedback({ type: "ok", text: "Pedido eliminado correctamente." });
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    }
  };

  useEffect(() => {
    if (activeOrderId && !filteredOrders.some((o) => o.id === activeOrderId)) {
      setActiveOrderId(null);
    }
  }, [filteredOrders, activeOrderId]);

  const filterButtons: { value: OrderStatus | "ALL"; label: string }[] = [
    { value: "ALL", label: "Todos" },
    { value: "PENDING", label: "Pendientes" },
    { value: "PREPARING", label: "En preparación" },
    { value: "READY", label: "Listos" },
    { value: "DELIVERED", label: "Entregados" },
    { value: "CANCELLED", label: "Cancelados" },
  ];

  const loadingOrders = ordersQuery.isLoading;
  const errorOrders = ordersQuery.isError;
  const ordersErrorObj = ordersQuery.error;

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans pb-16">
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Encabezado */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5b4bdf]">
              Mi Negocio / Operaciones
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Historial de Ventas y Pedidos
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-xs">
              <StoreIcon className="h-4 w-4 text-[#5b4bdf] shrink-0" />
              <select
                value={selectedStoreId}
                onChange={(e) => handleStoreChange(e.target.value)}
                disabled={loadingMe}
                className="bg-transparent text-sm font-medium text-gray-800 focus:outline-none disabled:opacity-50"
              >
                {loadingMe ? (
                  <option>Cargando sucursales...</option>
                ) : (
                  activeStores.map((s) => (
                    <option key={s.storeId} value={s.storeId}>
                      {s.storeName}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              onClick={() => ordersQuery.refetch()}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw
                className={`h-4 w-4 ${loadingOrders ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

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
              onClick={() => setFeedback(null)}
              className="ml-4 text-xs font-semibold underline"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase text-gray-400">
              Total Pedidos
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase text-amber-600">
              Pendientes
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stats.pending}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase text-blue-600">
              En Cocina
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stats.preparing}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase text-indigo-600">
              Listos
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stats.ready}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium uppercase text-green-600">
              Entregados
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stats.delivered}
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {filterButtons.map((fb) => (
              <button
                key={fb.value}
                onClick={() => setStatusFilter(fb.value)}
                className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === fb.value
                    ? "bg-[#1e1b4b] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {fb.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cliente o producto..."
              className="w-full rounded-xl border border-gray-200 bg-[#f8f9fc] py-2 pl-9 pr-3 text-sm focus:border-[#5b4bdf] focus:outline-none"
            />
          </div>
        </section>

        {/* Estados */}
        {(loadingOrders || loadingMe) && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-[#5b4bdf]" />
          </div>
        )}
        {errorOrders && (
          <div className="text-red-600 p-6">
            Error: {extractApiError(ordersErrorObj)}
          </div>
        )}
        {!loadingOrders && !errorOrders && filteredOrders.length === 0 && (
          <div className="text-center p-12 bg-white rounded-2xl border border-dashed">
            <ShoppingBag className="mx-auto h-10 w-10 text-[#5b4bdf]" />
            <h3 className="mt-3 text-base font-semibold text-gray-900">
              No hay órdenes
            </h3>
          </div>
        )}

        {/* Tabla Escritorio */}
        {!loadingOrders && !errorOrders && filteredOrders.length > 0 && (
          <section className="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#f8f9fc] text-xs uppercase tracking-wide text-gray-400">
                  <th className="py-3.5 pl-6 pr-4 font-semibold">
                    Cliente / Entrega
                  </th>
                  <th className="py-3.5 px-4 font-semibold">Detalle</th>
                  <th className="py-3.5 px-4 font-semibold">Estado</th>
                  <th className="py-3.5 px-4 font-semibold">Total</th>
                  <th className="py-3.5 pl-4 pr-6 text-right font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const meta = STATUS_META[order.status];
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/70 transition-colors align-top"
                    >
                      <td className="py-4 pl-6 pr-4">
                        <p className="font-semibold text-gray-900">
                          {order.customerName || "Cliente en mostrador"}
                        </p>
                        {order.customerPhone && (
                          <p className="mt-0.5 text-xs text-gray-500">
                            <Phone className="inline h-3 w-3 mr-1" />
                            {order.customerPhone}
                          </p>
                        )}
                        {order.deliveryAddress && (
                          <p className="mt-0.5 text-xs text-gray-500">
                            <MapPin className="inline h-3 w-3 mr-1" />
                            {order.deliveryAddress}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <ul className="space-y-1 text-xs">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex gap-1.5">
                              <span className="font-bold">{item.quantity}x</span>{" "}
                              {item.productName}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => setActiveOrderId(order.id)}
                          className="mt-2 text-xs font-semibold text-[#5b4bdf] hover:underline"
                        >
                          <Package className="inline h-3.5 w-3.5 mr-1" />{" "}
                          Gestionar ítems
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <BadgeOrder variant={meta.badge}>
                          {meta.label}
                        </BadgeOrder>
                      </td>
                      <td className="py-4 px-4 font-bold">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {meta.next && (
                            <button
                              onClick={() =>
                                handleStatusChange(order, meta.next!)
                              }
                              disabled={busyAction}
                              className="rounded-lg bg-[#5b4bdf] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50"
                            >
                              {meta.nextLabel}
                            </button>
                          )}
                          <button
                            onClick={() => setActiveOrderId(order.id)}
                            className="rounded-lg border px-2.5 py-1.5 text-xs"
                          >
                            Ítems
                          </button>
                          {isOrderEditable(order) && (
                            <button
                              onClick={() => openEditModal(order)}
                              className="rounded-lg border p-1.5"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          )}
                          {order.status !== "DELIVERED" && (
                            <button
                              onClick={() => handleDeleteOrder(order)}
                              disabled={busyAction}
                              className="rounded-lg border border-red-200 p-1.5 text-red-600 disabled:opacity-50"
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
          </section>
        )}

        {/* Vista móvil - tarjetas */}
        {!loadingOrders && !errorOrders && filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredOrders.map((order) => {
              const meta = STATUS_META[order.status];
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
                        ID: {order.id.slice(0, 8)}...
                      </p>
                    </div>
                    <BadgeOrder variant={meta.badge}>{meta.label}</BadgeOrder>
                  </div>

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

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => setActiveOrderId(order.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#f0f2fa] px-3 py-2 text-xs font-semibold text-[#5b4bdf]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Ítems ({order.items.length})
                    </button>

                    {meta.next && (
                      <button
                        disabled={busyAction}
                        onClick={() => handleStatusChange(order, meta.next!)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#5b4bdf] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {meta.nextLabel}
                      </button>
                    )}

                    {isOrderEditable(order) && (
                      <button
                        onClick={() => openEditModal(order)}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 p-2 text-gray-600"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}

                    {order.status !== "DELIVERED" && (
                      <button
                        disabled={busyAction}
                        onClick={() => handleDeleteOrder(order)}
                        className="inline-flex items-center justify-center rounded-xl border border-red-200 p-2 text-red-600 disabled:opacity-50"
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
      </main>

      {/* MODAL DETALLE / ITEMS */}
      <Modal
        isOpen={Boolean(activeOrder)}
        onClose={() => setActiveOrderId(null)}
        title={
          activeOrder
            ? `Pedido de ${activeOrder.customerName || "Cliente"}`
            : "Detalle"
        }
        size="lg"
      >
        {activeOrder && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f8f9fc] p-3.5 border border-gray-200">
              <div>
                <p className="text-xs text-gray-500">
                  ID: <code className="text-gray-700">{activeOrder.id}</code>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Dirección:{" "}
                  <strong className="text-gray-800">
                    {activeOrder.deliveryAddress || "En local"}
                  </strong>
                </p>
              </div>
              <BadgeOrder variant={STATUS_META[activeOrder.status].badge}>
                {STATUS_META[activeOrder.status].label}
              </BadgeOrder>
            </div>

            {isOrderEditable(activeOrder) && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
                  Cambiar estado del pedido
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "PENDING",
                      "PREPARING",
                      "READY",
                      "DELIVERED",
                      "CANCELLED",
                    ] as OrderStatus[]
                  ).map((st) => {
                    const current = activeOrder.status === st;
                    return (
                      <button
                        key={st}
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
                        {st === "PREPARING" && (
                          <ChefHat className="h-3.5 w-3.5" />
                        )}
                        {st === "DELIVERED" && (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                        {st === "CANCELLED" && (
                          <XCircle className="h-3.5 w-3.5" />
                        )}
                        {STATUS_META[st].label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                Ítems del pedido
              </h4>
              <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                {activeOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Precio unitario: {formatCurrency(item.unitPrice)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      {isOrderEditable(activeOrder) ? (
                        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50">
                          <button
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

                      {isOrderEditable(activeOrder) &&
                        activeOrder.items.length > 1 && (
                          <button
                            disabled={busyAction}
                            onClick={() =>
                              handleRemoveItemFromOrder(activeOrder, item.id)
                            }
                            className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isOrderEditable(activeOrder) && (
              <form
                onSubmit={handleAddItemToOrder}
                className="rounded-xl border border-indigo-100 bg-[#f0f2fa]/60 p-3.5 space-y-2.5"
              >
                <p className="text-xs font-semibold uppercase text-[#5b4bdf]">
                  Añadir otro producto a este pedido
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={addItemProductId}
                    onChange={(e) => setAddItemProductId(e.target.value)}
                    disabled={loadingCatalog}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5b4bdf] focus:outline-none disabled:opacity-50"
                  >
                    {loadingCatalog ? (
                      <option>Cargando catálogo...</option>
                    ) : (
                      catalogProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — Bs {p.price.toFixed(2)}
                        </option>
                      ))
                    )}
                  </select>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={addItemQty}
                      onChange={(e) =>
                        setAddItemQty(Math.max(1, Number(e.target.value) || 1))
                      }
                      className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900"
                    />
                    <button
                      type="submit"
                      disabled={busyAction || loadingCatalog}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#5b4bdf] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                      Añadir
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-sm font-semibold text-gray-600">
                Total del Pedido:
              </span>
              <span className="text-xl font-bold text-[#1e1b4b]">
                {formatCurrency(activeOrder.total)}
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL EDITAR CLIENTE */}
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5b4bdf] focus:outline-none"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5b4bdf] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5b4bdf] focus:outline-none"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5b4bdf] focus:outline-none"
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

export default OrdersHistoryPage;