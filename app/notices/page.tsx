'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, Search } from 'lucide-react';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { Input } from '@/components/ui/input';

interface Notice {
    _id: string;
    title: string;
    content: string;
    date: string;
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchNotices();
    }, []);

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

    const filteredNotices = notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="pt-24">
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/smart_classroom.jpg"
                        alt="Notices"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1 bg-springer-red text-white text-xs font-medium rounded-full mb-4">
                            Notices & Updates
                        </span>
                        <h1 className="text-xl lg:text-3xl font-semibold text-white mb-6">
                            Stay <span className="text-springer-red">Informed</span>
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            Get the latest updates, announcements, and important information about
                            school activities and events.
                        </p>
                    </div>
                </div>
            </section>

            {/* Notices Section */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
                        <h2 className="text-2xl font-bold text-springer-charcoal">
                            All Notices ({filteredNotices.length})
                        </h2>

                        {/* Search */}
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search notices..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-16">
                            <p className="text-springer-gray">Loading notices...</p>
                        </div>
                    ) : filteredNotices.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-springer-charcoal mb-2">
                                No notices found
                            </h3>
                            <p className="text-springer-gray">
                                {searchQuery ? 'Try adjusting your search criteria' : 'No notices available at the moment'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredNotices.map((notice, index) => (
                                <AnimatedCard key={notice._id} delay={index * 100}>
                                    <Link href={`/news/${notice._id}`}>
                                        <div className="group card-modern p-6 h-full hover:shadow-xl transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <span className="flex items-center gap-1 text-sm text-springer-gray">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(notice.date).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-springer-charcoal mb-2 group-hover:text-springer-red transition-colors">
                                                {notice.title}
                                            </h3>

                                            <p className="text-springer-gray text-sm leading-relaxed mb-4 line-clamp-3">
                                                {notice.content}
                                            </p>

                                            <div className="inline-flex items-center gap-1 text-springer-red text-sm font-medium group-hover:underline">
                                                Read More
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </AnimatedCard>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
