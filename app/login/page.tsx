"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        // basic validation
        if (phoneNumber.length >= 10 && password.length > 0) {
            router.push("/home");
        }
    };

    return (
        <div className="min-h-screen bg-blue-600 flex flex-col font-sans">

            {/* Top Section */}
            <div className="flex-none p-6 pt-12 pb-16 flex flex-col items-center justify-center relative">
                <button
                    onClick={() => router.back()}
                    className="absolute top-12 left-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>

                <div className="flex items-center gap-1 mb-1">
                    <span className="text-2xl font-bold text-white tracking-tight">
                        Chhimeki
                    </span>
                    <span className="text-2xl font-bold text-orange-400 tracking-tight">
                        App
                    </span>
                </div>

                {/* Smile Curve */}
                <svg width="40" height="12" viewBox="0 0 60 20" fill="none" className="opacity-80">
                    <path
                        d="M5 2C15 15 45 15 55 2"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Bottom Section */}
            <div className="flex-1 bg-white rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-10 duration-500">
                <div className="flex flex-col h-full max-w-sm mx-auto">

                    {/* Header */}
                    <div className="mb-8 text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">
                            Sign in to continue to your neighborhood
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5 flex-1">

                        {/* Phone Number */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">
                                Phone Number
                            </label>
                            <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                <span className="font-bold text-gray-500 border-r border-gray-200 pr-3 mr-3">
                                    +977
                                </span>
                                <input
                                    type="tel"
                                    placeholder="98XXXXXXXX"
                                    className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <Phone className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end pt-1">
                            <button
                                onClick={() => router.push("/forgot-password")}
                                className="text-sm font-bold text-blue-600 hover:underline">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-4 rounded-full font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
                        >
                            Login
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
