"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
    MapPin,
    MessageCircle,
    MoreHorizontal,
    Heart,
    ShoppingBag,
    Briefcase,
    Calendar,
    Mail,
    Home
} from "lucide-react";
import { mockUsers, currentUser } from "@/data/mockProfileData";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user");
    const activeTab = searchParams.get("tab") || "posts";

    // Fallback: If no user found, default to currentUser (safe fallback)
    const user = userId ? (mockUsers[userId] || currentUser) : currentUser;
    const isOwnProfile = !userId || userId === "current";

    return (
        <div className="bg-white pb-20">
            {/* --- MAIN CONTENT AREA --- */}

            {/* Posts Content */}
            {activeTab === "posts" && (
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-4">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
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
                            <p className="text-gray-800 text-sm leading-relaxed mb-3">
                                Just wanted to share this beautiful sunset from our tole today!
                                Let's keep our neighborhood clean and green. 🌿 #Chhimeki #Community
                            </p>

                            {/* Image */}
                            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                                <Image
                                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=800&h=600&fit=crop`}
                                    alt="Post image"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-6 pt-1">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                                    <Heart className="w-5 h-5" />
                                    <span className="text-sm font-medium">24</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">Comment</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* About Content */}
            {activeTab === "about" && (
                <div className="p-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">Bio</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {user.bio || "No bio available."}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-3">Intro</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">Work</p>
                                    <p className="font-medium text-gray-900 text-sm">Freelance</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <Home className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">Lives in</p>
                                    <p className="font-medium text-gray-900 text-sm">{user.tole}, {user.city}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">From</p>
                                    <p className="font-medium text-gray-900 text-sm">{user.city}, Nepal</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">Joined</p>
                                    <p className="font-medium text-gray-900 text-sm">{user.joinedDate || "December 2023"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Marketplace Content */}
            {activeTab === "marketplace" && (
                <div className="p-4 grid grid-cols-2 gap-3">
                    {user.products.length > 0 ? (
                        user.products.map((product) => (
                            <div key={product.id} className="bg-gray-50 rounded-xl p-2.5">
                                {/* Product Image */}
                                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-200 mb-2">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white">
                                        {product.price}
                                    </div>
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm truncate">{product.title}</h4>
                                <button className="w-full mt-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-900 rounded-lg text-xs font-bold shadow-sm">
                                    View
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <h3 className="font-bold text-gray-900">No active listings</h3>
                        </div>
                    )}
                </div>
            )}

            {/* Jobs Content */}
            {activeTab === "jobs" && (
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {user.jobs.length > 0 ? (
                        user.jobs.map((job) => (
                            <div key={job.id} className="p-4 bg-white">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base">{job.title}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs font-medium text-gray-600">{job.company}</span>
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {job.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                                    <span className="font-semibold text-green-700">💰 {job.salary}</span>
                                    <span>•</span>
                                    <span>{job.postedDate}</span>
                                </div>

                                <div className="mt-3 flex gap-2">
                                    <button className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold">
                                        Apply Now
                                    </button>
                                    {isOwnProfile && (
                                        <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                                            Manage
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <h3 className="font-bold text-gray-900">No active jobs</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
