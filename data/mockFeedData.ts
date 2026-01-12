
import { PostResponse, PostAuthor, MediaItem } from "@/types/api/feed";

export const posts: PostResponse[] = [
    // 1. ALERT (Text-only)
    {
        id: 1,
        content: "⚠️ Emergency: Main pipeline maintenance at Shankhamul. Water supply will be disrupted for 4 hours. Tankers are on standby.",
        postType: "ALERT",
        visibility: "WADA",
        author: {
            id: 101,
            name: "Ward 4 Committee",
            userType: "GOVERNMENT_OFFICE",
            profilePicture: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [],
        likeCount: 145,
        commentCount: 42,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    },
    // 2. VIDEO (Construction/Civic)
    {
        id: 2,
        content: "Progress update: The new community park jogging track is nearly finished! Looking forward to the opening next month. 🏗️🌳",
        postType: "GENERAL",
        visibility: "WADA",
        author: {
            id: 107,
            name: "Urban Planning",
            userType: "GOVERNMENT_OFFICE",
            profilePicture: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [{
            id: 201,
            url: "https://youtu.be/Hi_gyY-mMQo?list=RDcFtOwzJA1do",
            thumbnailUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800&h=500&fit=crop",
            mediaType: "VIDEO",
            processingStatus: "COMPLETED",
            duration: 15
        }],
        likeCount: 230,
        commentCount: 18,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    // 3. IMAGE (Lost & Found)
    {
        id: 3,
        content: "Missing: Our Golden Retriever 'Max' last seen near Mahadev Temple. Red collar. Please contact us if found! 🐕 #LostDog",
        postType: "GENERAL",
        visibility: "PALIKA",
        author: {
            id: 102,
            name: "Sita Sharma",
            userType: "GENERAL",
            profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            isVerified: false
        },
        media: [{
            id: 1,
            url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=500&fit=crop",
            mediaType: "IMAGE",
            processingStatus: "COMPLETED",
            thumbnailUrl: null,
            duration: null
        }],
        likeCount: 312,
        commentCount: 89,
        isLikedByMe: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    // 4. VIDEO (Cultural)
    {
        id: 4,
        content: "Breathtaking traditional performance at the Cultural Center today. Our heritage is so vibrant! 💃🕺 #culture #heritage",
        postType: "GENERAL",
        visibility: "DISTRICT",
        author: {
            id: 115,
            name: "Cultural Center",
            userType: "GOVERNMENT_OFFICE",
            profilePicture: "https://images.unsplash.com/photo-1596290815594-554472c1c1f7?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [{
            id: 401,
            url: "https://v.pinimg.com/videos/iht/720p/5e/04/30/5e043003020087094254095493019.mp4",
            thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop",
            mediaType: "VIDEO",
            processingStatus: "COMPLETED",
            duration: 45
        }],
        likeCount: 542,
        commentCount: 67,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
    },
    // 5. CAROUSEL/IMAGE (Food/Business)
    {
        id: 5,
        content: "Now Open! 🥟 Come try the best Jhol MoMo in town at New Everest. 20% discount for app users this week!",
        postType: "GENERAL",
        visibility: "DISTRICT",
        author: {
            id: 103,
            name: "New Everest MoMo",
            userType: "BUSINESS",
            profilePicture: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [{
            id: 501,
            url: "https://images.unsplash.com/photo-1626015499273-2c0aaca135fc?w=800&h=500&fit=crop",
            mediaType: "IMAGE",
            processingStatus: "COMPLETED",
            thumbnailUrl: null,
            duration: null
        }],
        likeCount: 89,
        commentCount: 14,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString()
    },
    // 6. ALERT (Text-only)
    {
        id: 6,
        content: "📅 Scheduled Power Cut: Ward 4 transformer maintenance tomorrow from 10:00 AM to 2:00 PM. Please plan accordingly.",
        postType: "ALERT",
        visibility: "WADA",
        author: {
            id: 106,
            name: "Nepal Electricity",
            userType: "GOVERNMENT_OFFICE",
            profilePicture: "https://images.unsplash.com/photo-1560179707-f14e90ef3dab?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [],
        likeCount: 201,
        commentCount: 95,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 3600 * 8).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 8).toISOString()
    },
    // 7. IMAGE (Lifestyle/General)
    {
        id: 7,
        content: "Morning vibes at the local tea stall. Nothing beats a hot cup of chiya and local conversation! ☕✨",
        postType: "GENERAL",
        visibility: "WADA",
        author: {
            id: 108,
            name: "Rahul K.",
            userType: "GENERAL",
            profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            isVerified: false
        },
        media: [{
            id: 701,
            url: "https://images.unsplash.com/photo-1582733315328-849a6c276a6e?w=800&h=500&fit=crop",
            mediaType: "IMAGE",
            processingStatus: "COMPLETED",
            thumbnailUrl: null,
            duration: null
        }],
        likeCount: 112,
        commentCount: 9,
        isLikedByMe: true,
        createdAt: new Date(Date.now() - 1000 * 3600 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 12).toISOString()
    },
    // 8. IMAGE (Health/Business)
    {
        id: 8,
        content: "Organic greens just arrived from the farm! Spinach, cauliflower, and radish. Support your local farmers! 🌿🍅",
        postType: "GENERAL",
        visibility: "WADA",
        author: {
            id: 114,
            name: "Organic Mart",
            userType: "BUSINESS",
            profilePicture: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [{
            id: 801,
            url: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=500&fit=crop",
            mediaType: "IMAGE",
            processingStatus: "COMPLETED",
            thumbnailUrl: null,
            duration: null
        }],
        likeCount: 76,
        commentCount: 21,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 3600 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 24).toISOString()
    },
    // 9. VIDEO (Street View)
    {
        id: 9,
        content: "The evening traffic at the square is getting better with the new lane system. Slow but steady! 🚦🏙️",
        postType: "GENERAL",
        visibility: "PALIKA",
        author: {
            id: 120,
            name: "City Traffic",
            userType: "GOVERNMENT_OFFICE",
            profilePicture: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [{
            id: 901,
            url: "https://v.pinimg.com/videos/iht/720p/12/34/56/123456...mp4", // Replace with a generic city mp4 if needed
            thumbnailUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
            mediaType: "VIDEO",
            processingStatus: "COMPLETED",
            duration: 10
        }],
        likeCount: 156,
        commentCount: 44,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 3600 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 48).toISOString()
    },
    // 10. IMAGE (Community Event)
    {
        id: 10,
        content: "Saturday Clean-up Drive: 50+ neighbors showed up! Let's keep our chowk clean together. 🧹🌍 #CleanCity",
        postType: "GENERAL",
        visibility: "WADA",
        author: {
            id: 104,
            name: "Community Club",
            userType: "GOVERNMENT_OFFICE",
            profilePicture: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop",
            isVerified: true
        },
        media: [{
            id: 1001,
            url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop",
            mediaType: "IMAGE",
            processingStatus: "COMPLETED",
            thumbnailUrl: null,
            duration: null
        }],
        likeCount: 412,
        commentCount: 56,
        isLikedByMe: false,
        createdAt: new Date(Date.now() - 1000 * 3600 * 72).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 72).toISOString()
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
