'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import ImageStack from '@/components/ui-custom/ImageStack';

export function AboutIntro() {
    return (
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white py-24">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 border border-red-200 text-springer-red rounded-full mb-4">
                        <Heart className="w-4 h-4 text-springer-red" />
                        <span className="lg:text-sm text-xs font-semibold text-springer-red">
                            About Springer Public School
                        </span>
                    </div>

                    <h2 className="text-xl lg:text-3xl font-semibold text-springer-charcoal mb-6 leading-tight max-w-4xl mx-auto">
                        Nurturing Young Minds for a{' '}
                        <span className="text-springer-red">Brighter Tomorrow</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* STACKED IMAGE SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: -80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-md mx-auto"
                    >
                        <ImageStack />
                    </motion.div>

                    {/* CONTENT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >

                        <p className="text-base lg:text-lg text-springer-gray leading-relaxed">
                            At Springer Public School, we believe in holistic education that goes beyond
                            textbooks. For over three decades, we've been shaping future leaders through
                            our unique blend of academic excellence, character building, and innovative
                            teaching methodologies.
                        </p>

                        <p className="text-base lg:text-lg text-springer-gray leading-relaxed">
                            Our curriculum affiliated to the Council for the Indian School Certificate Examinations (10+2),
                            combined with state-of-the-art facilities and a dedicated faculty, ensures that every child
                            receives personalized attention and opportunities to discover their true potential.
                        </p>

                        <p className="text-base lg:text-lg text-springer-gray leading-relaxed">
                            We foster an environment where curiosity thrives, creativity flourishes, and
                            values are instilled. Our commitment to excellence has made us a trusted name
                            in education for generations of families.
                        </p>

                        <div className="pt-4">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-springer-red text-white lg:font-semibold font-medium text-base lg:text-lg rounded-lg hover:bg-red-700 transition-all duration-300"
                            >
                                Discover Our Story
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
