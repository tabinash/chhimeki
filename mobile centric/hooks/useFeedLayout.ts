"use client";
import { useState, useEffect } from "react";
import { throttle } from "lodash";

// Layout constants
const SIDEBAR_WIDTH = 256;
const MAIN_MIN = 400;
const MAIN_MAX = 700;
const RIGHT_MIN = 260;
const RIGHT_MAX = 320;
const GAP = 22;

interface FeedLayoutDimensions {
    main: { width: number };
    rightPanel: { visible: boolean; width: number; compact: boolean };
}

export function useFeedLayout(): FeedLayoutDimensions {
    const [width, setWidth] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );

    useEffect(() => {
        const handleResize = throttle(() => {
            setWidth(window.innerWidth);
        }, 150);

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Available space after left sidebar
    const available = width - SIDEBAR_WIDTH - GAP;

    // Main takes what it needs (up to max)
    const mainWidth = Math.min(Math.max(available, MAIN_MIN), MAIN_MAX);

    // Sidebar gets the rest (if there's enough room)
    const remaining = available - mainWidth;
    const sidebarVisible = remaining >= RIGHT_MIN;
    const sidebarWidth = sidebarVisible ? Math.min(remaining, RIGHT_MAX) : 0;
    const compact = sidebarWidth < RIGHT_MAX;

    return {
        main: { width: mainWidth },
        rightPanel: { visible: sidebarVisible, width: sidebarWidth, compact }
    };
}
