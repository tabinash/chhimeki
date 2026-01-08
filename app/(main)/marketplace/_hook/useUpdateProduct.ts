import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { UpdateProductRequest, UpdateProductResponse } from "@/types/api/products";
import { ApiError } from "@/repository/http";

/**
 * Hook to update an existing product listing
 * Invalidates product and browse caches on success
 */
export function useUpdateProduct(productId: number) {
    const queryClient = useQueryClient();

    return useMutation<UpdateProductResponse, ApiError, UpdateProductRequest>({
        mutationFn: (data: UpdateProductRequest) => productRepository.updateProduct(productId, data),
        onSuccess: () => {
            // Invalidate specific product cache
            queryClient.invalidateQueries({ queryKey: ["product", productId] });
            // Invalidate browse products to reflect changes
            queryClient.invalidateQueries({ queryKey: ["browseProducts"] });
            queryClient.invalidateQueries({ queryKey: ["myProducts"] });
        },
    });
}
