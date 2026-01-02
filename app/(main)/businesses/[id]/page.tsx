"use client";
import React from 'react';
import Image from 'next/image';
import { notFound, useRouter, useSearchParams, useParams } from 'next/navigation';
import { businesses } from '@/data/mockBusinessData';
import { MapPin, Phone, Globe, Store, MessageCircle, Plus, Wrench, Star } from 'lucide-react';

export default function BusinessProfilePage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview'; // Default to lowercase match

    // Simulate auth
    const isOwner = searchParams.get('self') === 'true';

    // Safety check
    if (!params?.id) return notFound();

    const idString = Array.isArray(params.id) ? params.id[0] : params.id;
    const businessId = parseInt(idString);
    const business = businesses.find(b => b.id === businessId);

    if (!business) return notFound();

    const handleTabChange = (tab: string) => {
        const query = isOwner ? `?tab=${tab.toLowerCase()}&self=true` : `?tab=${tab.toLowerCase()}`;
        router.replace(`/businesses/${businessId}${query}`, { scroll: false });
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'products', label: 'Products' },
        { id: 'services', label: 'Services' },
        { id: 'reviews', label: 'Reviews' }
    ];

    return (
        <div className="pb-20">
            {/* Actions Bar (Mobile Sticky) */}
            <div className="px-4 pt-4 pb-4 md:hidden flex items-center gap-3">
                {isOwner ? (
                    <button className="flex-1 bg-gray-100 text-gray-900 py-2.5 rounded-xl text-sm font-bold border border-gray-200">
                        Edit Profile
                    </button>
                ) : (
                    <>
                        <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-200">
                            Message
                        </button>
                        <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold border border-gray-200">
                            Call
                        </button>
                    </>
                )}
            </div>

            {/* Tabs */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
                <div className="flex items-center gap-6 px-4 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                ? "border-black text-black"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[50vh]">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="divide-y divide-gray-100">
                        {/* Description */}
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">About</h2>
                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                {business.description}
                            </p>

                            {/* Features Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {business.features.map((feature, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-semibold rounded-lg">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Location & Contact (Formerly Sidebar) */}
                        <div className="p-4 space-y-4">
                            <h2 className="text-lg font-bold text-gray-900">Location & Info</h2>

                            {/* Map Placeholder */}
                            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                                    alt="Map Location"
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white p-2 rounded-full shadow-md">
                                        <MapPin className="w-5 h-5 text-red-500 fill-red-500" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-gray-700">{business.location}</p>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                                        <span className="text-xs font-bold text-gray-400 uppercase">Phone</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">{business.phone}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Globe className="w-3.5 h-3.5 text-purple-600" />
                                        <span className="text-xs font-bold text-gray-400 uppercase">Email</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 truncate">{business.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Catalog</h2>
                            {isOwner && (
                                <button className="text-blue-600 text-xs font-bold flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add Item
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {business.products.length > 0 ? (
                                business.products.map(product => (
                                    <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                        <div className="relative aspect-square bg-gray-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white">
                                                {product.price}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-bold text-gray-900 text-sm truncate mb-1">{product.name}</h3>
                                            {!isOwner && (
                                                <button className="w-full mt-2 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold">
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-gray-400">
                                    <Store className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm font-medium">No products listed</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-gray-900">Services Offered</h2>
                            {isOwner && (
                                <button className="text-blue-600 text-xs font-bold flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add Service
                                </button>
                            )}
                        </div>

                        {business.services && business.services.length > 0 ? (
                            <div className="grid gap-3">
                                {business.services.map((service) => (
                                    <div key={service.id} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <Wrench className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-gray-900 text-sm">{service.name}</h3>
                                                <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-700 whitespace-nowrap">
                                                    {service.price}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center text-gray-400">
                                <Wrench className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-medium">No services listed</p>
                            </div>
                        )}
                    </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                    <div className="p-4 space-y-6">
                        {/* Rating Summary Header */}
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                            <div className="text-center">
                                <div className="text-3xl font-black text-gray-900 leading-none">{business.rating}</div>
                                <div className="flex gap-0.5 text-yellow-400 justify-center my-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`w-3 h-3 ${s <= Math.round(business.rating) ? "fill-current" : "text-gray-300"}`} />
                                    ))}
                                </div>
                                <div className="text-[10px] font-bold text-gray-500">{business.reviewCount} Reviews</div>
                            </div>
                            <div className="flex-1 border-l border-gray-200 pl-4">
                                <p className="text-xs text-gray-600 font-medium mb-2">Most customers mention:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {["Fast Service", "Friendly Staff", "Good Value"].map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 text-sm">Recent Reviews</h3>
                            {business.reviews && business.reviews.length > 0 ? (
                                business.reviews.map((review) => (
                                    <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                                                    <Image src={review.avatar} alt={review.user} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900">{review.user}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded text-green-700">
                                                <span className="text-[10px] font-bold">{review.rating}</span>
                                                <Star className="w-2.5 h-2.5 fill-current" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed pl-10">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-gray-400">
                                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm font-medium">No reviews yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
