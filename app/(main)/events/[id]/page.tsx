"use client";
import { Clock, MapPin, Users, Calendar, ArrowLeft, Share2, Ticket, CheckCircle, MessageCircle, Heart, ShieldCheck, Tag, Info, ThumbsUp, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock Data (Enhanced)
const events = [
    {
        id: 1,
        title: "Ward 4 Tole Baithak (Community Meeting)",
        date: "SEP 15",
        time: "7:00 AM - 9:00 AM",
        location: "Community Hall, Chowk",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&h=400&fit=crop",
        category: "Community",
        tags: ["Public Interest", "Ward 4", "Morning"],
        attendees: { count: 45, friends: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"] },
        price: "Free",
        isOfficial: true,
        description: "Monthly community meeting to discuss waste management, road repairs, and upcoming festival preparations. All residents of Ward 4 are requested to attend to voice their concerns and suggestions.",
        organizer: {
            name: "Ward 4 Committee",
            image: "https://images.unsplash.com/photo-1581578731117-10d52143b1e8?w=100&h=100&fit=crop", // Placeholder
            isVerified: true,
            eventsHosted: 24,
            responseRate: "100%"
        },
        agenda: [
            { time: "7:00 AM", title: "Welcome & Tea", description: "Registration and casual meetup with neighbors." },
            { time: "7:30 AM", title: "Waste Management Update", description: "Report from the sanitation department regarding new pickup schedules." },
            { time: "8:15 AM", title: "Open Floor Discussion", description: "Residents can raise issues regarding road safety and lights." },
            { time: "9:00 AM", title: "Closing Remarks", description: "Summary of decisions made." }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop"
        ],
        discussions: [
            { id: 1, user: "Ram B.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", text: "Can we bring up the issue of stray dogs?", time: "2h ago", likes: 5 },
            { id: 2, user: "Sita K.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", text: "Is there parking available nearby?", time: "5h ago", likes: 2 }
        ]
    },
    // ... other events (keeping them simple for brevity in demo, but mapping handles missing fields gracefully)
    {
        id: 2,
        title: "Saturday Futsal Match",
        date: "SEP 16",
        time: "6:00 PM - 7:00 PM",
        location: "Kathmandu Futsal Arena",
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&h=400&fit=crop",
        category: "Sports",
        tags: ["Friendly", "Beginner Friendly", "Fitness"],
        attendees: { count: 12, friends: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"] },
        price: "Rs. 200",
        description: "Friendly 5-a-side match. We need 2 more players. Beginners welcome! Split the turf fee evenly.",
        organizer: { name: "Ramesh & Friends", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", isVerified: false, eventsHosted: 5, responseRate: "80%" },
        agenda: [],
        gallery: [],
        discussions: []
    },
    {
        id: 3,
        title: "Indra Jatra Procession Viewing",
        date: "SEP 18",
        time: "4:00 PM onwards",
        location: "Basantapur Durbar Square",
        image: "https://images.unsplash.com/photo-1583074474776-9d32d6657c7d?w=600&h=400&fit=crop",
        category: "Festival",
        tags: ["Culture", "Festival", "Photography"],
        attendees: { count: 120, friends: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"] },
        price: "Free",
        description: "Join the neighborhood group to watch the main chariot procession. We have reserved a spot on a balcony for better viewing.",
        organizer: { name: "Chhimeki Culture Club", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop", isVerified: true, eventsHosted: 42, responseRate: "95%" },
        agenda: [],
        gallery: [],
        discussions: []
    }
];

export default function EventDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const event = events.find(e => e.id.toString() === params.id) || events[0];
    const [activeTab, setActiveTab] = useState<'details' | 'discussion'>('details');

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Image Header */}
            <div className="relative h-[45vh] w-full">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 p-2.5 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors border border-white/10 z-10"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Event Title Block */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex gap-2 mb-4">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                                {event.category}
                            </span>
                            {event.isOfficial && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/80 backdrop-blur-md text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                                    <ShieldCheck className="w-3 h-3" /> Official
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 shadow-sm max-w-3xl">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-white font-medium text-sm md:text-base">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm"><Calendar className="w-5 h-5" /></div>
                                {event.date}
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm"><Clock className="w-5 h-5" /></div>
                                {event.time}
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm"><MapPin className="w-5 h-5" /></div>
                                {event.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column: Details & Tabs */}
                    <div className="flex-1 space-y-10">

                        {/* Tags */}
                        {event.tags && (
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100">
                            {[
                                { id: 'details', label: 'Details & Agenda', icon: Info },
                                { id: 'discussion', label: 'Discussion', icon: MessageCircle }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab.id
                                            ? 'border-black text-black'
                                            : 'border-transparent text-gray-500 hover:text-gray-800'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'details' ? (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">About this Event</h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Agenda Timeline */}
                                {event.agenda && event.agenda.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-gray-400" />
                                            Agenda
                                        </h3>
                                        <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-20px)] before:w-[2px] before:bg-gray-100">
                                            {event.agenda.map((item, i) => (
                                                <div key={i} className="relative">
                                                    <div className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-black shadow-sm" />
                                                    <span className="block text-xs font-bold text-gray-500 mb-1">{item.time}</span>
                                                    <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Gallery / Photos */}
                                {event.gallery && event.gallery.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <ImageIcon className="w-5 h-5 text-gray-400" />
                                            Photos from past events
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {event.gallery.map((img, i) => (
                                                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                                                    <Image src={img} alt={`Gallery ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                {/* Comment Input */}
                                <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                                    <div className="flex-1">
                                        <textarea
                                            placeholder="Ask a question or start a discussion..."
                                            className="w-full bg-transparent border-0 focus:ring-0 p-0 text-gray-900 placeholder:text-gray-400 text-sm min-h-[60px] resize-none"
                                        />
                                        <div className="flex justify-end mt-2">
                                            <button className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800">Post Comment</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments List */}
                                <div className="space-y-6">
                                    {event.discussions && event.discussions.length > 0 ? (
                                        event.discussions.map((comment) => (
                                            <div key={comment.id} className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full relative overflow-hidden flex-shrink-0">
                                                    <Image src={comment.avatar} alt={comment.user} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="text-sm font-bold text-gray-900">{comment.user}</h4>
                                                        <span className="text-xs text-gray-400">{comment.time}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed mb-2">{comment.text}</p>
                                                    <div className="flex items-center gap-4">
                                                        <button className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1">
                                                            <ThumbsUp className="w-3.5 h-3.5" /> {comment.likes} Likes
                                                        </button>
                                                        <button className="text-xs font-bold text-gray-500 hover:text-gray-900">Reply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-gray-400 text-sm">No discussions yet. Be the first to start one!</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="sticky top-8 space-y-6">

                            {/* RSVP Card */}
                            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl shadow-gray-100/50">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Are you going?</h3>

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex -space-x-3">
                                        {event.attendees.friends.map((friend, i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white relative overflow-hidden ring-1 ring-gray-100">
                                                <Image src={friend} alt="Friend" fill className="object-cover" />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 ring-1 ring-gray-100">
                                            +{event.attendees.count}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`block text-2xl font-black ${event.price === 'Free' ? 'text-green-600' : 'text-gray-900'}`}>{event.price}</span>
                                        <span className="text-xs text-gray-500 font-medium">per person</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full py-4 bg-black text-white font-bold rounded-xl text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10 transition-transform active:scale-95">
                                        <Ticket className="w-5 h-5" />
                                        RSVP Now
                                    </button>
                                    <button className="w-full py-4 border-2 border-gray-100 text-gray-700 font-bold rounded-xl text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <Share2 className="w-5 h-5" />
                                        Share
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 text-center mt-6 flex items-center justify-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {event.attendees.count + 12} people viewed today
                                </p>
                            </div>

                            {/* Organizer Card */}
                            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Organized By</h4>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden relative">
                                        <Image src={event.organizer.image || ""} alt={event.organizer.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <h4 className="font-bold text-gray-900">{event.organizer.name}</h4>
                                            {event.organizer.isVerified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                                        </div>
                                        <div className="text-xs text-gray-500">{event.organizer.eventsHosted} events hosted</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-white p-2 rounded-xl border border-gray-100 text-center">
                                        <div className="text-lg font-black text-gray-900">{event.organizer.responseRate}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">Reply Rate</div>
                                    </div>
                                    <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50">
                                        Message
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
