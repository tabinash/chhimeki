// ============================================
// Product API Types
// ============================================

// Common API Response Wrapper
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

// Pagination Wrapper
export interface PagedResponse<T> {
    status: string;
    message: string;
    data: T[];
    pagination: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
    timestamp: string;
}

// ============================================
// Product Domain Types
// ============================================

export type ProductCategory =
    | "ELECTRONICS"
    | "FURNITURE"
    | "VEHICLES"
    | "FASHION"
    | "HOME_GARDEN"
    | "SPORTS"
    | "BOOKS"
    | "TOYS"
    | "MOBILE"
    | "OTHERS";

export type ProductStatus = "ACTIVE" | "SOLD" | "INACTIVE";

export interface SellerInfo {
    id: number; // Always the user ID (owner ID for messaging)
    storefrontId: number | null; // Only populated when type = "STOREFRONT"
    name: string;
    phone: string;
    type: "INDIVIDUAL" | "STOREFRONT";
    profileImage: string | null; // User profile image or storefront logo
}

export interface ImageInfo {
    id: number;
    url: string;
}

export interface ProductResponse {
    id: number;
    title: string;
    description: string;
    price: number; // BigDecimal in Java -> number in TS
    isNegotiable: boolean;
    category: ProductCategory;
    seller: SellerInfo;
    palika: string;
    district: string;
    status: ProductStatus;
    viewCount: number;
    images: ImageInfo[];
    createdAt: string;
    updatedAt: string;
}

// ============================================
// Create Product API
// POST /api/marketplace/products
// Content-Type: multipart/form-data
// ============================================

export interface CreateProductRequest {
    title: string; // 3-100 chars
    description: string; // 10-2000 chars
    price: number; // > 0
    isNegotiable?: boolean; // default: false
    category: ProductCategory;
    storefrontId?: number; // Optional - if provided, geography is inherited
    palika?: string; // Required if storefrontId is null
    district?: string; // Required if storefrontId is null
    images: File[]; // 1-5 images required
}

export type CreateProductResponse = ApiResponse<ProductResponse>;

// ============================================
// Update Product API
// PUT /api/marketplace/products/{productId}
// Content-Type: multipart/form-data
// ============================================

export interface UpdateProductRequest {
    title?: string; // 3-100 chars
    description?: string; // 10-2000 chars
    price?: number; // > 0
    isNegotiable?: boolean;
    category?: ProductCategory;
    status?: ProductStatus; // Mark as SOLD, INACTIVE, etc.
    newImages?: File[]; // New images to add
    removeImageIds?: number[]; // IDs of images to remove
}

export type UpdateProductResponse = ApiResponse<ProductResponse>;

// ============================================
// Get Product By ID API
// GET /api/marketplace/products/{productId}
// ============================================

export type GetProductByIdResponse = ApiResponse<ProductResponse>;

// ============================================
// Delete Product API
// DELETE /api/marketplace/products/{productId}
// ============================================

export type DeleteProductResponse = ApiResponse<void>;

// ============================================
// Browse Products By Geography API
// GET /api/marketplace/products
// ============================================

export interface BrowseProductsParams {
    geography: string; // Palika or District name (required)
    category?: ProductCategory; // Optional filter
    page?: number; // Default: 0
    size?: number; // Default: 20
    sort?: "createdAt" | "price"; // Default: createdAt
    direction?: "ASC" | "DESC"; // Default: DESC
}

export type BrowseProductsResponse = PagedResponse<ProductResponse>;

// ============================================
// Get User Products API
// GET /api/marketplace/products/user/{userId}
// ============================================

export interface GetUserProductsParams {
    status?: "ACTIVE" | "SOLD" | "INACTIVE" | "ALL"; // Default: ALL
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type GetUserProductsResponse = PagedResponse<ProductResponse>;

// ============================================
// Get Storefront Products API
// GET /api/marketplace/products/storefront/{storefrontId}/products
// ============================================

export interface GetStorefrontProductsParams {
    page?: number; // Default: 0
    size?: number; // Default: 20
}

export type GetStorefrontProductsResponse = PagedResponse<ProductResponse>;