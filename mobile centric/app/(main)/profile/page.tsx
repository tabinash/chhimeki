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
import { marketplaceItems } from "@/data/mockMarketplaceData";
import { jobs } from "@/data/mockJobsData";
import { posts } from "@/data/mockFeedData";
import PostCard from "../(feed)/_components/PostCard";
import ProductCard from "./_components/ProductCard";
import JobCard from "./_components/JobCard";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user");
    const activeTab = searchParams.get("tab") || "posts";

    const user = userId ? (mockUsers[userId] || currentUser) : currentUser;
    const isOwnProfile = !userId || userId === "current";

    return (
        <div className="bg-white pb-20">
            {/* --- MAIN CONTENT AREA --- */}

            {/* Posts Content */}
            {activeTab === "posts" && (
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {posts.slice(0, 5).map((post) => (
                        <PostCard key={post.id} post={post} />
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
                    {marketplaceItems.length > 0 ? (
                        marketplaceItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
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
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobCard key={job.id} job={job} isOwnProfile={isOwnProfile} />
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
