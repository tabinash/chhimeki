"use client";
import { useState, useEffect } from "react";
import { throttle } from "lodash";

/**
 * Generic Content Layout Hook - Reusable for Jobs, Marketplace, Explore, etc.
 * 
 * Strategy:
 * 1. Left sidebar width is handled by main layout (not this hook)
 * 2. Main content: Gets priority, width adjusts based on available space
 * 3. Right sidebar: ALWAYS visible, but goes compact at smaller widths
 * 4. Both grow proportionally as screen widens - no wasted space
 * 
 * Target screens: 1024px (laptop) to 1920px (24" monitor)
 */

// Presets for different route types
export type LayoutPreset = "feed" | "jobs" | "marketplace" | "explore";

interface LayoutConfig {
    mainMin: number;
    mainMax: number;
    rightCompact: number;   // Compact sidebar width
    rightFull: number;      // Full sidebar width
    mainRatio: number;      // How much of available space main gets (0-1)
    compactBreakpoint: number;  // Below this, sidebar is compact
}

const LAYOUT_CONFIGS: Record<LayoutPreset, LayoutConfig> = {
    feed: {
        mainMin: 480,
        mainMax: 680,
        rightCompact: 240,
        rightFull: 340,
        mainRatio: 0.65,
        compactBreakpoint: 1280,
    },
    jobs: {
        mainMin: 500,
        mainMax: 720,
        rightCompact: 250,
        rightFull: 320,
        mainRatio: 0.68,
        compactBreakpoint: 1280,
    },
    marketplace: {
        mainMin: 550,
        mainMax: 850,
        rightCompact: 240,
        rightFull: 300,
        mainRatio: 0.72,
        compactBreakpoint: 1300,
    },
    explore: {
        mainMin: 550,
        mainMax: 800,
        rightCompact: 250,
        rightFull: 320,
        mainRatio: 0.70,
        compactBreakpoint: 1280,
    },
};

// Layout constants (from main layout)
const SIDEBAR_COLLAPSED = 72;
const SIDEBAR_EXPANDED = 216;
const OUTER_PADDING = 24;
const GAP = 20;
const DESKTOP_BREAKPOINT = 1024;

export interface ContentLayoutDimensions {
    main: {
        width: number;
    };
    rightPanel: {
        visible: boolean;   // Always true now (kept for compatibility)
        width: number;
        compact: boolean;
    };
    screenWidth: number;
    isDesktop: boolean;
}

export function useContentLayout(preset: LayoutPreset = "feed"): ContentLayoutDimensions {
    const config = LAYOUT_CONFIGS[preset];

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

    // Determine if desktop (affects left sidebar width calculation)
    const isDesktop = width >= DESKTOP_BREAKPOINT;
    const leftSidebarWidth = isDesktop ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;

    // Calculate available space for main + right (after left sidebar)
    const availableForContent = width - leftSidebarWidth - OUTER_PADDING * 2;
    const spaceForBoth = availableForContent - GAP;

    // Determine if compact mode based on breakpoint
    const isCompact = width < config.compactBreakpoint;

    // Right sidebar width: compact or proportional
    const rightTargetWidth = isCompact ? config.rightCompact : config.rightFull;

    // Main gets remaining space after right sidebar
    const mainAvailable = spaceForBoth - rightTargetWidth;

    let mainWidth: number;
    let rightWidth: number;

    // Clamp main to min/max
    mainWidth = Math.max(config.mainMin, Math.min(mainAvailable, config.mainMax));

    // Calculate actual right width after main takes its share
    const actualSpaceForRight = spaceForBoth - mainWidth;
    rightWidth = Math.max(config.rightCompact, Math.min(actualSpaceForRight, config.rightFull));

    // If we still have extra space, give more to main (up to max)
    const totalUsed = mainWidth + rightWidth;
    const extraSpace = spaceForBoth - totalUsed;

    if (extraSpace > 0) {
        const canAddToMain = config.mainMax - mainWidth;
        mainWidth += Math.min(extraSpace, canAddToMain);
    }

    return {
        main: { width: mainWidth },
        rightPanel: {
            visible: true,  // Always visible
            width: rightWidth,
            compact: rightWidth <= config.rightCompact,
        },
        screenWidth: width,
        isDesktop,
    };
}
