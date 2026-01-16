import { StorefrontResponse } from "@/types/api/storefront";

// Extended interface to include UI-only fields not yet in API
// This ensures we match the API structure while keeping the UI working
export interface Business extends StorefrontResponse {
    // UI fields (mock only for now)
    category: 'Retail' | 'Food' | 'Services' | 'Health' | 'Fashion' | 'Tech';
    rating: number;
    reviewCount: number;
    isOpen: boolean;
    features: string[];
    // Products are fetched via separate API usually, but keeping for mock UI if needed
    products: {
        id: number;
        name: string;
        price: string;
        image: string;
    }[];
}

export const businesses: Business[] = [
    {
        id: 1,
        name: "Sharma Kirana Pasal",
        description: "Your trusted neighborhood general store for over 15 years. We stock fresh vegetables, dairy, and daily essentials from local farmers.",
        logo: "https://ui-avatars.com/api/?name=Sharma+Kirana&background=0D8ABC&color=fff&size=128",
        coverImage: "https://images.unsplash.com/photo-1604719312566-b7cb60936928?w=800&h=400&fit=crop",
        contactPhone: "+977 9841234567",
        contactEmail: "sharma.kirana@example.com",
        palika: "Kathmandu Metropolitan City",
        district: "Kathmandu",
        status: "ACTIVE",
        owner: {
            id: 101,
            name: "Ram Sharma",
            profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        },
        createdAt: "2020-01-15T10:00:00Z",
        updatedAt: "2024-01-10T10:00:00Z",

        // UI Fields
        category: "Retail",
        rating: 4.8,
        reviewCount: 42,
        isOpen: true,
        features: ["Home Delivery", "E-Sewa Accepted", "Fresh Organic"],
        products: [
            { id: 101, name: "Basmati Rice (25kg)", price: "Rs. 2500", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop" },
            { id: 102, name: "Sunflower Oil (1L)", price: "Rs. 280", image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=200&h=200&fit=crop" }
        ]
    },
    {
        id: 2,
        name: "Baneshwor Bakery Cafe",
        description: "Freshly baked cakes, pastries, and the best coffee in town. A perfect spot for meetings and hangouts with free high-speed WiFi.",
        logo: "https://ui-avatars.com/api/?name=Baneshwor+Bakery&background=D35400&color=fff&size=128",
        coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
        contactPhone: "+977 1-4467890",
        contactEmail: "info@baneshworbakery.com",
        palika: "Kathmandu Metropolitan City",
        district: "Kathmandu",
        status: "ACTIVE",
        owner: {
            id: 102,
            name: "Sita Khadka",
            profilePicture: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop"
        },
        createdAt: "2021-03-10T08:30:00Z",
        updatedAt: "2024-01-05T09:15:00Z",

        // UI Fields
        category: "Food",
        rating: 4.5,
        reviewCount: 128,
        isOpen: true,
        features: ["Free Wi-Fi", "Outdoor Seating", "Live Music"],
        products: [
            { id: 201, name: "Black Forest Cake", price: "Rs. 650/lb", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop" },
            { id: 202, name: "Cappuccino", price: "Rs. 180", image: "https://images.unsplash.com/photo-1572442388796-11668a67e569?w=200&h=200&fit=crop" }
        ]
    },
    {
        id: 3,
        name: "Quick Fix Plumbing",
        description: "Expert plumbing services for residential and commercial needs. Leaks, installations, and maintenance. Available 24/7 for emergencies.",
        logo: "https://ui-avatars.com/api/?name=Quick+Fix&background=27AE60&color=fff&size=128",
        coverImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=400&fit=crop",
        contactPhone: "+977 9801234567",
        contactEmail: "ram.plumber@example.com",
        palika: "Lalitpur Metropolitan City",
        district: "Lalitpur",
        status: "ACTIVE",
        owner: {
            id: 103,
            name: "Hari Bahadur",
            profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
        },
        createdAt: "2022-06-20T14:00:00Z",
        updatedAt: "2023-12-20T11:00:00Z",

        // UI Fields
        category: "Services",
        rating: 4.9,
        reviewCount: 15,
        isOpen: false,
        features: ["Emergency 24/7", "Cheap Rates", "Certified"],
        products: []
    },
    {
        id: 4,
        name: "City Polyclinic",
        description: "Comprehensive healthcare services including general checkup, dental, and pathology lab. Experienced doctors and modern facilities.",
        logo: "https://ui-avatars.com/api/?name=City+Polyclinic&background=C0392B&color=fff&size=128",
        coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
        contactPhone: "+977 1-5555555",
        contactEmail: "contact@citypolyclinic.com.np",
        palika: "Kathmandu Metropolitan City",
        district: "Kathmandu",
        status: "ACTIVE",
        owner: {
            id: 104,
            name: "Dr. Anjali Gupta",
            profilePicture: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&h=100&fit=crop"
        },
        createdAt: "2019-11-05T09:00:00Z",
        updatedAt: "2024-01-08T16:20:00Z",

        // UI Fields
        category: "Health",
        rating: 4.6,
        reviewCount: 89,
        isOpen: true,
        features: ["Valid Licence", "Specialist Doctors", "Lab Services"],
        products: []
    },
    {
        id: 5,
        name: "Himalayan Handicrafts",
        description: "Authentic Nepali handicrafts, pashmina shawls, singing bowls, and local artifacts. Perfect for gifts and souvenirs.",
        logo: "https://ui-avatars.com/api/?name=Himalayan+Crafts&background=8E44AD&color=fff&size=128",
        coverImage: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=800&h=400&fit=crop",
        contactPhone: "+977 9851000000",
        contactEmail: "sales@himalayancrafts.com",
        palika: "Bhaktapur Municipality",
        district: "Bhaktapur",
        status: "ACTIVE",
        owner: {
            id: 105,
            name: "Pemba Sherpa",
            profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        },
        createdAt: "2018-04-12T10:30:00Z",
        updatedAt: "2023-11-30T15:45:00Z",

        // UI Fields
        category: "Retail",
        rating: 4.7,
        reviewCount: 56,
        isOpen: true,
        features: ["International Shipping", "Handmade", "Fair Trade"],
        products: [
            { id: 301, name: "Pashmina Shawl", price: "Rs. 4500", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop" },
            { id: 302, name: "Singing Bowl", price: "Rs. 3000", image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=200&h=200&fit=crop" }
        ]
    },
    {
        id: 6,
        name: "TechByte Nepal",
        description: "One stop solution for laptops, mobiles, and accessories. We also provide repair services for all major brands.",
        logo: "https://ui-avatars.com/api/?name=TechByte&background=2C3E50&color=fff&size=128",
        coverImage: "https://images.unsplash.com/photo-1531297420497-356453020a3d?w=800&h=400&fit=crop",
        contactPhone: "+977 9811223344",
        contactEmail: "support@techbyte.np",
        palika: "Lalitpur Metropolitan City",
        district: "Lalitpur",
        status: "ACTIVE",
        owner: {
            id: 106,
            name: "Suresh Mahato",
            profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        },
        createdAt: "2023-01-01T09:00:00Z",
        updatedAt: "2024-01-09T12:00:00Z",

        // UI Fields
        category: "Tech",
        rating: 4.4,
        reviewCount: 34,
        isOpen: true,
        features: ["Warranty", "Repair Service", "Exchange Offer"],
        products: [
            { id: 401, name: "Wireless Mouse", price: "Rs. 1500", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop" },
            { id: 402, name: "Gaming Headset", price: "Rs. 3500", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop" }
        ]
    }
];