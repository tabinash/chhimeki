"use client";

import Image from "next/image";

interface AvatarWithFallbackProps {
    src: string | null | undefined;
    name: string | null | undefined;
    size?: number;
    className?: string;
}

/**
 * Avatar component with fallback to user initials
 * Shows profile picture if available, otherwise displays initials with gradient
 */
export function AvatarWithFallback({
    src,
    name,
    size = 40,
    className = "",
}: AvatarWithFallbackProps) {
    // Get initials from name (e.g., "Abinash Thapa" -> "AT")
    const getInitials = (fullName: string | null | undefined): string => {
        if (!fullName) return "?";

        const nameParts = fullName.trim().split(" ");
        if (nameParts.length === 1) {
            return nameParts[0].charAt(0).toUpperCase();
        }
        return (
            nameParts[0].charAt(0).toUpperCase() +
            nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        );
    };

    // If we have a profile picture, show it
    if (src) {
        return (
            <div
                className={`relative overflow-hidden rounded-full ${className}`}
                style={{ width: size, height: size }}
            >
                <Image
                    src={src}
                    alt={name || "User"}
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    // Fallback: Show initials with gradient background
    return (
        <div
            className={`relative rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            <span
                className="font-bold text-white"
                style={{ fontSize: size * 0.4 }}
            >
                {getInitials(name)}
            </span>
        </div>
    );
}
