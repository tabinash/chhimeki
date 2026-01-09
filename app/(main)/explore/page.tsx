"use client";

import { Search, Building2, Users } from "lucide-react";
import { useGetNearbyGeneralUsers } from "./_hook/useGetNearbyGeneralUsers";
import { useGetNearbyInstitutions } from "./_hook/useGetNearbyInstitutions";
import {
    UserCard,
    InstitutionCard,
    UserCardSkeleton,
    InstitutionCardSkeleton
} from "./_components";

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
                                <UserCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : nearbyUsers.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                            {nearbyUsers.slice(0, 6).map((user) => (
                                <UserCard key={user.id} user={user} />
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
                                <InstitutionCard key={office.id} institution={office} />
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
                                <InstitutionCardSkeleton key={i} />
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
                                <InstitutionCard key={business.id} institution={business} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

