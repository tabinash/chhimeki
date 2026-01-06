import { useState, useEffect } from "react";
import { User } from "@/types/api/auth";

/**
 * Hook to get user data from localStorage
 * @returns User object or null if not logged in
 */
export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Read user from localStorage on mount
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error);
                localStorage.removeItem("user");
            }
        }

        setIsLoading(false);
    }, []);

    // Helper to check if user is logged in
    const isLoggedIn = user !== null;

    return {
        user,
        isLoggedIn,
        isLoading,
    };
}
