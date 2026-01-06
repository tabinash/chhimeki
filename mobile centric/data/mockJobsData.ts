export const jobCategories = [
    { name: "All", count: 156 },
    { name: "Household Help", count: 42 },
    { name: "Driver / Delivery", count: 28 },
    { name: "Sales / Shop", count: 35 },
    { name: "Education", count: 18 },
    { name: "Construction", count: 12 },
    { name: "Office Admin", count: 21 },
];

export const jobs = [
    {
        id: 1,
        title: "Housekeeper / Cook Needed",
        employer: "Private Home",
        location: "Baneshwor, Block B",
        salary: "Rs. 15,000 / mo",
        type: "Full-time",
        posted: "2h ago",
        image: "https://images.unsplash.com/photo-1581578731117-10d52143b1e8?w=100&h=100&fit=crop", // Cleaning/Home
        isLocal: true,
        tags: ["Cooking", "Cleaning", "Urgent"],
        description: "Looking for an experienced housekeeper who can also cook Nepali meals. Must be reliable and good with kids. Working hours: 7 AM to 6 PM.",
        requirements: ["2+ years experience", "References required", "Must live nearby"],
        isPostedByMe: false
    },
    {
        id: 2,
        title: "Shop Assistant",
        employer: "Bhatbhateni Supermarket",
        location: "Koteshwor Branch",
        salary: "Rs. 18,000 - 22,000",
        type: "Shift-based",
        posted: "5h ago",
        image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=100&h=100&fit=crop", // Retail
        isLocal: false,
        tags: ["Retail", "Customer Service"],
        description: "Join our team at the Koteshwor branch. Responsibilities include stocking shelves, helping customers, and managing the checkout counter.",
        requirements: ["SLC/SEE completed", "Basic computer knowledge", "Good communication skills"],
        isPostedByMe: false
    },
    {
        id: 3,
        title: "Delivery Rider",
        employer: "Pathao",
        location: "Kathmandu Valley",
        salary: "Commission based",
        type: "Part-time",
        posted: "1d ago",
        image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=100&h=100&fit=crop", // Rider
        isLocal: false,
        tags: ["Bike License", "Flexible"],
        description: "Earn extra money by delivering food and packages. You choose your own hours. Valid driving license and own bike required.",
        requirements: ["Valid 2-wheeler license", "Own vehicle (Bike/Scooter)", "Smartphone with data"],
        isPostedByMe: false
    },
    {
        id: 4,
        title: "Math Tutor (Class 8-10)",
        employer: "You", // Self-posted
        location: "Shantinagar",
        salary: "Rs. 8,000 / mo",
        type: "Evening",
        posted: "1d ago",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&h=100&fit=crop", // Education
        isLocal: true,
        tags: ["Education", "Part-time"],
        description: "Seeking a tutor for my son in Class 9. Focus on Math and Optional Math. 1 hour per day, 6 days a week.",
        requirements: ["Bachelor in Education or Science", "Previous tutoring experience", "Patience with teenagers"],
        isPostedByMe: true
    },
    {
        id: 5,
        title: "Electrician for Wiring",
        employer: "You", // Self-posted
        location: "Tinkune",
        salary: "Daily Wage",
        type: "Contract",
        posted: "3h ago",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&h=100&fit=crop", // Construction
        isLocal: true,
        tags: ["Skilled", "Urgent"],
        description: "Experienced electrician needed for a new residential building wiring. Contract for 2 weeks.",
        requirements: ["CTEVT certified preferred", "Own tools", "Safety conscious"],
        isPostedByMe: true
    }
];
