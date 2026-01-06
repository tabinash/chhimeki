"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Check, Upload, Image as ImageIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function SellItemPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "Furniture",
        condition: "Used - Good",
        location: "",
        description: "",
        image: "",
    });
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setFormData({ ...formData, image: url });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Listing Submitted:", formData);
        router.push("/marketplace");
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

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden group">
                        {previewUrl ? (
                            <>
                                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                                        <Upload className="w-3 h-3" /> Change Photo
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="mb-1 text-sm font-bold text-gray-900">Tap to upload</p>
                                <p className="text-xs text-gray-500">Photos help sell faster</p>
                            </div>
                        )}
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">What are you selling?</label>
                    <input
                        type="text"
                        required
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
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>Furniture</option>
                            <option>Electronics</option>
                            <option>Vehicles</option>
                            <option>Clothing</option>
                            <option>Home & Garden</option>
                        </select>
                    </div>
                </div>

                {/* Condition & Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Condition</label>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium appearance-none"
                            value={formData.condition}
                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        >
                            <option>New</option>
                            <option>Like New</option>
                            <option>Used - Good</option>
                            <option>Used - Fair</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Baneshwor"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                    <textarea
                        required
                        rows={5}
                        placeholder="Describe your item... (Brand, age, condition, etc.)"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* Spacer for fixed footer */}
                <div className="h-20" />

                {/* Fixed Footer */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-pb z-20">
                    <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            Post Item
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
