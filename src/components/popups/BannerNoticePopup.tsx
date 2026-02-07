'use client';

import { useEffect, useState } from 'react';
import { X, Calendar, Download, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <AnimatePresence>
            {/* Banner Popup */}
            {showBanner && banner && banner.image && (
                <DialogPrimitive.Root open={showBanner} onOpenChange={handleCloseBanner}>
                    <DialogPrimitive.Portal>
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            />
                        </DialogPrimitive.Overlay>
                        <DialogPrimitive.Content asChild>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl outline-none"
                            >
                                <div className="relative group">
                                    <img
                                        src={banner.image}
                                        alt="Banner"
                                        className="w-full h-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                                    />
                                    <DialogPrimitive.Close asChild>
                                        <button
                                            className="absolute -top-3 -right-3 p-2 bg-white text-springer-charcoal rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 z-10 border border-gray-100"
                                            aria-label="Close banner"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </DialogPrimitive.Close>
                                </div>
                            </motion.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                </DialogPrimitive.Root>
            )}

            {/* Notice Popup */}
            {showNotice && notice && (
                <DialogPrimitive.Root open={showNotice} onOpenChange={handleCloseNotice}>
                    <DialogPrimitive.Portal>
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            />
                        </DialogPrimitive.Overlay>
                        <DialogPrimitive.Content asChild>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl outline-none"
                            >
                                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20">
                                    {/* Header with Close */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <DialogPrimitive.Close asChild>
                                            <button
                                                className="p-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-full transition-all duration-200 group"
                                                aria-label="Close notice"
                                            >
                                                <X className="w-5 h-5 text-gray-500 group-hover:text-springer-charcoal" />
                                            </button>
                                        </DialogPrimitive.Close>
                                    </div>

                                    <div className="p-8 md:p-10">
                                        <div className="flex flex-col gap-1 mb-6">
                                            <div className="flex items-center gap-3">
                                                <DialogPrimitive.Title className="text-2xl md:text-3xl font-extrabold text-springer-charcoal tracking-tight leading-tight">
                                                    {notice.title}
                                                </DialogPrimitive.Title>
                                                <img
                                                    src="/images/new_gif.gif"
                                                    alt="New"
                                                    className="w-10 h-10 object-contain flex-shrink-0 animate-pulse"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 text-springer-gray font-medium mt-1">
                                                <Calendar className="w-4 h-4 text-springer-red/70" />
                                                <span className="text-sm">
                                                    {new Date(notice.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                                                {notice.content}
                                            </p>
                                        </div>

                                        {/* Action Area */}
                                        {notice.pdfUrl && (
                                            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                                                        Attachment
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate max-w-[200px] md:max-w-xs">
                                                        {notice.pdfFileName || 'Official Notice Document'}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <a
                                                        href={notice.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                                                        title="View Document"
                                                    >
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                    <a
                                                        href={notice.pdfUrl}
                                                        target="_blank"
                                                        download={notice.pdfFileName || 'notice.pdf'}
                                                        className="flex items-center gap-2 px-6 py-3 bg-springer-red text-white rounded-xl font-bold shadow-lg shadow-springer-red/25 hover:bg-red-700 hover:shadow-springer-red/40 transition-all duration-300"
                                                    >
                                                        <Download className="w-5 h-5" />
                                                        <span>Download PDF</span>
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom visual accent */}
                                    <div className="h-2 w-full bg-gradient-to-r from-springer-red via-red-400 to-springer-red/50" />
                                </div>
                            </motion.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                </DialogPrimitive.Root>
            )}
        </AnimatePresence>
    );
}
