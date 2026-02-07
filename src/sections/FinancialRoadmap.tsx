'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Sparkles, ArrowRight, Lightbulb, Wallet, Calculator, GraduationCap } from 'lucide-react';

const roadmapSteps = [
    {
        id: 1,
        image: '/images/springer_asset/SS_types_of_people_01.webp',
        icon: Calculator,
        color: 'bg-blue-500',
    },
    {
        id: 2,
        image: '/images/springer_asset/SS_types_of_people_02.webp',
        icon: Wallet,
        color: 'bg-springer-red',
    },
    {
        id: 3,
        image: '/images/springer_asset/SS_types_of_people_03.webp',
        icon: Lightbulb,
        color: 'bg-yellow-500',
    },
    {
        id: 4,
        image: '/images/springer_asset/SS_types_of_people_04.webp',
        icon: GraduationCap,
        color: 'bg-green-500',
    }
];

export function FinancialRoadmap() {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    return (
        <section className="py-20 bg-white overflow-hidden" ref={ref}>
            <div className="section-padding">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-5 py-1 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 text-springer-red rounded-full mb-6 shadow-sm"
                        >
                            <span className="text-xs font-semibold">Innovation in Education</span>
                        </motion.div>
                        <h2 className="text-2xl lg:text-3xl font-semibold text-springer-charcoal mb-8 leading-tight">
                            Building <span className="text-springer-red">Financially Wise</span> Leaders
                        </h2>
                        <p className="text-springer-gray text-sm lg:text-lg max-w-3xl mx-auto leading-relaxed">
                            Through our partnership with <span className="font-bold text-springer-charcoal">Super Saarthi</span>,
                            we empower students to master money management from an early age.
                        </p>
                    </div>

                    {/* Vertical Roadmap Path */}
                    <div className="relative space-y-24">
                        {/* Vertical Connecting Line */}
                        <div className="absolute top-0 bottom-0 left-[23px] md:left-1/2 w-1 bg-gradient-to-b from-blue-400 via-springer-red to-green-400 rounded-full opacity-20 -translate-x-1/2 hidden md:block" />

                        {roadmapSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative flex flex-col items-center"
                            >
                                {/* Step Indicator Badge */}
                                <div className="z-20 mb-10 flex items-center justify-center">
                                    <div className={`w-14 h-14 ${step.color} text-white rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500 ring-4 ring-white`}>
                                        <step.icon className="w-7 h-7 -rotate-12" />
                                    </div>
                                    <div className="absolute -top-6 text-springer-red font-black text-2xl opacity-10 italic">
                                        STEP 0{step.id}
                                    </div>
                                </div>

                                {/* Large Image Card */}
                                <div className="w-full group">
                                    <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2">
                                        {/* Aspect ratio container - auto height but constrained max-width */}
                                        <div className="relative w-full max-w-4xl mx-auto p-2 sm:p-4 bg-gray-50/50">
                                            <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[16/10] lg:aspect-[3/2] rounded-xl overflow-hidden shadow-inner bg-white">
                                                <Image
                                                    src={step.image}
                                                    alt={`Financial Literacy Content ${step.id}`}
                                                    fill
                                                    className="object-contain"
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </div>

                                        {/* Floating Badge for Step Context */}
                                        <div className="absolute top-8 right-8 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${step.color} animate-pulse`} />
                                            <span className="text-[10px] font-bold text-springer-charcoal uppercase tracking-tighter">Part 0{step.id}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Connecting Arrow (Vertical) */}
                                {index !== roadmapSteps.length - 1 && (
                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="mt-12 text-springer-red/30"
                                    >
                                        <ArrowRight className="w-8 h-8 rotate-90" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Final Impact Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-32 text-center"
                    >
                        <div className="relative py-16 px-8 rounded-[3rem] bg-gradient-to-br from-springer-charcoal to-black text-white overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-springer-red/10 rounded-full blur-[100px]" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <GraduationCap className="w-16 h-16 text-springer-red mx-auto mb-8 opacity-50" />
                                <h3 className="text-xl lg:text-2xl font-semibold mb-6 italic">"Empowering the next generation with the language of money."</h3>
                                <p className="text-white/60 text-sm lg:text-lg mb-10">
                                    Admissions for the 2025-26 session are now open. Secure your child's spot in a school that looks beyond the textbooks.
                                </p>
                                <a
                                    href="/admissions"
                                    className="inline-flex items-center gap-3 px-5 py-3 lg:px-10 lg:py-5 bg-springer-red text-white font-semibold rounded-2xl hover:bg-springer-darkred transition-all group"
                                >
                                    JOIN SPRINGER TODAY
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
