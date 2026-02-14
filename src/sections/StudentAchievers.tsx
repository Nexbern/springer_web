'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Image from 'next/image';

interface Achiever {
    _id: string;
    name: string;
    imageUrl?: string;
    heading?: string;
    description?: string;
    order?: number;
}

export function StudentAchievers() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAchievers = async () => {
            try {
                const response = await fetch('/api/achievers');

                if (!response.ok) {
                    throw new Error('Failed to fetch achievers');
                }

                const data = await response.json();

                // Safety: ensure array
                setAchievers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Achiever fetch error:', err);
                setError('Unable to load achievers right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchAchievers();
    }, []);

    /* ---------- STATES ---------- */

    if (loading) {
        return (
            <section className="py-16 text-center text-gray-500">
                Loading achievers...
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 text-center text-red-400">
                {error}
            </section>
        );
    }

    if (!achievers.length) return null;

    const topAchiever = achievers[0];
    const otherAchievers = achievers.slice(1);

    /* ---------- FALLBACK IMAGE ---------- */
    const fallbackImg = '/images/placeholder-achiever.webp';

    return (
        <section className="section-padding py-16 relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/achiever_background.webp"
                    alt="Background"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-springer-charcoal/70 backdrop-blur-sm" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 border border-red-200 text-springer-red rounded-full mb-4">
                            <Trophy className="w-4 h-4" />
                            <span className="text-xs font-semibold lg:text-sm">
                                Stars of Springer
                            </span>
                        </div>

                        <h2 className="text-xl lg:text-3xl font-semibold text-red-50 mb-4">
                            Our Achievers
                        </h2>

                        <p className="text-white max-w-2xl mx-auto">
                            Celebrating excellence in academics, sports, and co-curricular activities
                        </p>
                    </motion.div>
                </div>

                {/* ---------- TOP ACHIEVER ---------- */}
                {topAchiever && (
                    <div className="flex justify-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl">

                                <Image
                                    src={topAchiever.imageUrl || fallbackImg}
                                    alt={topAchiever.name || 'Top achiever'}
                                    fill
                                    sizes="256px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                <div className="absolute bottom-0 p-5 text-white w-full text-center">
                                    <h3 className="text-lg font-bold mb-1 text-shadow">
                                        {topAchiever.name}
                                    </h3>

                                    {topAchiever.heading && (
                                        <p className="text-sm font-semibold text-yellow-300">
                                            {topAchiever.heading}
                                        </p>
                                    )}

                                    {topAchiever.description && (
                                        <p className="text-xs text-gray-200">
                                            {topAchiever.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* ---------- OTHER ACHIEVERS ---------- */}
                {otherAchievers.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {otherAchievers.map((achiever, index) => (
                            <motion.div
                                key={achiever._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">

                                    <Image
                                        src={achiever.imageUrl || fallbackImg}
                                        alt={achiever.name || 'Achiever'}
                                        fill
                                        sizes="(max-width:768px) 50vw, 20vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                    <div className="absolute bottom-0 p-3 text-center text-white w-full">
                                        <h3 className="text-sm font-bold line-clamp-1 text-shadow">
                                            {achiever.name}
                                        </h3>

                                        {achiever.heading && (
                                            <p className="text-xs font-semibold text-yellow-300 line-clamp-2">
                                                {achiever.heading}
                                            </p>
                                        )}

                                        {achiever.description && (
                                            <p className="text-xs text-gray-200 line-clamp-1">
                                                {achiever.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>

            {/* Utility */}
            <style jsx>{`
                .text-shadow {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                }
            `}</style>
        </section>
    );
}
