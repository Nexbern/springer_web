'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Home, Bell, Sparkles } from 'lucide-react';
import { notices } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';

export default function NewsDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const currentNotice = notices.find((n) => n.id === Number(id));
    const currentIndex = notices.findIndex((n) => n.id === Number(id));

    if (!currentNotice) {
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

    const previousNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;
    const nextNotice = currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;

    const getBadgeColor = (badge: string) => {
        switch (badge) {
            case 'NEW':
                return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
            case 'EVENT':
                return 'bg-green-100 text-springer-green';
            case 'IMPORTANT':
                return 'bg-red-100 text-springer-red';
            case 'UPDATE':
                return 'bg-blue-100 text-blue-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Event':
                return Calendar;
            case 'Admission':
                return Bell;
            default:
                return Bell;
        }
    };

    const CategoryIcon = getCategoryIcon(currentNotice.category);

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
                    <span className="text-springer-charcoal">{currentNotice.title}</span>
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
                        {currentNotice.image && (
                            <div className="relative h-96 overflow-hidden">
                                <img
                                    src={currentNotice.image}
                                    alt={currentNotice.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Badge on Image */}
                                <div className="absolute top-6 left-6">
                                    <span
                                        className={`inline-flex items-center text-sm font-bold px-4 py-2 rounded-full ${getBadgeColor(
                                            currentNotice.badge
                                        )}`}
                                    >
                                        {currentNotice.badge === 'NEW' && <Sparkles className="w-4 h-4 mr-2" />}
                                        {currentNotice.badge}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-2 text-springer-gray">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">
                                        {new Date(currentNotice.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CategoryIcon className="w-4 h-4 text-springer-red" />
                                    <span className="text-sm font-medium text-springer-charcoal">
                                        {currentNotice.category}
                                    </span>
                                </div>
                                {currentNotice.priority === 'high' && (
                                    <span className="px-3 py-1 bg-red-100 text-springer-red text-xs font-bold rounded-full">
                                        HIGH PRIORITY
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-springer-charcoal mb-6">
                                {currentNotice.title}
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
                                    {currentNotice.fullContent.split('\n').map((paragraph, index) => {
                                        // Check if it's a heading (starts with **)
                                        if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                                            const text = paragraph.trim().slice(2, -2);
                                            return (
                                                <h3 key={index} className="text-xl font-bold text-springer-charcoal mt-6 mb-3">
                                                    {text}
                                                </h3>
                                            );
                                        }
                                        // Check if it's a list item (starts with -)
                                        if (paragraph.trim().startsWith('-')) {
                                            return (
                                                <li key={index} className="ml-6 mb-2">
                                                    {paragraph.trim().slice(1).trim()}
                                                </li>
                                            );
                                        }
                                        // Check if it's a numbered list item
                                        if (/^\d+\./.test(paragraph.trim())) {
                                            return (
                                                <li key={index} className="ml-6 mb-2 list-decimal">
                                                    {paragraph.trim().replace(/^\d+\.\s*/, '')}
                                                </li>
                                            );
                                        }
                                        // Regular paragraph
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

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    {previousNotice ? (
                        <Link
                            href={`/news/${previousNotice.id}`}
                            className="flex-1 flex items-center gap-3 p-4 bg-white rounded-xl shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-springer-red/30 group"
                        >
                            <div className="w-10 h-10 bg-springer-red/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-springer-red/20 transition-colors">
                                <ChevronLeft className="w-5 h-5 text-springer-red" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-springer-gray mb-1">Previous</div>
                                <div className="font-semibold text-springer-charcoal group-hover:text-springer-red transition-colors truncate">
                                    {previousNotice.title}
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex-1" />
                    )}

                    {nextNotice ? (
                        <Link
                            href={`/news/${nextNotice.id}`}
                            className="flex-1 flex items-center gap-3 p-4 bg-white rounded-xl shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-springer-red/30 group"
                        >
                            <div className="flex-1 min-w-0 text-right">
                                <div className="text-xs text-springer-gray mb-1">Next</div>
                                <div className="font-semibold text-springer-charcoal group-hover:text-springer-red transition-colors truncate">
                                    {nextNotice.title}
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-springer-red/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-springer-red/20 transition-colors">
                                <ChevronRight className="w-5 h-5 text-springer-red" />
                            </div>
                        </Link>
                    ) : (
                        <div className="flex-1" />
                    )}
                </div>

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
