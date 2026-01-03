"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/landing-hero.png"
                    alt="Community Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" /> {/* Dark Overlay */}
            </div>

            {/* Logo Section */}
            <div className="relative z-10 flex flex-col items-center mb-24 animate-in fade-in zoom-in-50 duration-500">
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-[2.5rem] font-bold text-white tracking-tight">Chhimeki</span>
                    <span className="text-[2.5rem] font-bold text-orange-500 tracking-tight">App</span>
                </div>
                {/* Smile Curve SVG */}
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-1">
                    <path d="M5 2C15 15 45 15 55 2" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
                </svg>
            </div>

            {/* Main Headline */}
            <div className="relative z-10 text-center space-y-3 mb-16 max-w-xs mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                <h1 className="text-3xl font-bold text-white leading-tight">
                    Interaction, <br />
                    <span className="text-blue-400">Content Sharing</span> & <br />
                    Collaboration!
                </h1>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 w-full max-w-xs space-y-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                <button
                    onClick={() => router.push("/register")}
                    className="w-full bg-blue-600 text-white rounded-full py-4 font-bold text-sm tracking-widest uppercase shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all hover:bg-blue-700"
                >
                    Get Started
                </button>

                <button
                    onClick={() => router.push("/login")}
                    className="w-full bg-orange-500 text-white rounded-full py-4 font-bold text-sm tracking-widest uppercase shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all hover:bg-orange-600"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
