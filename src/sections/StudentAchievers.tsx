'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
import Image from 'next/image';

interface StudentAchiever {
    _id: string;
    name: string;
    imageUrl: string;
    heading: string;
    description: string;
    order: number;
}

export function StudentAchievers() {
    const [achievers, setAchievers] = useState<StudentAchiever[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAchievers();
    }, []);

    const fetchAchievers = async () => {
        try {
            const response = await fetch('/api/achievers');
            const data = await response.json();
            setAchievers(data.achievers?.slice(0, 6) || []); // Show top 6
        } catch (error) {
            console.error('Failed to fetch achievers:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="section-padding bg-gradient-to-br from-yellow-50 via-white to-orange-50">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-springer-gray">Loading achievers...</p>
                </div>
            </section>
        );
    }

    if (achievers.length === 0) {
        return null; // Don't show section if no achievers
    }

    return (
        <section className="section-padding py-16">
            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 border border-red-200 text-springer-red rounded-full mb-4">
                            <Trophy className="w-4 h-4 text-springer-red" />
                            <span className="text-sm font-semibold text-springer-red">Stars of Springer</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-springer-charcoal mb-4">
                            Our Achievers
                        </h2>
                        <p className="text-springer-gray max-w-2xl mx-auto">
                            Celebrating the outstanding achievements of our talented students in academics, sports, and beyond
                        </p>
                    </motion.div>
                </div>

                {/* Achievers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievers.map((achiever, index) => (
                        <motion.div
                            key={achiever._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden transition-all duration-300">
                                {/* Image */}
                                <div className="relative h-64 bg-gray-100 overflow-hidden">
                                    <Image
                                        src={achiever.imageUrl}
                                        alt={achiever.name}
                                        fill
                                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Achievement Badge */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg">
                                        <Award className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-springer-charcoal mb-2">
                                        {achiever.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-springer-red mb-3">
                                        {achiever.heading}
                                    </p>
                                    <p className="text-sm text-springer-gray leading-relaxed">
                                        {achiever.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
