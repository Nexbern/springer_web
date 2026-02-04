'use client';

import { motion } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AchievementsHome() {
    return (
        <section className="section-padding bg-gradient-to-br from-springer-red/5 via-white to-springer-green/5">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
                            <Trophy className="w-4 h-4 text-white" />
                            <span className="text-sm font-semibold text-white">Excellence</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-springer-charcoal mb-4">
                            Our Achievements
                        </h2>
                        <p className="text-springer-gray max-w-2xl mx-auto">
                            Celebrating excellence in academics, sports, and co-curricular activities
                        </p>
                    </motion.div>
                </div>

                {/* Image and Description Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-card border border-gray-200">
                            <img
                                src="/images/hero_students_modern_classroom.jpg"
                                alt="Student Achievements"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Floating Achievement Badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-5 shadow-md border border-gray-200">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-springer-red">500+</div>
                                        <div className="text-xs text-springer-gray">Awards</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-springer-green">98%</div>
                                        <div className="text-xs text-springer-gray">Results</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-springer-charcoal">50+</div>
                                        <div className="text-xs text-springer-gray">Medals</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-springer-red/10 rounded-full blur-2xl" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl md:text-2xl font-semibold text-springer-charcoal">
                            A Legacy of <span className="text-springer-red">Excellence</span>
                        </h3>

                        <p className="text-lg text-springer-gray leading-relaxed">
                            Our students consistently excel in academics, sports, and co-curricular activities,
                            bringing laurels to the school at district, state, and national levels. With a
                            remarkable 98% board result success rate, we take pride in nurturing all-round
                            development.
                        </p>

                        <p className="text-lg text-springer-gray leading-relaxed">
                            From National Science Olympiads to State-level sports championships, our students
                            have won over 500 awards and 50+ national medals. We believe in fostering talent
                            and providing platforms for every child to shine.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="/achievements"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-springer-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
                            >
                                View All Achievements
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
