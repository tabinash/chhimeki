"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Phone, Hash, Camera, ChevronRight } from "lucide-react";
import Logo from "@/app/_components/Logo";

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        province: "",
        district: "",
        wardNo: "",
        phone: "",
        otp: ["", "", "", ""],
        profilePic: null as File | null
    });

    const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
    const handleBack = () => step > 1 ? setStep(prev => prev - 1) : router.back();

    return (
        <div className="min-h-screen flex bg-white font-sans">

            {/* Left Panel: Form Wizard */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative text-gray-900">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="absolute top-8 left-6 sm:left-12 p-2 hover:bg-gray-100 rounded-full transition-colors group"
                    title="Go Back"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                </button>

                {/* Desktop Logo Position (Top Right of Left Panel if needed, or kept clean) */}
                <div className="absolute top-8 right-6 hidden lg:block">
                    <span className="text-sm font-semibold text-gray-500">Already a member? </span>
                    <Link href="/login" className="text-sm font-bold text-blue-600 hover:underline">Log in</Link>
                </div>

                <div className="w-full max-w-sm mx-auto">
                    {/* Mobile Logo */}
                    <div className="mb-10 lg:hidden text-center">
                        <Logo variant="dark" size="sm" />
                    </div>

                    {/* Progress Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                                {step === 1 && "Personal Info"}
                                {step === 2 && "Address Details"}
                                {step === 3 && "Mobile Number"}
                                {step === 4 && "Verification"}
                                {step === 5 && "Profile Photo"}
                            </h2>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wide">
                                Step {step}/5
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                style={{ width: `${(step / 5) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[300px]">

                        {/* STEP 1: PERSONAL INFO */}
                        {step === 1 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Full Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-xl p-3.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                                        <User className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Abinash"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center bg-gray-50 rounded-xl p-3.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                                        <div className="w-5 flex justify-center mr-3 text-gray-400 font-bold">@</div>
                                        <input
                                            type="email"
                                            placeholder="abinash@example.com"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: ADDRESS */}
                        {step === 2 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Province / District</label>
                                    <div className="flex items-center bg-gray-50 rounded-xl p-3.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Bagmati, Kathmandu"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.province}
                                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Ward Number</label>
                                    <div className="flex items-center bg-gray-50 rounded-xl p-3.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                                        <Hash className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="number"
                                            placeholder="e.g. 04"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.wardNo}
                                            onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PHONE */}
                        {step === 3 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Phone Number</label>
                                    <div className="flex items-center bg-gray-50 rounded-xl p-3.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                                        <span className="font-bold text-gray-500 border-r border-gray-200 pr-3 mr-3">+977</span>
                                        <input
                                            type="tel"
                                            placeholder="98XXXXXXXX"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            autoFocus
                                        />
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl flex gap-3">
                                    <div className="shrink-0 pt-0.5">ℹ️</div>
                                    <p>We'll send a 4-digit code to verify this number on the next step.</p>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: OTP */}
                        {step === 4 && (
                            <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">
                                        Enter code sent to <span className="font-bold text-gray-900">+977 {formData.phone}</span>
                                    </p>
                                    <button onClick={() => setStep(3)} className="text-xs font-bold text-blue-600 mt-2 hover:underline">Edit Number</button>
                                </div>

                                <div className="flex justify-between gap-3">
                                    {[0, 1, 2, 3].map((i) => (
                                        <input
                                            key={i}
                                            type="tel"
                                            maxLength={1}
                                            className="w-full h-16 bg-gray-50 rounded-xl border border-gray-200 text-center text-2xl font-bold text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                            autoFocus={i === 0}
                                        />
                                    ))}
                                </div>
                                <div className="text-center">
                                    <button className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Resend Code</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: PROFILE PIC */}
                        {step === 5 && (
                            <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-right-4 fade-in duration-300 py-4">
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-full bg-gray-50 border-4 border-white ring-4 ring-gray-100 flex items-center justify-center overflow-hidden transition-all group-hover:ring-blue-100">
                                        {formData.profilePic ? (
                                            <div className="w-full h-full bg-cover bg-center" />
                                        ) : (
                                            <User className="w-12 h-12 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="text-center space-y-2">
                                    <h3 className="font-bold text-gray-900">Add a Profile Picture</h3>
                                    <p className="text-gray-500 text-sm max-w-[240px] mx-auto">
                                        Help your neighbors recognize you.
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Action Button */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={() => step === 5 ? router.push("/home") : handleNext()}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                        >
                            {step === 3 ? "Get OTP" : step === 4 ? "Verify & Continue" : step === 5 ? "Finish Setup" : "Next Step"}
                            {step < 5 && <ChevronRight className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />}
                        </button>

                        {/* Mobile Login Link */}
                        <div className="mt-6 text-center lg:hidden">
                            <p className="text-gray-500 font-medium text-sm">
                                Already a member?{" "}
                                <Link href="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Right Panel: Visuals */}
            <div className="hidden lg:flex flex-1 relative bg-black overflow-hidden">
                <Image
                    src="/landing-hero.png"
                    alt="Community"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Orange Overlay for distinction */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/80 via-black/40 to-blue-900/20" />

                <div className="absolute bottom-0 left-0 right-0 p-16 text-white z-10">
                    <div className="mb-6">
                        <Logo variant="light" size="md" className="!items-start" />
                    </div>
                    <blockquote className="text-3xl font-medium leading-normal mb-4">
                        "Join the digital neighborhood. Safe, verified, and strictly local."
                    </blockquote>
                    <p className="text-white/60 font-medium">Create your account in 2 minutes.</p>
                </div>
            </div>
        </div>
    );
}
