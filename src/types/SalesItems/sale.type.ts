import type { Product } from "@/services/ProductCategoryServices/Types/catalog";
import type {Store} from "../../services/AdminServices/Types/adminStore"
import type {OrderResponse} from "../../services/OrderServices/Types/order"
import type {AdminUser} from "../../services/AdminServices/Types/adminUser"
// ==========================================
// ENTIDADES PRINCIPALES
// ==========================================
export type SaleStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface SaleItem {
    id: string;             // UUID
    sale?: Sale;            // Relación opcional para evitar ciclos infinitos en TS
    storeId: string;        // UUID
    product: Product;       // Objeto Product anidado (ManyToOne)
    quantity: number;
    unitPrice: number;      // BigDecimal se maneja como number
    createdAt: string;      // Instant se serializa como string (ISO 8601)
}

export interface Sale {
    id: string;             // UUID
    store: Store;           // Objeto Store anidado (ManyToOne)
    order: OrderResponse | null; // Objeto CustomerOrder o null (ManyToOne)
    soldBy: AdminUser;           // Objeto User anidado (ManyToOne)
    total: number;          // BigDecimal se maneja como number
    status: SaleStatus;
    items: SaleItem[];      // Lista de items (OneToMany)
    createdAt: string;      // Instant
}