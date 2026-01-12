"use client"
import { useState } from "react";
import { X, Check, Upload, Loader2, Trash2, MapPin } from "lucide-react";
import Image from "next/image";
import { ProductCategory } from "@/types/api/products";
import { useCreateProduct } from "@/app/(main)/marketplace/_hook/useCreateProduct";
import { useUser } from "@/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCreateStoreFrontProductModal } from "@/redux/slices/modalSlice";



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

export default function CreateProductModal() {
    const { user } = useUser();
    const dispatch = useDispatch();
    const createStoreFrontProductModal = useSelector((state: RootState) => state.modal.createStoreFrontProductModal);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState<ProductCategory>("ELECTRONICS");
    const [isNegotiable, setIsNegotiable] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const createMutation = useCreateProduct();

    if (!createStoreFrontProductModal.isOpen) return null;

    const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const totalImages = selectedFiles.length + files.length;
        if (totalImages > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        setSelectedFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index: number) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleReset = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("ELECTRONICS");
        setIsNegotiable(false);
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        setSelectedFiles([]);
        setImagePreviews([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            alert("Please enter a valid price");
            return;
        }

        if (selectedFiles.length === 0) {
            alert("Please add at least 1 image (max 5)");
            return;
        }


        const createData = {
            storefrontId: createStoreFrontProductModal.storeFrontId ?? 0,
            title,
            description,
            price: priceNum,
            isNegotiable,
            category,
            images: selectedFiles,
        };

        createMutation.mutate(createData, {
            onSuccess: () => {
                handleReset();
                dispatch(closeCreateStoreFrontProductModal())
            },
            onError: (error) => {
                alert(`Error creating product: ${error.message || "Unknown error"}`);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">Sell an Item</h2>
                    <button
                        onClick={() => dispatch(closeCreateStoreFrontProductModal())}
                        disabled={createMutation.isPending}
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
                            Product Images <span className="text-red-500">* (1-5 required)</span>
                        </label>

                        {/* Images Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group">
                                    <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Upload Button */}
                        {imagePreviews.length < 5 && (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">
                                        <span className="font-bold text-gray-900">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG (Max 5 images)</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFilesSelect}
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
                            onClick={() => {
                                handleReset();
                                dispatch(closeCreateStoreFrontProductModal())
                            }}
                            disabled={createMutation.isPending}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {createMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    List Item
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
