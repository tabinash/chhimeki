import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRepository } from "@/repository/productRepository";
import { DeleteProductResponse } from "@/types/api/products";
import { ApiError } from "@/repository/http";

/**
 * Hook to delete a product listing
 * Invalidates product and browse caches on success
 */
export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation<DeleteProductResponse, ApiError, number>({
        mutationFn: (productId: number) => productRepository.deleteProduct(productId),
        onSuccess: (_, productId) => {
            // Remove specific product from cache
            queryClient.removeQueries({ queryKey: ["product", productId] });
            // Invalidate browse products
            queryClient.invalidateQueries({ queryKey: ["browseProducts"] });
            queryClient.invalidateQueries({ queryKey: ["myProducts"] });
        },
    });
}
