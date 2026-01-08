import { api } from "./http";
import {
    CreateProductRequest,
    CreateProductResponse,
    UpdateProductRequest,
    UpdateProductResponse,
    GetProductByIdResponse,
    DeleteProductResponse,
    BrowseProductsParams,
    BrowseProductsResponse,
    GetUserProductsParams,
    GetUserProductsResponse,
    GetStorefrontProductsParams,
    GetStorefrontProductsResponse,
} from "@/types/api/products";

// PRODUCT REPOSITORY - Available APIs
// ============================================
// 1. createProduct()           POST   /api/marketplace/products                        -- 1-5 images required, multipart
// 2. updateProduct()           PUT    /api/marketplace/products/{productId}           -- Update details, manage images, multipart
// 3. deleteProduct()           DELETE /api/marketplace/products/{productId}           -- Soft delete, owner only
// 4. getProductById()          GET    /api/marketplace/products/{productId}           -- Public
// 5. browseProducts()          GET    /api/marketplace/products                       -- By geography & category, public
// 6. getUserProducts()         GET    /api/marketplace/products/user/{userId}         -- All products by user, public
// 7. getStorefrontProducts()   GET    /api/marketplace/products/storefront/{id}/products  -- All storefront products, public
// ============================================

export const productRepository = {
    /**
     * Create a new product listing
     * Content-Type: multipart/form-data
     * @param data - Product creation data with images (1-5 required)
     * @returns Created product data
     */
    createProduct: async (data: CreateProductRequest): Promise<CreateProductResponse> => {
        console.log("Creating product:", data.title);

        const formData = new FormData();

        // Add text fields
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("isNegotiable", data.isNegotiable ? "true" : "false");
        formData.append("category", data.category);

        // Add optional fields
        if (data.storefrontId) {
            formData.append("storefrontId", data.storefrontId.toString());
        }
        if (data.palika) {
            formData.append("palika", data.palika);
        }
        if (data.district) {
            formData.append("district", data.district);
        }

        // Add images (1-5 required)
        data.images.forEach((image) => {
            formData.append("images", image);
        });

        const response = await api.post<CreateProductResponse>(
            "/marketplace/products",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Create Product Response:", response);
        return response;
    },

    /**
     * Update existing product listing
     * Content-Type: multipart/form-data
     * @param productId - ID of the product to update
     * @param data - Updated product data (all fields optional)
     * @returns Updated product data
     */
    updateProduct: async (
        productId: number,
        data: UpdateProductRequest
    ): Promise<UpdateProductResponse> => {
        console.log("Updating product ID:", productId, "with data:", data);

        const formData = new FormData();

        // Add optional text fields
        if (data.title) formData.append("title", data.title);
        if (data.description) formData.append("description", data.description);
        if (data.price !== undefined) formData.append("price", data.price.toString());
        if (data.isNegotiable !== undefined)
            formData.append("isNegotiable", data.isNegotiable ? "true" : "false");
        if (data.category) formData.append("category", data.category);
        if (data.status) formData.append("status", data.status);

        // Add new images
        if (data.newImages && data.newImages.length > 0) {
            data.newImages.forEach((image) => {
                formData.append("newImages", image);
            });
        }

        // Add image IDs to remove
        if (data.removeImageIds && data.removeImageIds.length > 0) {
            data.removeImageIds.forEach((id) => {
                formData.append("removeImageIds", id.toString());
            });
        }

        const response = await api.put<UpdateProductResponse>(
            `/marketplace/products/${productId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Update Product Response:", response);
        return response;
    },

    /**
     * Delete product listing (soft delete)
     * @param productId - ID of the product to delete
     * @returns Success response
     */
    deleteProduct: async (productId: number): Promise<DeleteProductResponse> => {
        console.log("Deleting product with ID:", productId);
        const response = await api.delete<DeleteProductResponse>(
            `/marketplace/products/${productId}`
        );
        console.log("Delete Product Response:", response);
        return response;
    },

    /**
     * Get product details by ID
     * @param productId - ID of the product
     * @returns Full product details with seller info and images
     */
    getProductById: async (productId: number): Promise<GetProductByIdResponse> => {
        console.log("Fetching product with ID:", productId);
        const response = await api.get<GetProductByIdResponse>(
            `/marketplace/products/${productId}`
        );
        console.log("Get Product Response:", response);
        return response;
    },

    /**
     * Browse products by geography and category
     * @param params - Geography (required), category, pagination, sorting
     * @returns Paginated list of products
     */
    browseProducts: async (params: BrowseProductsParams): Promise<BrowseProductsResponse> => {
        console.log("Browsing products with params:", params);
        const response = await api.get<BrowseProductsResponse>("/marketplace/products", {
            params: {
                geography: params.geography,
                category: params.category,
                page: params.page ?? 0,
                size: params.size ?? 20,
                sort: params.sort ?? "createdAt",
                direction: params.direction ?? "DESC",
            },
        });
        console.log("Browse Products Response:", response);
        return response;
    },

    /**
     * Get user's product listings
     * @param userId - ID of the user
     * @param params - Status filter and pagination
     * @returns Paginated list of user's products
     */
    getUserProducts: async (
        userId: number,
        params?: GetUserProductsParams
    ): Promise<GetUserProductsResponse> => {
        console.log("Fetching products for user ID:", userId, "with params:", params);
        const response = await api.get<GetUserProductsResponse>(
            `/marketplace/products/user/${userId}`,
            {
                params: {
                    status: params?.status ?? "ALL",
                    page: params?.page ?? 0,
                    size: params?.size ?? 20,
                },
            }
        );
        console.log("User Products Response:", response);
        return response;
    },

    /**
     * Get products by storefront
     * @param storefrontId - ID of the storefront
     * @param params - Pagination parameters
     * @returns Paginated list of storefront products
     */
    getStorefrontProducts: async (
        storefrontId: number,
        params?: GetStorefrontProductsParams
    ): Promise<GetStorefrontProductsResponse> => {
        console.log("Fetching products for storefront ID:", storefrontId, "with params:", params);
        const response = await api.get<GetStorefrontProductsResponse>(
            `/marketplace/products/storefront/${storefrontId}/products`,
            {
                params: {
                    page: params?.page ?? 0,
                    size: params?.size ?? 20,
                },
            }
        );
        console.log("Storefront Products Response:", response);
        return response;
    },
};