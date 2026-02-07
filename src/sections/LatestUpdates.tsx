'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { notices } from '@/data/siteData';

export function LatestUpdates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        setShouldScroll(contentWidth > containerWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Double the notices only if we need to scroll for a seamless loop
  const displayNotices = shouldScroll ? [...notices, ...notices] : notices;

  return (
    <section className="bg-springer-charcoal">
      <div className="overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="bg-springer-red flex items-center gap-3 lg:w-64 flex-shrink-0 pl-12 h-14">
            <span className="text-white font-semibold">Latest News</span>
          </div>

          <div ref={containerRef} className="flex-1 overflow-hidden py-4">
            <div className="marquee-container">
              <div
                ref={contentRef}
                className={`flex ${shouldScroll ? 'marquee-content' : 'justify-start px-6'}`}
              >
                {displayNotices.map((notice, index) => (
                  <Link
                    key={`${notice.id}-${index}`}
                    href={`/news/${notice.id}`}
                    className="inline-flex items-center gap-3 px-6 hover:text-springer-red transition-colors whitespace-nowrap"
                  >
                    <span className="font-medium text-springer-white">
                      {notice.title}
                    </span>
                    <img
                      src="/images/new_gif.gif"
                      alt="New"
                      className="w-6 h-6 object-contain flex-shrink-0"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          animation: marquee 60s linear infinite;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
