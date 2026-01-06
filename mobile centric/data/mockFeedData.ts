
import { AlertTriangle, MapPin, Info, PawPrint } from "lucide-react";

export type PostType = 'general' | 'alert' | 'notice' | 'lost-found';

export interface Post {
    id: number;
    type: PostType;
    author: {
        name: string;
        avatar: string;
        location?: string;
        isOfficial?: boolean;
        isBusiness?: boolean;
    };
    time: string;
    title?: string;
    content: string;
    images: string[];
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
    isLiked: boolean;
    priority?: string;
    comments: {
        id: number;
        user: {
            name: string;
            avatar: string;
        };
        text: string;
        time: string;
    }[];
}

export const posts: Post[] = [
    {
        id: 1,
        type: 'alert',
        author: {
            name: "Ward 4 Committee",
            avatar: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=100&h=100&fit=crop",
            location: "Baneshwor",
            isOfficial: true
        },
        time: "10m ago",
        title: "⚠️ Water Supply Disruption",
        content: "Due to emergency maintenance in the main pipeline near Shankhamul, water supply will be disrupted for the next 4 hours. Water tanker services have been alerted.",
        images: [],
        stats: { likes: 145, comments: 42, shares: 89 },
        isLiked: false,
        priority: "High",
        comments: [
            {
                id: 1,
                user: { name: "Ramesh P.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
                text: "Thanks for the heads up! Will store some water.",
                time: "5m ago"
            },
            {
                id: 2,
                user: { name: "Sita K.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
                text: "Is this confirmed for Shankhamul area only?",
                time: "2m ago"
            }
        ]
    },
    {
        id: 2,
        type: 'lost-found',
        author: {
            name: "Sita Sharma",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            location: "Koteshwor"
        },
        time: "1h ago",
        title: "LOST DOG: Max",
        content: "Our Golden Retriever 'Max' went missing this morning around 8 AM near the Mahadev Temple. He is wearing a red collar. Please help us find him! 🐕",
        images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=500&fit=crop"],
        stats: { likes: 212, comments: 35, shares: 120 },
        isLiked: true,
        priority: "Urgent",
        comments: []
    },
    {
        id: 3,
        type: 'general',
        author: {
            name: "New Everest MoMo",
            avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop",
            location: "Mid-Baneshwor",
            isBusiness: true
        },
        time: "3h ago",
        content: "Namaste Neighbors! 🙏 We are officially open! Come try our special Jhol MoMo. 20% discount for all Chhimeki members this week!",
        images: ["https://images.unsplash.com/photo-1626015499273-2c0aaca135fc?w=800&h=500&fit=crop"],
        stats: { likes: 56, comments: 12, shares: 5 },
        isLiked: false,
        comments: []
    },
    {
        id: 4,
        type: 'notice',
        author: {
            name: "Community Club",
            avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop",
            location: "Local Hall",
            isOfficial: true
        },
        time: "5h ago",
        title: "Saturday Clean-up Campaign",
        content: "Join us this Saturday for our monthly neighborhood clean-up. Gathering at the main chowk at 7:00 AM. Gloves and bags provided.",
        images: [],
        stats: { likes: 89, comments: 24, shares: 15 },
        isLiked: true,
        comments: []
    },
    {
        id: 5,
        type: 'general',
        author: {
            name: "Rahul M.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            location: "Koteshwor"
        },
        time: "6h ago",
        content: "Just tried the new bakery 'SweetTooth' near the junction. Their donuts are amazing! 🍩 Highly recommend checking them out.",
        images: ["https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=500&fit=crop"],
        stats: { likes: 45, comments: 8, shares: 2 },
        isLiked: false,
        comments: []
    },
    {
        id: 6,
        type: 'alert',
        author: {
            name: "Nepal Electricity Authority",
            avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3dab?w=100&h=100&fit=crop",
            location: "Baneshwor Branch",
            isOfficial: true
        },
        time: "8h ago",
        title: "⚡ Scheduled Power Cut",
        content: "Power supply will be cut off in Ward 4 area tomorrow from 10:00 AM to 2:00 PM for transformer maintenance.",
        images: [],
        stats: { likes: 89, comments: 56, shares: 120 },
        isLiked: false,
        priority: "Medium",
        comments: []
    },
    {
        id: 7,
        type: 'general',
        author: {
            name: "Priya S.",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
            location: "Shankhamul"
        },
        time: "10h ago",
        content: "Beautiful sunset view from the rooftop today! 🌇 The air feels cleaner after the rain yesterday.",
        images: ["https://images.unsplash.com/photo-1477862767330-941193636ee2?w=800&h=500&fit=crop"],
        stats: { likes: 132, comments: 15, shares: 4 },
        isLiked: true,
        comments: []
    },
    {
        id: 8,
        type: 'lost-found',
        author: {
            name: "Bikash T.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            location: "Old Baneshwor"
        },
        time: "12h ago",
        title: "FOUND: Blue Wallet",
        content: "Found a blue leather wallet near the Global IME Bank ATM. It contains an ID card with the name 'Suresh Karki'. Please contact me to claim it.",
        images: [],
        stats: { likes: 78, comments: 12, shares: 45 },
        isLiked: false,
        priority: "Medium",
        comments: []
    },
    {
        id: 9,
        type: 'notice',
        author: {
            name: "Local Library",
            avatar: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=100&h=100&fit=crop",
            location: "Community Center",
            isOfficial: true
        },
        time: "1d ago",
        title: "📚 Book Reading Session",
        content: "We are organizing a children's book reading session this Saturday at 2 PM. All kids aged 5-10 are welcome!",
        images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop"],
        stats: { likes: 67, comments: 10, shares: 20 },
        isLiked: false,
        comments: []
    },
    {
        id: 10,
        type: 'general',
        author: {
            name: "Tech Solutions",
            avatar: "https://images.unsplash.com/photo-1531297461136-82lw8e2d4b3b?w=100&h=100&fit=crop",
            location: "New Road",
            isBusiness: true
        },
        time: "1d ago",
        content: "Need your laptop fixed? We offer same-day repair services for all major brands. Visit us for a free diagnostic!",
        images: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=500&fit=crop"],
        stats: { likes: 34, comments: 5, shares: 3 },
        isLiked: false,
        comments: []
    },
    {
        id: 11,
        type: 'alert',
        author: {
            name: "Traffic Police",
            avatar: "https://images.unsplash.com/photo-1545459720-aac3e5ca967e?w=100&h=100&fit=crop",
            location: "Metropolitan",
            isOfficial: true
        },
        time: "1d ago",
        title: "🚧 Road Diversion Alert",
        content: "Heavy traffic jam at Maitighar due to a rally. Please use alternative routes via Anamnagar or Thapathali.",
        images: [],
        stats: { likes: 256, comments: 88, shares: 340 },
        isLiked: true,
        priority: "High",
        comments: []
    },
    {
        id: 12,
        type: 'general',
        author: {
            name: "Anjali G.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
            location: "Buddhanagar"
        },
        time: "2d ago",
        content: "Does anyone know a good plumber available for urgent work? My kitchen sink is leaking badly.",
        images: [],
        stats: { likes: 12, comments: 24, shares: 1 },
        isLiked: false,
        comments: []
    },
    {
        id: 13,
        type: 'notice',
        author: {
            name: "Green Club",
            avatar: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=100&h=100&fit=crop",
            location: "Ward 4",
            isOfficial: true
        },
        time: "2d ago",
        title: "🌱 Tree Plantation Drive",
        content: "Let's make our neighborhood greener! Join us for a tree plantation drive near the river bank next Sunday.",
        images: ["https://images.unsplash.com/photo-1542601906990-24ccd08d7455?w=800&h=500&fit=crop"],
        stats: { likes: 156, comments: 45, shares: 67 },
        isLiked: true,
        comments: []
    },
    {
        id: 14,
        type: 'general',
        author: {
            name: "Organic Mart",
            avatar: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop",
            location: "Lagankhel",
            isBusiness: true
        },
        time: "3d ago",
        content: "Fresh organic vegetables from local farmers have just arrived! spinach, carrots, and cauliflower available.",
        images: ["https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=500&fit=crop"],
        stats: { likes: 88, comments: 22, shares: 15 },
        isLiked: false,
        comments: []
    },
    {
        id: 15,
        type: 'lost-found',
        author: {
            name: "Ritika M.",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
            location: "Shantinagar"
        },
        time: "3d ago",
        title: "LOST: House Keys",
        content: "I lost a bunch of keys with a 'Home Sweet Home' keychain somewhere between Shantinagar gate and the grocery store. Please help!",
        images: [],
        stats: { likes: 45, comments: 12, shares: 33 },
        isLiked: false,
        priority: "Medium",
        comments: []
    },
    {
        id: 16,
        type: 'general',
        author: {
            name: "Fitness First Gym",
            avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop",
            location: "Koteshwor",
            isBusiness: true
        },
        time: "4d ago",
        title: "New Year Offer!",
        content: "Get 3 months free on annual membership! Offer valid till end of this month. Start your fitness journey today. 💪",
        images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop"],
        stats: { likes: 210, comments: 45, shares: 12 },
        isLiked: false,
        comments: []
    }
];

export const alertStories = [
    {
        id: 1,
        title: "Water Cut",
        source: "Ward 4",
        time: "10m",
        type: "warning",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=600&fit=crop",
        iconType: "alert"
    },
    {
        id: 2,
        title: "Road Block",
        source: "Traffic Police",
        time: "1h",
        type: "danger",
        image: "https://images.unsplash.com/photo-1545459720-aac3e5ca967e?w=400&h=600&fit=crop",
        iconType: "map-pin"
    },
    {
        id: 3,
        title: "Vaccine Camp",
        source: "Health Post",
        time: "2h",
        type: "info",
        image: "https://images.unsplash.com/photo-1632635939763-8a35368a4875?w=400&h=600&fit=crop",
        iconType: "info"
    },
    {
        id: 4,
        title: "Lost Key",
        source: "Suman G.",
        time: "4h",
        type: "help",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
        iconType: "paw-print"
    },
];
