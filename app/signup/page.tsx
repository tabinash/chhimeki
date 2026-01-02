"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronRight, User, MapPin, Lock, Phone, Mail, Building2, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    // Form State
    const [formData, setFormData] = useState({
        accountType: "general", // general or institutional
        phone: "",
        password: "",
        name: "",
        email: "",
        dob: "",
        address: "",
        otp: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmitData = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call to register and send OTP
        setTimeout(() => {
            setIsLoading(false);
            nextStep();
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate OTP verification
        setTimeout(() => {
            setIsLoading(false);
            router.push("/home");
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#F6F6F4] font-sans text-[#171717] flex flex-col">
            {/* Header & Progress */}
            <div className="px-6 py-6 flex items-center justify-between bg-white border-b border-gray-100">
                <button
                    onClick={() => step === 1 ? router.back() : prevStep()}
                    className="p-2 -ml-2 text-gray-900 hover:bg-gray-50 rounded-full transition-colors active:scale-90"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-6 bg-blue-600' : 'w-2 bg-gray-200'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 px-8 pt-8 pb-20 max-w-md mx-auto w-full flex flex-col">
                {/* Step 1: Account Type & Basics */}
                {step === 1 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-3">
                                Start your <br />
                                <span className="text-blue-600">Journey.</span>
                            </h1>
                            <p className="text-gray-500 font-medium">Choose your account type and basics.</p>
                        </div>

                        <div className="space-y-6">
                            {/* Account Type Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setFormData({ ...formData, accountType: 'general' })}
                                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.accountType === 'general' ? 'border-blue-600 bg-blue-50/50' : 'border-white bg-white shadow-sm hover:border-blue-100'}`}
                                >
                                    <User className={`w-6 h-6 ${formData.accountType === 'general' ? 'text-blue-600' : 'text-gray-400'}`} />
                                    <span className="text-xs font-black uppercase tracking-widest">General</span>
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, accountType: 'institutional' })}
                                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.accountType === 'institutional' ? 'border-blue-600 bg-blue-50/50' : 'border-white bg-white shadow-sm hover:border-blue-100'}`}
                                >
                                    <Building2 className={`w-6 h-6 ${formData.accountType === 'institutional' ? 'text-blue-600' : 'text-gray-400'}`} />
                                    <span className="text-xs font-black uppercase tracking-widest">Institution</span>
                                </button>
                            </div>

                            <div className="relative">
                                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">Phone Number</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+977</span>
                                    <input
                                        type="tel"
                                        placeholder="98XXXXXXXX"
                                        className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[20px] text-lg font-bold focus:border-blue-600 transition-all outline-none shadow-sm"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-6 py-5 bg-white border border-gray-100 rounded-[20px] text-lg font-bold focus:border-blue-600 transition-all outline-none shadow-sm"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            onClick={nextStep}
                            disabled={formData.phone.length < 10 || formData.password.length < 6}
                            className="w-full bg-blue-600 text-white py-5 rounded-[20px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            Next Step
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 2: Personal Details */}
                {step === 2 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-3">
                                Your <br />
                                <span className="text-blue-600">Profile.</span>
                            </h1>
                            <p className="text-gray-500 font-medium">Almost there! Tell us about yourself.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-6 py-5 bg-white border border-gray-100 rounded-[20px] text-lg font-bold focus:border-blue-600 transition-all outline-none shadow-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">Date of Birth</label>
                                <div className="relative">
                                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[20px] text-lg font-bold focus:border-blue-600 transition-all outline-none shadow-sm"
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">Home Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="City, Ward No, Area"
                                        className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[20px] text-lg font-bold focus:border-blue-600 transition-all outline-none shadow-sm"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={nextStep}
                            disabled={!formData.name || !formData.dob || !formData.address}
                            className="w-full bg-blue-600 text-white py-5 rounded-[20px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            Review Details
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 3: Email & Confirmation */}
                {step === 3 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-3">
                                Final <br />
                                <span className="text-blue-600">Verification.</span>
                            </h1>
                            <p className="text-gray-500 font-medium">We'll send an OTP to your email.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[20px] text-lg font-bold focus:border-blue-600 transition-all outline-none shadow-sm"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <p className="text-xs text-blue-700 font-bold uppercase tracking-widest mb-1">Account Summary</p>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-black text-gray-900 capitalize">{formData.accountType} Account</span>
                                    <span className="text-sm text-gray-600 font-medium">{formData.phone}</span>
                                    <span className="text-sm text-gray-600 font-medium">{formData.address}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmitData}
                            disabled={!formData.email || isLoading}
                            className="w-full bg-blue-600 text-white py-5 rounded-[20px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Request OTP <ChevronRight className="w-5 h-5" /></>}
                        </button>
                    </div>
                )}

                {/* Step 4: OTP Submission */}
                {step === 4 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-3">
                                Check your <br />
                                <span className="text-blue-600">Email.</span>
                            </h1>
                            <p className="text-gray-500 font-medium">OTP sent to <span className="text-gray-900 font-bold">{formData.email}</span></p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest z-10">Security OTP</label>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                    className="w-full px-6 py-5 bg-white border border-gray-100 rounded-[20px] text-3xl font-black text-center tracking-[0.5em] focus:border-blue-600 transition-all outline-none shadow-sm"
                                    value={formData.otp}
                                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                />
                            </div>

                            <p className="text-center text-xs font-bold text-gray-400">
                                Didn't get the code? <button className="text-blue-600 underline">Resend</button>
                            </p>
                        </div>

                        <button
                            onClick={handleVerifyOtp}
                            disabled={formData.otp.length < 4 || isLoading}
                            className="w-full bg-blue-600 text-white py-5 rounded-[20px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Verify & Finish <Check className="w-5 h-5" /></>}
                        </button>
                    </div>
                )}

                <div className="mt-auto pt-10 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-black hover:underline">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
