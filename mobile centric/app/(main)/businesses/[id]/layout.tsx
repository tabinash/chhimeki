"use client";

import React from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { businesses } from '@/data/mockBusinessData';
import BusinessProfileHeader from './_components/BusinessProfileHeader';

export default function BusinessProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const searchParams = useSearchParams();

    // Simulate auth
    const isOwner = searchParams.get('self') === 'true';

    // Verify Business Exists
    const idString = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    if (!idString) return notFound(); // Should probably just let page handle 404, but header needs data

    const businessId = parseInt(idString);
    const business = businesses.find(b => b.id === businessId);

    if (!business) return notFound();

    return (
        <div className="bg-white min-h-screen">
            <BusinessProfileHeader business={business} isOwner={isOwner} />
            {children}
        </div>
    );
}
