'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, ChevronLeft, ChevronRight, Sparkles, Bell, ArrowRight } from 'lucide-react';
import { notices } from '@/data/siteData';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

// Hero carousel slides
const heroSlides = [
    {
        id: 1,
        image: '/images/hero_students_modern_classroom.jpg',
        badge: 'Admissions Open 2025-26',
        badgeColor: 'red',
        title: 'Shaping Minds. Building Futures.',
        subtitle: 'CBSE-based modern education with values & innovation',
    },
    {
        id: 2,
        image: '/images/hero_banner_02.jpg',
        badge: 'NEW',
        badgeColor: 'spark',
        title: 'Holistic Learning Environment',
        subtitle: 'Where every child discovers their unique potential',
    },
    {
        id: 3,
        image: '/images/hero_banner_03.jpg',
        badge: 'STEM Excellence',
        badgeColor: 'green',
        title: 'Innovation Through Education',
        subtitle: 'State-of-the-art labs for hands-on learning experiences',
    },
    {
        id: 4,
        image: '/images/hero_banner_04.jpg',
        badge: 'Sports Champions',
        badgeColor: 'blue',
        title: 'Champions Are Made Here',
        subtitle: 'World-class sports facilities for all-round development',
    },
];

// Notice items with spark badges
const noticeItems = [
    {
        id: 1,
        title: 'Admissions Open for 2025-26',
        badge: 'NEW',
        badgeType: 'spark',
        date: 'Jan 15, 2025',
        icon: Sparkles,
    },
    {
        id: 2,
        title: 'Annual Sports Day - Feb 15',
        badge: 'EVENT',
        badgeType: 'event',
        date: 'Jan 10, 2025',
        icon: Bell,
    },
    {
        id: 3,
        title: 'Parent-Teacher Meeting Schedule',
        badge: 'IMPORTANT',
        badgeType: 'important',
        date: 'Jan 8, 2025',
        icon: Bell,
    },
    {
        id: 4,
        title: 'Winter Break Extended Notice',
        badge: 'UPDATE',
        badgeType: 'update',
        date: 'Jan 5, 2025',
        icon: Bell,
    },
];

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const latestNotice = notices[0];

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }, []);

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    const currentSlideData = heroSlides[currentSlide];

    return (
        <>
            {/* Hero Carousel Section */}
            <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'tween', duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                                opacity: { duration: 0.5 },
                            }}
                            className="absolute inset-0"
                        >
                            <img
                                src={currentSlideData.image}
                                alt={currentSlideData.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Black overlay */}
                            <div className="absolute inset-0 bg-black/60" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Content */}
                <div className="relative z-10 section-padding w-full">
                    <div className="max-w-3xl">
                        {/* Title */}
                        <motion.h1
                            key={`title-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-6"
                        >
                            {currentSlideData.title.split('.').map((part, index, arr) => (
                                <span key={index}>
                                    {part.trim()}
                                    {index < arr.length - 1 && (
                                        <span className="text-springer-red">.</span>
                                    )}
                                    {index < arr.length - 1 && ' '}
                                </span>
                            ))}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            key={`subtitle-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-md md:text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
                        >
                            {currentSlideData.subtitle}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            key={`cta-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="/admissions"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-springer-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
                            >
                                <Calendar className="w-5 h-5" />
                                Admissions Open
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                            >
                                <BookOpen className="w-5 h-5" />
                                Book Campus Visit
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
                        >
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-white">30+</div>
                                <div className="text-white/60 text-sm">Years of Excellence</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-white">2500+</div>
                                <div className="text-white/60 text-sm">Happy Students</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-white">150+</div>
                                <div className="text-white/60 text-sm">Expert Faculty</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Carousel Navigation */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
                    {/* Prev Button */}
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'w-8 bg-springer-red'
                                    : 'w-2 bg-white/40 hover:bg-white/60'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Slide Counter */}
                <div className="absolute bottom-32 right-8 z-20 hidden md:block">
                    <div className="text-white/60 text-sm font-medium">
                        <span className="text-white text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                        <span className="mx-2">/</span>
                        <span>{String(heroSlides.length).padStart(2, '0')}</span>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </section>
        </>
    );
}
