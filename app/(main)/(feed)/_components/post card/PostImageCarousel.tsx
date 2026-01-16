"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PostImageCarouselProps {
    imageUrls: string[];
}

export default function PostImageCarousel({ imageUrls }: PostImageCarouselProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Touch swipe state
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    if (!imageUrls || imageUrls.length === 0) return null;

    const hasMultipleImages = imageUrls.length > 1;

    const goToPrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? imageUrls.length - 1 : prev - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === imageUrls.length - 1 ? 0 : prev + 1
        );
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const swipeDistance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                goToNextImage();
            } else {
                goToPrevImage();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            className="relative aspect-square bg-gray-100 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Image
                src={imageUrls[currentImageIndex]}
                alt={`Post image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
            />

            {/* Navigation Arrows */}
            {hasMultipleImages && (
                <>
                    <button
                        onClick={goToPrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Dot Indicators */}
            {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {imageUrls.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                                ? "bg-white w-2.5 h-2.5"
                                : "bg-white/50 hover:bg-white/75"
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Image Counter Badge */}
            {hasMultipleImages && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded-full text-white text-xs font-medium">
                    {currentImageIndex + 1}/{imageUrls.length}
                </div>
            )}
        </div>
    );
}
