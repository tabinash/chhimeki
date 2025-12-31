"use client";
import { Calendar as CalendarIcon, MapPin, Clock, Users, ChevronRight, Plus, Star } from "lucide-react";

export function EventsRightSidebar() {
    return (
        <aside className="w-80 dashed min-w-[280px] flex-shrink-0 flex flex-col p-4 gap-6">

            {/* Create Event CTA */}
            <button className="w-full py-3 bg-black text-white font-bold rounded-2xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Create Event
            </button>

            {/* Public Holidays Widget - Nepal Specific */}
            <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
                <h2 className="text-base font-bold text-red-800 mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-red-600" />
                    Public Holidays
                </h2>
                <div className="space-y-4">
                    <div className="flex gap-3 items-center">
                        <div className="bg-white w-10 h-10 rounded-xl flex flex-col items-center justify-center border border-red-100 shadow-sm flex-shrink-0">
                            <span className="text-[8px] font-bold text-red-400 uppercase">SEP</span>
                            <span className="text-sm font-black text-red-800 leading-none">19</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Constitution Day</h4>
                            <span className="text-xs text-red-500 font-medium bg-red-100 px-1.5 rounded-md">National Holiday</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="bg-white w-10 h-10 rounded-xl flex flex-col items-center justify-center border border-red-100 shadow-sm flex-shrink-0">
                            <span className="text-[8px] font-bold text-red-400 uppercase">OCT</span>
                            <span className="text-sm font-black text-red-800 leading-none">03</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Ghatasthapana</h4>
                            <span className="text-xs text-red-500 font-medium bg-red-100 px-1.5 rounded-md">Dashain Begins</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6 border border-gray-100">

                {/* Your Schedule */}
                <div>
                    <h2 className="text-base font-bold text-gray-900 mb-4">
                        Your RSVP's
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-3 relative pb-4 border-l-2 border-gray-100 pl-4 last:pb-0 last:border-0">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-white" />
                            <div>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tomorrow, 7 AM</span>
                                <h4 className="text-sm font-bold text-gray-900 mt-0.5">Saturday Futsal</h4>
                                <p className="text-xs text-gray-500 mt-1">Confirmed • 14 Players</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Categories */}
                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular This Month</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Jatra', 'Futsal', 'Deusi-Bhailo', 'Picnic'].map((cat, i) => (
                            <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </aside>
    );
}
