'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Notice {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export function LatestUpdates() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notices');
        const data = await response.json();
        setNotices(data.notices || []);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        setShouldScroll(contentWidth > containerWidth);
      }
    };

    if (!loading) {
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => window.removeEventListener('resize', checkScroll);
  }, [loading, notices]);

  if (loading) {
    return (
      <section className="bg-springer-charcoal h-14 flex items-center">
        <div className="bg-springer-red flex items-center gap-3 lg:w-64 flex-shrink-0 pl-12 h-full">
          <span className="text-white font-semibold">Latest News</span>
        </div>
        <div className="flex-1 px-6">
          <span className="text-white/50 text-sm italic">Loading latest updates...</span>
        </div>
      </section>
    );
  }

  if (notices.length === 0) return null;

  // Double the notices only if we need to scroll for a seamless loop
  const displayNotices = shouldScroll ? [...notices, ...notices] : notices;

  return (
    <section className="bg-springer-charcoal">
      <div className="overflow-hidden">
        <div className="flex ">
          <div className="bg-springer-red flex items-center gap-3 w-36 pl-4 lg:w-64 flex-shrink-0 lg:pl-12 h-14">
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
                    key={`${notice._id}-${index}`}
                    href={`/news/${notice._id}`}
                    className="inline-flex items-center gap-3 px-6 hover:text-springer-red transition-colors whitespace-nowrap"
                  >
                    <span className="lg:font-medium font-normal text-sm lg:text-base text-springer-white">
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
          animation: marquee 10s linear infinite;
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
