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

export interface ProductSeller {
    id: number;
    name: string;
    userType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";
    profilePicture: string | null;
    isVerified: boolean;
}

export interface ProductMediaItem {
    id: number;
    url: string;
    thumbnailUrl: string | null;
    mediaType: "IMAGE" | "VIDEO";
}

export interface ProductResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: "NEW" | "USED" | "LIKE_NEW";
    status: "AVAILABLE" | "SOLD" | "RESERVED";
    seller: ProductSeller;
    media: ProductMediaItem[];
    location: {
        district: string;
        palika: string;
        wada: string;
    };
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// Create Product API
// POST /api/marketplace/products
// ============================================

export interface CreateProductRequest {
    title: string;
    description: string;
    price: number;
    category: string;
    condition: "NEW" | "USED" | "LIKE_NEW";
    mediaIds?: number[]; // Optional array of media IDs
}

export type CreateProductResponse = ApiResponse<ProductResponse>;

// ============================================
// Get Product By ID API
// GET /api/marketplace/products/{productId}
// ============================================

export type GetProductByIdResponse = ApiResponse<ProductResponse>;

// ============================================
// Update Product API
// PUT /api/marketplace/products/{productId}
// ============================================

export interface UpdateProductRequest {
    title: string;
    description: string;
    price: number;
    category: string;
    condition: "NEW" | "USED" | "LIKE_NEW";
    status: "AVAILABLE" | "SOLD" | "RESERVED";
}

export type UpdateProductResponse = ApiResponse<ProductResponse>;

// ============================================
// Delete Product API
// DELETE /api/marketplace/products/{productId}
// ============================================

export type DeleteProductResponse = ApiResponse<void>;

// ============================================
// Get All Products API (Browse Marketplace)
// GET /api/marketplace/products
// ============================================

export interface GetAllProductsParams {
    page?: number;
    size?: number;
    category?: string;
    condition?: "NEW" | "USED" | "LIKE_NEW";
    status?: "AVAILABLE" | "SOLD" | "RESERVED";
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

export type GetAllProductsResponse = PagedResponse<ProductResponse>;

// ============================================
// Get My Products API
// GET /api/marketplace/products/my-products
// ============================================

export interface GetMyProductsParams {
    page?: number;
    size?: number;
}

export type GetMyProductsResponse = PagedResponse<ProductResponse>;

// ============================================
// Get User Products API
// GET /api/marketplace/products/user/{userId}
// ============================================

export interface GetUserProductsParams {
    page?: number;
    size?: number;
}

export type GetUserProductsResponse = PagedResponse<ProductResponse>;

// ============================================
// Search Products API
// GET /api/marketplace/products/search
// ============================================

export interface SearchProductsParams {
    query: string;
    page?: number;
    size?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

export type SearchProductsResponse = PagedResponse<ProductResponse>;