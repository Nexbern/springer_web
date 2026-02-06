'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function AboutIntro() {
    return (
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white py-24">
            <div className="max-w-7xl mx-auto">
                {/* Centered Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 border border-red-200 text-springer-red rounded-full mb-4">
                        <Heart className="w-4 h-4 text-springer-red" />
                        <span className="text-sm font-semibold text-springer-red">About Springer Public School</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-semibold text-springer-charcoal mb-6 leading-tight max-w-4xl mx-auto">
                        Nurturing Young Minds for a{' '}
                        <span className="text-springer-red">Brighter Tomorrow</span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-card border border-gray-200">
                            <img
                                src="/images/hero_students_modern_classroom.jpg"
                                alt="Springer Public School"
                                className="w-full h-[600px] object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-springer-red/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-springer-green/10 rounded-full blur-3xl" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Description */}
                        <p className="text-xl text-springer-gray leading-relaxed">
                            At Springer Public School, we believe in holistic education that goes beyond
                            textbooks. For over three decades, we've been shaping future leaders through
                            our unique blend of academic excellence, character building, and innovative
                            teaching methodologies.
                        </p>

                        <p className="text-xl text-springer-gray leading-relaxed">
                            Our CBSE-affiliated curriculum, combined with state-of-the-art facilities and
                            a dedicated faculty, ensures that every child receives personalized attention
                            and opportunities to discover their true potential.
                        </p>

                        <p className="text-xl text-springer-gray leading-relaxed">
                            We foster an environment where curiosity thrives, creativity flourishes, and
                            values are instilled. Our commitment to excellence has made us a trusted name
                            in education for generations of families.
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-springer-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 text-lg"
                            >
                                Discover Our Story
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
