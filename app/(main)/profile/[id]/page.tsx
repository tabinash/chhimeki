"use client";
import { useParams, useSearchParams } from "next/navigation";
import {
    ShoppingBag,
    Briefcase
} from "lucide-react";
import { useUserProfile } from "../_hook/useUserProfile";
import { useUserPosts } from "../_hook/useUserPosts";
import { useUserProducts } from "../_hook/useUserProducts";
import { useUserJobs } from "../_hook/useUserJobs";
import ProfileLeftSidebar from "../_components/ProfileLeftSidebar";
import PostCard from "../_components/PostCard";
import ProductCard from "../_components/ProductCard";
import JobCard from "../_components/JobCard";

export default function ProfilePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const userId = Number(params.id);
    const activeTab = searchParams.get("tab") || "posts";

    // Fetch user profile
    const { data: profileData, isLoading: isProfileLoading } = useUserProfile(userId);

    // Fetch user posts
    const { data: postsData, isLoading: isPostsLoading } = useUserPosts(userId, { page: 0, size: 20 });

    // Fetch user products
    const { data: productsData, isLoading: isProductsLoading } = useUserProducts(userId, { status: "ALL", page: 0, size: 20 });

    // Fetch user jobs
    const { data: jobsData, isLoading: isJobsLoading } = useUserJobs(userId, { status: "ALL", page: 0, size: 20 });

    if (isProfileLoading || !profileData) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-2xl mb-6"></div>
                    <div className="h-40 bg-gray-200 rounded-2xl"></div>
                </div>
            </div>
        );
    }

    const user = profileData.data;
    const posts = postsData?.data || [];
    const products = productsData?.data || [];
    const jobs = jobsData?.data || [];

    // Helper function to calculate days ago
    const getDaysAgo = (dateString: string) => {
        const diff = Date.now() - new Date(dateString).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Helper function to format employment type
    const formatEmploymentType = (type: string): "Full-time" | "Part-time" | "One-time" => {
        switch (type) {
            case "FULL_TIME": return "Full-time";
            case "PART_TIME": return "Part-time";
            case "DAILY_WAGE":
            case "TEMPORARY":
            case "CONTRACT":
            case "FREELANCE": return "One-time";
            default: return "Full-time";
        }
    };

    // Helper function to format job status
    const formatJobStatus = (status: string): "Open" | "Closed" => {
        return status === "ACTIVE" ? "Open" : "Closed";
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* --- LEFT COLUMN (Sticky Module) --- */}
            <div className="lg:col-span-4 lg:sticky lg:top-4 lg:h-fit">
                <ProfileLeftSidebar user={user} />
            </div>

            {/* --- RIGHT COLUMN (Feed) --- */}
            <div className="lg:col-span-8 space-y-6">

                {/* Posts Content */}
                {activeTab === "posts" && (
                    <div className="space-y-6">
                        {isPostsLoading ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-600 mt-4">Loading posts...</p>
                            </div>
                        ) : posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    userName={post.authorName}
                                    userAvatar={post.authorProfilePicture || `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(post.authorName)}`}
                                    userWard={`Ward ${post.wada}`}
                                    daysAgo={getDaysAgo(post.createdAt)}
                                    content={post.content || undefined}
                                    imageUrl={post.imageUrls[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"}
                                    likes={post.likeCount}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900">No posts yet</h3>
                                <p className="text-sm text-gray-500">This user hasn't posted anything yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Marketplace Content */}
                {activeTab === "marketplace" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {isProductsLoading ? (
                            <div className="col-span-full text-center py-12">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-600 mt-4">Loading products...</p>
                            </div>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={String(product.id)}
                                    title={product.title}
                                    price={`Rs. ${product.price.toLocaleString()}`}
                                    image={product.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"}
                                    postedDate={formatDate(product.createdAt)}
                                    status={product.status === "ACTIVE" ? "Active" : "Sold"}
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
                        {isJobsLoading ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-600 mt-4">Loading jobs...</p>
                            </div>
                        ) : jobs.length > 0 ? (
                            jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    id={String(job.id)}
                                    title={job.title}
                                    company={job.poster.name}
                                    type={formatEmploymentType(job.employmentType)}
                                    salary={job.salaryAmount ? `Rs. ${job.salaryAmount.toLocaleString()}${job.isNegotiable ? " (Negotiable)" : ""}` : "Negotiable"}
                                    postedDate={formatDate(job.createdAt)}
                                    status={formatJobStatus(job.status)}
                                    isOwnProfile={user.isMine}
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
