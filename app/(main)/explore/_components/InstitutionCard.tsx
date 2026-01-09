import { CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InstitutionCardProps {
    institution: {
        id: number;
        name: string;
        profilePicture: string | null;
        palika: string;
        district: string;
        isVerified: boolean;
        userType: "GENERAL" | "GOVERNMENT_OFFICE" | "BUSINESS";
    };
}

export function InstitutionCard({ institution }: InstitutionCardProps) {
    const isGovernment = institution.userType === "GOVERNMENT_OFFICE";
    const typeLabel = isGovernment ? "Government Office" : "Business";
    const emoji = isGovernment ? "🏛️" : "🏪";
    const gradient = isGovernment
        ? "from-orange-500 to-red-600"
        : "from-green-500 to-blue-600";

    return (
        <Link
            href={`/profile/${institution.id}`}
            className="bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 relative">
                {institution.profilePicture ? (
                    <Image
                        src={institution.profilePicture}
                        alt={institution.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl`}>
                        {emoji}
                    </div>
                )}
                {institution.isVerified && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-3 h-3 text-white" fill="currentColor" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                    {institution.name}
                </h3>
                <p className="text-xs text-gray-500 mb-1.5">{typeLabel}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {institution.palika}, {institution.district}
                </p>
            </div>
            <button className="px-5 py-2.5 bg-gray-50 text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm flex-shrink-0 border border-gray-100">
                Follow
            </button>
        </Link>
    );
}
