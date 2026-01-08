import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { CreateProductRequest, CreateProductResponse } from "@/types/api/products";
import { ApiError } from "@/repository/http";

/**
 * Hook to create a new product listing
 * Invalidates browse products cache on success
 */
export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation<CreateProductResponse, ApiError, CreateProductRequest>({
        mutationFn: (data: CreateProductRequest) => productRepository.createProduct(data),
        onSuccess: () => {
            // Invalidate browse products to show new listing
            queryClient.invalidateQueries({ queryKey: ["browseProducts"] });
            queryClient.invalidateQueries({ queryKey: ["myProducts"] });
        },
    });
}
