"use client";
import { Calendar, MapPin, Users, Clock, Share2, Heart, Filter, MonitorPlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link

const events = [
    {
        id: 1,
        title: "Ward 4 Tole Baithak (Community Meeting)",
        date: "SEP 15",
        time: "7:00 AM - 9:00 AM",
        location: "Community Hall, Chowk",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&h=400&fit=crop",
        category: "Community",
        attendees: { count: 45, friends: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"] },
        price: "Free",
        isOfficial: true,
        organizer: "Ward 4 Committee"
    },
    {
        id: 2,
        title: "Saturday Futsal Match",
        date: "SEP 16",
        time: "6:00 PM - 7:00 PM",
        location: "Kathmandu Futsal Arena",
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&h=400&fit=crop",
        category: "Sports",
        attendees: { count: 12, friends: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"] },
        price: "Rs. 200",
        organizer: "Ramesh & Friends"
    },
    {
        id: 3,
        title: "Indra Jatra Procession Viewing",
        date: "SEP 18",
        time: "4:00 PM onwards",
        location: "Basantapur Durbar Square",
        image: "https://images.unsplash.com/photo-1583074474776-9d32d6657c7d?w=600&h=400&fit=crop",
        category: "Festival",
        attendees: { count: 120, friends: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"] },
        price: "Free",
        organizer: "Chhimeki Culture Club"
    },
    {
        id: 4,
        title: "Blood Donation Camp",
        date: "SEP 20",
        time: "10:00 AM - 2:00 PM",
        location: "Red Cross Building",
        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=400&fit=crop",
        category: "Health",
        attendees: { count: 85, friends: [] },
        price: "Voluntary",
        organizer: "Nepal Red Cross Society"
    }
];

export default function EventsPage() {
    return (
        <div className="min-h-screen p-6 md:p-8 relative">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Neighborhood Events</h1>
                        <p className="text-gray-500 mt-1">Join festivals, meetings, and games nearby.</p>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button className="px-4 py-1.5 bg-white rounded-lg shadow-sm text-sm font-bold text-gray-900">Upcoming</button>
                        <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">Past</button>
                    </div>
                </div>

                {/* Hero / Featured Festival - Now Link Wrapper */}
                <Link href={`/events/3`} className="block relative rounded-3xl overflow-hidden mb-10 aspect-[21/9] group cursor-pointer border border-gray-100 shadow-sm">
                    <Image
                        src="https://images.unsplash.com/photo-1605218457336-9274295d9830?w=1200&h=600&fit=crop"
                        alt="Dashain Festival"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full sm:w-2/3">
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3 shadow-sm border border-red-400">UPCOMING MAJOR FESTIVAL</span>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">Dashain Community Tika Program</h2>
                                <p className="text-gray-200 flex items-center gap-2 mb-6 text-sm font-medium">
                                    <Clock className="w-4 h-4 text-red-400" /> Saturday, Oct 12 • 10:00 AM
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-9 h-9 rounded-full border-2 border-black/50 bg-gray-200" />
                                        ))}
                                    </div>
                                    <span className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Filter Pills */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
                    {['All', 'Festivals', 'Community', 'Sports', 'Health', 'Music'].map((cat, i) => (
                        <button key={i} className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {events.map((event) => (
                        <Link
                            href={`/events/${event.id}`}
                            key={event.id}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row group cursor-pointer h-full"
                        >
                            {/* Image */}
                            <div className="sm:w-48 relative aspect-video sm:aspect-auto">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 text-center shadow-sm">
                                    <span className="block text-[10px] font-bold text-red-600 uppercase tracking-wider">{event.date.split(' ')[0]}</span>
                                    <span className="block text-lg font-black text-gray-900 leading-none">{event.date.split(' ')[1]}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                                            {event.title}
                                        </h3>
                                        {event.isOfficial && (
                                            <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0">Official</span>
                                        )}
                                    </div>
                                    <div className="space-y-1.5 mb-4">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                            {event.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                    <div className="flex items-center gap-2">
                                        {event.attendees.friends.length > 0 && (
                                            <div className="flex -space-x-2">
                                                {event.attendees.friends.map((friend, idx) => (
                                                    <div key={idx} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden relative">
                                                        <Image src={friend} alt="Friend" fill className="object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <span className="text-xs text-gray-500 font-medium">
                                            {event.attendees.count} going
                                        </span>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${event.price === 'Free' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {event.price}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
