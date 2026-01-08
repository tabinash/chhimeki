import Image from "next/image";
import Link from "next/link";
import { ProductResponse } from "@/types/api/products";

interface ProductCardProps {
    product: ProductResponse;
    isOwnProfile?: boolean;
}

export default function ProductCard({ product, isOwnProfile }: ProductCardProps) {
    // Get first image or use placeholder
    const productImage = product.images && product.images.length > 0
        ? product.images[0].url
        : "https://via.placeholder.com/300x300?text=No+Image";

    // Format price
    const formattedPrice = `Rs. ${product.price.toLocaleString()}`;

    const isSold = product.status === "SOLD";
    const isInactive = product.status === "INACTIVE";

    return (
        <Link href={`/marketplace/${product.id}`}>
            <div className={`bg-gray-50 rounded-xl p-2.5 ${isSold ? "opacity-70" : ""}`}>
                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-200 mb-2">
                    <Image
                        src={productImage}
                        alt={product.title}
                        fill
                        className="object-cover"
                    />


                    {/* Status Badge - Top Right (only for SOLD/INACTIVE) */}
                    {isSold && (
                        <div className="absolute top-1.5 right-1.5 px-2 py-0.5 bg-red-500 rounded-md text-[10px] font-bold text-white">
                            SOLD
                        </div>
                    )}
                    {isInactive && (
                        <div className="absolute top-1.5 right-1.5 px-2 py-0.5 bg-gray-500 rounded-md text-[10px] font-bold text-white">
                            Hidden
                        </div>
                    )}

                    {/* Image count badge (if multiple images) */}
                    {product.images && product.images.length > 1 && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/50 rounded text-[10px] text-white">
                            📷 {product.images.length}
                        </div>
                    )}
                </div>

                {/* Title */}
                <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">
                    {product.title}
                    <span className="text-xs text-black">(Rs. {product.price} )</span>
                </h4>

                {/* Location - subtle */}
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                    {product.palika}
                </p>

                {/* Action Button */}
                <button className="w-full mt-2 px-3 py-1.5 bg-blue-500 text-white rounded-md text-xs font-bold shadow-sm text-center hover:bg-blue-600 transition-colors">
                    View
                </button>
            </div>
        </Link>
    );
}
