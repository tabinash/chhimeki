"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Search,
    ChevronDown,
    ChevronRight,
    MessageCircle,
    Mail,
    Phone,
    BookOpen,
    Shield,
    HelpCircle,
    Bug,
    Lightbulb,
    User,
    ShoppingBag,
    Briefcase,
    Users,
    Lock,
    AlertTriangle,
    Heart,
} from "lucide-react";

// FAQ Data - Comprehensive categories
const faqs = [
    {
        category: "Getting Started",
        icon: HelpCircle,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        questions: [
            {
                q: "What is Chhimeki?",
                a: "Chhimeki is a hyper-local community platform designed to connect neighborhoods, businesses, and residents. Share posts, buy/sell products, find jobs, and stay connected with your community."
            },
            {
                q: "How do I create an account?",
                a: "Download the app, enter your phone number or email, verify with OTP, and complete your profile with your name, location (Palika/Ward), and profile picture."
            },
            {
                q: "How do I verify my account?",
                a: "Go to Settings > Verification and upload a photo of your citizenship or government-issued ID. Verified accounts get a blue badge and more trust from the community."
            },
        ]
    },
    {
        category: "Account & Profile",
        icon: User,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        questions: [
            {
                q: "How do I change my profile picture?",
                a: "Go to your Profile > tap the camera icon on your profile picture > select a new image from your gallery or take a new photo."
            },
            {
                q: "How do I update my location?",
                a: "Go to Settings > Edit Profile > update your Palika and Ward number. Your location helps you connect with nearby neighbors."
            },
            {
                q: "Can I have a business account?",
                a: "Yes! When registering, select 'Business' as your account type. Business accounts can create storefronts, list products, and promote services."
            },
        ]
    },
    {
        category: "Marketplace",
        icon: ShoppingBag,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        questions: [
            {
                q: "How do I list an item for sale?",
                a: "Go to Marketplace > tap the '+' button > add photos (up to 5), title, description, price, and category. Tap 'Post' to publish your listing."
            },
            {
                q: "How do I mark an item as sold?",
                a: "Go to your listing > tap 'Edit' > change status to 'Sold'. The item will be hidden from active listings but saved in your profile."
            },
            {
                q: "Is there a selling fee?",
                a: "Chhimeki is completely free to use. There are no listing fees or commissions on sales. All transactions happen directly between buyers and sellers."
            },
        ]
    },
    {
        category: "Jobs",
        icon: Briefcase,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        questions: [
            {
                q: "How do I post a job?",
                a: "Go to Jobs > tap 'Post Job' > fill in the job title, description, salary, employment type, and requirements. Tap 'Submit' to publish."
            },
            {
                q: "How do I apply for a job?",
                a: "View the job listing > tap 'Apply' or 'Contact'. You can message the employer directly or call them if they've shared their contact info."
            },
        ]
    },
    {
        category: "Groups",
        icon: Users,
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-600",
        questions: [
            {
                q: "How do I create a group?",
                a: "Go to Groups > tap 'Create Group' > add a name, description, cover image, and privacy settings. Invite members or make it public for anyone to join."
            },
            {
                q: "How do I join a group?",
                a: "Browse groups or search for specific ones. Tap 'Join' for public groups or 'Request to Join' for private groups."
            },
        ]
    },
    {
        category: "Privacy & Safety",
        icon: Lock,
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
        questions: [
            {
                q: "How do I report a post or user?",
                a: "Tap the three dots (⋮) on any post or profile > select 'Report'. Choose a reason and submit. Our team reviews all reports within 24 hours."
            },
            {
                q: "How do I block someone?",
                a: "Go to their profile > tap the three dots > select 'Block'. They won't be able to see your posts or contact you."
            },
            {
                q: "What happens to my data?",
                a: "We take privacy seriously. Your data is encrypted and never sold to third parties. Read our full Privacy Policy in Settings > Privacy Policy."
            },
        ]
    },
];

