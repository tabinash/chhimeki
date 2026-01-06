"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, MapPin, Phone, Lock, Hash, Upload, Camera, Check, ChevronRight } from "lucide-react";

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
        <div className="min-h-screen bg-blue-600 flex flex-col font-sans">

            {/* Top Section */}
            <div className="flex-none p-6 pt-12 pb-16 flex flex-col items-center justify-center relative">
                <button
                    onClick={handleBack}
                    className="absolute top-12 left-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>

                <div className="flex items-center gap-1 mb-1">
                    <span className="text-2xl font-bold text-white tracking-tight">Chhimeki</span>
                    <span className="text-2xl font-bold text-orange-400 tracking-tight">App</span>
                </div>

                {/* Decorative Curve */}
                <svg width="40" height="12" viewBox="0 0 60 20" fill="none" className="opacity-80">
                    <path d="M5 2C15 15 45 15 55 2" stroke="white" strokeWidth="5" strokeLinecap="round" />
                </svg>
            </div>

            {/* Bottom Section (White Curved) */}
            <div className="flex-1 bg-white rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
                <div className="flex flex-col h-full max-w-sm mx-auto">

                    {/* Dynamic Header & Dots */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {step === 1 && "Personal Info"}
                                {step === 2 && "Address Details"}
                                {step === 3 && "Mobile Number"}
                                {step === 4 && "Verification"}
                                {step === 5 && "Profile Photo"}
                            </h2>
                            {/* Progress Dots */}
                            <div className="flex gap-1.5 self-center">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${step === i ? "bg-orange-500 scale-125" : "bg-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
                            Step {step} of 5
                        </p>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 relative">

                        {/* STEP 1: PERSONAL INFO */}
                        {step === 1 && (
                            <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">Full Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                        <User className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Abinash"
                                            className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                        <div className="w-5 flex justify-center mr-3 text-gray-400 font-bold">@</div>
                                        <input
                                            type="email"
                                            placeholder="abinash@example.com"
                                            className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: ADDRESS */}
                        {step === 2 && (
                            <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">Province / District</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Bagmati, Kathmandu"
                                            className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                            value={formData.province}
                                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">Ward Number</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                        <Hash className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="number"
                                            placeholder="e.g. 04"
                                            className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                            value={formData.wardNo}
                                            onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PHONE */}
                        {step === 3 && (
                            <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">Phone Number</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                        <span className="font-bold text-gray-500 border-r border-gray-200 pr-3 mr-3">+977</span>
                                        <input
                                            type="tel"
                                            placeholder="98XXXXXXXX"
                                            className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            autoFocus
                                        />
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                <p className="text-center text-gray-400 text-xs px-4">
                                    We will send you a 4-digit One Time Password (OTP) to verify this number.
                                </p>
                            </div>
                        )}

                        {/* STEP 4: OTP */}
                        {step === 4 && (
                            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">
                                        Sent to <span className="font-bold text-gray-900">+977 {formData.phone}</span>
                                    </p>
                                    <button onClick={() => setStep(3)} className="text-xs font-bold text-blue-600 mt-1 hover:underline">Edit Number</button>
                                </div>

                                <div className="flex justify-between gap-3">
                                    {[0, 1, 2, 3].map((i) => (
                                        <input
                                            key={i}
                                            type="tel"
                                            maxLength={1}
                                            className="w-full h-16 bg-gray-50 rounded-2xl border border-gray-200 text-center text-2xl font-bold text-gray-900 focus:border-blue-500 focus:bg-white outline-none transition-all"
                                            autoFocus={i === 0}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 5: PROFILE PIC */}
                        {step === 5 && (
                            <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-right-8 fade-in duration-300 py-8">
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                                        {formData.profilePic ? (
                                            <div className="w-full h-full bg-cover bg-center" /> // Mock preview
                                        ) : (
                                            <User className="w-12 h-12 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md group-hover:bg-blue-700 transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="text-center space-y-2">
                                    <h3 className="font-bold text-gray-900">Add a Profile Picture</h3>
                                    <p className="text-gray-500 text-sm max-w-[200px]">
                                        Help your neighbors recognize you in the community.
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Action Button */}
                    <div className="mt-8 pt-4">
                        <button
                            onClick={() => step === 5 ? router.push("/home") : handleNext()}
                            className="w-full bg-blue-600 text-white py-4 rounded-full font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {step === 3 ? "Get OTP" : step === 4 ? "Verify OTP" : step === 5 ? "Finish Setup" : "Next Step"}
                            {step < 5 && <ChevronRight className="w-5 h-5 opacity-80" />}
                        </button>

                        {step === 1 && (
                            <div className="mt-6 text-center">
                                <p className="text-gray-500 font-medium text-sm">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="text-blue-600 font-bold hover:underline ml-1"
                                    >
                                        Login
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
