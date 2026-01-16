"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Upload, Image as ImageIcon, ArrowLeft, X, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useProductById, useUpdateProduct } from "../_hook";
import { useUser } from "@/hooks/useUser";
import { ProductCategory, ProductStatus, ImageInfo } from "@/types/api/products";

// Category options matching API ProductCategory type
const CATEGORIES: { label: string; value: ProductCategory }[] = [
    { label: "Furniture", value: "FURNITURE" },
    { label: "Electronics", value: "ELECTRONICS" },
    { label: "Vehicles", value: "VEHICLES" },
    { label: "Fashion", value: "FASHION" },
    { label: "Home & Garden", value: "HOME_GARDEN" },
    { label: "Sports", value: "SPORTS" },
    { label: "Books", value: "BOOKS" },
    { label: "Toys", value: "TOYS" },
    { label: "Mobile", value: "MOBILE" },
    { label: "Others", value: "OTHERS" },
];

const STATUS_OPTIONS: { label: string; value: ProductStatus }[] = [
    { label: "Available", value: "ACTIVE" },
    { label: "Sold", value: "SOLD" },
];

export default function EditProductPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = Number(searchParams.get("productId"));

    const { user } = useUser();

    // Fetch existing product data
    const { data: productData, isLoading: isLoadingProduct, error: fetchError } = useProductById(productId);
    const product = productData?.data;

    // Update mutation
    const { mutate: updateProduct, isPending, error: updateError } = useUpdateProduct(productId);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "FURNITURE" as ProductCategory,
        description: "",
        isNegotiable: false,
    });

    // Existing images from product (can be marked for removal)
    const [existingImages, setExistingImages] = useState<ImageInfo[]>([]);
    const [imagesToRemove, setImagesToRemove] = useState<number[]>([]);

    // New images to add
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
    const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);

    // Populate form with existing product data
    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price.toString(),
                category: product.category,
                description: product.description,
                isNegotiable: product.isNegotiable,
            });
            setExistingImages(product.images);
        }
    }, [product]);

    // Cleanup new image URLs on unmount
    useEffect(() => {
        return () => {
            newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [newPreviewUrls]);

    // Check if current user is the owner
    const isOwner = product?.seller.id === user?.id;

    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Calculate remaining slots (max 5 total)
        const currentTotal = existingImages.filter(img => !imagesToRemove.includes(img.id)).length + newImageFiles.length;
        const remainingSlots = 5 - currentTotal;
        const filesToAdd = files.slice(0, remainingSlots);

        if (filesToAdd.length > 0) {
            const newUrls = filesToAdd.map(file => URL.createObjectURL(file));
            setNewImageFiles(prev => [...prev, ...filesToAdd]);
            setNewPreviewUrls(prev => [...prev, ...newUrls]);
        }
    };

    const markExistingImageForRemoval = (imageId: number) => {
        // Ensure at least 1 image remains
        const remainingExisting = existingImages.filter(img => !imagesToRemove.includes(img.id) && img.id !== imageId).length;
        const totalAfterRemoval = remainingExisting + newImageFiles.length;

        if (totalAfterRemoval < 1) {
            alert("Product must have at least 1 image");
            return;
        }

        setImagesToRemove(prev => [...prev, imageId]);
    };

    const restoreExistingImage = (imageId: number) => {
        setImagesToRemove(prev => prev.filter(id => id !== imageId));
    };

    const removeNewImage = (index: number) => {
        URL.revokeObjectURL(newPreviewUrls[index]);
        setNewImageFiles(prev => prev.filter((_, i) => i !== index));
        setNewPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const price = parseFloat(formData.price.replace(/[^0-9.]/g, ""));
        if (isNaN(price) || price <= 0) {
            alert("Please enter a valid price");
            return;
        }

        // Ensure at least 1 image
        const remainingExisting = existingImages.filter(img => !imagesToRemove.includes(img.id)).length;
        if (remainingExisting + newImageFiles.length < 1) {
            alert("Product must have at least 1 image");
            return;
        }

        // Build update request
        updateProduct(
            {
                title: formData.title,
                description: formData.description,
                price: price,
                isNegotiable: formData.isNegotiable,
                category: formData.category,
                newImages: newImageFiles.length > 0 ? newImageFiles : undefined,
                removeImageIds: imagesToRemove.length > 0 ? imagesToRemove : undefined,
            },
            {
                onSuccess: (response) => {
                    console.log("Product updated:", response);
                    router.push(`/marketplace/${productId}`);
                },
                onError: (err) => {
                    console.error("Failed to update product:", err);
                    alert(err.message || "Failed to update listing. Please try again.");
                },
            }
        );
    };

    // Loading state
    if (isLoadingProduct) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    // Error or not found
    if (fetchError || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
                <h2 className="text-[22px] font-bold text-gray-900 mb-2">Product not found</h2>
                <p className="text-[15px] text-gray-500 mb-6">{fetchError?.message || "Unable to load product."}</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-black text-white rounded-xl font-bold text-[15px]"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Not owner check
    if (!isOwner) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
                <h2 className="text-[22px] font-bold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-[15px] text-gray-500 mb-6">You can only edit your own listings.</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-black text-white rounded-xl font-bold text-[15px]"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Calculate total images
    const activeExistingImages = existingImages.filter(img => !imagesToRemove.includes(img.id));
    const totalImages = activeExistingImages.length + newImageFiles.length;

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#e4e1dd] border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-white/50 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-[17px] font-bold text-gray-900">Edit Listing</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-6">

                {/* Image Management */}
                <div>
                    <label className="block text-[15px] font-bold text-gray-700 mb-2">
                        Product Photos <span className="text-gray-400 font-normal">({totalImages}/5)</span>
                    </label>

                    {/* Image Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {/* Existing images */}
                        {existingImages.map((img, index) => {
                            const isMarkedForRemoval = imagesToRemove.includes(img.id);
                            return (
                                <div
                                    key={img.id}
                                    className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 ${isMarkedForRemoval ? 'opacity-40' : ''}`}
                                >
                                    <Image src={img.url} alt={`Image ${index + 1}`} fill className="object-cover" />
                                    {isMarkedForRemoval ? (
                                        <button
                                            type="button"
                                            onClick={() => restoreExistingImage(img.id)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[13px] font-bold"
                                        >
                                            Tap to restore
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => markExistingImageForRemoval(img.id)}
                                            className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full text-white hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    {index === 0 && !isMarkedForRemoval && (
                                        <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[11px] px-1.5 py-0.5 rounded font-medium">
                                            Cover
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* New images */}
                        {newPreviewUrls.map((url, index) => (
                            <div key={`new-${index}`} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                <Image src={url} alt={`New ${index + 1}`} fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-1 left-1 bg-green-600 text-white text-[11px] px-1.5 py-0.5 rounded font-medium">
                                    New
                                </div>
                            </div>
                        ))}

                        {/* Add more button */}
                        {totalImages < 5 && (
                            <label className="aspect-square border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-[13px] text-gray-500 font-medium">Add Photo</p>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleNewImageChange}
                                />
                            </label>
                        )}
                    </div>
                    <p className="text-[13px] text-gray-500 mt-2">Tap trash icon to remove. Add 1-5 photos total.</p>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-[15px] font-bold text-gray-700 mb-1.5">Title</label>
                    <input
                        type="text"
                        required
                        minLength={3}
                        maxLength={100}
                        placeholder="Product title"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[15px] font-bold text-gray-700 mb-1.5">Price</label>
                        <input
                            type="text"
                            required
                            placeholder="Rs. 0"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[15px] font-bold text-gray-700 mb-1.5">Category</label>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium appearance-none"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                </div>



                {/* Negotiable Toggle */}
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <div>
                        <p className="text-[15px] font-bold text-gray-700">Price Negotiable?</p>
                        <p className="text-[13px] text-gray-500">Let buyers know if you're open to offers</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isNegotiable: !formData.isNegotiable })}
                        className={`relative w-12 h-7 rounded-full transition-colors ${formData.isNegotiable ? 'bg-black' : 'bg-gray-300'
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${formData.isNegotiable ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        />
                    </button>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-[15px] font-bold text-gray-700 mb-1.5">Description</label>
                    <textarea
                        required
                        minLength={10}
                        maxLength={2000}
                        rows={5}
                        placeholder="Describe your item..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <p className="text-[13px] text-gray-400 mt-1">{formData.description.length}/2000</p>
                </div>

                {/* Error Display */}
                {updateError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[15px] text-red-600">
                        {updateError.message}
                    </div>
                )}

                {/* Spacer for fixed footer */}
                <div className="h-20" />

                {/* Fixed Footer */}
                <div className="bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-pb z-20">
                    <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isPending}
                            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl text-[15px] transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[15px] transition-colors flex items-center justify-center  disabled:opacity-50"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}