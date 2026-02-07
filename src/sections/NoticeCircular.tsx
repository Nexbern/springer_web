'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';

interface Notice {
    _id: string;
    title: string;
    content: string;
    date: string;
    pdfUrl?: string;
    pdfFileName?: string;
}

export function NoticeCircular() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    useEffect(() => {
        fetchNotices().then();
    }, []);

    useEffect(() => {
        if (notices.length > 0 && contentRef.current) {
            // Container height is 400px
            setShouldScroll(contentRef.current.scrollHeight > 400);
        }
    }, [notices]);

    const fetchNotices = async () => {
        try {
            const response = await fetch('/api/notices');
            const data = await response.json();
            // Get latest 5 notices
            setNotices(data.notices?.slice(0, 5) || []);
        } catch (error) {
            console.error('Failed to fetch notices:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="section-padding bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-springer-gray">Loading notices...</p>
                </div>
            </section>
        );
    }

    if (notices.length === 0) {
        return null; // Don't show section if no notices
    }

    // Double the notices only if we need to scroll for a seamless loop
    const displayNotices = shouldScroll ? [...notices, ...notices] : notices;

    return (
        <section className="section-padding bg-white py-16">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <SectionHeader
                    subtitle="Stay Updated"
                    title="Notice Board"
                    description="Important announcements and updates from the school"
                />
                {/* Notice Board Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border-2 border-springer-red/20 overflow-hidden">
                        {/* Notice Board Header */}
                        <div className="bg-springer-red px-6 py-4 flex items-center gap-3">
                            <Bell className="w-5 h-5 text-white" />
                            <span className="text-white font-semibold text-lg">Latest Notices</span>
                        </div>

                        {/* Scrolling Notice List with CSS Animation */}
                        <div className="h-[400px] overflow-hidden bg-white relative group/scroll">
                            <div
                                ref={contentRef}
                                className={`p-6 space-y-4 ${shouldScroll ? 'animate-scroll-up group-hover/scroll:pause-animation' : ''}`}
                            >
                                {displayNotices.map((notice, index) => (
                                    <Link
                                        key={`${notice._id}-${index}`}
                                        href={`/news/${notice._id}`}
                                        className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-springer-red/40 hover:shadow-md transition-all duration-300 group"
                                    >
                                        {/* Notice Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-medium text-sm lg:text-base text-springer-charcoal group-hover:text-springer-red transition-colors line-clamp-1">
                                                    {notice.title}
                                                </h3>
                                                {/* New GIF Icon - Right side of title */}
                                                {(shouldScroll ? index < notices.length : true) && (
                                                    <img
                                                        src="/images/new_gif.gif"
                                                        alt="New"
                                                        className="w-8 h-8 object-contain flex-shrink-0"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-springer-gray">
                                                <span>
                                                    {new Date(notice.date).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow and PDF Download */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {notice.pdfUrl && (
                                                <a
                                                    href={notice.pdfUrl}
                                                    target="_blank"
                                                    download={notice.pdfFileName || 'notice.pdf'}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-all"
                                                    title="Download PDF"
                                                >
                                                    <img src="/images/pdf_icon.png" alt="PDF" className="w-4 h-4" />
                                                    PDF
                                                </a>
                                            )}
                                            <ArrowRight className="w-5 h-5 text-springer-gray group-hover:text-springer-red group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Notice Board Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <Link
                                href="/notices"
                                className="flex items-center justify-center gap-2 text-springer-red font-medium text-sm lg:text-base hover:text-red-700 transition-colors"
                            >
                                View All Notices
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
