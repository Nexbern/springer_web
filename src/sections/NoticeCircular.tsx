'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, ArrowRight } from 'lucide-react';
import { notices } from '@/data/siteData';

export function NoticeCircular() {
    return (
        <section className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-springer-red/10 rounded-full mb-4">
                            <Bell className="w-4 h-4 text-springer-red" />
                            <span className="text-sm font-semibold text-springer-red">Stay Updated</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-springer-charcoal mb-4">
                            Notice Board
                        </h2>
                        <p className="text-springer-gray max-w-2xl mx-auto">
                            Important announcements and updates from the school
                        </p>
                    </motion.div>
                </div>

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
                            <span className="text-white font-bold text-lg">Latest Notices</span>
                        </div>

                        {/* Scrolling Notice List with CSS Animation */}
                        <div className="h-[400px] overflow-hidden bg-white relative group/scroll">
                            <div className="animate-scroll-up group-hover/scroll:pause-animation p-6 space-y-4">
                                {/* Duplicate for seamless loop */}
                                {[...notices, ...notices].map((notice, index) => (
                                    <Link
                                        key={`${notice.id}-${index}`}
                                        href={`/news/${notice.id}`}
                                        className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-springer-red/40 hover:shadow-md transition-all duration-300 group"
                                    >
                                        {/* Notice Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-semibold text-springer-charcoal group-hover:text-springer-red transition-colors line-clamp-1">
                                                    {notice.title}
                                                </h3>
                                                {/* New GIF Icon - Right side of title */}
                                                <img
                                                    src="/images/new_gif.gif"
                                                    alt="New"
                                                    className="w-8 h-8 object-contain flex-shrink-0"
                                                />
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

                                        {/* Arrow */}
                                        <ArrowRight className="w-5 h-5 text-springer-gray group-hover:text-springer-red group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Notice Board Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <Link
                                href="/notices"
                                className="flex items-center justify-center gap-2 text-springer-red font-semibold hover:text-red-700 transition-colors"
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
