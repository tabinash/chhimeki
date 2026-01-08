"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/api/useLogin";
import Logo from "@/app/_components/Logo";

export default function LoginPage() {
    const router = useRouter();
    const { mutate: login, isPending, error } = useLogin();

    const [identifier, setIdentifier] = useState("tabinash7@gmail.com");
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (identifier.length < 10 || password.length === 0) return;

        login(
            { identifier, password },
            {
                onSuccess: () => router.push("/home"),
            }
        );
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">

            {/* Left Panel: Form Section */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative text-gray-900">
                {/* Back Button (Mobile only mostly, or subtle desktop) */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-8 left-6 sm:left-12 p-2 hover:bg-gray-100 rounded-full transition-colors group"
                    title="Go Back"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                </button>

                {/* Desktop Logo Position */}
                <div className="absolute top-8 right-6 hidden lg:block">
                    <span className="text-sm font-semibold text-gray-500">New here? </span>
                    <Link href="/register" className="text-sm font-bold text-blue-600 hover:underline">Create an account</Link>
                </div>


                <div className="w-full max-w-sm mx-auto">
                    {/* Mobile Logo / Brand Header */}
                    <div className="mb-10 lg:hidden text-center">
                        <Logo variant="dark" size="sm" />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Welcome Back!</h2>
                        <p className="text-gray-500">Sign in to connect with your neighborhood.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Phone Number / Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Phone or Email
                            </label>
                            <div className="flex items-center bg-gray-50 rounded-xl p-3.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                                <input
                                    type="text"
                                    placeholder="Enter your phone or email"
                                    className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    disabled={isPending}
                                />
                                <Phone className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="flex items-center bg-gray-50 rounded-xl p-3.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isPending}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    disabled={isPending}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-in fade-in slide-in-from-top-1">
                                <p className="text-sm font-medium text-red-600 text-center">
                                    {error.message}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending || identifier.length < 10 || password.length === 0}
                            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isPending ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-8 text-center lg:hidden">
                        <span className="text-sm text-gray-500">Don't have an account? </span>
                        <Link href="/register" className="text-sm font-bold text-blue-600 hover:underline">Register</Link>
                    </div>
                </div>
            </div>

            {/* Right Panel: Visuals (Desktop Only) */}
            <div className="hidden lg:flex flex-1 relative bg-black overflow-hidden">
                <Image
                    src="/landing-hero.png"
                    alt="Community"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-16 text-white z-10">
                    <div className="mb-6">
                        <Logo variant="light" size="md" className="!items-start" />
                    </div>
                    <blockquote className="text-3xl font-medium leading-normal mb-4">
                        "The easiest way to stay connected with your ward and neighbors."
                    </blockquote>
                    <p className="text-white/60 font-medium">Join 10,000+ neighbors in Nepal.</p>
                </div>
            </div>
        </div>
    );
}
