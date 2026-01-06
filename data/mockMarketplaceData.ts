export interface MarketplaceItem {
    id: number;
    title: string;
    price: string;
    location: string;
    image: string;
    time: string;
    seller: string;
    sellerId: string;
    sellerImage: string;
    isVerified: boolean;
    condition: string;
    description: string;
    category: string;
    isOwner: boolean;
}

export const marketplaceItems: MarketplaceItem[] = [
    {
        id: 1,
        title: "Modern Sofa Set - Like New",
        price: "$450",
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        time: "2h ago",
        seller: "Sarah J.",
        sellerId: "1",
        sellerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "Like New",
        description: "Moving out sale! This sofa was bought 6 months ago from IKEA. No stains, pet-free home. Includes the cushions shown in the picture. Must pick up by this weekend.",
        category: "Furniture",
        isOwner: false
    },
    {
        id: 2,
        title: "MacBook Pro M1 2021",
        price: "$1,200",
        location: "North Hills",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&h=300&fit=crop",
        time: "5h ago",
        seller: "Mike C.",
        sellerId: "2",
        sellerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        isVerified: false,
        condition: "Good",
        description: "14-inch MacBook Pro, M1 Pro chip, 16GB RAM, 512GB SSD. Minor scratches on the bottom case, but screen and keyboard are perfect. Battery health 92%.",
        category: "Electronics",
        isOwner: false
    },
    {
        id: 3,
        title: "Vintage Camera Collection",
        price: "$350",
        location: "Westside",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
        time: "1d ago",
        seller: "Alex R.",
        sellerId: "3",
        sellerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "Vintage",
        description: "Selling my grandfather's collection of film cameras. Includes a Canon AE-1 and a Nikon F3. Haven't tested them recently but they have been stored carefully.",
        category: "Collectibles",
        isOwner: true
    },
    {
        id: 4,
        title: "Oak Dining Table",
        price: "$200",
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop",
        time: "3d ago",
        sellerId: "4",
        seller: "Emily W.",
        sellerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "Used",
        description: "Solid oak dining table, seats 6. A bit of wear on the surface but can be refinished. Great sturdy table for a family.",
        category: "Furniture",
        isOwner: false
    },
    {
        id: 5,
        title: "Mountain Bike",
        price: "$550",
        location: "Greenwood",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop",
        time: "4h ago",
        seller: "John D.",
        sellerId: "5",
        sellerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        isVerified: false,
        condition: "Good",
        description: "Trek Marlin 5. Ridden for one season. Tuned up recently. Comes with a lock and helmet if needed.",
        category: "Sports",
        isOwner: false
    },
    {
        id: 6,
        title: "Pottery Set (Handmade)",
        price: "$85",
        location: "Arts District",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop",
        time: "1h ago",
        sellerId: "6",
        seller: "You",
        sellerImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        isVerified: true,
        condition: "New",
        description: "Set of 4 handmade ceramic bowls and plates. Microwave and dishwasher safe. Made by me in my local studio!",
        category: "Home & Garden",
        isOwner: true
    }
];
