'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Image from 'next/image';

export interface Achiever {
    _id: string;
    name: string;
    imageUrl: string;
    heading: string;
    description: string;
    order: number;
}

interface AchieversShowcaseProps {
    achievers: Achiever[];
    title?: string;
    subtitle?: string;
    description?: string;
    showBackground?: boolean;
}

export function AchieversShowcase({
    achievers,
    title = "Our Achievers",
    subtitle = "Stars of Springer",
    description = "Celebrating excellence in academics, sports, and co-curricular activities",
    showBackground = true
}: AchieversShowcaseProps) {
    if (achievers.length === 0) {
        return null;
    }

    const topAchiever = achievers[0];
    const otherAchievers = achievers.slice(1);

    return (
        <section className={`section-padding py-16 relative overflow-hidden ${showBackground ? '' : 'bg-springer-gray-light'}`}>
            {/* Background Image with Overlay - Only if showBackground is true */}
            {showBackground && (
                <div className="absolute inset-0 z-0 backdrop-filter backdrop-blur-sm">
                    <Image
                        src="/images/achiever_background.webp"
                        alt="Achiever Background"
                        fill
                        className="object-cover"
                        priority={false}
                    />
                    {/* Semi-transparent overlay for better readability */}
                    <div className="absolute inset-0 bg-springer-charcoal/70 backdrop-filter backdrop-blur-sm" />
                </div>
            )}

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className={`inline-flex items-center gap-2 px-4 py-1 ${showBackground ? 'bg-red-50 backdrop-blur-sm border border-red-200' : 'bg-springer-red/10'} text-springer-red rounded-full mb-4`}>
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-semibold">{subtitle}</span>
                        </div>
                        <h2 className={`text-2xl md:text-3xl font-semibold ${showBackground ? 'text-red-50' : 'text-springer-charcoal'} mb-4`}>
                            {title}
                        </h2>
                        <p className={`${showBackground ? 'text-white' : 'text-springer-gray'} max-w-2xl mx-auto`}>
                            {description}
                        </p>
                    </motion.div>
                </div>

                {/* Featured Top Achiever */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                    >
                        <div className="relative w-64 h-80 bg-gradient-to-br from-yellow-100 to-red-100 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl">
                            {/* Image */}
                            <Image
                                src={topAchiever.imageUrl}
                                alt={topAchiever.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

                            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                <h3 className="text-lg font-bold mb-2 text-center text-shadow">
                                    {topAchiever.name}
                                </h3>

                                <p className="text-sm font-semibold text-yellow-300 mb-1 text-center text-shadow">
                                    {topAchiever.heading}
                                </p>

                                <p className="text-xs text-gray-200 text-center text-shadow">
                                    {topAchiever.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Other Achievers Grid - 5 columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {otherAchievers.map((achiever, index) => (
                        <motion.div
                            key={achiever._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                                <Image
                                    src={achiever.imageUrl}
                                    alt={achiever.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                <div className="absolute inset-x-0 bottom-0 p-3 text-white text-center">
                                    <h3 className="text-sm font-bold mb-1 line-clamp-1 text-shadow">
                                        {achiever.name}
                                    </h3>

                                    <p className="text-sm font-semibold text-yellow-300 mb-0.5 line-clamp-2 text-shadow">
                                        {achiever.heading}
                                    </p>

                                    <p className="text-xs text-gray-200 line-clamp-1 text-shadow">
                                        {achiever.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Text shadow utility */}
            <style jsx>{`
                .text-shadow {
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                }
                .shadow-3xl {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </section>
    );
}
