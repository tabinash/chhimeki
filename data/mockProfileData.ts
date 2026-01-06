export interface UserProfile {
    id: string;
    name: string;
    username: string;
    avatar: string;
    cover: string;
    bio: string;
    ward: string;
    city: string;
    tole: string;
    phone: string;
    isVerified: boolean;
    joinedDate: string;
    stats: {
        posts: number;
        neighbors: number;
        helpfulVotes: number;
        eventsHosted: number;
    };
    skills: { name: string; icon: string }[];
    badges: { name: string; icon: string; color: string }[];
    recentActivity: { type: string; text: string; time: string }[];
    mutualNeighbors: { name: string; avatar: string }[];
    products: {
        id: string;
        title: string;
        price: string;
        image: string;
        status: "Active" | "Sold";
        postedDate: string;
    }[];
    jobs: {
        id: string;
        title: string;
        company: string; // or "Role Type" if for individual
        type: "Full-time" | "Part-time" | "One-time";
        salary: string;
        postedDate: string;
        status: "Open" | "Closed";
    }[];
    isOwnProfile: boolean;
}

export const mockUsers: Record<string, UserProfile> = {
    "current": {
        id: "1",
        name: "Abinash Thapa",
        username: "abinash",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
        bio: "Software Developer passionate about building community connections. Love helping neighbors with tech issues. Weekend futsal player ⚽",
        ward: "Ward 4",
        city: "Kathmandu",
        tole: "Baneshwor",
        phone: "+977 98XXXXXXXX",
        isVerified: true,
        joinedDate: "December 2024",
        stats: { posts: 24, neighbors: 156, helpfulVotes: 89, eventsHosted: 5 },
        skills: [
            { name: "Tech Support", icon: "💻" },
            { name: "Tutoring", icon: "📚" },
            { name: "Pet Sitting", icon: "🐕" },
        ],
        badges: [
            { name: "Verified Neighbor", icon: "✓", color: "bg-green-100 text-green-700" },
            { name: "Helpful", icon: "🤝", color: "bg-blue-100 text-blue-700" },
            { name: "Event Host", icon: "🎉", color: "bg-purple-100 text-purple-700" },
        ],
        recentActivity: [
            { type: "post", text: "Shared a water cut alert", time: "2h ago" },
            { type: "event", text: "Organized Saturday Clean-up", time: "1d ago" },
            { type: "help", text: "Helped 3 neighbors with WiFi setup", time: "3d ago" },
        ],
        mutualNeighbors: [
            { name: "Sita S.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
            { name: "Ramesh K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
            { name: "Priya M.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
        ],
        products: [
            {
                id: "p1",
                title: "Study Table - Good Condition",
                price: "Rs. 2,500",
                image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=300&h=300&fit=crop",
                status: "Active",
                postedDate: "2 days ago"
            },
            {
                id: "p2",
                title: "Mountain Bike",
                price: "Rs. 15,000",
                image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=300&h=300&fit=crop",
                status: "Sold",
                postedDate: "1 week ago"
            }
        ],
        jobs: [
            {
                id: "j1",
                title: "Need Plumber for Kitchen Sink",
                company: "Personal Request",
                type: "One-time",
                salary: "Negotiable",
                postedDate: "1 day ago",
                status: "Open"
            }
        ],
        isOwnProfile: true
    },
    "sita": {
        id: "2",
        name: "Sita Sharma",
        username: "sita_sharma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=400&fit=crop",
        bio: "Gardening enthusiast 🌱 | Home cook | Always ready to share recipes and plants with neighbors. Let's make our tole greener!",
        ward: "Ward 4",
        city: "Kathmandu",
        tole: "Koteshwor",
        phone: "+977 98XXXXXXXX",
        isVerified: true,
        joinedDate: "November 2024",
        stats: { posts: 45, neighbors: 234, helpfulVotes: 156, eventsHosted: 12 },
        skills: [
            { name: "Gardening", icon: "🌱" },
            { name: "Cooking", icon: "🍳" },
            { name: "Elderly Care", icon: "👵" },
        ],
        badges: [
            { name: "Verified Neighbor", icon: "✓", color: "bg-green-100 text-green-700" },
            { name: "Super Helper", icon: "⭐", color: "bg-yellow-100 text-yellow-700" },
            { name: "Green Thumb", icon: "🌿", color: "bg-emerald-100 text-emerald-700" },
        ],
        recentActivity: [
            { type: "post", text: "Shared tomato seedlings", time: "5h ago" },
            { type: "help", text: "Helped neighbor with recipe", time: "1d ago" },
            { type: "event", text: "Hosted garden workshop", time: "1w ago" },
        ],
        mutualNeighbors: [
            { name: "Abinash T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
            { name: "Ramesh K.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
        ],
        products: [
            {
                id: "p3",
                title: "Organic Tomato Seedlings",
                price: "Rs. 50 / pack",
                image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=300&h=300&fit=crop",
                status: "Active",
                postedDate: "5 hours ago"
            },
            {
                id: "p4",
                title: "Homemade Pickle (Achar)",
                price: "Rs. 300 / jar",
                image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=300&h=300&fit=crop",
                status: "Active",
                postedDate: "2 days ago"
            }
        ],
        jobs: [],
        isOwnProfile: false
    }
};

export const currentUser = mockUsers["current"];
