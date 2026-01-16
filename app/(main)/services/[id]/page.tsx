"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MapPin, Phone, Clock, Star, Users, Info, Calendar } from "lucide-react";
import Image from "next/image";

// Mock micro service data
const MICRO_SERVICE = {
    id: 1,
    name: "Baneshwor Micro Service",
    description: "Daily micro bus service connecting Baneshwor to major locations including Ratnapark, Kalanki, Koteshwor, and New Buspark. Comfortable seats with AC available.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    phone: "9801234567",
    alternatePhone: "9812345678",
    address: "Baneshwor Chowk, Near Nepal Bank",
    timing: "6:00 AM - 8:00 PM",
    routes: ["Baneshwor → Ratnapark", "Baneshwor → Kalanki", "Baneshwor → Koteshwor"],
    fare: 30,
    totalSeats: 14,
    isOpen: true,
};

// Seat layout for a typical micro bus (14 seats)
// Row arrangement: Driver | Door | 2 seats
// Then 4 rows of 3 seats each (2 left + 1 right)
const SEAT_LAYOUT = [
    { row: 1, seats: [{ id: "1A", position: "left" }, { id: "1B", position: "right" }] },
    { row: 2, seats: [{ id: "2A", position: "left" }, { id: "2B", position: "middle" }, { id: "2C", position: "right" }] },
    { row: 3, seats: [{ id: "3A", position: "left" }, { id: "3B", position: "middle" }, { id: "3C", position: "right" }] },
    { row: 4, seats: [{ id: "4A", position: "left" }, { id: "4B", position: "middle" }, { id: "4C", position: "right" }] },
    { row: 5, seats: [{ id: "5A", position: "left" }, { id: "5B", position: "middle" }, { id: "5C", position: "right" }] },
];

// Mock booked seats (already taken)
const BOOKED_SEATS = ["1A", "2B", "3C", "4A"];

