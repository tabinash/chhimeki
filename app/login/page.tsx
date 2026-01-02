"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Lock, Eye, EyeOff, LogIn, ChevronRight, Github } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            router.push("/home");
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#171717] flex flex-col">
            {/* Top Navigation */}
            <div className="px-6 py-6 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-90"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <Link href="/help" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                    Need Help?
                </Link>
            </div>

            <div className="flex-1 px-8 pt-6 pb-20 max-w-md mx-auto w-full">
                {/* Branding & Welcome */}
                <div className="mb-12">
                    <div className="mb-6 inline-flex flex-col">
                        <span className="text-blue-600 font-black text-4xl tracking-tighter leading-none mb-1">Chhimeki</span>
                        <div className="h-1.5 w-12 bg-blue-600 rounded-full" />
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-3">
                        Join the <br />
                        <span className="text-gray-400">Neighborhood.</span>
                    </h1>
                    <p className="text-gray-600 font-medium max-w-[240px]">
                        Sign in to connect with people and shops around you.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-5">
                        {/* Phone Field */}
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-blue-600 uppercase tracking-widest z-10">
                                Phone Number
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+977</span>
                                <input
                                    type="tel"
                                    placeholder="98XXXXXXXX"
                                    required
                                    className="w-full pl-16 pr-6 py-5 bg-white border-2 border-gray-100 rounded-2xl text-lg font-bold focus:border-blue-600 focus:ring-0 transition-all outline-none"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">
                                Your Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-2xl text-lg font-bold focus:border-blue-600 focus:ring-0 transition-all outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-blue-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link href="#" className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">
                            FORGOT PASSWORD?
                        </Link>
                    </div>

                    {/* Main Action */}
                    <button
                        type="submit"
                        disabled={isLoading || phoneNumber.length < 10 || password.length < 6}
                        className="group w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:bg-gray-100 disabled:text-gray-300 shadow-xl shadow-blue-600/20"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Sign In to Home
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Secondary Actions */}
                <div className="mt-12 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-gray-100" />
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">or better yet</span>
                        <div className="h-[1px] flex-1 bg-gray-100" />
                    </div>

                    <button className="w-full py-4 px-6 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-[#171717] hover:bg-gray-50 transition-colors active:scale-95">
                        <span className="text-sm">Create New Account</span>
                    </button>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="px-8 py-10 text-center mt-auto">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
                    Chhimeki &bull; Ward 4
                </p>
            </div>
        </div>
    );
}
