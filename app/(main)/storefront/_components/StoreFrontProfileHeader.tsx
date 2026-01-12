"use client";
import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin, Share2, MessageCircle, ChevronLeft, Edit2, Camera, ShoppingBag, Store, Loader2, X, Phone, Mail } from 'lucide-react';
import { StorefrontResponse } from '@/types/api/storefront';
import { useUpdateStorefrontLogo, useUpdateStorefrontCover, useUpdateStorefrontInfo, UpdateStorefrontInfoRequest } from '../_hook';

interface StoreFrontProfileHeaderProps {
    storefront: StorefrontResponse;
    isOwner: boolean;
}

export default function StoreFrontProfileHeader({ storefront, isOwner }: StoreFrontProfileHeaderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'products';

    // Edit modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState<UpdateStorefrontInfoRequest>({
        name: storefront.name,
        description: storefront.description || "",
        contactPhone: storefront.contactPhone,
        contactEmail: storefront.contactEmail || "",
    });

    // File input refs
    const logoInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    // Update hooks
    const { mutate: updateLogo, isPending: isLogoUpdating } = useUpdateStorefrontLogo();
    const { mutate: updateCover, isPending: isCoverUpdating } = useUpdateStorefrontCover();
    const { mutate: updateInfo, isPending: isInfoUpdating } = useUpdateStorefrontInfo();

    const isAnyUpdating = isLogoUpdating || isCoverUpdating || isInfoUpdating;

    // Handlers
    const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateCover(file);
        }
    };

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateLogo(file);
        }
    };

    const handleInfoSave = () => {
        updateInfo(formData, {
            onSuccess: (response) => {
                console.log("Storefront updated successfully", response);
                setIsEditModalOpen(false);
            }
        });
    };

    const tabs = [
        { id: "products", label: "Products", icon: <ShoppingBag className="w-4 h-4" /> },
        { id: "overview", label: "Overview", icon: <Store className="w-4 h-4" /> },
    ];

    return (
        <div className="max-w-6xl mx-auto pt-6 px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* 1. Cover Image Section */}
                <div className="relative h-48 sm:h-64 md:h-80 bg-gray-100">
                    <Image
                        src={storefront.coverImage || "/placeholder-cover.jpg"}
                        alt={storefront.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 left-4 p-2.5 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all border border-white/10 z-20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Owner: Edit Cover */}
                    {isOwner && (
                        <>
                            <input
                                ref={coverInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCoverChange}
                            />
                            <button
                                onClick={() => coverInputRef.current?.click()}
                                disabled={isCoverUpdating}
                                title="Change cover"
                                className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-xs font-bold hover:bg-white transition-colors flex items-center gap-2 z-10 text-gray-900 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer z-20 "
                            >
                                {isCoverUpdating ? (
                                    <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Camera className="w-4 h-4" />
                                        <span className="hidden sm:inline">Change Cover</span>
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>

                {/* 2. Profile Info Section */}
                <div className="px-6 pb-6 sm:px-10">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12 md:-mt-16 mb-4 relative z-10">

                        {/* Logo (Overlapping) */}
                        <div className="relative flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden relative">
                                <Image
                                    src={storefront.logo || "/placeholder-avatar.png"}
                                    alt={storefront.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Camera Button (for owner) */}
                            {isOwner && (
                                <>
                                    <input
                                        ref={logoInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleLogoChange}
                                    />
                                    <button
                                        onClick={() => logoInputRef.current?.click()}
                                        disabled={isLogoUpdating}
                                        className="absolute bottom-2 left-2 w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                        title="Change logo"
                                    >
                                        {isLogoUpdating ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Camera className="w-4 h-4" />
                                        )}
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Name & Main Info */}
                        <div className="flex-1 text-center md:text-left pt-2 md:pt-0 md:pb-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                    {storefront.name}
                                </h1>
                                {/* Status Badge */}
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${storefront.status === "ACTIVE"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                                    }`}>
                                    {storefront.status === "ACTIVE" ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Location Subtitle */}
                            <div className="flex items-center gap-3 text-sm text-gray-500 justify-center md:justify-start flex-wrap">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {storefront.palika}, {storefront.district}
                                </span>
                            </div>
                        </div>

                        {/* Actions (Desktop: Right aligned) */}
                        <div className="flex gap-3 justify-center md:justify-end md:pb-4">
                            {isOwner ? (
                                <>
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        <span>Edit Info</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <Link
                                        href={`/messages?userId=${storefront.owner.id}`}
                                        target="_blank"
                                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-blue-100"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Message</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1 border-t border-gray-100 pt-1 mt-6 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                href={`/storefront/${storefront.id}?tab=${tab.id}`}
                                className={`relative px-6 py-4 text-sm font-bold transition-all flex-shrink-0 ${activeTab === tab.id
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {tab.icon}
                                    {tab.label}
                                </span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full mx-4" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Info Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Edit Shop Info</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name || ""}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter shop name"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description || ""}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Describe your shop"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    value={formData.contactPhone || ""}
                                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+977 98XXXXXXXX"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.contactEmail || ""}
                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="shop@example.com"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleInfoSave}
                                disabled={isInfoUpdating}
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isInfoUpdating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
