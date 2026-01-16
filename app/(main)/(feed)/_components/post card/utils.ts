import { FeedItemResponse } from "@/types/api/feed";

// Helper to calculate relative time
export const getRelativeTime = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    return new Date(dateString).toLocaleDateString();
};

// Get avatar with fallback
export const getAvatarUrl = (imageUrl: string | null, name: string, bgColor?: string) => {
    return imageUrl || `https://ui-avatars.com/api/?background=${bgColor || 'random'}&color=fff&name=${encodeURIComponent(name)}`;
};

// Get location text based on visibility level
export const getLocationText = (post: FeedItemResponse) => {
    if (post.visibilityLevel === "WADA" && post.wada) {
        return `Ward ${post.wada}`;
    }
    if (post.visibilityLevel === "PALIKA" && post.palika) {
        return post.palika;
    }
    if (post.visibilityLevel === "DISTRICT" && post.district) {
        return post.district;
    }
    return post.visibilityLevel;
};
