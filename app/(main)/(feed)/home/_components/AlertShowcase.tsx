import { AlertTriangle, MapPin, Info, PawPrint, Plus } from "lucide-react";
import Image from "next/image";
import { alertStories } from "@/data/mockFeedData";

export default function AlertShowcase() {

    // Helper to render icon based on string type
    const getIcon = (type: string) => {
        switch (type) {
            case 'alert': return <AlertTriangle className="w-4 h-4 text-white" />;
            case 'map-pin': return <MapPin className="w-4 h-4 text-white" />;
            case 'info': return <Info className="w-4 h-4 text-white" />;
            case 'paw-print': return <PawPrint className="w-4 h-4 text-white" />;
            default: return <Info className="w-4 h-4 text-white" />;
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Pulse Stories</h2>
                <button className="text-xs font-semibold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {/* Add Alert Story Button - Styled like "Add Story" */}
                <div className="flex-shrink-0 relative w-24 h-40 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-all group shadow-sm bg-white border border-gray-100">
                    <div className="absolute inset-x-0 top-0 h-3/5 bg-gray-50 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border-2 border-white shadow-sm">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" className="w-full h-full rounded-full object-cover p-0.5" />
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-white flex flex-col items-center justify-start pt-3 relative">
                        <div className="absolute -top-3 w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                            <Plus className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-800 mt-1">Create Alert</span>
                    </div>
                </div>

                {/* Alert Stories */}
                {alertStories.map((alert) => (
                    <div key={alert.id} className="flex-shrink-0 relative w-24 h-40 rounded-xl bg-gray-900 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-sm group border-2 border-transparent hover:border-blue-500/30">
                        {/* Background Image */}
                        <Image
                            src={alert.image}
                            alt={alert.title}
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

                        {/* Content */}
                        <div className="absolute inset-0 p-2 flex flex-col justify-between">
                            {/* Type Badge */}
                            <div className="self-start">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-sm ${alert.iconType === 'alert' ? 'bg-red-500/80' : 'bg-blue-500/80'
                                    }`}>
                                    {getIcon(alert.iconType)}
                                </div>
                            </div>

                            {/* Footer Text */}
                            <div className="text-center">
                                <span className="text-[9px] font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
                                    {alert.source}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
