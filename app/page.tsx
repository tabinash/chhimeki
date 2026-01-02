"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="relative h-[100vh] bg-black overflow-hidden">
            {/* Hero Image Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/landing-hero.png"
                    alt="Nepali Neighborhood"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col mt-12  px-6  safe-bottom">
                {/* Logo/Brand */}
                <div className="flex flex-col  gap-3 mb-8">

                    <span className="text-blue-500 leading-[2.1] font-black text-5xl tracking-tighter">Chhimeki</span>
                </div>

                {/* Hero Text */}
                <div className="space-y-4 mb-10 ">


                    <h1 className="text-4xl font-black text-white leading-[1.1] tracking-tight">
                        Your Neighborhood, <br />
                        <span className="text-blue-500">Reimagined.</span>
                    </h1>

                    <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-sm mx-auto">
                        Connect with neighbors, find local jobs, and support businesses in your community.
                    </p>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={() => router.push("/login")}
                        className="group w-full bg-white text-black py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl shadow-white/10"
                    >
                        Login
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => router.push("/signup")}
                        className="w-full bg-white/10 backdrop-blur-xl text-white py-4 rounded-2xl font-bold text-lg border border-white/10 active:scale-[0.98] transition-all"
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}
