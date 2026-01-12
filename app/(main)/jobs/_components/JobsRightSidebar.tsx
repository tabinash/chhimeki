"use client";
import { Plus, Briefcase, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface JobsRightSidebarProps {
    width?: number;
}

export function JobsRightSidebar({ width }: JobsRightSidebarProps) {
    return (
        <aside
            className="flex-shrink-0 flex flex-col p-4 gap-6"
            style={{ width: width || 280 }}
        >

            {/* Hiring Widget -- Main Action for Locals */}
            <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1">Hiring?</h3>
                    <p className=" text-xs mb-4 max-w-[200px]">Find a helper, tutor, or staff from your own neighborhood.</p>
                    <Link href="/jobs?action=post-job" className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Post a Job Free
                    </Link>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-white" />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6 border border-gray-100">

                {/* Verification Badge Promo */}
                <div className="flex gap-4 items-start border-b border-gray-100 pb-6">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Stay Safe</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Look for the <span className="text-orange-600 font-bold">Verified Neighbor</span> badge when hiring household help.
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Links</h4>
                    <ul className="space-y-3">
                        <li>
                            <a href="#" className="flex items-center justify-between group">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">My Applications</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-600">2</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-between group">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">Saved Jobs</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-600">5</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-between group">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">Job Alerts</span>
                                <span className="text-xs text-orange-600 font-bold">On</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}
