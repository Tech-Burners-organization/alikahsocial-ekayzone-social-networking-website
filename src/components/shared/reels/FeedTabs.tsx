'use client';

import { useState } from 'react';

type FeedTab = 'following' | 'for-you';

const TABS: { id: FeedTab; label: string }[] = [
    { id: 'following', label: 'Following' },
    { id: 'for-you', label: 'For You' },
];

// Purely cosmetic tab pill pinned over the feed — matches the reference design.
// No data-source switching behind it (data is static for now).
export function FeedTabs() {
    const [activeTab, setActiveTab] = useState<FeedTab>('for-you');

    return (
        <div className="pointer-events-none fixed left-1/2 top-18 z-40 -translate-x-1/2">
            <div className="pointer-events-auto flex items-center gap-5">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`text-sm font-semibold drop-shadow-md transition-colors ${
                            activeTab === tab.id
                                ? 'text-white underline underline-offset-8'
                                : 'text-white/60 hover:text-white/80'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
