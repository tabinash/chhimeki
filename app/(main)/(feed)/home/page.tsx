"use client";

import FeedList from "../_components/FeedList";

export default function FeedPage() {
    return (
        <div className="pt-3 pb-2 space-y-3">
            {/* Filterable Posts Feed */}
            <FeedList />
        </div>
    );
}
