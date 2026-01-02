export interface Business {
    id: number;
    name: string;
    category: 'Retail' | 'Food' | 'Services' | 'Health';
    location: string;
    isOpen: boolean;
    rating: number;
    reviewCount: number;
    coverImage: string;
    avatar: string;
    description: string;
    phone: string;
    email: string;
    website?: string;
    features: string[];
    products: {
        id: number;
        name: string;
        price: string;
        image: string;
    }[];
    services: {
        id: number;
        name: string;
        description: string;
        price: string;
    }[];
    reviews: {
        id: number;
        user: string;
        rating: number;
        comment: string;
        date: string;
        avatar: string; // user avatar
    }[];
    joinedDate: string;
}

export const businesses: Business[] = [
    {
        id: 1,
        name: "Sharma Kirana Pasal",
        category: "Retail",
        location: "Ward 4, Near Temple",
        isOpen: true,
        rating: 4.8,
        reviewCount: 42,
        coverImage: "https://images.unsplash.com/photo-1604719312566-b7cb60936928?w=800&h=400&fit=crop",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        description: "Your trusted neighborhood general store for over 15 years. We stock fresh vegetables, dairy, and daily essentials.",
        phone: "+977 9841234567",
        email: "sharma.kirana@example.com",
        features: ["Home Delivery", "E-Sewa Accepted"],
        joinedDate: "2020",
        products: [
            { id: 101, name: "Basmati Rice (25kg)", price: "Rs. 2500", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop" },
            { id: 102, name: "Sunflower Oil (1L)", price: "Rs. 280", image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=200&h=200&fit=crop" },
            { id: 103, name: "Local Honey", price: "Rs. 600", image: "https://images.unsplash.com/photo-1587049359509-b78504be6751?w=200&h=200&fit=crop" }
        ],
        services: [
            { id: 1, name: "General Checkup", description: "Full body checkup by physician.", price: "Rs. 500" },
            { id: 2, name: "Dental Scaling", description: "Professional teeth cleaning.", price: "Rs. 1200" }
        ], reviews: [
            { id: 1, user: "Ram K.", rating: 5, comment: "Always fresh items and quick delivery!", date: "2 days ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ram" },
            { id: 2, user: "Sita M.", rating: 4, comment: "Good prices but sometimes out of stock.", date: "1 week ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sita" }
        ]
    },
    {
        id: 2,
        name: "Baneshwor Bakery Cafe",
        category: "Food",
        location: "Mid-Baneshwor, Chowk",
        isOpen: true,
        rating: 4.5,
        reviewCount: 128,
        coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
        avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop",
        description: "Freshly baked cakes, pastries, and the best coffee in town. A perfect spot for meetings and hangouts.",
        phone: "+977 1-4467890",
        email: "info@baneshworbakery.com",
        features: ["Free Wi-Fi", "Outdoor Seating"],
        joinedDate: "2021",
        products: [
            { id: 201, name: "Black Forest Cake", price: "Rs. 650/lb", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop" },
            { id: 202, name: "Chicken Patties", price: "Rs. 60", image: "https://images.unsplash.com/photo-1626015499273-2c0aaca135fc?w=200&h=200&fit=crop" },
        ],
        services: [
            { id: 1, name: "Birthday Cake Customization", description: "Custom designs for your special day.", price: "Starts from Rs. 1000" },
            { id: 2, name: "Event Catering", description: "Coffee and snacks for small events.", price: "Contact for quote" }
        ],
        reviews: [
            { id: 1, user: "Aayush P.", rating: 5, comment: "Best coffee in Baneshwor area!", date: "1 day ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aayush" },
            { id: 2, user: "Rita S.", rating: 4, comment: "Love the cakes.", date: "3 weeks ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita" }
        ]
    },
    {
        id: 3,
        name: "Quick Fix Plumbing",
        category: "Services",
        location: "Mobile Service (Ward 4 & 5)",
        isOpen: false,
        rating: 4.9,
        reviewCount: 15,
        coverImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=400&fit=crop",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        description: "Expert plumbing services for residential and commercial needs. Leaks, installations, and maintenance.",
        phone: "+977 9801234567",
        email: "ram.plumber@example.com",
        features: ["Emergency 24/7", "Cheap Rates"],
        joinedDate: "2022",
        products: [],
        services: [
            { id: 1, name: "Leak Repair", description: "Fixing leaking pipes and taps.", price: "Rs. 500 visit charge" },
            { id: 2, name: "Bathroom Installation", description: "Complete setup of bathroom fittings.", price: "Rs. 15000 approx" }
        ],
        reviews: [
            { id: 1, user: "Hari B.", rating: 5, comment: "Came at midnight to fix a burst pipe. Lifesaver!", date: "1 month ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hari" }
        ]
    },
    {
        id: 4,
        name: "City Polyclinic",
        category: "Health",
        location: "Koteshwor",
        isOpen: true,
        rating: 4.6,
        reviewCount: 89,
        coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
        avatar: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&h=100&fit=crop",
        description: "Comprehensive healthcare services including general checkup, dental, and pathology lab.",
        phone: "+977 1-5555555",
        email: "contact@citypolyclinic.com.np",
        features: ["Valid Licence", "Specialist Doctors"],
        joinedDate: "2019",
        products: [],
        services: [
            { id: 1, name: "General Checkup", description: "Full body checkup by physician.", price: "Rs. 500" },
            { id: 2, name: "Dental Scaling", description: "Professional teeth cleaning.", price: "Rs. 1200" }
        ],
        reviews: [
            { id: 1, user: "Binod C.", rating: 5, comment: "Very professional doctors.", date: "2 weeks ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binod" }
        ]
    }
];
