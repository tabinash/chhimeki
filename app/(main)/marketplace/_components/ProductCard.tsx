import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface ProductCardProps {
    item: {
        id: number;
        title: string;
        price: string;
        image: string;
        location: string;
        time: string;
        isOwner: boolean;
    };
}

export default function ProductCard({ item }: ProductCardProps) {
    return (
        <Link
            href={`/marketplace/${item.id}`}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col active:scale-[0.98] transition-transform duration-200"
        >
            <div className="aspect-square relative bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
                {item.isOwner && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        You
                    </div>
                )}
            </div>
            <div className="p-3 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-1 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{item.title}</h3>
                </div>
                <div className="font-bold text-gray-900 text-sm mb-2">{item.price}</div>

                <div className="mt-auto flex items-center justify-between text-[10px] text-gray-500">
                    <div className="flex items-center gap-1 truncate max-w-[80px]">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                    </div>
                    <span>{item.time}</span>
                </div>
            </div>
        </Link>
    );
}
