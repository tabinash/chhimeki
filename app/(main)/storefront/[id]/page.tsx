"use client";

import Image from 'next/image';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { MapPin, Phone, Globe, Store, Plus, Edit2, Loader2 } from 'lucide-react';
import StoreFrontProfileHeader from '../_components/StoreFrontProfileHeader';
import { useStorefrontById, useMyStorefront, useStorefrontProducts } from '../_hook';
import CreateProductModal from "../_modals/CreateProductModal"
import { useDispatch } from 'react-redux';
import { openCreateStoreFrontProductModal, openProductDetailModal, openProductEditModal } from '@/redux/slices/modalSlice';
import ProductDetailModal from '../../marketplace/_modals/ProductDetailModal';
import EditProductModal from '../../marketplace/_modals/EditProductModal';

export default function StoreFrontProfilePage() {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'products';

    // Get storefront ID from URL
    const storefrontId = params?.id ? Number(Array.isArray(params.id) ? params.id[0] : params.id) : 0;

    // Fetch storefront data
    const { data: storefrontData, isLoading, isError } = useStorefrontById(storefrontId);
    const storefront = storefrontData?.data;
    console.log("Storefront data", storefrontData)

    // Fetch storefront products
    const { data: productsData, isLoading: isLoadingProducts } = useStorefrontProducts(storefrontId);
    const products = productsData?.data ?? [];

    // Check if current user is the owner
    const { data: myStorefrontData } = useMyStorefront();
    const isOwner = myStorefrontData?.data?.id === storefront?.id;

    // Loading state
    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Not found state
    if (isError || !storefront) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <Store className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Shop Not Found</h2>
                <p className="text-gray-500 mb-6">This shop doesn't exist or has been closed.</p>
                <button
                    onClick={() => router.push('/storefront')}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
                >
                    Browse Shops
                </button>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto min-h-full pb-20">
            {/* Modular Header Component */}
            <StoreFrontProfileHeader storefront={storefront} isOwner={isOwner} />

            {/* Tab Content */}
            <div className="px-6 pb-10 pt-4">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-3 gap-3">
                        <div className="md:col-span-2 space-y-3">
                            {/* About Section */}
                            <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Store className="w-5 h-5 text-gray-500" />
                                    About Us
                                </h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {storefront.description || "No description available."}
                                </p>
                            </section>
                        </div>

                        {/* Sidebar / Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contact Info</h3>
                                <div className="space-y-4">
                                    {storefront.contactPhone && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">Phone</p>
                                                <p className="text-sm font-semibold text-gray-900">{storefront.contactPhone}</p>
                                            </div>
                                        </div>
                                    )}
                                    {storefront.contactEmail && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                                                <Globe className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">Email</p>
                                                <p className="text-sm font-semibold text-gray-900 break-all">{storefront.contactEmail}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">Location</p>
                                            <p className="text-sm font-semibold text-gray-900">{storefront.palika}, {storefront.district}</p>
                                        </div>
                                    </div>

                                    {/* Owner Mini Profile */}
                                    {storefront.owner && (
                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <p className="text-xs font-medium text-gray-500 mb-2">Managed by</p>
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={storefront.owner.profilePicture || "/placeholder-avatar.png"}
                                                        alt={storefront.owner.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{storefront.owner.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Products TAB */}
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Products & Services</h2>

                            {isOwner && (
                                <button
                                    onClick={() => dispatch(openCreateStoreFrontProductModal({ storeFrontId: storefront.id }))}
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add New Item
                                </button>
                            )}
                        </div>

                        {/* Loading Products */}
                        {isLoadingProducts ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                        ) : products.length > 0 ? (
                            /* Products Grid */
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.map(product => (
                                    <div
                                        onClick={() => dispatch(openProductDetailModal({ productId: product.id }))}
                                        key={product.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-gray-100 flex flex-col"
                                    >
                                        {/* Product Image */}
                                        <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden">
                                            <Image
                                                src={product.images[0]?.url || "/placeholder-cover.jpg"}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Status Badge */}
                                            <div className={`absolute top-3 right-3 ${product.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-orange-500 text-white"} px-2 py-1 rounded-lg text-xs font-semibold shadow-sm`}>
                                                {product.status === "ACTIVE" ? "Available" : "Sold"}
                                            </div>
                                            {/* Owner Edit Button */}
                                            {isOwner && (
                                                <button className="absolute top-3 left-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                                                    <Edit2 className="w-3.5 h-3.5 text-gray-700" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors line-clamp-1 flex-1">
                                                    {product.title}
                                                </h3>
                                                <span className="font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg text-sm ml-2 flex-shrink-0">
                                                    Rs. {product.price.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-50">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {storefront.palika}
                                                </div>
                                                {product.isNegotiable && (
                                                    <span className="font-medium text-green-600">Negotiable</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="bg-white flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-gray-100">
                                <Store className="w-16 h-16 text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-600 mb-2">No Products Yet</h3>
                                <p className="text-gray-500">
                                    {isOwner ? "Add your first product to get started!" : "This shop hasn't listed any items."}
                                </p>
                                {isOwner && (
                                    <button
                                        onClick={() => dispatch(openCreateStoreFrontProductModal({ storeFrontId: storefront.id }))}
                                        className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Product
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>
            <CreateProductModal />
            <ProductDetailModal />
            <EditProductModal />
        </div>
    );
}
