"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ChevronDown,
    Shield,
    Eye,
    Database,
    Share2,
    Lock,
    Bell,
    Trash2,
    Globe,
    Cookie,
    Baby,
    Mail,
    FileText,
    CheckCircle,
} from "lucide-react";

// Privacy policy sections
const sections = [
    {
        id: "intro",
        title: "Introduction",
        icon: Shield,
        content: `Welcome to Chhimeki! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services. We are committed to protecting your privacy and ensuring you have a positive experience on our platform.

By using Chhimeki, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies, please do not use our services.`
    },
    {
        id: "collect",
        title: "Information We Collect",
        icon: Database,
        content: null,
        subsections: [
            {
                title: "Personal Information",
                items: [
                    "Name and username",
                    "Phone number and email address",
                    "Date of birth (optional)",
                    "Profile picture",
                    "Ward number and Palika/Municipality",
                    "District and Province"
                ]
            },
            {
                title: "Verification Documents",
                items: [
                    "Government-issued ID (Citizenship, License)",
                    "Documents are encrypted and stored securely",
                    "Used solely for identity verification",
                    "Deleted after verification is complete"
                ]
            },
            {
                title: "Usage Information",
                items: [
                    "Device information (model, OS version)",
                    "IP address and browser type",
                    "App usage patterns and interactions",
                    "Search queries and preferences"
                ]
            },
            {
                title: "Content You Create",
                items: [
                    "Posts, comments, and messages",
                    "Product listings and job postings",
                    "Photos and media you upload",
                    "Group memberships and activities"
                ]
            }
        ]
    },
    {
        id: "use",
        title: "How We Use Your Information",
        icon: Eye,
        content: null,
        list: [
            "Provide, maintain, and improve our services",
            "Connect you with nearby neighbors and businesses",
            "Process marketplace transactions and job applications",
            "Send notifications about activity relevant to you",
            "Verify user identities and prevent fraud",
            "Respond to your comments, questions, and support requests",
            "Monitor and analyze trends, usage, and activities",
            "Personalize your experience and content recommendations",
            "Comply with legal obligations"
        ]
    },
    {
        id: "share",
        title: "Information Sharing",
        icon: Share2,
        content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:`,
        list: [
            "With your consent or at your direction",
            "With other users as part of the platform (posts, profile info)",
            "With service providers who assist our operations",
            "To comply with legal obligations or government requests",
            "To protect rights, privacy, safety, or property",
            "In connection with a merger, acquisition, or sale of assets"
        ]
    },
    {
        id: "security",
        title: "Data Security",
        icon: Lock,
        content: `We implement industry-standard security measures to protect your personal information:`,
        list: [
            "End-to-end encryption for messages",
            "SSL/TLS encryption for data transmission",
            "Secure servers and databases",
            "Regular security audits and updates",
            "Access controls and authentication",
            "Employee training on data protection"
        ],
        note: "While we strive to protect your information, no method of transmission over the Internet is 100% secure. Please use strong passwords and keep your account credentials confidential."
    },
    {
        id: "cookies",
        title: "Cookies & Tracking",
        icon: Cookie,
        content: `We use cookies and similar tracking technologies to enhance your experience:`,
        list: [
            "Essential cookies for app functionality",
            "Analytics cookies to understand usage patterns",
            "Preference cookies to remember your settings",
            "We do not use third-party advertising cookies"
        ]
    },
    {
        id: "rights",
        title: "Your Rights & Choices",
        icon: CheckCircle,
        content: `You have the following rights regarding your personal data:`,
        list: [
            "Access: View your personal data in Settings > Privacy",
            "Correction: Update your profile information anytime",
            "Deletion: Request account deletion in Settings",
            "Portability: Download your data in a portable format",
            "Opt-out: Disable notifications and location access",
            "Withdraw Consent: Change privacy settings anytime"
        ]
    },
    {
        id: "retention",
        title: "Data Retention",
        icon: Trash2,
        content: `We retain your personal information for as long as your account is active or as needed to provide services. After account deletion:`,
        list: [
            "Personal data is deleted within 30 days",
            "Some data may be retained for legal compliance",
            "Anonymized data may be kept for analytics",
            "Backup copies are purged within 90 days"
        ]
    },
    {
        id: "children",
        title: "Children's Privacy",
        icon: Baby,
        content: `Chhimeki is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately and we will delete it.`
    },
    {
        id: "international",
        title: "International Users",
        icon: Globe,
        content: `Chhimeki is based in Nepal. If you access our services from outside Nepal, your information may be transferred to and processed in Nepal where data protection laws may differ from your country. By using our services, you consent to this transfer.`
    },
    {
        id: "changes",
        title: "Changes to This Policy",
        icon: FileText,
        content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by:`,
        list: [
            "Posting a notice in the app",
            "Sending you a notification",
            "Updating the 'Last Updated' date"
        ],
        note: "We encourage you to review this policy periodically."
    },
    {
        id: "contact",
        title: "Contact Us",
        icon: Mail,
        content: `If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:`,
        contactInfo: {
            email: "privacy@chhimeki.com",
            phone: "+977-9800000000",
            address: "Bharatpur, Chitwan, Nepal"
        }
    }
];

