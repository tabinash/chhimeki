"use client";

import { useState, useEffect } from "react";
import { throttle } from "lodash";

interface MessageLayoutState {
    showSidebar: boolean;
    showChat: boolean;
    isMobile: boolean;
}

export function useMessageLayout(hasActiveConversation: boolean): MessageLayoutState {
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

    const isMobile = width < 768; // Tailwind 'md' breakpoint

    // Desktop: Always show both (Split View)
    // Mobile: Show Sidebar if no chat active, Show Chat if chat is active

    const showSidebar = !isMobile || (isMobile && !hasActiveConversation);
    const showChat = !isMobile || (isMobile && hasActiveConversation);

    return {
        showSidebar,
        showChat,
        isMobile
    };
}
