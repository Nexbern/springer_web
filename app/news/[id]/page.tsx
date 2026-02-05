'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Home, Bell } from 'lucide-react';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';

interface Notice {
    _id: string;
    title: string;
    content: string;
    date: string;
    image?: string;
}

export default function NewsDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [notice, setNotice] = useState<Notice | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchNotice();
        }
    }, [id]);

    const fetchNotice = async () => {
        try {
            const response = await fetch(`/api/notices/${id}`);
            if (!response.ok) {
                throw new Error('Notice not found');
            }
            const data = await response.json();
            setNotice(data.notice);
        } catch (error) {
            console.error('Failed to fetch notice:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <p className="text-springer-gray">Loading notice...</p>
                </div>
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-springer-charcoal mb-4">Notice Not Found</h1>
                    <Link href="/notices" className="text-springer-red hover:underline">
                        Back to Notices
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-springer-white pt-36 pb-20">
            <div className="section-padding max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-springer-gray mb-6">
                    <Link href="/" className="hover:text-springer-red transition-colors">
                        <Home className="w-4 h-4" />
                    </Link>
                    <span>/</span>
                    <Link href="/notices" className="hover:text-springer-red transition-colors">
                        Notices
                    </Link>
                    <span>/</span>
                    <span className="text-springer-charcoal">{notice.title}</span>
                </div>

                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-springer-red hover:text-red-700 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                {/* Article */}
                <AnimatedCard>
                    <article className="bg-white rounded-2xl shadow-card overflow-hidden">
                        {/* Featured Image */}
                        {notice.image && (
                            <div className="relative h-96 overflow-hidden">
                                <img
                                    src={notice.image}
                                    alt={notice.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-2 text-springer-gray">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">
                                        {new Date(notice.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-springer-charcoal mb-6">
                                {notice.title}
                            </h1>

                            {/* Full Content */}
                            <div className="prose prose-lg max-w-none">
                                <div
                                    className="text-springer-gray leading-relaxed whitespace-pre-wrap"
                                    style={{
                                        fontSize: '1.125rem',
                                        lineHeight: '1.75rem'
                                    }}
                                >
                                    {notice.content.split('\n').map((paragraph, index) => {
                                        if (paragraph.trim()) {
                                            return (
                                                <p key={index} className="mb-4">
                                                    {paragraph}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </article>
                </AnimatedCard>

                {/* Back to All Notices */}
                <div className="text-center mt-8">
                    <Link
                        href="/notices"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-springer-charcoal text-white font-semibold rounded-xl hover:bg-black transition-all duration-300"
                    >
                        <Bell className="w-4 h-4" />
                        View All Notices
                    </Link>
                </div>
            </div>
        </main>
    );
}
