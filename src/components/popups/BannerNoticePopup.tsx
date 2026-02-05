'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

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
            // Check if popups were already shown in this session
            const bannerShown = sessionStorage.getItem('bannerShown');
            const noticeShown = sessionStorage.getItem('noticeShown');

            let hasBanner = false;

            // Fetch active banner
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

            // Fetch latest notice
            if (!noticeShown) {
                const noticeRes = await fetch('/api/notices');
                const noticeData = await noticeRes.json();
                const latestNotice = noticeData.notices?.[0];

                if (latestNotice) {
                    setNotice(latestNotice);
                    // Only show notice immediately if there's no banner to show
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

        // Show notice after banner is closed
        if (notice && !sessionStorage.getItem('noticeShown')) {
            setTimeout(() => setShowNotice(true), 300);
        }
    };

    const handleCloseNotice = () => {
        setShowNotice(false);
        sessionStorage.setItem('noticeShown', 'true');
    };

    return (
        <>
            {/* Banner Popup - Only Image with Close Button */}
            {showBanner && banner && banner.image && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="relative max-w-4xl w-full animate-slideUp">
                        <img
                            src={banner.image}
                            alt="Banner"
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                        <button
                            onClick={handleCloseBanner}
                            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition"
                        >
                            <X className="w-6 h-6 text-springer-charcoal" />
                        </button>
                    </div>
                </div>
            )}

            {/* Notice Popup - Title, Date, and NEW GIF */}
            {showNotice && notice && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl animate-slideUp relative">
                        <button
                            onClick={handleCloseNotice}
                            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition z-10"
                        >
                            <X className="w-5 h-5 text-springer-charcoal" />
                        </button>

                        <div className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h2 className="text-xl font-bold text-springer-charcoal">
                                            {notice.title}
                                        </h2>
                                        <img
                                            src="/images/new_gif.gif"
                                            alt="New"
                                            className="w-12 h-12 object-contain flex-shrink-0"
                                        />
                                    </div>
                                    <p className="text-springer-gray text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(notice.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <p className="text-springer-charcoal leading-relaxed whitespace-pre-wrap">
                                {notice.content}
                            </p>

                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </>
    );
}
