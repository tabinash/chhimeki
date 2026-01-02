"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Terms of Service</h1>
                </div>
            </div>

            <div className="p-6 space-y-8 text-gray-600 leading-relaxed">
                <div>
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-bold">Effective Date: January 3, 2026</p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Chhimeki</h2>
                    <p>
                        By using Chhimeki, you agree to these terms. Please read them carefully. Our terms are designed to maintain
                        a safe and respectful environment for all neighbors.
                    </p>
                </div>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">1. Eligibility</h3>
                    <p>
                        You must be a resident of the community and at least 18 years old to create an account on Chhimeki.
                        Misrepresentation of your location or identity may result in account termination.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">2. Community Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Be respectful to your neighbors.</li>
                        <li>No spamming or deceptive marketing.</li>
                        <li>No illegal transactions in the marketplace.</li>
                        <li>Maintain the privacy of other community members.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">3. Marketplace Transactions</h3>
                    <p>
                        Chhimeki provides a platform for neighbors to trade and sell goods. We do not handle payments
                        and are not responsible for transactions between users. We recommend meeting in safe, public places.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">4. Limitation of Liability</h3>
                    <p>
                        Chhimeki is provided "as is". We are not liable for any disputes, damages, or losses resulting
                        from your interactions with other community members.
                    </p>
                </section>

                <div className="pt-8 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                        Thank you for being part of our community.
                    </p>
                </div>
            </div>
        </div>
    );
}
