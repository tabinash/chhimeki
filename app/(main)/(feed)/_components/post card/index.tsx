"use client";

import { FeedItemResponse } from "@/types/api/feed";
import PostTypeBadge from "./PostTypeBadge";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostImageCarousel from "./PostImageCarousel";
import PostVideo from "./PostVideo";
import PostActions from "./PostActions";

interface PostCardProps {
    post: FeedItemResponse;
}

export default function PostCard({ post }: PostCardProps) {
    const hasImages = post.imageUrls && post.imageUrls.length > 0;
    const hasVideo = post.videoUrl;

    return (
        <div className="bg-white border-b border-gray-100">
            {/* Post Type Badge */}
            <PostTypeBadge postType={post.postType} />

            {/* Header with Avatar & Author Info */}
            <PostHeader post={post} />

            {/* Text Content */}
            <PostContent content={post.content} />

            {/* Image Carousel (if has images, no video) */}
            {hasImages && !hasVideo && (
                <PostImageCarousel imageUrls={post.imageUrls} />
            )}

            {/* Video Player (if has video) */}
            {hasVideo && (
                <PostVideo
                    videoUrl={post.videoUrl!}
                    videoThumbnail={post.videoThumbnail}
                    videoDuration={post.videoDuration}
                />
            )}

            {/* Action Buttons */}
            <PostActions
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                shareCount={post.shareCount}
            />
        </div>
    );
}
