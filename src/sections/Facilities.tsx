'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { facilities } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';

export function Facilities() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-20 lg:py-28 bg-springer-gray-light">
            <div className="section-padding">
                <SectionHeader
                    subtitle="Our Facilities"
                    title="World-Class Infrastructure"
                    description="State-of-the-art facilities designed to provide the best learning environment for our students."
                />

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-springer-red hover:text-white transition-all duration-300 hidden md:flex"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-springer-red hover:text-white transition-all duration-300 hidden md:flex"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {facilities.map((facility, index) => (
                            <AnimatedCard
                                key={facility.id}
                                delay={index * 100}
                                className="flex-shrink-0 w-80 snap-start"
                            >
                                <div className="card-modern overflow-hidden h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={facility.image}
                                            alt={facility.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                                            {facility.name}
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-springer-gray">{facility.description}</p>
                                    </div>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
