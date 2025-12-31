"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { throttle } from "lodash";

export type ScreenSize = "mobile" | "tablet" | "desktop" | "large-desktop";

interface LayoutDimensions {
    sidebar: {
        width: number;
        showLabels: boolean;
    };
    main: {
        width: number;
    };
    rightPanel: {
        visible: boolean;
        width: number;
        compact: boolean;
    };
}

interface UseResponsiveReturn {
    screenSize: ScreenSize;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
    width: number;
    layout: LayoutDimensions;
}

/**
 * Routes that need more space - keep sidebar collapsed
 */
const WIDE_CONTENT_ROUTES = ['/groups', '/explore', '/messages', '/marketplace'];

/**
 * Custom hook to detect screen size with intelligent layout calculations
 * Progressive expansion logic with route-aware sidebar behavior
 */
export function useResponsive(): UseResponsiveReturn {
    const pathname = usePathname();
    const [width, setWidth] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : 1440
    );

    useEffect(() => {
        const handleResize = throttle(() => {
            setWidth(window.innerWidth);
            console.log("width", window.innerWidth);
        }, 200);

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Check if current route needs wide content
    const needsWideContent = WIDE_CONTENT_ROUTES.some(route =>
        pathname?.startsWith(route)
    ) && width < 1200 || pathname === "/marketplace";

    // Calculate intelligent layout dimensions
    const calculateLayout = (screenWidth: number, forceCollapsedSidebar: boolean): LayoutDimensions => {
        const SIDEBAR_MIN = 72;
        const SIDEBAR_MAX = 256;
        const MAIN_MIN = 400;
        const MAIN_MAX = 700;
        const RIGHT_COMPACT = 240;
        const RIGHT_FULL = 320;

        let sidebarWidth = SIDEBAR_MIN;
        let showLabels = false;
        let mainWidth = MAIN_MIN;
        let rightVisible = false;
        let rightWidth = 0;
        let rightCompact = true;

        // Progressive expansion logic
        if (screenWidth < 768) {
            // Mobile: Icon-only sidebar, min main, no right panel
            sidebarWidth = SIDEBAR_MIN;
            mainWidth = Math.min(screenWidth - SIDEBAR_MIN - 32, MAIN_MAX);
        } else if (screenWidth < 1024) {
            // Tablet: Keep sidebar collapsed, grow main
            sidebarWidth = SIDEBAR_MIN;
            mainWidth = Math.min(screenWidth - SIDEBAR_MIN - 32, MAIN_MAX);
        } else if (screenWidth < 1200) {
            // Small Desktop: Expand sidebar UNLESS on wide-content route
            if (forceCollapsedSidebar) {
                sidebarWidth = SIDEBAR_MIN;
                showLabels = false;
            } else {
                sidebarWidth = SIDEBAR_MAX;
                showLabels = true;
            }
            mainWidth = Math.min(screenWidth - sidebarWidth - 32, MAIN_MAX);
        } else if (screenWidth < 1440) {
            // Desktop: Full sidebar (unless forced), main at max, show compact right panel
            if (forceCollapsedSidebar) {
                sidebarWidth = SIDEBAR_MIN;
                showLabels = false;
            } else {
                sidebarWidth = SIDEBAR_MAX;
                showLabels = true;
            }
            mainWidth = MAIN_MAX;

            const remaining = screenWidth - sidebarWidth - MAIN_MAX - 48;
            if (remaining >= RIGHT_COMPACT) {
                rightVisible = true;
                rightWidth = Math.min(remaining, RIGHT_COMPACT);
                rightCompact = true;
            }
        } else {
            // Large Desktop: Everything at max (sidebar can still be collapsed for wide routes)
            if (forceCollapsedSidebar) {
                sidebarWidth = SIDEBAR_MIN;
                showLabels = false;
            } else {
                sidebarWidth = SIDEBAR_MAX;
                showLabels = true;
            }
            mainWidth = MAIN_MAX;
            rightVisible = true;
            rightWidth = RIGHT_FULL;
            rightCompact = false;
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
                visible: rightVisible,
                width: rightWidth,
                compact: rightCompact,
            },
        };
    };

    const getScreenSize = (w: number): ScreenSize => {
        if (w < 768) return "mobile";
        if (w < 1024) return "tablet";
        if (w < 1440) return "desktop";
        return "large-desktop";
    };

    const screenSize = getScreenSize(width);
    const layout = calculateLayout(width, needsWideContent);

    return {
        screenSize,
        isMobile: screenSize === "mobile",
        isTablet: screenSize === "tablet",
        isDesktop: screenSize === "desktop",
        isLargeDesktop: screenSize === "large-desktop",
        width,
        layout,
    };
}
