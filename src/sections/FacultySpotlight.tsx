'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';

interface Faculty {
    _id: string;
    name: string;
    degree: string;
    experience: number;
    subject: string;
    description: string;
    image: string;
}

export function FacultySpotlight() {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFaculties();
    }, []);

    const fetchFaculties = async () => {
        try {
            const response = await fetch('/api/faculties');
            const data = await response.json();
            setFaculties(data.faculties || []);
        } catch (error) {
            console.error('Failed to fetch faculties:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding text-center">
                    <p className="text-springer-gray">Loading faculty...</p>
                </div>
            </section>
        );
    }

    if (faculties.length === 0) {
        return null; // Don't show section if no faculties
    }

    const currentFaculty = faculties[currentIndex];

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % faculties.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + faculties.length) % faculties.length);
    };

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="section-padding">
                <SectionHeader
                    subtitle="Our Faculty"
                    title="Meet Our Expert Educators"
                    description="Dedicated professionals committed to nurturing every student's potential."
                />

                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Quote Decoration */}
                        <Quote className="absolute -top-6 -left-6 w-24 h-24 text-springer-red/5 hidden md:block" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                            >
                                {/* Faculty Image */}
                                <div className="relative">
                                    <div className="aspect-square rounded-3xl overflow-hidden shadow-card">
                                        <img
                                            src={currentFaculty.image}
                                            alt={currentFaculty.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Badge */}
                                    <div className="absolute -bottom-4 -right-4 bg-springer-red text-white px-6 py-3 rounded-xl shadow-lg">
                                        <div className="text-sm font-medium">{currentFaculty.experience} years</div>
                                        <div className="text-xs opacity-90">Experience</div>
                                    </div>
                                </div>

                                {/* Faculty Details */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-3xl font-bold text-springer-charcoal mb-2">
                                            {currentFaculty.name}
                                        </h3>
                                        <p className="text-springer-red font-semibold text-lg">
                                            {currentFaculty.subject}
                                        </p>
                                        <p className="text-springer-gray text-sm">
                                            {currentFaculty.degree}
                                        </p>
                                    </div>

                                    <p className="text-springer-gray leading-relaxed">
                                        {currentFaculty.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex gap-6 pt-4 border-t border-gray-200">
                                        <div>
                                            <div className="text-2xl font-bold text-springer-charcoal">
                                                {currentFaculty.experience} years
                                            </div>
                                            <div className="text-xs text-springer-gray">Teaching Experience</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-springer-green">
                                                {currentFaculty.subject}
                                            </div>
                                            <div className="text-xs text-springer-gray">Specialization</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-4 mt-12">
                            <button
                                onClick={prev}
                                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-springer-red hover:border-springer-red hover:text-white transition-all duration-300"
                                aria-label="Previous faculty member"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {faculties.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? 'bg-springer-red w-8'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to faculty member ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-springer-red hover:border-springer-red hover:text-white transition-all duration-300"
                                aria-label="Next faculty member"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
