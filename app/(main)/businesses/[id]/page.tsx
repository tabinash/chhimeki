"use client";
import React from 'react';
import Image from 'next/image';
import { notFound, useRouter, useSearchParams, useParams } from 'next/navigation';
import { businesses } from '@/data/mockBusinessData';
import { MapPin, Star, Phone, Globe, Clock, Share2, MessageCircle, Heart, Store, ChevronLeft, Edit2, Camera, Settings, Plus } from 'lucide-react';
import BusinessProfileHeader from './_components/BusinessProfileHeader';

export default function BusinessProfilePage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'Products';

    // Simulate auth: Check if query param self=true is present
    const isOwner = searchParams.get('self') === 'true';

    // Safety check
    if (!params?.id) return notFound();

    const idString = Array.isArray(params.id) ? params.id[0] : params.id;
    const businessId = parseInt(idString);
    const business = businesses.find(b => b.id === businessId);

    if (!business) return notFound();

    const handleTabChange = (tab: string) => {
        // Persist the self=true param when switching tabs if it exists
        const query = isOwner ? `?tab=${tab}&self=true` : `?tab=${tab}`;
        router.replace(`/businesses/${businessId}${query}`, { scroll: false });
    };

    return (
        <div className="bg-white w-full max-w-6xl mx-auto min-h-full pb-20">
            {/* Modular Header Component */}
            <BusinessProfileHeader business={business} isOwner={isOwner} />

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                <div className="flex gap-8 px-8 overflow-x-auto hide-scrollbar">
                    {['Products', 'overview'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`py-5 text-sm font-bold border-b-[3px] capitalize transition-all whitespace-nowrap ${activeTab === tab
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-6 md:px-10 py-10 ">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-10">
                            {/* Owner Dashboard Snippet */}
                            {isOwner && (
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                    <h3 className="text-lg font-bold mb-4 relative z-10">Quick Actions</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                                        <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-1">
                                                <Store className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-xs font-bold">Open Shop</span>
                                        </button>
                                        <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-1">
                                                <Edit2 className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-xs font-bold">Update Info</span>
                                        </button>
                                        <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mb-1">
                                                <MessageCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-xs font-bold">Check Msgs</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">About Us</h2>
                                    {isOwner && <button className="text-blue-600 text-sm font-bold hover:underline">Edit</button>}
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <p className="text-gray-700 leading-loose whitespace-pre-line text-lg font-medium">
                                        {business.description}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
                                <div className="flex flex-wrap gap-3">
                                    {business.features.map((feature, i) => (
                                        <span key={i} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl shadow-sm">
                                            {feature}
                                        </span>
                                    ))}
                                    {isOwner && (
                                        <button className="px-4 py-2 bg-gray-100 border border-dashed border-gray-300 text-gray-500 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-1">
                                            <Plus className="w-4 h-4" /> Add
                                        </button>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-100/50">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    Location
                                </h3>
                                <div className="aspect-video bg-gray-100 rounded-2xl mb-4 relative overflow-hidden ring-1 ring-gray-900/5">
                                    <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=250&fit=crop" alt="Map" fill className="object-cover opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white p-2 rounded-full shadow-lg">
                                            <MapPin className="w-6 h-6 text-red-500 fill-red-500" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium mb-6 text-center leading-relaxed">
                                    {business.location}
                                </p>

                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Call Us</p>
                                            <p className="font-bold text-gray-900">{business.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                                            <p className="font-bold text-gray-900">{business.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products TAB */}
                {activeTab === 'Products' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 ">Products & Services</h2>

                            {isOwner ? (
                                <button className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add New Item
                                </button>
                            ) : (
                                <select className="bg-gray-100 border-none text-sm font-bold rounded-xl px-4 py-2.5 text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors">
                                    <option>Everything</option>
                                    <option>Popular</option>
                                    <option>Newest</option>
                                </select>
                            )}
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Add Item Card (Owner) */}


                            {business.products.length > 0 ? (
                                business.products.map(product => (
                                    <div key={product.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all cursor-pointer relative">
                                        <div className="relative h-48 bg-gray-100">
                                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            {/* Overlay for Owner */}
                                            {isOwner && (
                                                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white text-black transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
                                                <span className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-black">{product.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">Delicious and freshly prepared with local ingredients.</p>

                                            {!isOwner && (
                                                <button className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                                                    Add to Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-60">
                                    <Store className="w-16 h-16 text-gray-300 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Yet</h3>
                                    <p className="text-gray-500">This shop hasn't listed any items.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* NOT IMPLEMENTED */}

            </div>
        </div>
    );
}