// Quick action items
const quickActions = [
    { icon: Bug, label: "Report a Bug", href: "/help/report-bug", color: "text-red-600", bg: "bg-red-50" },
    { icon: Lightbulb, label: "Suggest Feature", href: "/help/suggest-feature", color: "text-yellow-600", bg: "bg-yellow-50" },
    { icon: AlertTriangle, label: "Report Content", href: "/help/report", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: User, label: "Account Issues", href: "/help/account", color: "text-blue-600", bg: "bg-blue-50" },
];

export default function HelpPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    // Filter FAQs based on search
    const filteredFaqs = searchQuery.trim()
        ? faqs.map(category => ({
            ...category,
            questions: category.questions.filter(
                q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.a.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(category => category.questions.length > 0)
        : faqs;

    const toggleCategory = (idx: number) => {
        setExpandedCategory(expandedCategory === idx ? null : idx);
    };

    const toggleQuestion = (key: string) => {
        setExpandedQuestion(expandedQuestion === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3 mb-3">
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
                        placeholder="Search for help topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Contact Support Cards */}
                <div>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Contact Us</h2>
                    <div className="grid grid-cols-3 gap-2">
                        <a href="tel:+9779800000000" className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 active:scale-95 transition-transform">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-xs font-bold text-gray-900">Call Us</span>
                        </a>
                        <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 active:scale-95 transition-transform">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-xs font-bold text-gray-900">Live Chat</span>
                        </button>
                        <a href="mailto:support@chhimeki.com" className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 active:scale-95 transition-transform">
                            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="text-xs font-bold text-gray-900">Email</span>
                        </a>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, idx) => (
                            <Link
                                key={idx}
                                href={action.href}
                                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 active:scale-95 transition-transform"
                            >
                                <div className={`w-9 h-9 ${action.bg} rounded-full flex items-center justify-center`}>
                                    <action.icon className={`w-4 h-4 ${action.color}`} />
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* FAQ Sections - Accordion Style */}
                <div>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                        Frequently Asked Questions
                    </h2>

                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-8 bg-white rounded-xl border border-gray-100">
                            <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-blue-600 text-sm font-medium mt-2"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredFaqs.map((section, idx) => (
                                <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(idx)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 ${section.iconBg} rounded-full flex items-center justify-center`}>
                                                <section.icon className={`w-4 h-4 ${section.iconColor}`} />
                                            </div>
                                            <span className="font-bold text-gray-900 text-[15px]">{section.category}</span>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === idx ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Questions */}
                                    {expandedCategory === idx && (
                                        <div className="border-t border-gray-100">
                                            {section.questions.map((item, qIdx) => {
                                                const key = `${idx}-${qIdx}`;
                                                const isExpanded = expandedQuestion === key;
                                                return (
                                                    <div key={qIdx} className="border-b border-gray-50 last:border-0">
                                                        <button
                                                            onClick={() => toggleQuestion(key)}
                                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                                        >
                                                            <p className="text-[14px] font-medium text-gray-800 pr-4">{item.q}</p>
                                                            <ChevronRight
                                                                className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""
                                                                    }`}
                                                            />
                                                        </button>
                                                        {isExpanded && (
                                                            <div className="px-4 pb-4 -mt-2">
                                                                <p className="text-[13px] text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                                                                    {item.a}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Support Links */}
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                    <Link href="/community-guidelines" className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">Community Guidelines</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link href="/safety" className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">Safety Center</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link href="/privacy-policy" className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">Privacy Policy</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link href="/terms" className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">Terms of Service</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                </div>

                {/* App Info */}
                <div className="text-center py-4 space-y-2">
                    <div className="flex items-center justify-center gap-1 text-gray-400">
                        <Heart className="w-3 h-3 fill-current text-red-400" />
                        <p className="text-xs">Made with love in Nepal</p>
                    </div>
                    <p className="text-[11px] text-gray-400">Chhimeki v1.0.0 • Available 24/7</p>
                </div>
            </div>
        </div>
    );
}
