import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: string;
        image: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-2.5">
            {/* Product Image */}
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-200 mb-2">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white">
                    {product.price}
                </div>
            </div>
            <h4 className="font-bold text-gray-900 text-sm truncate">{product.title}</h4>
            <Link
                href={`/marketplace/${product.id}`}
                className="block w-full mt-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-900 rounded-lg text-xs font-bold shadow-sm text-center hover:bg-gray-50 transition-colors"
            >
                View
            </Link>
        </div>
    );
}
