"use client"
import { useState, useEffect } from "react";
import { X, Check, Upload, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { ProductResponse, ProductCategory } from "@/types/api/products";
import { useUpdateProduct } from "@/app/(main)/marketplace/_hook/useUpdateProduct";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductResponse;
    onSuccess?: () => void;
}

// API Product Categories
const categories: { value: ProductCategory; label: string }[] = [
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "FURNITURE", label: "Furniture" },
    { value: "VEHICLES", label: "Vehicles" },
    { value: "FASHION", label: "Fashion & Clothing" },
    { value: "HOME_GARDEN", label: "Home & Garden" },
    { value: "SPORTS", label: "Sports & Outdoors" },
    { value: "BOOKS", label: "Books & Media" },
    { value: "TOYS", label: "Toys & Games" },
    { value: "MOBILE", label: "Mobile & Accessories" },
    { value: "OTHERS", label: "Others" },
];

export default function EditProductModal({ isOpen, onClose, product, onSuccess }: EditProductModalProps) {
    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState<ProductCategory>("ELECTRONICS");
    const [isNegotiable, setIsNegotiable] = useState(false);

    // Image management
    const [existingImages, setExistingImages] = useState<{ id: number; url: string }[]>([]);
    const [imagesToRemove, setImagesToRemove] = useState<number[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    const updateMutation = useUpdateProduct(product.id);

    // Initialize form with product data
    useEffect(() => {
        if (isOpen && product) {
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price.toString());
            setCategory(product.category);
            setIsNegotiable(product.isNegotiable);
            setExistingImages(product.images);
            setImagesToRemove([]);
            setNewFiles([]);
            setNewPreviews([]);
        }

        return () => {
            newPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [isOpen, product]);

    if (!isOpen) return null;

    const handleNewFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const totalImages = existingImages.length - imagesToRemove.length + newFiles.length + files.length;
        if (totalImages > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        setNewFiles(prev => [...prev, ...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setNewPreviews(prev => [...prev, ...previews]);
    };

    const handleRemoveExistingImage = (imageId: number) => {
        const remainingImages = existingImages.length - imagesToRemove.length - 1 + newFiles.length;
        if (remainingImages === 0) {
            alert("Product must have at least 1 image");
            return;
        }
        setImagesToRemove(prev => [...prev, imageId]);
    };

    const handleUndoRemoveExistingImage = (imageId: number) => {
        setImagesToRemove(prev => prev.filter(id => id !== imageId));
    };

    const handleRemoveNewImage = (index: number) => {
        URL.revokeObjectURL(newPreviews[index]);
        setNewPreviews(prev => prev.filter((_, i) => i !== index));
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            alert("Please enter a valid price");
            return;
        }

        const remainingImages = existingImages.length - imagesToRemove.length + newFiles.length;
        if (remainingImages === 0) {
            alert("Product must have at least 1 image");
            return;
        }

        const updateData = {
            title,
            description,
            price: priceNum,
            isNegotiable,
            category,
            newImages: newFiles.length > 0 ? newFiles : undefined,
            removeImageIds: imagesToRemove.length > 0 ? imagesToRemove : undefined,
        };

        updateMutation.mutate(updateData, {
            onSuccess: () => {
                onSuccess?.();
                onClose();
            },
            onError: (error) => {
                alert(`Error updating product: ${error.message || "Unknown error"}`);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">Edit Listing</h2>
                    <button
                        onClick={onClose}
                        disabled={updateMutation.isPending}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Images Section */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Product Images <span className="text-gray-500 text-xs">(min 1, max 5)</span>
                        </label>

                        {/* Images Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            {/* Existing Images */}
                            {existingImages.map((img) => (
                                <div
                                    key={img.id}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${imagesToRemove.includes(img.id)
                                            ? 'border-red-300 opacity-50'
                                            : 'border-gray-200'
                                        } group`}
                                >
                                    <Image src={img.url} alt="Product" fill className="object-cover" />
                                    {imagesToRemove.includes(img.id) ? (
                                        <button
                                            type="button"
                                            onClick={() => handleUndoRemoveExistingImage(img.id)}
                                            className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold"
                                        >
                                            UNDO
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(img.id)}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {/* New Images */}
                            {newPreviews.map((preview, index) => (
                                <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden border-2 border-blue-400 group">
                                    <Image src={preview} alt={`New ${index + 1}`} fill className="object-cover" />
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">
                                        NEW
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Upload Button */}
                        {(existingImages.length - imagesToRemove.length + newFiles.length) < 5 && (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">
                                        <span className="font-bold text-gray-900">Add more images</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG (Max 5 total)</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleNewFilesSelect}
                                />
                            </label>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Product Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            minLength={3}
                            maxLength={100}
                            placeholder="e.g. Wooden Dining Table"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Row: Price & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                Price (Rs.) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                required
                                min="1"
                                placeholder="e.g. 5000"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Negotiable Checkbox */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <input
                            type="checkbox"
                            id="negotiable"
                            checked={isNegotiable}
                            onChange={(e) => setIsNegotiable(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="negotiable" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Price is negotiable
                        </label>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            required
                            minLength={10}
                            maxLength={2000}
                            rows={4}
                            placeholder="Describe your product in detail..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">{description.length}/2000 characters</p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={updateMutation.isPending}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateMutation.isPending}
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {updateMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
