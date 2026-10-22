// Tipos del catálogo (CategoryController / ProductController del backend)

// CategoryResponse
export interface Category {
  id: string;
  name: string;
  active: boolean;
}

// CategoryCreateRequest
export interface CategoryCreatePayload {
  name: string;
  active?: boolean;
}

// CategoryUpdateRequest
export interface CategoryUpdatePayload {
  name: string;
}

// ProductResponse
export interface Product {
  id: string;
  name: string;
  categoryId: string | null;
  categoryName: string | null;
  price: number;
  active: boolean;
  imageUrl: string | null;
  createdAt: string;
}

// ProductCreateRequest
export interface ProductCreatePayload {
  name: string;
  categoryId?: string | null;
  price: number;
  active?: boolean;
}

// ProductUpdateRequest
export interface ProductUpdatePayload {
  name: string;
  categoryId?: string | null;
  price: number;
}

// Query params de GET /api/stores/{storeId}/products
export interface ProductListParams {
  categoryId?: string;
  q?: string;
}

// PhotoResponse (foto-config)
export interface PhotoResponse {
  url: string;
}
