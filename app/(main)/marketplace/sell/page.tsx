"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Upload, Image as ImageIcon, ArrowLeft, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCreateProduct } from "../_hook";
import { useUser } from "@/hooks/useUser";
import { ProductCategory } from "@/types/api/products";

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

export default function SellItemPage() {
    const router = useRouter();
    const { user } = useUser();
    const { mutate: createProduct, isPending, error } = useCreateProduct();

    // Form state - initialize location from user data
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "FURNITURE" as ProductCategory,
        description: "",
        isNegotiable: false,
        palika: "",
        district: "",
    });

    // Set default location from user on mount
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                palika: prev.palika || user.palika || "",
                district: prev.district || user.district || "",
            }));
        }
    }, [user]);

    // Image state - support multiple images (1-5)
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Limit to 5 images total
        const remainingSlots = 5 - imageFiles.length;
        const filesToAdd = files.slice(0, remainingSlots);

        if (filesToAdd.length > 0) {
            const newUrls = filesToAdd.map(file => URL.createObjectURL(file));
            setImageFiles(prev => [...prev, ...filesToAdd]);
            setPreviewUrls(prev => [...prev, ...newUrls]);
        }
    };

    const removeImage = (index: number) => {
        URL.revokeObjectURL(previewUrls[index]);
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (imageFiles.length === 0) {
            alert("Please add at least one photo");
            return;
        }

        const price = parseFloat(formData.price.replace(/[^0-9.]/g, ""));
        if (isNaN(price) || price <= 0) {
            alert("Please enter a valid price");
            return;
        }

        // Create product
        createProduct(
            {
                title: formData.title,
                description: formData.description,
                price: price,
                isNegotiable: formData.isNegotiable,
                category: formData.category,
                palika: formData.palika || user?.palika,
                district: formData.district || user?.district,
                images: imageFiles,
            },
            {
                onSuccess: (response) => {
                    console.log("Product created:", response);
                    router.push(`/marketplace/${response.data.id}`);
                },
                onError: (err) => {
                    console.error("Failed to create product:", err);
                    alert(err.message || "Failed to create listing. Please try again.");
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Sell an Item</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-6">

                {/* Image Upload - Multiple Images */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Product Photos <span className="text-gray-400 font-normal">({imageFiles.length}/5)</span>
                    </label>

                    {/* Image Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {/* Preview images */}
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                <Image src={url} alt={`Preview ${index + 1}`} fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                {index === 0 && (
                                    <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                                        Cover
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add more button - show if less than 5 images */}
                        {imageFiles.length < 5 && (
                            <label className="aspect-square border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Add Photo</p>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Add 1-5 photos. First photo will be the cover.</p>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">What are you selling?</label>
                    <input
                        type="text"
                        required
                        minLength={3}
                        maxLength={100}
                        placeholder="e.g. Wooden Dining Table"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Price</label>
                        <input
                            type="text"
                            required
                            placeholder="Rs. 0"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium appearance-none"
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
                        <p className="text-sm font-bold text-gray-700">Price Negotiable?</p>
                        <p className="text-xs text-gray-500">Let buyers know if you're open to offers</p>
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

                {/* Location Fields */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Listing Location</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                required
                                placeholder={user?.palika || "Palika"}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                                value={formData.palika}
                                onChange={(e) => setFormData({ ...formData, palika: e.target.value })}
                            />
                            <p className="text-[10px] text-gray-400 mt-1">Palika / Municipality</p>
                        </div>
                        <div>
                            <input
                                type="text"
                                required
                                placeholder={user?.district || "District"}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            />
                            <p className="text-[10px] text-gray-400 mt-1">District</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                    <textarea
                        required
                        minLength={10}
                        maxLength={2000}
                        rows={5}
                        placeholder="Describe your item... (Brand, age, condition, etc.)"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <p className="text-xs text-gray-400 mt-1">{formData.description.length}/2000</p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                        {error.message}
                    </div>
                )}

                {/* Spacer for fixed footer */}
                <div className="h-20" />

                {/* Fixed Footer */}
                <div className=" bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-pb z-20">
                    <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isPending}
                            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    Post Item
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
