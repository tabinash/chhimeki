"use client";

import React from 'react';
import Image from 'next/image';
import { useSearchParams, useParams } from 'next/navigation';
import { businesses } from '@/data/mockBusinessData';
import { MapPin, Phone, Globe, Store, MessageCircle, Plus, Wrench, Star, FileText } from 'lucide-react';

export default function BusinessProfilePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    // Simulate auth
    const isOwner = searchParams.get('self') === 'true';

    // Get business data
    const idString = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const businessId = parseInt(idString || '0');
    const business = businesses.find(b => b.id === businessId);

    if (!business) return null; // Layout handles notFound

    return (
        <div className="pb-20">
            {/* Tab Content */}
            <div className="min-h-[50vh]">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="divide-y divide-gray-100">
                        {/* Description */}
                        <div className="p-4 bg-white">
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

                        {/* Location & Contact */}
                        <div className="p-4 bg-white space-y-4">
                            <h2 className="text-lg font-bold text-gray-900">Location & Contact</h2>

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

                            <div className="flex flex-col gap-3">
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
                    <div className="p-4 bg-white space-y-4">
                        {/* Create Product Widget - Owner Only */}
                        {isOwner && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Plus className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 text-[15px]">Add New Product</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">Showcase your products to customers</p>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg active:scale-95 transition-transform">
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Products Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">
                                Products {business.products.length > 0 && <span className="text-gray-400 font-normal text-sm">({business.products.length})</span>}
                            </h2>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {business.products.length > 0 ? (
                                business.products.map(product => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col active:scale-[0.98] transition-transform duration-200"
                                    >
                                        <div className="aspect-square relative bg-gray-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-3 flex flex-col flex-1">
                                            <h3 className="font-semibold text-gray-900 text-[15px] leading-tight line-clamp-2 mb-1">
                                                {product.name}
                                            </h3>
                                            <div className="font-bold text-gray-900 text-[13px]">
                                                {product.price}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center">
                                    <Store className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    <h3 className="font-bold text-gray-900">No products yet</h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {isOwner ? "Add your first product above" : "Products will appear here"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                    <div className="p-4 bg-white space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-gray-900">Services</h2>
                            {isOwner && (
                                <button className="text-blue-600 text-xs font-bold flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add Service
                                </button>
                            )}
                        </div>

                        {business.services && business.services.length > 0 ? (
                            <div className="space-y-3">
                                {business.services.map((service) => (
                                    <div key={service.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <Wrench className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-gray-900 text-sm">{service.name}</h3>
                                                <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-gray-700 border border-gray-200">
                                                    {service.price}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Wrench className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <h3 className="font-bold text-gray-900">No services yet</h3>
                                <p className="text-gray-500 text-sm mt-1">Services will appear here</p>
                            </div>
                        )}
                    </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                    <div className="p-4 bg-white space-y-6">
                        {/* Rating Summary Header */}
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
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
                                <div className="py-8 text-center">
                                    <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    <h3 className="font-bold text-gray-900">No reviews yet</h3>
                                    <p className="text-gray-500 text-sm mt-1">Be the first to leave a review</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
