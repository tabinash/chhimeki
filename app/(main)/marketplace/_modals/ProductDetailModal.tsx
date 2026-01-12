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
    Trash2,
} from "lucide-react";
import Image from "next/image";
import { ProductResponse } from "@/types/api/products";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useUpdateProduct } from "@/app/(main)/marketplace/_hook/useUpdateProduct";
import { useDeleteProduct, useProductById } from "../_hook";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import { closeProductDetailModal, openProductEditModal } from "@/redux/slices/modalSlice";




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

export default function ProductDetailModal() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { user } = useUser();
    // const {data:productDetail,isLoading:productDetailLoading }=useProductById(item?.id ?? 0);
    const productDetailModal = useSelector((state: RootState) => state.modal.productDetailModal);

    const { data: response, isLoading: productDetailLoading } = useProductById(productDetailModal.productId ?? 0);
    const item = response?.data;

    const updateMutation = useUpdateProduct(item?.id ?? 0);
    const deleteMutation = useDeleteProduct();
    const dispatch = useDispatch();




    if (!productDetailModal.isOpen) return null;

    if (productDetailLoading || !item) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <Loader2 className="animate-spin w-8 h-8 text-white" />
            </div>
        );
    }
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
                onSuccess: () => dispatch(closeProductDetailModal()),
                onError: err =>
                    alert(
                        `Failed to update status: ${(err as any)?.message ?? "Unknown error"
                        }`
                    ),
            }
        );
    };

    const handleDelete = () => {
        deleteMutation.mutate(item.id, {
            onSuccess: () => dispatch(closeProductDetailModal()),
            onError: err =>
                alert(
                    `Failed to delete product: ${(err as any)?.message ?? "Unknown error"
                    }`
                ),
        });
    };

    /* ---------------- JSX ---------------- */

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Reduced width from 5xl to 4xl and height from 95vh to 85vh */}
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">

                {/* Close Button */}
                <button
                    onClick={() => dispatch(closeProductDetailModal())}
                    className="absolute top-4 left-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image section - Reduced mobile height */}
                <div className="w-full md:w-1/2 relative bg-gray-900 h-64 md:h-auto">
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
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 text-white rounded-full"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 text-white rounded-full"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusBadge.className}`}
                    >
                        {statusBadge.label}
                    </div>
                </div>

                {/* Details Section - Tighter padding */}
                <div className="w-full md:w-1/2 p-5 md:p-6 overflow-y-auto flex flex-col">

                    {/* Header details */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {formatCategory(item.category)}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {item.viewCount}
                                </span>
                                <span>•</span>
                                <span>{timeAgo}</span>
                            </div>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">{item.title}</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-black">{formattedPrice}</span>
                            {item.isNegotiable && (
                                <span className="flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                    <Tag className="w-3 h-3" /> Negotiable
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Seller Info - More compact */}
                    <div className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white shadow-sm">
                                <Image src={sellerImage} alt={item.seller.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-gray-900 text-xs flex items-center gap-1">
                                    {item.seller.name} {isOwner && "(You)"}
                                    {item.seller.type === "STOREFRONT" && (
                                        <span className="ml-1 text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-bold">
                                            PRO
                                        </span>
                                    )}
                                </div>
                                {item.seller.phone && !isOwner && (
                                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                                        <Phone className="w-3 h-3" />
                                        <span>{item.seller.phone}</span>
                                    </div>
                                )}
                            </div>
                            {!isOwner && (
                                <button className="p-2 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-red-500 transition-colors">
                                    <Heart className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Description - Clamped to avoid excessive scrolling */}
                    <div className="mb-4 flex-1">
                        <h3 className="text-xs font-bold text-gray-900 mb-1">Description</h3>
                        <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap line-clamp-[6]">
                            {item.description}
                        </p>
                    </div>

                    {/* Product Info Grid - More compact */}
                    <div className="grid grid-cols-2 gap-2 mb-6 p-3 bg-gray-50 rounded-xl">
                        <div>
                            <div className="text-[10px] text-gray-500">Location</div>
                            <div className="text-xs font-medium text-gray-900 truncate">{item.palika}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500">District</div>
                            <div className="text-xs font-medium text-gray-900 truncate">{item.district}</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2">
                        {isOwner ? (
                            <>
                                <button
                                    onClick={handleToggleSoldStatus}
                                    disabled={updateMutation.isPending}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl font-bold text-sm transition-colors"
                                >
                                    {updateMutation.isPending ? (
                                        <Loader2 className="animate-spin mx-auto w-5 h-5" />
                                    ) : item.status === "ACTIVE" ? "Mark as Sold" : "Mark as Active"}
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(openProductEditModal(item))
                                        dispatch(closeProductDetailModal())
                                    }}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm transition-colors"
                                >
                                    Edit Listing
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold text-sm transition-all"
                                >
                                    {deleteMutation.isPending ? (
                                        <Loader2 className="animate-spin mx-auto w-5 h-5" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    Delete Listing
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => dispatch(openChat({ id: item.seller.id, name: item.seller.name, profilePicture: item.seller.profileImage }))}
                                    className="flex-1 bg-black hover:bg-gray-800 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <MessageCircle
                                        className="w-4 h-4" />
                                    Message Seller
                                </button>
                                <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    <Share2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}