"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import FeatureSection from "./_components/landing/FeatureSection";
import HowItWorks from "./_components/landing/HowItWorks";
import LandingFooter from "./_components/landing/LandingFooter";
import Logo from "./_components/Logo";

export default function LandingPage() {
    const router = useRouter();

    const scrollToFeatures = () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-[90vh] bg-black flex flex-col items-center justify-center px-6 overflow-hidden">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/landing-hero.png"
                        alt="Community Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* Darker Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                </div>

                {/* Navbar (Absolute) */}
                <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto md:px-12">
                    <Logo variant="light" size="md" />
                    <button
                        onClick={() => router.push("/login")}
                        className="text-white font-bold text-sm hover:text-blue-400 transition-colors"
                    >
                        Login
                    </button>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-10">

                    {/* Animated Logo/Badge */}
                    <div className="animate-in fade-in zoom-in-50 duration-700 mb-8">
                        <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium">
                            🇳🇵 The Neighborhood App for Nepal
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8 tracking-tight animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                        Connect with your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                            Real Neighbors
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-12 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 leading-relaxed">
                        Join the trusted social network for your community. Stay informed, buy & sell locally, and help each other out.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
                        <button
                            onClick={() => router.push("/register")}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-4 px-8 font-bold text-base tracking-wide shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => router.push("/login")}
                            className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full py-4 px-8 font-bold text-base tracking-wide transition-all hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={scrollToFeatures}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce cursor-pointer z-10"
                >
                    <ChevronDown className="w-8 h-8" />
                </button>
            </div>

            {/* Sections */}
            <div id="features">
                <FeatureSection />
            </div>

            <HowItWorks />

            {/* CTA Section */}
            <section className="py-24 bg-blue-600 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to join your neighborhood?
                    </h2>
                    <p className="text-blue-100 text-xl mb-10">
                        It takes less than 2 minutes to join and get verified. Start connecting today.
                    </p>
                    <button
                        onClick={() => router.push("/register")}
                        className="bg-white text-blue-600 rounded-full py-4 px-12 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        Join Chhimeki Now
                    </button>
                </div>
            </section>

            <LandingFooter />
        </main>
    );
}
