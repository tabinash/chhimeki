"use client";
import { useState, useEffect } from "react";
import { throttle } from "lodash";

/**
 * Feed Layout Hook - Dynamic Proportional Growth
 * 
 * Strategy:
 * 1. Left sidebar: Icon-only (<1024px) or Full (≥1024px)
 * 2. Main feed: Gets priority, adjusts based on available space
 * 3. Right sidebar: ALWAYS visible, compact at smaller widths, full at larger
 * 4. Both grow proportionally as screen widens - no wasted space
 * 
 * Target screens: 1024px (laptop) to 1920px (24" monitor)
 */

// Layout constants
const SIDEBAR_COLLAPSED = 72;   // Icon-only
const SIDEBAR_EXPANDED = 216;   // Full with labels

// Main feed constraints
const MAIN_MIN = 480;           // Minimum comfortable reading width
const MAIN_MAX = 680;           // Max before it gets too wide

// Right sidebar constraints - now always visible  
const RIGHT_COMPACT = 240;      // Compact width for smaller screens
const RIGHT_FULL = 340;         // Full width for larger screens

// Gaps/padding
const OUTER_PADDING = 24;
const GAP = 20;

// Breakpoints
const DESKTOP_BREAKPOINT = 1024;
const COMPACT_BREAKPOINT = 1280;  // Below this, sidebar is compact

interface FeedLayoutDimensions {
    sidebar: {
        width: number;
        showLabels: boolean;
    };
    main: {
        width: number;
    };
    rightPanel: {
        visible: boolean;   // Always true
        width: number;
        compact: boolean;
    };
}

export function useFeedLayout(): FeedLayoutDimensions {
    const [width, setWidth] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : 1366
    );

    useEffect(() => {
        const handleResize = throttle(() => {
            setWidth(window.innerWidth);
        }, 100);

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Determine sidebar state
    const isDesktop = width >= DESKTOP_BREAKPOINT;
    const sidebarWidth = isDesktop ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;
    const showLabels = isDesktop;

    // Calculate available space for main + right
    const availableForContent = width - sidebarWidth - OUTER_PADDING * 2;
    const spaceForBoth = availableForContent - GAP;

    // Determine if compact mode
    const isCompact = width < COMPACT_BREAKPOINT;

    // Right sidebar: compact or full based on screen width
    const rightTargetWidth = isCompact ? RIGHT_COMPACT : RIGHT_FULL;

    // Calculate widths
    const mainAvailable = spaceForBoth - rightTargetWidth;

    let mainWidth = Math.max(MAIN_MIN, Math.min(mainAvailable, MAIN_MAX));

    // Calculate actual right width
    const actualSpaceForRight = spaceForBoth - mainWidth;
    let rightWidth = Math.max(RIGHT_COMPACT, Math.min(actualSpaceForRight, RIGHT_FULL));

    // Distribute extra space to main first
    const totalUsed = mainWidth + rightWidth;
    const extraSpace = spaceForBoth - totalUsed;

    if (extraSpace > 0) {
        const canAddToMain = MAIN_MAX - mainWidth;
        mainWidth += Math.min(extraSpace, canAddToMain);
    }

    return {
        sidebar: {
            width: sidebarWidth,
            showLabels,
        },
        main: {
            width: mainWidth,
        },
        rightPanel: {
            visible: true,  // Always visible
            width: rightWidth,
            compact: rightWidth <= RIGHT_COMPACT,
        },
    };
}
