"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
    MapPin,
    MessageCircle,
    MoreHorizontal,
    Heart,
    ShoppingBag,
    Briefcase
} from "lucide-react";
import { mockUsers, currentUser } from "@/data/mockProfileData";
import ProfileHeader from "./ProfileHeader";
import ProfileLeftSidebar from "./ProfileLeftSidebar";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user");
    const activeTab = searchParams.get("tab") || "posts";

    // Fallback: If no user found, default to currentUser (safe fallback)
    const user = userId ? (mockUsers[userId] || currentUser) : currentUser;
    const isOwnProfile = !userId || userId === "current";

    return (
        <div className="min-h-screen bg-gray-50/30">
            {/* --- 1. PROFILE HEADER --- */}
            <ProfileHeader user={user} isOwnProfile={isOwnProfile} />

            {/* --- 2. MAIN CONTENT GRID --- */}
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* --- LEFT COLUMN (Sticky Module) --- */}
                <div className="lg:col-span-4 lg:sticky lg:top-4 lg:h-fit">
                    <ProfileLeftSidebar user={user} isOwnProfile={isOwnProfile} />
                </div>

                {/* --- RIGHT COLUMN (Feed) --- */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Posts Content */}
                    {activeTab === "posts" && (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {/* Header */}
                                    <div className="p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                            <Image
                                                src={user.avatar}
                                                alt={user.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                {i * 2} days ago • <MapPin className="w-3 h-3" /> {user.ward}
                                            </p>
                                        </div>
                                        <button className="ml-auto text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Text */}
                                    {i === 1 && (
                                        <div className="px-4 pb-3">
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                Just wanted to share this beautiful sunset from our tole today!
                                                Let's keep our neighborhood clean and green. 🌿 #Chhimeki #Community
                                            </p>
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="relative aspect-video bg-gray-100">
                                        <Image
                                            src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=800&h=600&fit=crop`}
                                            alt="Post image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="px-4 py-3 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm font-medium transition-colors group">
                                                <Heart className="w-5 h-5 group-hover:fill-current" />
                                                <span>24</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 text-sm font-medium transition-colors">
                                                <MessageCircle className="w-5 h-5" />
                                                <span>Comment</span>
                                            </button>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Marketplace Content */}
                    {activeTab === "marketplace" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {user.products.length > 0 ? (
                                user.products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col">
                                        {/* Product Image */}
                                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-3">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-bold text-white">
                                                {product.price}
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h4 className="font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                                                    {product.title}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Listed {product.postedDate}
                                            </p>

                                            <button className="w-full mt-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <h3 className="font-bold text-gray-900">No active listings</h3>
                                    <p className="text-sm text-gray-500">This user hasn't listed any items yet.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Jobs Content */}
                    {activeTab === "jobs" && (
                        <div className="space-y-4">
                            {user.jobs.length > 0 ? (
                                user.jobs.map((job) => (
                                    <div key={job.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors cursor-pointer">
                                                    {job.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-sm font-medium text-gray-700">{job.company}</span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-bold">
                                                        {job.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {job.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50">
                                            <span className="font-semibold text-green-600 flex items-center gap-1">
                                                💰 {job.salary}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                🕒 {job.postedDate}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <button className="flex-1 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                                                Apply Now
                                            </button>
                                            {isOwnProfile && (
                                                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                                                    Manage
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <h3 className="font-bold text-gray-900">No active jobs</h3>
                                    <p className="text-sm text-gray-500">This user hasn't posted any jobs yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
