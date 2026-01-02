import { Image as ImageIcon, Link, MapPin, AlertTriangle, PawPrint, Megaphone } from "lucide-react"; // Note: Importing ImageIcon as alias to avoid conflict if next/image is used, though here it might not be.
import Image from "next/image";

export default function CreatePostWidget() {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 relative">
                    <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="You" fill className="object-cover" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-full px-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Share an update, alert, or notice..."
                        className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder:text-gray-500"
                    />
                </div>
            </div>

            {/* Specific Post Types */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">General</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">Alert</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PawPrint className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">Lost & Found</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Megaphone className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">Notice</span>
                </button>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Add Location</span>
                </button>
                <button className="bg-black text-white px-6 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Post
                </button>
            </div>
        </div>
    );
}
