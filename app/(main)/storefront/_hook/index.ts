// Storefront Route Hooks
// Re-export all hooks for convenient imports

export { useAllStorefronts } from "./useAllStorefronts";
export { useStorefrontById } from "./useStorefrontById";
export { useMyStorefront } from "./useMyStorefront";
export { useCreateStorefront } from "./useCreateStorefront";
export { useUpdateStorefront } from "./useUpdateStorefront";
export { useDeleteStorefront } from "./useDeleteStorefront";
export { useStorefrontProducts } from "./useStorefrontProducts";

// Specialized update hooks
export { useUpdateStorefrontLogo } from "./useUpdateStorefrontLogo";
export { useUpdateStorefrontCover } from "./useUpdateStorefrontCover";
export { useUpdateStorefrontInfo, type UpdateStorefrontInfoRequest } from "./useUpdateStorefrontInfo";
