"use client";
import {
    Users,
    ShoppingBag,
    Briefcase,
    ShieldAlert,
    MessageCircle,
    MapPin
} from "lucide-react";

const features = [
    {
        icon: <Users className="w-6 h-6 text-blue-600" />,
        title: "Connect Locally",
        description: "Meet neighbors in your ward and tole. Build a stronger local community."
    },
    {
        icon: <ShoppingBag className="w-6 h-6 text-orange-500" />,
        title: "Buy & Sell Nearby",
        description: "Find great deals on pre-loved items right in your neighborhood."
    },
    {
        icon: <Briefcase className="w-6 h-6 text-green-600" />,
        title: "Topic Jobs",
        description: "Find local work or hire neighbors for quick tasks and help."
    },
    {
        icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
        title: "Community Alerts",
        description: "Stay informed about urgent safety updates and local news."
    },
    {
        icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
        title: "Chat & Groups",
        description: "Create groups for interests or just chat with neighbors safely."
    },
    {
        icon: <MapPin className="w-6 h-6 text-teal-500" />,
        title: "Verified Neighbors",
        description: "Every user is verified to ensure a safe and trusted environment."
    }
];

export default function FeatureSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Everything your neighborhood needs
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Chhimeki brings the power of community to your fingertips.
                        Safe, private, and exclusively for verified neighbors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
