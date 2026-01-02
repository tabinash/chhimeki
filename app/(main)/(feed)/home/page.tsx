"use client";
import AlertShowcase from "../_components/AlertShowcase";
import CreatePostWidget from "../_components/CreatePostWidget";
import FeedList from "../_components/FeedList";

export default function FeedPage() {
    return (
        <div className="w-full  pb-20  space-y-5">
            <div className="bg-white pt-4" >

                {/* Vital Alerts Showcase */}
                <AlertShowcase />

                {/* Create Post Widget */}
                <CreatePostWidget />
            </div>

            {/* Filterable Posts Feed */}
            <FeedList />

        </div>
    );
}
