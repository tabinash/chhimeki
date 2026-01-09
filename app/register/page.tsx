"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Phone, Hash, ChevronRight, Lock, Loader2 } from "lucide-react";
import Logo from "@/app/_components/Logo";
import { useRegister } from "@/hooks/api/useRegister";
import { useVerifyOtp } from "@/hooks/api/useVerifyOtp";
import { useResendOtp } from "@/hooks/api/useResendOtp";

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const registerMutation = useRegister();
    const verifyOtpMutation = useVerifyOtp();
    const resendOtpMutation = useResendOtp();

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        district: "Chitwan",
        palika: "Ratnanagar",
        wardNo: "13",
        phone: "9742555744",
        password: "",
        otp: ["", "", "", "", "", ""], // 6-digit OTP
    });

    const [identifier, setIdentifier] = useState(""); // Store phone/email used for OTP
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Record<string, string> = {};

        switch (currentStep) {
            case 1:
                if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
                if (!formData.email.trim()) newErrors.email = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
                break;
            case 2:
                if (!formData.district.trim()) newErrors.district = "District is required";
                if (!formData.palika.trim()) newErrors.palika = "Palika is required";
                if (!formData.wardNo) newErrors.wardNo = "Ward number is required";
                break;
            case 3:
                if (!formData.phone) newErrors.phone = "Phone number is required";
                else if (formData.phone.length !== 10) newErrors.phone = "Phone must be 10 digits";
                if (!formData.password) newErrors.password = "Password is required";
                else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
                break;
            case 4:
                const otpComplete = formData.otp.every(digit => digit !== "");
                if (!otpComplete) newErrors.otp = "Please enter complete 6-digit OTP";
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 3) {
            // Step 3: Call register API to send OTP
            if (!validateStep(3)) return;

            const wadaFormatted = `${formData.palika}_${formData.wardNo}`;

            registerMutation.mutate(
                {
                    name: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    userType: "GENERAL",
                    district: formData.district,
                    palika: formData.palika,
                    wada: wadaFormatted,
                },
                {
                    onSuccess: (response) => {
                        setIdentifier(formData.phone); // Store phone for OTP verification
                        setStep(4); // Move to OTP step
                        setErrors({});
                    },
                    onError: (error) => {
                        setErrors({ submit: error.message || "Registration failed" });
                    },
                }
            );
        } else {
            // Other steps: just validate and move forward
            if (validateStep(step)) {
                setStep(prev => Math.min(prev + 1, 4));
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
            setErrors({});
        } else {
            router.back();
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...formData.otp];
            newOtp[index] = value;
            setFormData({ ...formData, otp: newOtp });

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleResendOtp = () => {
        resendOtpMutation.mutate(
            { identifier },
            {
                onSuccess: () => {
                    setErrors({ otp: "" });
                    alert("OTP resent successfully!");
                },
                onError: (error) => {
                    setErrors({ submit: error.message || "Failed to resend OTP" });
                },
            }
        );
    };

    const handleSubmit = () => {
        if (!validateStep(4)) return;

        const otpCode = formData.otp.join("");

        verifyOtpMutation.mutate(
            {
                identifier,
                code: otpCode,
            },
            {
                onSuccess: () => {
                    // Auto-login happens in the hook
                    router.push("/");
                },
                onError: (error) => {
                    setErrors({ submit: error.message || "Invalid OTP" });
                },
            }
        );
    };

    const isLoading = registerMutation.isPending || verifyOtpMutation.isPending;

    return (
        <div className="min-h-screen flex bg-white font-sans ">
            {/* Left Panel: Form Wizard */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative text-gray-900">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    disabled={isLoading}
                    className="absolute top-8 left-6 sm:left-12 p-2 hover:bg-gray-100 rounded-full transition-colors group disabled:opacity-50"
                    title="Go Back"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                </button>

                {/* Desktop Login Link */}
                <div className="absolute top-8 right-6 hidden lg:block">
                    <span className="text-sm font-semibold text-gray-500">Already a member? </span>
                    <Link href="/login" className="text-sm font-bold text-orange-600 hover:underline">Log in</Link>
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
                                {step === 3 && "Security"}
                                {step === 4 && "Verification"}
                            </h2>
                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md uppercase tracking-wide">
                                Step {step}/4
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-orange-600 transition-all duration-500 ease-out"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {errors.submit && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {errors.submit}
                        </div>
                    )}

                    {/* Step Content */}
                    <div className="min-h-[300px]">
                        {/* STEP 1: PERSONAL INFO */}
                        {step === 1 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Full Name</label>
                                    <div className={`flex items-center bg-gray-50 rounded-xl p-3.5 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all`}>
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
                                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
                                    <div className={`flex items-center bg-gray-50 rounded-xl p-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all`}>
                                        <div className="w-5 flex justify-center mr-3 text-gray-400 font-bold">@</div>
                                        <input
                                            type="email"
                                            placeholder="abinash@example.com"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: ADDRESS */}
                        {step === 2 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">District</label>
                                    <div className={`flex items-center bg-gray-50 rounded-xl p-3.5 border ${errors.district ? 'border-red-500' : 'border-gray-200'} focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all`}>
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Kathmandu"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.district}
                                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                    {errors.district && <p className="text-xs text-red-500">{errors.district}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Palika / Municipality</label>
                                    <div className={`flex items-center bg-gray-50 rounded-xl p-3.5 border ${errors.palika ? 'border-red-500' : 'border-gray-200'} focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all`}>
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Kathmandu Metropolitan"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.palika}
                                            onChange={(e) => setFormData({ ...formData, palika: e.target.value })}
                                        />
                                    </div>
                                    {errors.palika && <p className="text-xs text-red-500">{errors.palika}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Ward Number</label>
                                    <div className={`flex items-center bg-gray-50 rounded-xl p-3.5 border ${errors.wardNo ? 'border-red-500' : 'border-gray-200'} focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all`}>
                                        <Hash className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="number"
                                            placeholder="e.g. 4"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.wardNo}
                                            onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                                        />
                                    </div>
                                    {errors.wardNo && <p className="text-xs text-red-500">{errors.wardNo}</p>}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PHONE & PASSWORD */}
                        {step === 3 && (
                            <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Phone Number</label>
                                    <div className={`flex items-center bg-gray-50 rounded-xl p-3.5 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all`}>
                                        <span className="font-bold text-gray-500 border-r border-gray-200 pr-3 mr-3">+977</span>
                                        <input
                                            type="tel"
                                            placeholder="98XXXXXXXX"
                                            maxLength={10}
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                                            autoFocus
                                        />
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                                    <div className={`flex items-center bg-gray-50 rounded-xl p-3.5 border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all`}>
                                        <Lock className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="password"
                                            placeholder="Minimum 8 characters"
                                            className="flex-1 bg-transparent outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                </div>
                                <div className="bg-orange-50 text-orange-800 text-sm p-4 rounded-xl flex gap-3">
                                    <div className="shrink-0 pt-0.5">ℹ️</div>
                                    <p>We'll send a 6-digit code to verify this number on the next step.</p>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: OTP */}
                        {step === 4 && (
                            <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">
                                        Enter 6-digit code sent to <span className="font-bold text-gray-900">+977 {formData.phone}</span>
                                    </p>
                                    <button onClick={() => setStep(3)} className="text-xs font-bold text-orange-600 mt-2 hover:underline">Edit Number</button>
                                </div>

                                <div className="flex justify-between gap-2">
                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="tel"
                                            maxLength={1}
                                            value={formData.otp[i]}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            className={`w-full h-14 bg-gray-50 rounded-xl border ${errors.otp ? 'border-red-500' : 'border-gray-200'} text-center text-2xl font-bold text-gray-900 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all`}
                                            autoFocus={i === 0}
                                        />
                                    ))}
                                </div>
                                {errors.otp && <p className="text-xs text-red-500 text-center">{errors.otp}</p>}
                                <div className="text-center">
                                    <button
                                        onClick={handleResendOtp}
                                        disabled={resendOtpMutation.isPending}
                                        className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors disabled:opacity-50"
                                    >
                                        {resendOtpMutation.isPending ? "Sending..." : "Resend Code"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={() => step === 4 ? handleSubmit() : handleNext()}
                            disabled={isLoading}
                            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:shadow-orange-600/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {step === 3 ? "Sending OTP..." : "Verifying..."}
                                </>
                            ) : (
                                <>
                                    {step === 3 ? "Get OTP" : step === 4 ? "Create Account" : "Next Step"}
                                    {step < 3 && <ChevronRight className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />}
                                </>
                            )}
                        </button>

                        {/* Mobile Login Link */}
                        <div className="mt-6 text-center lg:hidden">
                            <p className="text-gray-500 font-medium text-sm">
                                Already a member?{" "}
                                <Link href="/login" className="text-orange-600 font-bold hover:underline">Log in</Link>
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
