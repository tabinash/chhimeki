import { AlertTriangle, MapPin, Info, PawPrint } from "lucide-react";
import Image from "next/image";
import { alertStories } from "@/data/mockFeedData";

export default function AlertShowcase() {

    // Helper to render icon based on string type
    const getIcon = (type: string) => {
        switch (type) {
            case 'alert': return <AlertTriangle className="w-6 h-6 text-white mb-1" />;
            case 'map-pin': return <MapPin className="w-6 h-6 text-white mb-1" />;
            case 'info': return <Info className="w-6 h-6 text-white mb-1" />;
            case 'paw-print': return <PawPrint className="w-6 h-6 text-white mb-1" />;
            default: return <Info className="w-6 h-6 text-white mb-1" />;
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 px-1">Community Alerts</h2>
            <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                {/* Add Alert Story Button */}
                <div className="flex-shrink-0 relative w-32 h-52 rounded-xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <AlertTriangle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 text-center px-2">Report Alert</span>
                </div>

                {/* Alert Stories */}
                {alertStories.map((alert) => (
                    <div key={alert.id} className="flex-shrink-0 relative w-32 h-52 rounded-xl bg-gray-900 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-sm group">
                        {/* Background Image */}
                        <Image
                            src={alert.image}
                            alt={alert.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                        {/* Content */}
                        <div className="absolute inset-0 p-3 flex flex-col justify-between">
                            {/* Header */}
                            <div className="flex items-center gap-1.5 self-start">
                                <div className="w-6 h-6 rounded-full border border-white/30 overflow-hidden bg-white/10 backdrop-blur-md flex items-center justify-center">
                                    {getIcon(alert.iconType)}
                                </div>
                                <span className="text-[10px] font-bold text-white drop-shadow-md truncate max-w-[70px]">{alert.source}</span>
                            </div>

                            {/* Center content */}
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="text-sm font-black text-white leading-tight drop-shadow-xl uppercase tracking-wide">{alert.title}</span>
                            </div>

                            {/* Footer */}
                            <div className="text-center">
                                <span className="text-[10px] font-medium text-white/90 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm">
                                    {alert.time} ago
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
