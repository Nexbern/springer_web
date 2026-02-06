'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface Achiever {
    _id: string;
    name: string;
    imageUrl: string;
    heading: string;
    description: string;
    order: number;
}

// Toggle this to switch between demo and backend data
const USE_DEMO_DATA = true;

// Demo achievers data - More realistic and concise
const DEMO_ACHIEVERS: Achiever[] = [
    {
        _id: 'demo1',
        name: 'Aarav Sharma',
        imageUrl: '/images/parent_01.jpg',
        heading: 'Class 10th Board Topper',
        description: 'CBSE Board - 98.6%',
        order: 1
    },
    {
        _id: 'demo2',
        name: 'Priya Patel',
        imageUrl: '/images/parent_02.jpg',
        heading: 'State Chess Championship',
        description: '1st Position - Under 16',
        order: 2
    },
    {
        _id: 'demo3',
        name: 'Rohan Verma',
        imageUrl: '/images/parent_01.jpg',
        heading: 'Inter-School Debate',
        description: 'Winner - Best Speaker Award',
        order: 3
    },
    {
        _id: 'demo4',
        name: 'Ananya Singh',
        imageUrl: '/images/parent_02.jpg',
        heading: 'Mathematics Olympiad',
        description: 'Gold Medal - National Level',
        order: 4
    },
    {
        _id: 'demo5',
        name: 'Kabir Mehta',
        imageUrl: '/images/parent_01.jpg',
        heading: 'District Athletics Meet',
        description: '100m Sprint - Gold Medal',
        order: 5
    },
    {
        _id: 'demo6',
        name: 'Ishita Reddy',
        imageUrl: '/images/parent_02.jpg',
        heading: 'State Art Competition',
        description: '1st Prize - Painting Category',
        order: 6
    },
    {
        _id: 'demo7',
        name: 'Arjun Kumar',
        imageUrl: '/images/parent_01.jpg',
        heading: 'Science Exhibition',
        description: 'Best Innovation Award - Regional',
        order: 7
    },
    {
        _id: 'demo8',
        name: 'Diya Sharma',
        imageUrl: '/images/parent_02.jpg',
        heading: 'Class 12th Commerce',
        description: 'School Topper - 96.4%',
        order: 8
    },
    {
        _id: 'demo9',
        name: 'Vivaan Joshi',
        imageUrl: '/images/parent_01.jpg',
        heading: 'Basketball Tournament',
        description: 'MVP - Inter-School Championship',
        order: 9
    },
    {
        _id: 'demo10',
        name: 'Aisha Khan',
        imageUrl: '/images/parent_02.jpg',
        heading: 'English Olympiad',
        description: 'Silver Medal - International',
        order: 10
    },
    {
        _id: 'demo11',
        name: 'Siddharth Rao',
        imageUrl: '/images/parent_01.jpg',
        heading: 'Badminton Championship',
        description: '1st Position - State Level',
        order: 11
    }
];

// Confetti particle component
const ConfettiParticle = ({ delay }: { delay: number }) => {
    const randomX = Math.random() * 100;
    const randomDuration = 3 + Math.random() * 2;
    const randomColor = ['text-yellow-400', 'text-red-400', 'text-blue-400', 'text-green-400', 'text-purple-400'][Math.floor(Math.random() * 5)];

    return (
        <motion.div
            className={`absolute ${randomColor} opacity-30`}
            style={{ left: `${randomX}%`, top: '-10px' }}
            initial={{ y: -20, rotate: 0, opacity: 0 }}
            animate={{
                y: ['0vh', '110vh'],
                rotate: [0, 360, 720],
                opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
                duration: randomDuration,
                delay: delay,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            <Sparkles className="w-4 h-4" />
        </motion.div>
    );
};

export function StudentAchievers() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievers = async () => {
            if (USE_DEMO_DATA) {
                // Use demo data
                setAchievers(DEMO_ACHIEVERS);
                setLoading(false);
            } else {
                // Fetch from backend
                try {
                    const response = await fetch('/api/achievers');
                    if (response.ok) {
                        const data = await response.json();
                        setAchievers(data);
                    }
                } catch (error) {
                    console.error('Error fetching achievers:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAchievers();
    }, []);

    if (loading) {
        return null;
    }

    if (achievers.length === 0) {
        return null;
    }

    const topAchiever = achievers[0];
    const otherAchievers = achievers.slice(1);

    return (
        <section className="section-padding py-16 relative overflow-hidden">
            {/* Background Image with Overlay */}
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

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 backdrop-blur-sm border border-red-200 text-springer-red rounded-full mb-4">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-semibold">Stars of Springer</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-red-50 mb-4">
                            Our Achievers
                        </h2>
                        <p className="text-white max-w-2xl mx-auto">
                            Celebrating excellence in academics, sports, and co-curricular activities
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
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
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

                {/* View All Button (Optional) */}
                {achievers.length > 11 && (
                    <div className="text-center mt-10">
                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="px-6 py-2.5 bg-springer-red text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg"
                        >
                            View All Achievers
                        </motion.button>
                    </div>
                )}
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