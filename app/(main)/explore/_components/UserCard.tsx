import { CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
    user: {
        id: number;
        name: string;
        profilePicture: string | null;

    };
}

export function UserCard({ user }: UserCardProps) {
    return (
        <Link
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

            </div>
            <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                    {user.name}
                </h3>

                <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm">
                    view profile
                </button>
            </div>
        </Link>
    );
}
