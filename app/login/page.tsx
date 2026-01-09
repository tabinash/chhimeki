"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Lock, Eye, EyeOff, Loader2, Camera, X, User } from "lucide-react";
import { useLogin } from "@/hooks/api/useLogin";
import { useUpdateProfile } from "@/app/(main)/profile/_hook/useUpdateProfile";
import Logo from "@/app/_components/Logo";


export default function LoginPage() {
    const router = useRouter();
    const { mutate: login, isPending, error } = useLogin();
    const { mutate: updateProfile, isPending: isUploading } = useUpdateProfile();

    const [identifier, setIdentifier] = useState("9742555741");
    const [password, setPassword] = useState("tttttttttt");
    const [showPassword, setShowPassword] = useState(false);

    // Profile picture upload state
    const [showProfilePicModal, setShowProfilePicModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (identifier.length < 10 || password.length === 0) return;

        login(
            { identifier, password },
            {
                onSuccess: (response) => {
                    // Check if user has profile picture
                    const hasProfilePicture = response.data.user.profilePicture;

                    if (!hasProfilePicture) {
                        // Show profile picture upload modal
                        setShowProfilePicModal(true);
                    } else {
                        // Redirect to home
                        router.push("/home");
                    }
                },
            }
        );
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);

            // Generate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSkip = () => {
        setShowProfilePicModal(false);
        router.push("/home");
    };

    const handleUpload = () => {
        if (!selectedImage) return;

        updateProfile(
            {
                purpose: "profile_picture",
                profilePicture: selectedImage,
            },
            {
                onSuccess: (response) => {
                    // Save updated user data to localStorage
                    localStorage.setItem("user", JSON.stringify(response.data));
                    setShowProfilePicModal(false);
                    router.push("/home");
                },
                onError: (error) => {
                    alert(`Upload failed: ${error.message}`);
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left Panel: Form Section */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative text-gray-900">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-8 left-6 sm:left-12 p-2 hover:bg-gray-100 rounded-full transition-colors group"
                    title="Go Back"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                </button>

                {/* Desktop Register Link */}
                <div className="absolute top-8 right-6 hidden lg:block">
                    <span className="text-sm font-semibold text-gray-500">New here? </span>
                    <Link href="/register" className="text-sm font-bold text-blue-600 hover:underline">Create an account</Link>
                </div>

                <div className="w-full max-w-sm mx-auto">
                    {/* Mobile Logo */}
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

            {/* Profile Picture Upload Modal */}
            {showProfilePicModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Add Profile Picture</h2>
                            <button
                                onClick={handleSkip}
                                disabled={isUploading}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center space-y-6">
                            {/* Image Preview */}
                            <div className="relative group cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    className="hidden"
                                    id="profile-pic-upload"
                                    disabled={isUploading}
                                />
                                <label
                                    htmlFor="profile-pic-upload"
                                    className="cursor-pointer block"
                                >
                                    <div className="w-40 h-40 rounded-full bg-gray-50 border-4 border-white ring-4 ring-gray-100 flex items-center justify-center overflow-hidden transition-all group-hover:ring-blue-100">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-16 h-16 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                </label>
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="font-bold text-gray-900">Help neighbors recognize you</h3>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                                    Add a profile picture to personalize your account.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={handleSkip}
                                    disabled={isUploading}
                                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                                >
                                    Skip for Now
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading || !selectedImage}
                                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload & Continue"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
