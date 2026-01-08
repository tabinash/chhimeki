"use client";

import { Search, CheckCircle2, Building2, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetNearbyGeneralUsers } from "@/hooks/useGetNearbyGeneralUsers";
import { useGetNearbyInstitutions } from "@/hooks/useGetNearbyInstitutions";

export default function ExplorePage() {
    const { data: nearbyUsersData, isLoading: isLoadingUsers } = useGetNearbyGeneralUsers();
    const { data: institutionsData, isLoading: isLoadingInstitutions } = useGetNearbyInstitutions();

    const nearbyUsers = nearbyUsersData?.data || [];
    const institutions = institutionsData?.data || [];

    // Separate institutions by type
    const governmentOffices = institutions.filter(inst => inst.userType === "GOVERNMENT_OFFICE");
    const businesses = institutions.filter(inst => inst.userType === "BUSINESS");

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
                    <div className="flex items-center gap-3">
                        <button className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                            <Search className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Nearby General Users Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            People from Your Wada
                        </h2>
                    </div>

                    {isLoadingUsers ? (
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                                    <div className="aspect-[4/3] bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                        <div className="h-10 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : nearbyUsers.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                            {nearbyUsers.slice(0, 6).map((user) => (
                                <Link
                                    key={user.id}
                                    href={`/profile/${user.id}`}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                                        {user.profilePicture ? (
                                            <Image
                                                src={user.profilePicture}
                                                alt={user.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                                {user.name[0]}
                                            </div>
                                        )}
                                        {user.isVerified && (
                                            <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                                <CheckCircle2 className="w-4 h-4 text-white" fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                            {user.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            Ward {user.wada}, {user.palika}
                                        </p>
                                        <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm">
                                            Connect
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">No nearby users found</p>
                        </div>
                    )}
                </div>

                {/* Government Offices Section */}
                {governmentOffices.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Government Offices
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {governmentOffices.map((office) => (
                                <Link
                                    key={office.id}
                                    href={`/profile/${office.id}`}
                                    className="bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 relative">
                                        {office.profilePicture ? (
                                            <Image
                                                src={office.profilePicture}
                                                alt={office.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl">
                                                🏛️
                                            </div>
                                        )}
                                        {office.isVerified && (
                                            <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                                <CheckCircle2 className="w-3 h-3 text-white" fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                            {office.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-1.5">Government Office</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {office.palika}, {office.district}
                                        </p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-gray-50 text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-100">
                                        Follow
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Businesses Section */}
                {isLoadingInstitutions ? (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-semibold text-gray-900">Nearby Businesses</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm animate-pulse">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-200" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : businesses.length > 0 ? (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Nearby Businesses
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {businesses.map((business) => (
                                <Link
                                    key={business.id}
                                    href={`/profile/${business.id}`}
                                    className="bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 relative">
                                        {business.profilePicture ? (
                                            <Image
                                                src={business.profilePicture}
                                                alt={business.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-2xl">
                                                🏪
                                            </div>
                                        )}
                                        {business.isVerified && (
                                            <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                                <CheckCircle2 className="w-3 h-3 text-white" fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                            {business.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-1.5">Business</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {business.palika}, {business.district}
                                        </p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-gray-50 text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-100">
                                        Follow
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}