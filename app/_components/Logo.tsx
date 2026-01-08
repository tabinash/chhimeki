"use client";
import React from "react";

interface LogoProps {
    className?: string;
    variant?: "light" | "dark";
    size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", variant = "light", size = "md" }: LogoProps) {
    const textColor = variant === "light" ? "text-white" : "text-gray-900";

    const sizeClasses = {
        sm: {
            text: "text-xl",
            svgWidth: 40,
            svgHeight: 12,
            strokeWidth: 4,
            gap: "gap-0.5",
            container: "mb-0"
        },
        md: {
            text: "text-2xl",
            svgWidth: 60,
            svgHeight: 20,
            strokeWidth: 5,
            gap: "gap-1",
            container: "-mt-1"
        },
        lg: {
            text: "text-[2.5rem]",
            svgWidth: 80,
            svgHeight: 26,
            strokeWidth: 6,
            gap: "gap-2",
            container: "-mt-2"
        }
    };

    const currentSize = sizeClasses[size];

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className={`flex items-center ${currentSize.gap} leading-none`}>
                <span className={`${currentSize.text} font-bold ${textColor} tracking-tight`}>Chhimeki</span>
                <span className={`${currentSize.text} font-bold text-orange-500 tracking-tight`}>App</span>
            </div>
            {/* Smile Curve SVG */}
            <svg
                width={currentSize.svgWidth}
                height={currentSize.svgHeight}
                viewBox={`0 0 ${currentSize.svgWidth} ${currentSize.svgHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={currentSize.container}
            >
                <path
                    d={`M${currentSize.svgWidth * 0.08} ${currentSize.svgHeight * 0.1}C${currentSize.svgWidth * 0.25} ${currentSize.svgHeight * 0.75} ${currentSize.svgWidth * 0.75} ${currentSize.svgHeight * 0.75} ${currentSize.svgWidth * 0.92} ${currentSize.svgHeight * 0.1}`}
                    stroke="#60A5FA"
                    strokeWidth={currentSize.strokeWidth}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
