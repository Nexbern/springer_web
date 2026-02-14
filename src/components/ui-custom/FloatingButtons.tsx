'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingButtons() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const openWhatsApp = () => {
        // Replace with your actual WhatsApp number
        const phoneNumber = '917897012434'; // Format: country code + number (no + or spaces)
        const message = encodeURIComponent('Hello! I would like to inquire about admissions.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <>
            {/* WhatsApp Button - Always visible with bounce animation */}
            <motion.button
                onClick={openWhatsApp}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contact us on WhatsApp"
            >
                <Image
                    src="/images/springer_asset/whatsapp.png"
                    alt="WhatsApp"
                    fill
                    className="object-contain"
                />
            </motion.button>

            {/* Scroll to Top Button - Shows after scrolling */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={scrollToTop}
                        className="fixed bottom-28 right-6 z-50 w-12 h-12 rounded-full bg-springer-charcoal text-white shadow-lg hover:bg-springer-red transition-colors duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Shadow utility for WhatsApp button */}
            <style jsx>{`
                .shadow-3xl {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </>
    );
}
