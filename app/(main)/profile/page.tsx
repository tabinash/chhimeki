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
import ProfileLeftSidebar from "./_components/ProfileLeftSidebar";
import PostCard from "./_components/PostCard";
import ProductCard from "./_components/ProductCard";
import JobCard from "./_components/JobCard";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user");
    const activeTab = searchParams.get("tab") || "posts";

    // Fallback: If no user found, default to currentUser (safe fallback)
    const user = userId ? (mockUsers[userId] || currentUser) : currentUser;
    const isOwnProfile = !userId || userId === "current";

    return (
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
                            <PostCard
                                key={i}
                                userName={user.name}
                                userAvatar={user.avatar}
                                userWard={user.ward}
                                daysAgo={i * 2}
                                content={i === 1 ? "Just wanted to share this beautiful sunset from our tole today! Let's keep our neighborhood clean and green. 🌿 #Chhimeki #Community" : undefined}
                                imageUrl={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=800&h=600&fit=crop`}
                                likes={24}
                            />
                        ))}
                    </div>
                )}

                {/* Marketplace Content */}
                {activeTab === "marketplace" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {user.products.length > 0 ? (
                            user.products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                    postedDate={product.postedDate}
                                    status={product.status}
                                />
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
                                <JobCard
                                    key={job.id}
                                    id={job.id}
                                    title={job.title}
                                    company={job.company}
                                    type={job.type}
                                    salary={job.salary}
                                    postedDate={job.postedDate}
                                    status={job.status}
                                    isOwnProfile={isOwnProfile}
                                />
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
    );
}
