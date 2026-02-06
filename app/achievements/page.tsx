'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Trophy, Medal, Star, Calendar, Filter } from 'lucide-react';
import { achievements } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Counter } from '@/components/ui-custom/Counter';
import { cn } from '@/lib/utils';

const achievementCategories = [
    { id: 'all', name: 'All Achievements' },
    { id: 'academic', name: 'Academic' },
    { id: 'sports', name: 'Sports' },
    { id: 'olympiads', name: 'Olympiads' },
    { id: 'events', name: 'Inter-school' },
];

const allAchievements = [
    {
        id: 1,
        title: "100% CBSE Board Results",
        category: "academic",
        year: "2024",
        description: "All students passed with first division, with 45% scoring above 90%",
        icon: Trophy,
    },
    {
        id: 2,
        title: "National Science Olympiad Winners",
        category: "olympiads",
        year: "2024",
        description: "15 students secured national ranks in NSO",
        icon: Medal,
    },
    {
        id: 3,
        title: "Inter-School Cricket Champions",
        category: "sports",
        year: "2024",
        description: "Won the city-level inter-school cricket tournament",
        icon: Trophy,
    },
    {
        id: 4,
        title: "Best School Award",
        category: "events",
        year: "2023",
        description: "Recognized as the Best CBSE School in the district",
        icon: Star,
    },
    {
        id: 5,
        title: "International Math Olympiad",
        category: "olympiads",
        year: "2023",
        description: "3 students selected for the international round",
        icon: Medal,
    },
    {
        id: 6,
        title: "State Level Debate Competition",
        category: "events",
        year: "2023",
        description: "First place in the state-level debate competition",
        icon: Trophy,
    },
    {
        id: 7,
        title: "Athletics Championship",
        category: "sports",
        year: "2024",
        description: "Won 12 gold medals in district athletics meet",
        icon: Trophy,
    },
    {
        id: 8,
        title: "Computer Science Excellence",
        category: "academic",
        year: "2024",
        description: "Best performing school in computer science applications",
        icon: Star,
    },
];

export default function AchievementsPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredAchievements = activeCategory === 'all'
        ? allAchievements
        : allAchievements.filter(a => a.category === activeCategory);

    return (
        <main className="pt-24">
            {/* Hero Banner */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/sports_ground.jpg"
                        alt="Achievements"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1 bg-springer-red text-white text-xs font-medium rounded-full mb-4">
                            Achievements
                        </span>
                        <h1 className="text-xl lg:text-3xl font-semibold text-white mb-6">
                            Celebrating <span className="text-springer-red">Excellence</span>
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            Our students and faculty continue to achieve remarkable success across
                            academics, sports, and co-curricular activities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-springer-red">
                <div className="section-padding">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((item) => (
                            <div key={item.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    <Counter end={item.value} suffix={item.suffix} duration={2000} />
                                </div>
                                <div className="text-white/80 text-sm">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Grid */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Our Achievements"
                        title="Proud Moments"
                        description="A glimpse of the remarkable achievements by our students and institution over the years."
                    />

                    {/* Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {achievementCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    'px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2',
                                    activeCategory === category.id
                                        ? 'bg-springer-red text-white shadow-lg'
                                        : 'bg-gray-100 text-springer-charcoal hover:bg-springer-red/10 hover:text-springer-red'
                                )}
                            >
                                {category.id === 'all' && <Filter className="w-4 h-4" />}
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAchievements.map((achievement, idx) => {
                            const Icon = achievement.icon;
                            return (
                                <AnimatedCard key={achievement.id} delay={idx * 100}>
                                    <div className="group card-modern p-6 h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-springer-red to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <span className="flex items-center gap-1 text-sm text-springer-gray">
                                                <Calendar className="w-4 h-4" />
                                                {achievement.year}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-springer-charcoal mb-2 group-hover:text-springer-red transition-colors">
                                            {achievement.title}
                                        </h3>

                                        <p className="text-springer-gray text-sm leading-relaxed">
                                            {achievement.description}
                                        </p>

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <span className="inline-block px-3 py-1 bg-springer-red/10 text-springer-red text-xs font-medium rounded-full capitalize">
                                                {achievement.category}
                                            </span>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Hall of Fame */}
            <section className="py-20 lg:py-28 bg-springer-gray-light">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Hall of Fame"
                        title="Our Star Performers"
                        description="Recognizing the outstanding achievements of our students who have brought laurels to the school."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Rahul Sharma", achievement: "99.2% in CBSE Class 12", year: "2024", image: "/images/faculty_profile_02.jpg" },
                            { name: "Priya Patel", achievement: "NSO National Rank 1", year: "2024", image: "/images/faculty_profile_01.jpg" },
                            { name: "Amit Kumar", achievement: "IMO Gold Medalist", year: "2023", image: "/images/parent_02.jpg" },
                            { name: "Sneha Gupta", achievement: "Best Athlete Award", year: "2024", image: "/images/parent_01.jpg" },
                        ].map((student, index) => (
                            <AnimatedCard key={student.name} delay={index * 100}>
                                <div className="group card-modern overflow-hidden text-center">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={student.image}
                                            alt={student.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold text-springer-charcoal mb-1">
                                            {student.name}
                                        </h4>
                                        <p className="text-springer-red text-sm font-medium mb-2">
                                            {student.achievement}
                                        </p>
                                        <span className="text-xs text-springer-gray">
                                            Batch of {student.year}
                                        </span>
                                    </div>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
