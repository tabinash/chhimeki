import { useState, useEffect } from "react";
import { X, Check, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProductPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
    onSubmit: (data: any) => void;
}

export default function ProductPostModal({ isOpen, onClose, initialData, onSubmit }: ProductPostModalProps) {
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

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                price: initialData.price || "",
                category: initialData.category || "Furniture",
                condition: initialData.condition || "Used - Good",
                location: initialData.location || "",
                description: initialData.description || "",
                image: initialData.image || "",
            });
            setPreviewUrl(initialData.image || "");
        } else {
            setFormData({
                title: "",
                price: "",
                category: "Furniture",
                condition: "Used - Good",
                location: "",
                description: "",
                image: "",
            });
            setPreviewUrl("");
        }

        return () => {
            if (previewUrl && !initialData?.image) { // Only revoke if it's a local object URL and not an initial image from data
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [initialData, isOpen, previewUrl]); // Added previewUrl to dependencies for cleanup

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a fake local URL for preview
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setFormData({ ...formData, image: url });
        } else {
            setPreviewUrl("");
            setFormData({ ...formData, image: "" });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? "Edit Listing" : "Sell an Item"}
                    </h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden group">
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
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p className="mb-1 text-sm text-gray-500"><span className="font-bold text-gray-900">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">What are you selling?</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Wooden Dining Table"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Row: Price & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Price</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Rs. 5,000"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Furniture</option>
                                <option>Electronics</option>
                                <option>Vehicles</option>
                                <option>Clothing</option>
                                <option>Home & Garden</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Row: Condition & Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Condition</label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
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
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
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
                            rows={4}
                            placeholder="Describe your item..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            {initialData ? "Save Changes" : "List Item"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
