'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Bell, ChevronRight } from 'lucide-react';
import { notices } from '@/data/siteData';

export function NoticeTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  // Double the notices for seamless scrolling
  const tickerNotices = [...notices, ...notices];

  return (
    <div className="bg-springer-red text-white py-3 overflow-hidden">
      <div className="section-padding">
        <div className="flex items-center gap-4">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0 bg-white/20 px-3 py-1.5 rounded-lg">
            <Bell className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Latest Notices</span>
          </div>

          {/* Ticker */}
          <div className="flex-1 overflow-hidden relative">
            <div
              ref={tickerRef}
              className="flex animate-ticker whitespace-nowrap"
              style={{ width: 'fit-content' }}
            >
              {tickerNotices.map((notice, index) => (
                <Link
                  key={`${notice.id}-${index}`}
                  href="/notices"
                  className="flex items-center gap-2 px-6 hover:underline"
                >
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                    {notice.category}
                  </span>
                  <span className="text-sm truncate max-w-xs md:max-w-md">
                    {notice.title}
                  </span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* View All */}
          <Link
            href="/notices"
            className="flex-shrink-0 text-sm font-medium hover:underline hidden sm:flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
