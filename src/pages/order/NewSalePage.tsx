import { FormEvent, useMemo, useState, useEffect } from "react";
import { Plus, Search, ShoppingCart, Store as StoreIcon, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { extractApiError } from "@/utils/extractApiError";
import { OrderItemRequest } from "@/services/OrderServices/Types/order";

// Importamos tus hooks reales
import { useMe } from "@/hooks/useMe"; // Asumiendo que este hook existe y trae las tiendas
import { useCreateOrder } from "@/hooks/OrdersHooks/useOrderMutations";
import { useEmployeeProducts } from "@/hooks/EmplooyHooks/useEmployeeProducts"; // Tu hook provisto
import type { Product } from "@/services/ProductCategoryServices/Types/catalog";

const formatCurrency = (val: number | undefined | null) =>
  `Bs ${Number(val ?? 0).toFixed(2)}`;

const NewSalePage = () => {
  const navigate = useNavigate();

  // 1. Obtener la sucursal activa del usuario
  const { data: me, isLoading: loadingMe } = useMe();
  const activeStores = useMemo(() => (me?.stores ?? []).filter((s) => s.active), [me]);
  
  // Estado para la sucursal seleccionada (por defecto la primera)
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  
  useEffect(() => {
    if (activeStores.length > 0 && !selectedStoreId) {
      setSelectedStoreId(activeStores[0].storeId);
    }
  }, [activeStores, selectedStoreId]);

  // 2. Hook para obtener los productos reales (Catálogo)
  const [searchTerm, setSearchTerm] = useState("");
  // Usamos el searchTerm para filtrar directamente en el backend (o frontend si el hook no lo soporta bien)
  const { products, loading: loadingProducts, error: productsError } = useEmployeeProducts({ q: searchTerm });

  // 3. Hook para crear la orden
  const createOrderMutation = useCreateOrder(selectedStoreId);

  // --- ESTADO LOCAL DEL CARRITO ---
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  
  // El carrito ahora guarda el producto completo para acceder a su precio/nombre fácilmente
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  // --- LÓGICA DEL CARRITO ---
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.product.id === productId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  // --- CONFIRMAR VENTA ---
  const handleConfirmSale = async (e: FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !selectedStoreId) return;
    setFeedback(null);

    try {
      // Adaptamos al formato que espera tu backend (OrderItemRequest)
      const validItems: OrderItemRequest[] = cartItems.map(i => ({
        productId: i.product.id,
        quantity: i.quantity
      }));

      await createOrderMutation.mutateAsync({
        customerName: customerName.trim() || "Cliente en mostrador",
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        notes: notes.trim(),
        items: validItems,
      });

      setFeedback({ type: "ok", text: "Venta registrada correctamente y stock actualizado." });
      // Limpiar formulario
      setCartItems([]);
      setCustomerName("");
      setCustomerPhone("");
      setDeliveryAddress("");
      setNotes("");
    } catch (err) {
      setFeedback({ type: "err", text: extractApiError(err) });
    }
  };

  const isBusy = createOrderMutation.isPending;

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans pb-16">
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5b4bdf]">
              Mi Negocio / Operaciones
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Nueva venta
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Registra una venta; el inventario se actualizará al confirmar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-xs">
              <StoreIcon className="h-4 w-4 text-[#5b4bdf] shrink-0" />
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                disabled={loadingMe}
                className="bg-transparent text-sm font-medium text-gray-800 focus:outline-none disabled:opacity-50"
              >
                {loadingMe ? (
                  <option>Cargando sucursales...</option>
                ) : (
                  activeStores.map((s) => (
                    <option key={s.storeId} value={s.storeId}>{s.storeName}</option>
                  ))
                )}
              </select>
            </div>

            <button
              onClick={() => navigate('/orders/history')}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Historial
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === "ok" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"}`}>
            {feedback.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Catálogo (Izquierda) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-[#5b4bdf] focus:outline-none"
                />
              </div>
            </div>

            {/* Listado de Productos Reales */}
            {loadingProducts ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#5b4bdf]" />
              </div>
            ) : productsError ? (
              <div className="text-red-500 text-center py-8">{productsError}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No se encontraron productos.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-xs hover:border-[#5b4bdf]/30 transition-colors">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{prod.name}</h3>
                      {/* Si tienes stock en el tipo Product, lo muestras aquí */}
                      {(prod as any).stock !== undefined && (
                        <p className="text-xs text-gray-500 mt-0.5">Stock: {(prod as any).stock}</p>
                      )}
                      <p className="text-sm font-bold text-[#5b4bdf] mt-2">{formatCurrency(prod.price)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(prod)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5b4bdf] text-white hover:bg-[#4a3bc7] transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Carrito / Detalle (Derecha) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Detalle de venta</h2>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f2fa] text-[#5b4bdf]">
                  <ShoppingCart className="h-5 w-5" />
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mb-4">{cartItems.length} productos distintos</p>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                  <ShoppingCart className="h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm font-medium text-gray-500">Aún no hay productos</p>
                  <p className="text-xs text-gray-400 mt-1">Agrega artículos desde el catálogo.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex-1 pr-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-500">{formatCurrency(item.product.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="px-2 py-1 text-gray-600 hover:bg-gray-200">-</button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-200">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              {/* Formulario rápido del cliente */}
              <div className="mt-4 space-y-2">
                <input 
                  type="text" 
                  placeholder="Nombre del cliente (opcional)" 
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-[#5b4bdf] focus:outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Teléfono (opcional)" 
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-[#5b4bdf] focus:outline-none"
                />
              </div>

              <button
                onClick={handleConfirmSale}
                disabled={cartItems.length === 0 || isBusy || !selectedStoreId}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-[#5b4bdf] py-3 text-sm font-semibold text-white hover:bg-[#4a3bc7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isBusy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Confirmar venta"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewSalePage;