"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            router.push("/login");
        }
    };


    return (
        <div className="min-h-screen bg-blue-600 flex flex-col font-sans">

            {/* Top Section */}
            <div className="flex-none p-6 pt-12 pb-16 flex flex-col items-center justify-center relative">
                <button
                    onClick={() => step === 1 ? router.back() : setStep(step - 1)}
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
            <div className="flex-1 bg-white rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-10 duration-500">
                <div className="flex flex-col h-full max-w-sm mx-auto">

                    <div className="mb-8 text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {step === 1 && "Forgot Password?"}
                            {step === 2 && "Verification"}
                            {step === 3 && "Reset Password"}
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">
                            {step === 1 && "Enter your mobile number to receive a verification code."}
                            {step === 2 && `Enter the 4-digit code sent to +977 ${phone}`}
                            {step === 3 && "Create a new strong password for your account."}
                        </p>
                    </div>

                    <div className="space-y-6 flex-1">

                        {/* STEP 1: PHONE */}
                        {step === 1 && (
                            <div className="space-y-1 animate-in slide-in-from-right-8 fade-in duration-300">
                                <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">Phone Number</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                    <span className="font-bold text-gray-500 border-r border-gray-200 pr-3 mr-3">+977</span>
                                    <input
                                        type="tel"
                                        placeholder="98XXXXXXXX"
                                        className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        autoFocus
                                    />
                                    <Phone className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        )}

                        {/* STEP 2: OTP */}
                        {step === 2 && (
                            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
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
                                <div className="text-center">
                                    <button className="text-sm font-bold text-blue-600 hover:underline">Resend Code</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: NEW PASSWORD */}
                        {step === 3 && (
                            <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">New Password</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                        <Lock className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            autoFocus
                                        />
                                        <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wider">Confirm Password</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-4 border border-gray-100 focus-within:border-blue-500 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="flex-1 bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleNext}
                            className="w-full bg-blue-600 text-white py-4 rounded-full font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {step === 1 ? "Get Verification Code" : step === 2 ? "Verify & Continue" : "Update Password"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