export default function PrivacyPage() {
    const router = useRouter();
    const [expandedSection, setExpandedSection] = useState<string | null>("intro");

    const toggleSection = (id: string) => {
        setExpandedSection(expandedSection === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Your Privacy Matters</h2>
                            <p className="text-blue-100 text-xs">Last updated: January 16, 2026</p>
                        </div>
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed">
                        We are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
                    </p>
                </div>

                {/* Quick Summary */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-3">🔒 Privacy at a Glance</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">We never sell your data</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Messages are encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">You control your data</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Delete account anytime</span>
                        </div>
                    </div>
                </div>

                {/* Accordion Sections */}
                <div className="space-y-2">
                    {sections.map((section) => (
                        <div key={section.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                                        <section.icon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="font-bold text-gray-900 text-[15px]">{section.title}</span>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === section.id ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Section Content */}
                            {expandedSection === section.id && (
                                <div className="px-4 pb-4 border-t border-gray-50">
                                    <div className="pt-3 space-y-3">
                                        {section.content && (
                                            <p className="text-[13px] text-gray-600 leading-relaxed">
                                                {section.content}
                                            </p>
                                        )}

                                        {/* Subsections with items */}
                                        {section.subsections && (
                                            <div className="space-y-4">
                                                {section.subsections.map((sub, idx) => (
                                                    <div key={idx}>
                                                        <h4 className="text-[13px] font-bold text-gray-800 mb-2">{sub.title}</h4>
                                                        <ul className="space-y-1.5">
                                                            {sub.items.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                                                                    <span className="text-blue-500 mt-0.5">•</span>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Simple list */}
                                        {section.list && (
                                            <ul className="space-y-1.5">
                                                {section.list.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                                                        <span className="text-blue-500 mt-0.5">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Note */}
                                        {section.note && (
                                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mt-3">
                                                <p className="text-[11px] text-amber-700">{section.note}</p>
                                            </div>
                                        )}

                                        {/* Contact Info */}
                                        {section.contactInfo && (
                                            <div className="bg-gray-50 rounded-lg p-3 space-y-2 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <a href={`mailto:${section.contactInfo.email}`} className="text-[12px] text-blue-600 font-medium">
                                                        {section.contactInfo.email}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Bell className="w-4 h-4 text-gray-400" />
                                                    <a href={`tel:${section.contactInfo.phone}`} className="text-[12px] text-gray-600">
                                                        {section.contactInfo.phone}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-gray-400" />
                                                    <span className="text-[12px] text-gray-600">
                                                        {section.contactInfo.address}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Links */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-3">Related Policies</h3>
                    <div className="space-y-2">
                        <Link href="/terms" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="text-[13px] text-gray-700">Terms of Service</span>
                            <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                        </Link>
                        <Link href="/community-guidelines" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="text-[13px] text-gray-700">Community Guidelines</span>
                            <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                        </Link>
                        <Link href="/help" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="text-[13px] text-gray-700">Help & Support</span>
                            <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center py-4">
                    <p className="text-[11px] text-gray-400">
                        © 2026 Chhimeki. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
