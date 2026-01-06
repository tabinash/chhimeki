"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, ChevronRight, MessageCircle, Mail, Phone, BookOpen, Shield, HelpCircle } from "lucide-react";

const faqs = [
    {
        category: "Getting Started",
        questions: [
            { q: "What is Chhimeki?", a: "Chhimeki is a hyper-local community platform designed to connect neighborhoods, businesses, and residents for a better-connected society." },
            { q: "How do I verify my account?", a: "Go to Settings > Verification and upload a photo of your citizenship or government-issued ID to become a Verified Neighbor." },
        ]
    },
    {
        category: "Community Guidelines",
        questions: [
            { q: "How to report a post?", a: "Tap the three dots on the top right of any post and select 'Report'. Our team will review it within 24 hours." },
            { q: "What is forbidden on Chhimeki?", a: "Hate speech, harassment, illegal trades, and spam are strictly prohibited as per our community guidelines." },
        ]
    }
];

export default function HelpPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for help..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Contact Support Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">Live Chat</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">Email Us</span>
                    </button>
                </div>

                {/* FAQ Sections */}
                {faqs.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">
                            {section.category}
                        </h2>
                        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                            {section.questions.map((item, qIdx) => (
                                <div key={qIdx} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-[15px] font-semibold text-gray-900">{item.q}</p>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-1">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Support Links */}
                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden mt-4">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">Service Guidelines</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">Safety Center</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                <div className="text-center py-4">
                    <p className="text-xs text-gray-400">Available 24/7 for you</p>
                </div>
            </div>
        </div>
    );
}
