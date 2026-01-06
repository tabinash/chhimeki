import Image from "next/image";

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    image: string;
    postedDate: string;
    status: "Active" | "Sold";
}

export default function ProductCard({
    title,
    price,
    image,
    postedDate,
    status
}: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col">
            {/* Product Image */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-3">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-bold text-white">
                    {price}
                </div>
                {status === "Sold" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                            SOLD
                        </span>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <h4 className="font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                        {title}
                    </h4>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Listed {postedDate}
                </p>

                <button className="w-full mt-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
}