export default function MicroDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [selectedTime, setSelectedTime] = useState<string>("07:00");

    const toggleSeat = (seatId: string) => {
        if (BOOKED_SEATS.includes(seatId)) return; // Can't select booked seats

        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    };

    const getSeatStatus = (seatId: string) => {
        if (BOOKED_SEATS.includes(seatId)) return "booked";
        if (selectedSeats.includes(seatId)) return "selected";
        return "available";
    };

    const totalFare = selectedSeats.length * MICRO_SERVICE.fare;

    const handleBooking = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat");
            return;
        }
        alert(`Booking confirmed!\nSeats: ${selectedSeats.join(", ")}\nDate: ${selectedDate}\nTime: ${selectedTime}\nTotal: Rs. ${totalFare}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#e4e1dd] border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-white/50 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-[17px] font-bold text-gray-900">Micro Details</h1>
            </div>

            {/* Cover Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={MICRO_SERVICE.image}
                    alt={MICRO_SERVICE.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-bold text-white">{MICRO_SERVICE.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-[14px] font-medium">{MICRO_SERVICE.rating}</span>
                        </div>
                        <span className="text-white/70 text-[13px]">({MICRO_SERVICE.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 py-4 space-y-4">
                {/* Info Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        About
                    </h3>
                    <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
                        {MICRO_SERVICE.description}
                    </p>

                    {/* Routes */}
                    <div className="mb-4">
                        <p className="text-[13px] font-bold text-gray-700 mb-2">Routes:</p>
                        <div className="flex flex-wrap gap-2">
                            {MICRO_SERVICE.routes.map((route, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[12px] font-medium">
                                    {route}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{MICRO_SERVICE.timing}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>{MICRO_SERVICE.totalSeats} seats</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{MICRO_SERVICE.address}</span>
                        </div>
                        <div className="text-[15px] font-bold text-green-600">
                            Rs. {MICRO_SERVICE.fare}/seat
                        </div>
                    </div>
                </div>

                {/* Contact Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-green-600" />
                        Contact
                    </h3>
                    <div className="space-y-2">
                        <a href={`tel:${MICRO_SERVICE.phone}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <span className="text-[14px] font-medium text-gray-700">{MICRO_SERVICE.phone}</span>
                            <span className="text-[12px] text-blue-600 font-bold">Call</span>
                        </a>
                        <a href={`tel:${MICRO_SERVICE.alternatePhone}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <span className="text-[14px] font-medium text-gray-700">{MICRO_SERVICE.alternatePhone}</span>
                            <span className="text-[12px] text-blue-600 font-bold">Call</span>
                        </a>
                    </div>
                </div>

                {/* Date & Time Selection */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        Select Date & Time
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[12px] font-bold text-gray-500 mb-1">Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] font-bold text-gray-500 mb-1">Time</label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="06:00">6:00 AM</option>
                                <option value="07:00">7:00 AM</option>
                                <option value="08:00">8:00 AM</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="16:00">4:00 PM</option>
                                <option value="18:00">6:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Seat Selection */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-4">Select Your Seat</h3>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded bg-gray-200 border border-gray-300" />
                            <span className="text-[11px] text-gray-600">Available</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded bg-blue-600" />
                            <span className="text-[11px] text-gray-600">Selected</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded bg-red-400" />
                            <span className="text-[11px] text-gray-600">Booked</span>
                        </div>
                    </div>

                    {/* Micro Bus Layout */}
                    <div className="bg-gray-100 rounded-2xl p-4 relative">
                        {/* Driver Area */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-dashed border-gray-300">
                            <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                                <span className="text-[10px] text-white font-bold">Driver</span>
                            </div>
                            <div className="w-16 h-8 bg-gray-300 rounded flex items-center justify-center">
                                <span className="text-[9px] text-gray-600 font-medium">Door</span>
                            </div>
                        </div>

                        {/* Seat Rows */}
                        <div className="space-y-2">
                            {SEAT_LAYOUT.map((row) => (
                                <div key={row.row} className="flex items-center justify-between">
                                    {/* Left seats */}
                                    <div className="flex gap-1">
                                        {row.seats.filter(s => s.position !== "right").map((seat) => (
                                            <button
                                                key={seat.id}
                                                onClick={() => toggleSeat(seat.id)}
                                                disabled={BOOKED_SEATS.includes(seat.id)}
                                                className={`w-11 h-11 rounded-lg flex items-center justify-center text-[11px] font-bold transition-all ${getSeatStatus(seat.id) === "booked"
                                                    ? "bg-red-400 text-white cursor-not-allowed"
                                                    : getSeatStatus(seat.id) === "selected"
                                                        ? "bg-blue-600 text-white scale-105"
                                                        : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400"
                                                    }`}
                                            >
                                                {seat.id}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Aisle */}
                                    <div className="w-8" />

                                    {/* Right seat */}
                                    <div className="flex gap-1">
                                        {row.seats.filter(s => s.position === "right").map((seat) => (
                                            <button
                                                key={seat.id}
                                                onClick={() => toggleSeat(seat.id)}
                                                disabled={BOOKED_SEATS.includes(seat.id)}
                                                className={`w-11 h-11 rounded-lg flex items-center justify-center text-[11px] font-bold transition-all ${getSeatStatus(seat.id) === "booked"
                                                    ? "bg-red-400 text-white cursor-not-allowed"
                                                    : getSeatStatus(seat.id) === "selected"
                                                        ? "bg-blue-600 text-white scale-105"
                                                        : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400"
                                                    }`}
                                            >
                                                {seat.id}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Back of Bus */}
                        <div className="mt-3 pt-3 border-t-2 border-dashed border-gray-300 text-center">
                            <span className="text-[10px] text-gray-500 font-medium">← Back of Bus</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 safe-area-pb z-20">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-[12px] text-gray-500">
                            {selectedSeats.length > 0 ? `${selectedSeats.length} seat(s) selected` : "No seats selected"}
                        </p>
                        <p className="text-[18px] font-bold text-gray-900">Rs. {totalFare}</p>
                    </div>
                    <button
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0}
                        className="px-8 py-3 bg-blue-900 text-white rounded-xl text-[14px] font-bold shadow-lg shadow-blue-900/30 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
