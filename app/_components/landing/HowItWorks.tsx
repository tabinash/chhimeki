"use client";
import { UserCheck, Map, HandHeart } from "lucide-react";

const steps = [
    {
        icon: <Map className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        title: "1. Join Your Neighborhood",
        description: "Sign up and locate your Tole/Ward. We help you find your specific neighborhood.",
        color: "bg-blue-600"
    },
    {
        icon: <UserCheck className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        title: "2. Get Verified",
        description: "For safety, we verify every member's address. This ensures you're talking to real neighbors.",
        color: "bg-orange-500"
    },
    {
        icon: <HandHeart className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        title: "3. Start Connecting",
        description: "Ask for recommendations, sell items, or just say hello to people around you.",
        color: "bg-green-500"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl rounded-full" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2 block">
                        Simple Process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        How Chhimeki Works
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-700 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 rounded-2xl ${step.color} shadow-lg shadow-${step.color.replace('bg-', '')}/30 flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
