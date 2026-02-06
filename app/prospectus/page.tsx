'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp, Download } from 'lucide-react';

export default function ProspectusPage() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 16;
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Generate array of page numbers with proper formatting
    const getPageNumber = (num: number) => {
        if (num === 1) return '01';
        if (num === 10) return '010';
        if (num === 11) return '011';
        if (num === 12) return '012';
        if (num === 13) return '013';
        if (num === 14) return '014';
        if (num === 15) return '015';
        if (num === 16) return '016';
        return `0${num}`;
    };

    // Track which page is in view
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);

            // Find which page is currently in view
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = 0; i < pageRefs.current.length; i++) {
                const element = pageRefs.current[i];
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    const absoluteTop = top + window.scrollY;
                    const absoluteBottom = bottom + window.scrollY;

                    if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
                        setCurrentPage(i + 1);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToPage = (pageNum: number) => {
        const element = pageRefs.current[pageNum - 1];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <main className="min-h-screen bg-springer-gray/50 pt-24 relative">
            {/* Continuous Scrollable Pages */}
            <div className="max-w-7xl mx-auto">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <div
                        key={page}
                        ref={(el) => { pageRefs.current[page - 1] = el; }}
                        className="bg-white mb-4"
                    >
                        <img
                            src={`/images/prospectus/page-${getPageNumber(page)}.webp`}
                            alt={`Prospectus Page ${page}`}
                            className="w-full h-auto"
                        />
                    </div>
                ))}
            </div>

            {/* Bottom Thumbnail Navigation */}
            <div className="bg-white border-t border-gray-200 py-4 sticky bottom-0 left-0 right-0 z-10 mt-12 flex flex-col items-center justify-center gap-3">
                 <button
                onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/pdf/prospectus.pdf';
                    link.download = 'Prospectus.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-springer-red text-springer-white font-semibold rounded-lg hover:bg-springer-red/80 hover:text-springer-white transition-all duration-300"
            >
                <Download className="w-4 h-4" />
                Download PDF
            </button>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 overflow-x-auto p-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => scrollToPage(page)}
                                className={`flex-shrink-0 w-16 h-20 border-2 rounded overflow-hidden transition-all ${currentPage === page
                                    ? 'border-springer-red ring-2 ring-springer-red/30 scale-110'
                                    : 'border-gray-300 hover:border-springer-red/50 opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={`/images/prospectus/page-${getPageNumber(page)}.webp`}
                                    alt={`Page ${page}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
               
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-28 right-6 p-3 bg-springer-red text-white rounded-full shadow-lg hover:bg-red-700 transition-all z-20"
                    title="Scroll to top"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}
        </main>
    );
}
