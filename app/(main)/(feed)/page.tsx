"use client";
import AlertShowcase from "./_components/AlertShowcase";
import CreatePostWidget from "./_components/CreatePostWidget";
import FeedList from "./_components/FeedList";

export default function FeedPage() {
    return (
        <div className="w-full py-8 px-4 space-y-6">

            {/* Vital Alerts Showcase */}
            <AlertShowcase />

            {/* Create Post Widget */}
            <CreatePostWidget />

            {/* Filterable Posts Feed */}
            <FeedList />

        </div>
    );
}
