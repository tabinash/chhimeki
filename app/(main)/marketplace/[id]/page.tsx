"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, Heart, MessageCircle, Share2, MoreVertical, Loader2, Eye, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useProductById, useUpdateProduct, useDeleteProduct } from "../_hook";
import { useUser } from "@/hooks/useUser";
import { useState, useRef } from "react";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    // Get current user for ownership check
    const { user } = useUser();

    // Fetch product data
    const { data, isLoading, error, refetch } = useProductById(id);
    const product = data?.data;

    // Mutations for owner actions
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct(id);
    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

    // Image gallery state
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Touch/swipe handling
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current || !product) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && activeImageIndex < product.images.length - 1) {
            setActiveImageIndex(activeImageIndex + 1);
        }
        if (isRightSwipe && activeImageIndex > 0) {
            setActiveImageIndex(activeImageIndex - 1);
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const goToPrevious = () => {
        if (activeImageIndex > 0) setActiveImageIndex(activeImageIndex - 1);
    };

    const goToNext = () => {
        if (product && activeImageIndex < product.images.length - 1) {
            setActiveImageIndex(activeImageIndex + 1);
        }
    };

    // Check if current user is the owner
    const isOwner = product?.seller.id === user?.id;

    // Format price with NPR currency
    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString("en-NP")}`;
    };

    // Format relative time from createdAt
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    // Error or not found state
    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
                <h2 className="text-[22px] font-bold text-gray-900 mb-2">Item not found</h2>
                <p className="text-[15px] text-gray-500 mb-6">
                    {error?.message || "This item may have been removed or sold."}
                </p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-black text-white rounded-xl font-bold text-[15px]"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Get current image URL
    const currentImageUrl = product.images?.[activeImageIndex]?.url || "/placeholder-product.jpg";
    const hasMultipleImages = product.images.length > 1;

    return (
        <div className="min-h-screen bg-white pb-24 relative">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <button
                    onClick={() => router.back()}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2 pointer-events-auto">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Hero Image with Swipe & Navigation */}
            <div
                className="relative w-full aspect-[5/5] bg-gray-100"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Image
                    src={currentImageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Left Chevron */}
                {hasMultipleImages && activeImageIndex > 0 && (
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors z-10"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                )}

                {/* Right Chevron */}
                {hasMultipleImages && activeImageIndex < product.images.length - 1 && (
                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors z-10"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}

                {/* Image counter badge */}
                {hasMultipleImages && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[13px] px-2.5 py-1 rounded-full font-medium">
                        {activeImageIndex + 1} / {product.images.length}
                    </div>
                )}

                {/* Dot indicators */}
                {hasMultipleImages && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {product.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === activeImageIndex
                                    ? 'bg-white w-4'
                                    : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Owner badge */}
                {isOwner && (
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[13px] font-bold uppercase tracking-wider shadow-sm">
                        Your Listing
                    </div>
                )}

                {/* Sold overlay */}
                {product.status === "SOLD" && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl tracking-wider">SOLD</span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="px-5 py-6">

                {/* Title & Price Section */}
                <div className="mb-6">
                    <div className="flex flex-col items-start justify-between gap-4 mb-2">
                        <h1 className="text-[20px] font-bold  text-gray-900 leading-[12px]"> {product.title}</h1>
                        <div className="text-right">
                            <span className="text-[20px]  text-black whitespace-nowrap block">
                                {formatPrice(product.price)}
                            </span>
                            {product.isNegotiable && (
                                <span className="text-[16px] text-gray-500">Negotiable</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-[15px] text-black mb-4">
                        {/* <span className="flex items-center gap-1 bg-[#e4e1dd] px-3 py-1 rounded-full text-[13px] font-bold uppercase tracking-wider">
                            {product.category}
                        </span> */}
                        <span className="flex items-center bg-[#e4e1dd] font-medium px-3 py-1 rounded-full gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {product.viewCount} views
                        </span>
                        <span className="text-[15px] font-medium bg-[#e4e1dd] px-3 py-1 rounded-full">• {getRelativeTime(product.createdAt)}</span>
                    </div>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Seller Profile */}
                <div className="flex bg-[#e4e1dd] p-4 rounded-lg items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden relative border border-gray-100 bg-gray-50">
                        {product.seller.profileImage ? (
                            <Image
                                src={product.seller.profileImage}
                                alt={product.seller.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-lg">
                                {product.seller.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 text-[17px] flex items-center gap-2">
                            {product.seller.name}
                            {product.seller.type === "STOREFRONT" && (
                                <span className="text-[11px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-bold">
                                    Store
                                </span>
                            )}
                        </div>
                        <div className="text-[15px] text-black flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 " />
                            {product.palika}, {product.district}
                        </div>
                    </div>

                </div>

                {/* Description */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-900 text-[17px] ">Description</h3>
                    <p className="text-gray-600 text-[16px]  whitespace-pre-line">
                        Hi everyone we are here in the new imprelesim in the world. we are currently going throught some issue
                        {product.description}
                    </p>
                </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-pb z-20">
                <div className="max-w-md mx-auto space-y-3">
                    {isOwner ? (
                        <>
                            {/* Main actions row */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        const newStatus = product.status === "SOLD" ? "ACTIVE" : "SOLD";
                                        updateProduct(
                                            { status: newStatus },
                                            {
                                                onSuccess: () => {
                                                    refetch();
                                                },
                                                onError: (err) => {
                                                    alert(err.message || "Failed to update status");
                                                }
                                            }
                                        );
                                    }}
                                    disabled={isUpdating || isDeleting}
                                    className={`flex-1 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 ${product.status === "SOLD"
                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                        }`}
                                >
                                    {isUpdating ? "Updating..." : product.status === "SOLD" ? "Mark Available" : "Mark Sold"}
                                </button>
                                <Link
                                    href={`/marketplace/edit?productId=${product.id}`}
                                    className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-center"
                                >
                                    Edit Listing
                                </Link>
                            </div>
                            {/* Delete button */}
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                disabled={isUpdating || isDeleting}
                                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4" />
                                {isDeleting ? "Deleting..." : "Delete Listing"}
                            </button>
                        </>
                    ) : (
                        <Link
                            href={`/messages/${product.seller.id}?bottomNav=false`}
                            className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200">
                            <MessageCircle className="w-5 h-5" />
                            Message Seller
                        </Link>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowDeleteModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <Trash2 className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-[17px] font-bold text-gray-900 mb-2">Delete Listing?</h3>
                            <p className="text-[15px] text-gray-500 mb-6">
                                This will permanently remove your listing. This action cannot be undone.
                            </p>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        deleteProduct(product.id, {
                                            onSuccess: () => {
                                                setShowDeleteModal(false);
                                                router.push("/marketplace");
                                            },
                                            onError: (err) => {
                                                setShowDeleteModal(false);
                                                alert(err.message || "Failed to delete listing");
                                            }
                                        });
                                    }}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        "Delete"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
