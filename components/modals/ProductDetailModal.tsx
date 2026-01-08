"use client";

import {
    X,
    Heart,
    MessageCircle,
    Share2,
    Tag,
    Eye,
    Phone,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getChatUrl } from "@/lib/chatUtils";
import { ProductResponse } from "@/types/api/products";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useUpdateProduct } from "@/app/(main)/marketplace/_hook/useUpdateProduct";

interface ProductDetailModalProps {
    item: ProductResponse | null;
    onClose: () => void;
    onEdit?: (item: ProductResponse) => void;
}

/* ---------------- helpers ---------------- */

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
}

function formatCategory(category: string): string {
    return category
        .split("_")
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
}

function getStatusBadge(status: string) {
    const statusConfig = {
        ACTIVE: { label: "Available", className: "bg-green-100 text-green-700" },
        SOLD: { label: "Sold", className: "bg-gray-100 text-gray-700" },
        INACTIVE: {
            label: "Inactive",
            className: "bg-orange-100 text-orange-700",
        },
    };

    return statusConfig[status as keyof typeof statusConfig] ??
        statusConfig.ACTIVE;
}

/* ---------------- component ---------------- */

export default function ProductDetailModal({
    item,
    onClose,
    onEdit,
}: ProductDetailModalProps) {
    /* ✅ ALL HOOKS FIRST */
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { user } = useUser();

    // ✅ hook is ALWAYS called
    const updateMutation = useUpdateProduct(item?.id ?? 0);

    /* ✅ conditional return AFTER hooks */
    if (!item) return null;

    /* ---------------- derived data ---------------- */

    const formattedPrice = `Rs. ${item.price.toLocaleString()}`;
    const timeAgo = getTimeAgo(item.createdAt);

    const images =
        item.images.length > 0
            ? item.images
            : [
                {
                    id: 0,
                    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
                },
            ];

    const currentImage = images[currentImageIndex];
    const isOwner = user?.id === item.seller.id;

    const sellerImage =
        item.seller.profileImage ||
        `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(
            item.seller.name
        )}`;

    const statusBadge = getStatusBadge(item.status);

    /* ---------------- handlers ---------------- */

    const handlePrevImage = () => {
        setCurrentImageIndex(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleToggleSoldStatus = () => {
        const newStatus = item.status === "ACTIVE" ? "SOLD" : "ACTIVE";

        updateMutation.mutate(
            { status: newStatus },
            {
                onSuccess: onClose,
                onError: err =>
                    alert(
                        `Failed to update status: ${(err as any)?.message ?? "Unknown error"
                        }`
                    ),
            }
        );
    };

    /* ---------------- JSX ---------------- */

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 z-10 p-2 bg-black/50 text-white rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image section */}
                <div className="w-full md:w-1/2 relative bg-gray-900 h-80 md:h-auto">
                    <Image
                        src={currentImage.url}
                        alt={item.title}
                        fill
                        className="object-contain"
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
                            >
                                <ChevronRight />
                            </button>
                        </>
                    )}

                    <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${statusBadge.className}`}
                    >
                        {statusBadge.label}
                    </div>
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-full flex flex-col">

                    {/* Header details */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                {formatCategory(item.category)}
                            </span>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {item.viewCount} views
                                </span>
                                <span>•</span>
                                <span>{timeAgo}</span>
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">{item.title}</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-black">{formattedPrice}</span>
                            {item.isNegotiable && (
                                <span className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                                    <Tag className="w-3.5 h-3.5" /> Negotiable
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Seller Info */}
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 mb-6">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-sm">
                                <Image src={sellerImage} alt={item.seller.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-gray-900 text-sm flex items-center gap-1">
                                    {item.seller.name} {isOwner && "(You)"}
                                    {item.seller.type === "STOREFRONT" && (
                                        <span className="ml-1 text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                                            STOREFRONT
                                        </span>
                                    )}
                                </div>

                            </div>
                            {!isOwner && (
                                <button className="p-2 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Seller Phone */}
                        {item.seller.phone && !isOwner && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-2 rounded-lg border border-gray-200">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{item.seller.phone}</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-6 flex-1">
                        <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                            {item.description}
                        </p>
                    </div>

                    {/* Product Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Posted</div>
                            <div className="text-sm font-medium text-gray-900">{timeAgo}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Last Updated</div>
                            <div className="text-sm font-medium text-gray-900">{getTimeAgo(item.updatedAt)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Location</div>
                            <div className="text-sm font-medium text-gray-900">{item.palika}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">District</div>
                            <div className="text-sm font-medium text-gray-900">{item.district}</div>
                        </div>
                    </div>

                    <div className="mt-auto flex gap-3">
                        {isOwner ? (
                            <>
                                <button
                                    onClick={handleToggleSoldStatus}
                                    disabled={updateMutation.isPending}
                                    className="flex-1 bg-gray-100 py-3 rounded-xl font-bold"
                                >
                                    {updateMutation.isPending ? (
                                        <Loader2 className="animate-spin mx-auto" />
                                    ) : item.status === "ACTIVE" ? (
                                        "Mark as Sold"
                                    ) : (
                                        "Mark as Active"
                                    )}
                                </button>

                                <button
                                    onClick={() => onEdit?.(item)}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold"
                                >
                                    Edit Listing
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() =>
                                        router.push(
                                            getChatUrl(String(item.seller.id), {
                                                hideSidebar: true,
                                                source: "marketplace",
                                            })
                                        )
                                    }
                                    className="flex-1 bg-black text-white py-3 rounded-xl font-bold"
                                >
                                    <MessageCircle className="inline mr-2" />
                                    Message Seller
                                </button>

                                <button className="p-3 border rounded-xl">
                                    <Share2 />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
