"use client"
import { useState } from "react";
import { X, Check, Upload, Loader2, Store, MapPin, Phone, Mail, Image as ImageIcon, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useCreateStorefront } from "../_hook";
import { useRouter } from "next/navigation";

interface CreateStoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateStoreModal({ isOpen, onClose, onSuccess }: CreateStoreModalProps) {
    const { user } = useUser();
    const router = useRouter();
    const createStorefront = useCreateStorefront();

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [palika, setPalika] = useState(user?.palika || "");
    const [district, setDistrict] = useState(user?.district || "");

    // Image state
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    // Error state
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setContactPhone("");
        setContactEmail("");
        setPalika(user?.palika || "");
        setDistrict(user?.district || "");
        setLogo(null);
        setLogoPreview(null);
        setCoverImage(null);
        setCoverPreview(null);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (name.length < 3) {
            setError("Shop name must be at least 3 characters");
            return;
        }
        if (!contactPhone) {
            setError("Phone number is required");
            return;
        }
        if (!palika || !district) {
            setError("Location (Palika & District) is required");
            return;
        }

        try {
            const response = await createStorefront.mutateAsync({
                name,
                description: description || undefined,
                contactPhone,
                contactEmail: contactEmail || undefined,
                palika,
                district,
                logo: logo || undefined,
                coverImage: coverImage || undefined,
            });

            // Success - redirect to the new storefront
            resetForm();
            onSuccess?.();
            onClose();

            // Navigate to the created storefront
            if (response.data?.id) {
                router.push(`/storefront/${response.data.id}`);
            }
        } catch (err: any) {
            setError(err?.message || "Failed to create shop. Please try again.");
        }
    };

    const handleClose = () => {
        if (!createStorefront.isPending) {
            resetForm();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            <Store className="w-5 h-5" />
                            Open Your Shop
                        </h2>
                        <p className="text-xs text-gray-500 font-medium mt-1">Start selling to your neighborhood today</p>
                    </div>
                    <button
                        onClick={handleClose}
                        type="button"
                        disabled={createStorefront.isPending}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-8">

                    {/* Branding Section */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            Store Branding
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Logo Upload */}
                            <div className="md:col-span-1">
                                <span className="block text-xs font-bold text-gray-600 mb-2">Shop Logo</span>
                                <label className="relative block aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer bg-gray-50 overflow-hidden group">
                                    {logoPreview ? (
                                        <Image src={logoPreview} alt="Logo Preview" fill className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                            <Upload className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs font-medium">Upload Logo</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoSelect} />
                                </label>
                            </div>

                            {/* Cover Upload */}
                            <div className="md:col-span-2">
                                <span className="block text-xs font-bold text-gray-600 mb-2">Cover Photo</span>
                                <label className="relative block h-full min-h-[140px] rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer bg-gray-50 overflow-hidden group">
                                    {coverPreview ? (
                                        <Image src={coverPreview} alt="Cover Preview" fill className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                            <Upload className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs font-medium">Upload Cover Image</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverSelect} />
                                </label>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <Store className="w-4 h-4 text-blue-600" />
                            Basic Information
                        </label>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Shop Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    minLength={3}
                                    maxLength={100}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    placeholder="e.g. Sharma Kirana Pasal"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                                    placeholder="Tell customers about your business..."
                                    rows={3}
                                    maxLength={1000}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Location & Contact */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            Location & Contact
                        </label>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Palika <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    value={palika}
                                    onChange={(e) => setPalika(e.target.value)}
                                    placeholder="Municipality"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">District <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    placeholder="District"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        value={contactPhone}
                                        onChange={(e) => setContactPhone(e.target.value)}
                                        placeholder="98XXXXXXXX"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        placeholder="shop@example.com (Optional)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={createStorefront.isPending}
                            className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createStorefront.isPending}
                            className="flex-[2] px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {createStorefront.isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Shop...
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    Create Shop
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
