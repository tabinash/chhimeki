import { api } from "./http";
import {
    CreateProductRequest,
    CreateProductResponse,
    GetProductByIdResponse,
    UpdateProductRequest,
    UpdateProductResponse,
    DeleteProductResponse,
    GetAllProductsParams,
    GetAllProductsResponse,
    GetMyProductsParams,
    GetMyProductsResponse,
    GetUserProductsParams,
    GetUserProductsResponse,
    SearchProductsParams,
    SearchProductsResponse,
} from "@/types/api/products";

// ============================================
// Product Repository
// ============================================
// Endpoints:
// POST   /api/marketplace/products                    - Create product
// GET    /api/marketplace/products/{productId}        - Get product by ID
// PUT    /api/marketplace/products/{productId}        - Update product
// DELETE /api/marketplace/products/{productId}        - Delete product
// GET    /api/marketplace/products                    - Get all products (browse)
// GET    /api/marketplace/products/my-products        - Get my products
// GET    /api/marketplace/products/user/{userId}      - Get user's products
// GET    /api/marketplace/products/search             - Search products
// ============================================

export const productRepository = {
    /**
     * Create a new product listing
     * @param data - Product creation data
     * @returns Created product data
     */
    createProduct: async (data: CreateProductRequest): Promise<CreateProductResponse> => {
        console.log("Creating product with data:", data);
        const response = await api.post<CreateProductResponse>("/marketplace/products", data);
        console.log("Create Product Response:", response);
        return response;
    },

    /**
     * Get a specific product by ID
     * @param productId - The ID of the product to fetch
     * @returns Product data
     */
    getProductById: async (productId: number): Promise<GetProductByIdResponse> => {
        console.log("Fetching product with ID:", productId);
        const response = await api.get<GetProductByIdResponse>(`/marketplace/products/${productId}`);
        console.log("Get Product Response:", response);
        return response;
    },

    /**
     * Update an existing product listing
     * @param productId - The ID of the product to update
     * @param data - Updated product data
     * @returns Updated product data
     */
    updateProduct: async (productId: number, data: UpdateProductRequest): Promise<UpdateProductResponse> => {
        console.log("Updating product ID:", productId, "with data:", data);
        const response = await api.put<UpdateProductResponse>(`/marketplace/products/${productId}`, data);
        console.log("Update Product Response:", response);
        return response;
    },

    /**
     * Delete a product listing
     * @param productId - The ID of the product to delete
     * @returns Success response
     */
    deleteProduct: async (productId: number): Promise<DeleteProductResponse> => {
        console.log("Deleting product with ID:", productId);
        const response = await api.delete<DeleteProductResponse>(`/marketplace/products/${productId}`);
        console.log("Delete Product Response:", response);
        return response;
    },

    /**
     * Get all products (browse marketplace)
     * Filtered by location and optional filters
     * @param params - Filter and pagination parameters
     * @returns Paginated list of products
     */
    getAllProducts: async (params?: GetAllProductsParams): Promise<GetAllProductsResponse> => {
        console.log("Fetching all products with params:", params);
        const response = await api.get<GetAllProductsResponse>("/marketplace/products", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
                category: params?.category,
                condition: params?.condition,
                status: params?.status,
                minPrice: params?.minPrice,
                maxPrice: params?.maxPrice,
                search: params?.search,
            },
        });
        console.log("All Products Response:", response);
        return response;
    },

    /**
     * Get all products listed by the current authenticated user
     * @param params - Pagination parameters
     * @returns Paginated list of user's own products
     */
    getMyProducts: async (params?: GetMyProductsParams): Promise<GetMyProductsResponse> => {
        console.log("Fetching my products with params:", params);
        const response = await api.get<GetMyProductsResponse>("/marketplace/products/my-products", {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("My Products Response:", response);
        return response;
    },

    /**
     * Get all products listed by a specific user
     * @param userId - The ID of the user whose products to fetch
     * @param params - Pagination parameters
     * @returns Paginated list of user's products
     */
    getUserProducts: async (userId: number, params?: GetUserProductsParams): Promise<GetUserProductsResponse> => {
        console.log("Fetching products for user ID:", userId, "with params:", params);
        const response = await api.get<GetUserProductsResponse>(`/marketplace/products/user/${userId}`, {
            params: {
                page: params?.page ?? 0,
                size: params?.size ?? 20,
            },
        });
        console.log("User Products Response:", response);
        return response;
    },

    /**
     * Search products by query and filters
     * @param params - Search query and filter parameters
     * @returns Paginated search results
     */
    searchProducts: async (params: SearchProductsParams): Promise<SearchProductsResponse> => {
        console.log("Searching products with params:", params);
        const response = await api.get<SearchProductsResponse>("/marketplace/products/search", {
            params: {
                query: params.query,
                page: params.page ?? 0,
                size: params.size ?? 20,
                category: params.category,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice,
            },
        });
        console.log("Search Products Response:", response);
        return response;
    },
};