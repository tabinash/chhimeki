"use client";
import CreatePostWidget from "./_components/CreatePostWidget";
import FeedList from "./_components/FeedList";
import OfferShowcase from "./_components/OfferShowcase";

export default function FeedPage() {

    return (
        <div className="w-full py-8 px-4 space-y-3">

            {/* Hot Deals / Offers Showcase */}
            <OfferShowcase />

            {/* Create Post Widget */}
            <CreatePostWidget />

            {/* Filterable Posts Feed */}
            <FeedList />

        </div>
    );
}
