
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
        priority: "High"
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
        priority: "Urgent"
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
        isLiked: false
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
        isLiked: true
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
