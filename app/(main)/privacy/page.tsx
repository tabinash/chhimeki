"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
                </div>
            </div>

            <div className="p-6 space-y-8">
                <div>
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-bold">Last Updated: January 3, 2026</p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
                    <p className="text-gray-600 leading-relaxed">
                        At Chhimeki, we value the trust you place in us when you share your personal information.
                        This Privacy Policy describes how we collect, use, and share your data when you use our services.
                    </p>
                </div>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">1. Information We Collect</h3>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            <strong className="text-gray-900">Profile Information:</strong> We collect your name, ward number, and neighborhood details to connect you with residents.
                        </p>
                        <p>
                            <strong className="text-gray-900">Location Data:</strong> To provide local marketplace and job listings, we use your device's location with your permission.
                        </p>
                        <p>
                            <strong className="text-gray-900">Verification Documents:</strong> If you choose to become a Verified Neighbor, we securely process your ID for verification purposes only.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We use your information to operate, provide, and improve our services, including connecting you with
                        nearby services, managing your account, and ensuring the safety of our community.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">3. Security</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We implement strict security measures to protect your data from unauthorized access or disclosure.
                        Verification documents are encrypted and accessible only to authorized personnel.
                    </p>
                </section>

                <div className="pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-500 text-center">
                        Questions about our privacy policy? <br />
                        <span className="text-blue-600 font-bold hover:underline">Contact our Privacy Team</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
