'use client';

import { useEffect, useState } from 'react';
import { X, Calendar, Download, ExternalLink } from 'lucide-react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface Banner {
    _id: string;
    title: string;
    message: string;
    image?: string;
    active: boolean;
}

interface Notice {
    _id: string;
    title: string;
    content: string;
    date: string;
    pdfUrl?: string;
    pdfFileName?: string;
}

export default function BannerNoticePopup() {
    const [banner, setBanner] = useState<Banner | null>(null);
    const [notice, setNotice] = useState<Notice | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [showNotice, setShowNotice] = useState(false);

    useEffect(() => {
        fetchPopupData();
    }, []);

    const fetchPopupData = async () => {
        try {
            const bannerShown = sessionStorage.getItem('bannerShown');
            const noticeShown = sessionStorage.getItem('noticeShown');

            let hasBanner = false;

            if (!bannerShown) {
                const bannerRes = await fetch('/api/admin/banners');
                const bannerData = await bannerRes.json();
                const activeBanner = bannerData.banners?.find((b: Banner) => b.active);

                if (activeBanner && activeBanner.image) {
                    setBanner(activeBanner);
                    setShowBanner(true);
                    hasBanner = true;
                }
            }

            if (!noticeShown) {
                const noticeRes = await fetch('/api/notices');
                const noticeData = await noticeRes.json();
                const latestNotice = noticeData.notices?.[0];

                if (latestNotice) {
                    setNotice(latestNotice);
                    if (!hasBanner && !bannerShown) {
                        setShowNotice(true);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch popup data:', error);
        }
    };

    const handleCloseBanner = () => {
        setShowBanner(false);
        sessionStorage.setItem('bannerShown', 'true');

        if (notice && !sessionStorage.getItem('noticeShown')) {
            setTimeout(() => setShowNotice(true), 400);
        }
    };

    const handleCloseNotice = () => {
        setShowNotice(false);
        sessionStorage.setItem('noticeShown', 'true');
    };

    return (
        <>
            {/* Banner Popup */}
            {showBanner && banner && banner.image && (
                <DialogPrimitive.Root open={showBanner} onOpenChange={handleCloseBanner}>
                    <DialogPrimitive.Portal>
                        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" />
                        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl outline-none">
                            <div className="relative">
                                <img
                                    src={banner.image}
                                    alt="Banner"
                                    className="w-full h-auto rounded-xl shadow-2xl border border-white/20"
                                />
                                <DialogPrimitive.Close asChild>
                                    <button
                                        className="absolute -top-3 -right-3 p-2 bg-white text-springer-charcoal rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
                                        aria-label="Close banner"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </DialogPrimitive.Close>
                            </div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                </DialogPrimitive.Root>
            )}

            {/* Notice Popup */}
            {showNotice && notice && (
                <DialogPrimitive.Root open={showNotice} onOpenChange={handleCloseNotice}>
                    <DialogPrimitive.Portal>
                        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" />
                        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl outline-none">
                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <DialogPrimitive.Title className="text-xl font-bold text-springer-charcoal">
                                            {notice.title}
                                        </DialogPrimitive.Title>
                                        <img
                                            src="/images/new_gif.gif"
                                            alt="New"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    <DialogPrimitive.Close asChild>
                                        <button
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                            aria-label="Close notice"
                                        >
                                            <X className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </DialogPrimitive.Close>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex items-center gap-2 text-springer-gray mb-6">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">
                                            {new Date(notice.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {notice.content}
                                    </p>

                                    {/* Action Area */}
                                    {notice.pdfUrl && (
                                        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-2">
                                                <ExternalLink className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500 truncate max-w-[200px]">
                                                    {notice.pdfFileName || 'Attached Document'}
                                                </span>
                                            </div>
                                            <a
                                                href={notice.pdfUrl}
                                                target="_blank"
                                                download={notice.pdfFileName || 'notice.pdf'}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-springer-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm"
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>Download PDF</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                </DialogPrimitive.Root>
            )}
        </>
    );
}
