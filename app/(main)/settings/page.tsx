"use client";
import { useState } from "react";
import { User, ShieldCheck, Bell, Globe, Lock, ChevronRight, Camera, CheckCircle, AlertCircle, Upload } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [language, setLanguage] = useState("english");
    const [notifications, setNotifications] = useState({
        alerts: true,
        community: true,
        marketing: false
    });
    const [verificationStatus, setVerificationStatus] = useState<"unverified" | "pending" | "verified">("unverified");

    const tabs = [
        { id: "profile", label: "Profile & Ward", icon: User },
        { id: "verification", label: "Get Verified", icon: ShieldCheck },
        { id: "preferences", label: "Preferences", icon: Globe },
        { id: "security", label: "Security", icon: Lock },
    ];

    const handleVerificationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setVerificationStatus("pending");
        // Mock API call
        setTimeout(() => {
            // In a real app, this would stay pending until admin review
            // validation logic etc.
        }, 1000);
    };

    return (
        // make vertical scroll bar 

        <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 overflow-y-auto ">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your identity, ward, and app preferences.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <nav className="w-full lg:w-64 flex-shrink-0 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? "bg-black text-white shadow-lg shadow-black/10"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-white" : "text-gray-400"}`} />
                                {tab.label}
                                {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    {/* Main Content Content */}
                    <div className="flex-1">

                        {/* PROFILE TAB */}
                        {activeTab === "profile" && (
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-400" />
                                    Personal Profile
                                </h2>

                                <div className="flex flex-col md:flex-row gap-8 mb-8">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="relative w-28 h-28 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden group cursor-pointer">
                                            <Image
                                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
                                                alt="Profile"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-blue-600 hover:underline">Change Photo</button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                            <input type="text" defaultValue="Sita Sharma" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                            <input type="email" defaultValue="sita@example.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-medium" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bio</label>
                                            <textarea defaultValue="Lover of gardening and community events. Always down for Saturday futsal!" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-medium min-h-[100px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPinIcon className="w-5 h-5 text-gray-400" />
                                        Ward & Location
                                    </h3>
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-blue-800 leading-relaxed">
                                                Your feed and local alerts are customized based on your Ward. Changing this will update your neighborhood.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
                                            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-bold bg-white">
                                                <option>Kathmandu</option>
                                                <option>Lalitpur</option>
                                                <option>Bhaktapur</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ward Number</label>
                                            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-black font-bold bg-white">
                                                <option>Ward 4</option>
                                                <option>Ward 5</option>
                                                <option>Ward 32</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* VERIFICATION TAB */}
                        {activeTab === "verification" && (
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    Get Verified
                                </h2>
                                <p className="text-gray-500 text-sm mb-8">Verified neighbors get a badge and can post jobs and organize events.</p>

                                {verificationStatus === "unverified" && (
                                    <div className="space-y-6">
                                        <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                                <Upload className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-1">Upload Citizenship / License</h4>
                                            <p className="text-xs text-gray-500 max-w-[250px]">
                                                Front and back photo. Clear and readable. PNG or JPG only.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-gray-900">Why verify?</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Get the green 'Verified Neighbor' badge",
                                                    "Post jobs in the neighborhood",
                                                    "Start community events",
                                                    "Access exclusive ward polls"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <button
                                            onClick={(e) => handleVerificationSubmit(e)}
                                            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                                        >
                                            Submit for Verification
                                        </button>
                                    </div>
                                )}

                                {verificationStatus === "pending" && (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <ClockIcon className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Under Review</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto">
                                            We have received your documents. Verification typically takes 24-48 hours. We'll notify you once it's done.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* PREFERENCES TAB */}
                        {activeTab === "preferences" && (
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-gray-400" />
                                    App Preferences
                                </h2>

                                {/* Language */}
                                <div className="mb-10">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Language / भाषा</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setLanguage("english")}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${language === "english" ? "border-black bg-gray-50" : "border-gray-100 hover:border-gray-200"}`}
                                        >
                                            <div className="font-bold text-gray-900 mb-1">English</div>
                                            <div className="text-xs text-gray-500">Default interface language</div>
                                        </button>
                                        <button
                                            onClick={() => setLanguage("nepali")}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${language === "nepali" ? "border-black bg-gray-50" : "border-gray-100 hover:border-gray-200"}`}
                                        >
                                            <div className="font-bold text-gray-900 mb-1">नेपाली</div>
                                            <div className="text-xs text-gray-500">नेपाली भाषामा प्रयोग गर्नुहोस्</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Notifications</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                                    <AlertCircle className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm">Vital Alerts</div>
                                                    <div className="text-xs text-gray-500">Water cuts, electricity issues, emergencies</div>
                                                </div>
                                            </div>
                                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-black cursor-pointer">
                                                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm">Community Activity</div>
                                                    <div className="text-xs text-gray-500">New events, job posts in Ward 4</div>
                                                </div>
                                            </div>
                                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-black cursor-pointer">
                                                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY TAB (Placeholder) */}
                        {activeTab === "security" && (
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                    Security
                                </h2>
                                <div className="space-y-6">
                                    <div className="p-4 border border-gray-100 rounded-xl">
                                        <h3 className="font-bold text-gray-900 mb-1">Change Password</h3>
                                        <p className="text-xs text-gray-500 mb-4">Last changed 3 months ago</p>
                                        <button className="px-4 py-2 border border-black rounded-lg text-xs font-bold hover:bg-gray-50">Update Password</button>
                                    </div>
                                    <div className="p-4 border border-gray-100 rounded-xl">
                                        <h3 className="font-bold text-gray-900 mb-1">Two-Factor Authentication</h3>
                                        <p className="text-xs text-gray-500 mb-4">Add an extra layer of security to your account.</p>
                                        <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-gray-800">Enable 2FA</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

// Icon Helpers
function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}

function ClockIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
