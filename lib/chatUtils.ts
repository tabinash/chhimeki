/**
 * Centralized utility for generating message/chat URLs with proper query parameters
 */

/**
 * Generate a URL to open a chat with a specific user
 * @param userId - The ID of the user to chat with
 * @param options - Additional options for the chat URL
 * @returns A URL string to navigate to the messages page with the chat open
 * 
 * @example
 * // Basic usage
 * getChatUrl("user123")
 * // Returns: "/messages?chat=user123"
 * 
 * @example
 * // Hide sidebar (useful for mobile or focused view)
 * getChatUrl("user123", { hideSidebar: true })
 * // Returns: "/messages?chat=user123&hideMessageSidebar=true"
 * 
 * @example
 * // With context for analytics
 * getChatUrl("user123", { hideSidebar: true, source: "marketplace" })
 * // Returns: "/messages?chat=user123&hideMessageSidebar=true&source=marketplace"
 */
export function getChatUrl(
    userId: string,
    options?: {
        hideSidebar?: boolean;
        source?: 'profile' | 'marketplace' | 'job' | 'feed' | 'notification';
    }
): string {
    const params = new URLSearchParams();
    params.set('userId', userId);

    if (options?.hideSidebar) {
        params.set('hideMessageSidebar', 'true');
    }

    if (options?.source) {
        params.set('source', options.source);
    }

    return `/messages?${params.toString()}`;
}

/**
 * Hook to check if message sidebar should be hidden based on URL params
 * @returns boolean indicating if sidebar should be hidden
 */
export function useHideMessageSidebar(): boolean {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('hideMessageSidebar') === 'true';
}
