"use client";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import {
    ShoppingBag,
    Briefcase,
    Calendar,
    MapPin,
    Home,
    FileText,
    ShieldAlert,
    Phone,
    MailCheck
} from "lucide-react";
import PostCard from "../_components/PostCard";
import ProductCard from "../_components/ProductCard";
import JobCard from "../_components/JobCard";
import { useUserProfile, useUserPosts, useUserProducts, useUserJobs } from "../_hook";

interface ProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
    // Unwrap the Promise using React's use() hook (Next.js 16+)
    const { id } = use(params);
    const searchParams = useSearchParams();

    const userId = parseInt(id, 10);
    const activeTab = searchParams.get("tab") || "posts";

    // Fetch data using hooks
    const { data: profileData } = useUserProfile(userId);
    const { data: postsData, isLoading: postsLoading } = useUserPosts(userId);
    const { data: productsData, isLoading: productsLoading } = useUserProducts(userId);
    const { data: jobsData, isLoading: jobsLoading } = useUserJobs(userId);
    console.log("profileData", profileData);

    const user = profileData?.data;
    const posts = postsData?.data || [];
    const products = productsData?.data || [];
    const jobs = jobsData?.data || [];
    const isOwnProfile = user?.isMine || false;

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-32" />
            ))}
        </div>
    );

    return (
        <div className="  pb-10">
            {/* --- MAIN CONTENT AREA --- */}

            {/* Posts Content */}
            {activeTab === "posts" && (
                <div className="divide-y space-y-1 divide-gray-100 border-t border-gray-100">
                    {postsLoading ? (
                        <LoadingSkeleton />
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <h3 className="font-bold text-gray-900">No posts yet</h3>
                            <p className="text-gray-500 text-sm mt-1">Posts will appear here</p>
                        </div>
                    )}
                </div>
            )}

            {/* About Content */}
            {activeTab === "about" && user && (
                <div className="p-4 bg-white space-y-4">

                    {/* ================= LOCATION ================= */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-3">Location</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <Home className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                        Lives in
                                    </p>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {user.wada}, {user.palika}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                        From
                                    </p>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {user.district}, Nepal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= CONTACT ================= */}
                    {(user.phone || user.email) && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">Contact</h3>

                            <div className="space-y-4">
                                {user.phone && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                                Phone
                                            </p>
                                            <p className="font-medium text-gray-900 text-sm">
                                                {user.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {user.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                            <MailCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                                Email
                                            </p>
                                            <p className="font-medium text-gray-900 text-sm">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ================= PERSONAL (GENERAL USER) ================= */}
                    {user.userType === "GENERAL" && user.dateOfBirth && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">Personal</h3>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                        Date of Birth
                                    </p>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {new Date(user.dateOfBirth).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= BUSINESS INFO ================= */}
                    {user.userType === "BUSINESS" && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">Business Details</h3>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                    <ShoppingBag className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                        Business Name
                                    </p>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {user.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= GOVERNMENT OFFICE ================= */}
                    {user.userType === "GOVERNMENT_OFFICE" && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">Office Information</h3>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">
                                        Office Name
                                    </p>
                                    <p className="font-medium text-gray-900 text-sm">
                                        {user.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}


            {/* Marketplace Content */}
            {activeTab === "marketplace" && (
                <div className="p-4 bg-white grid grid-cols-2 gap-3">
                    {productsLoading ? (
                        <LoadingSkeleton />
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} isOwnProfile={isOwnProfile} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <h3 className="font-bold text-gray-900">No active listings</h3>
                            <p className="text-gray-500 text-sm mt-1">Marketplace items will appear here</p>
                        </div>
                    )}
                </div>
            )}

            {/* Jobs Content */}
            {activeTab === "jobs" && (
                <div className="divide-y space-y-1 divide-gray-100 border-t border-gray-100">
                    {jobsLoading ? (
                        <LoadingSkeleton />
                    ) : jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobCard key={job.id} job={job} isOwnProfile={isOwnProfile} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <h3 className="font-bold text-gray-900">No active jobs</h3>
                            <p className="text-gray-500 text-sm mt-1">Job postings will appear here</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
