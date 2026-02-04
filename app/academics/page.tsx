'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { ChevronDown, BookOpen, ClipboardList, Monitor, GraduationCap, Check } from 'lucide-react';
import { academicPrograms } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { cn } from '@/lib/utils';

const curriculumItems = [
    {
        title: "CBSE Curriculum",
        content: "We follow the Central Board of Secondary Education (CBSE) curriculum, which is nationally recognized and provides a strong foundation for higher education. Our curriculum is designed to develop critical thinking, problem-solving skills, and holistic development.",
        icon: BookOpen,
    },
    {
        title: "Teaching Methodology",
        content: "Our teaching approach combines traditional methods with modern techniques. We use interactive learning, project-based assignments, group discussions, and hands-on activities to make learning engaging and effective. Smart classrooms and digital resources enhance the learning experience.",
        icon: Monitor,
    },
    {
        title: "Assessment System",
        content: "We follow a comprehensive assessment system that includes regular tests, assignments, projects, and practical examinations. Continuous evaluation helps track student progress and identify areas for improvement. We provide detailed feedback to help students excel.",
        icon: ClipboardList,
    },
    {
        title: "Digital Learning",
        content: "Our digital learning initiatives include smart classrooms, online resources, educational apps, and e-learning platforms. Students have access to a wealth of digital content that supplements classroom learning and enables self-paced study.",
        icon: GraduationCap,
    },
];

export default function AcademicsPage() {
    const [activeTab, setActiveTab] = useState(academicPrograms[0].id);
    const [openAccordion, setOpenAccordion] = useState<string | null>("CBSE Curriculum");
    const activeProgram = academicPrograms.find(p => p.id === activeTab) || academicPrograms[0];

    return (
        <main className="pt-24">
            {/* Hero Banner with Image and Black Overlay */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/library.jpg"
                        alt="Academics"
                        className="w-full h-full object-cover"
                    />
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 bg-springer-red text-white text-sm font-medium rounded-full mb-4">
                            Academics
                        </span>
                        <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6">
                            Excellence in <span className="text-springer-red">Education</span>
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            Our comprehensive academic programs are designed to challenge, inspire, and prepare
                            students for success in higher education and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* Programs Overview */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Academic Programs"
                        title="Programs for Every Stage"
                        description="From early childhood to senior secondary, we offer comprehensive programs designed to nurture growth at every educational milestone."
                    />

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                        {academicPrograms.map((program) => (
                            <button
                                key={program.id}
                                onClick={() => setActiveTab(program.id)}
                                className={cn(
                                    'px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2',
                                    activeTab === program.id
                                        ? 'bg-springer-red text-white shadow-lg scale-105'
                                        : 'bg-white text-springer-charcoal hover:bg-springer-red/10 hover:text-springer-red border border-gray-200'
                                )}
                            >
                                <GraduationCap className="w-4 h-4" />
                                {program.name}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Image */}
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                                <img
                                    src={activeProgram.image}
                                    alt={activeProgram.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            {/* Badge */}
                            <div className="absolute -bottom-4 -right-4 bg-springer-red text-white px-6 py-3 rounded-xl shadow-lg">
                                <div className="text-2xl font-bold">{activeProgram.grades}</div>
                                <div className="text-xs opacity-90">Grade Levels</div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="lg:pl-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-green-100 text-springer-green text-sm font-medium rounded-full">
                                    Age: {activeProgram.age}
                                </span>
                            </div>

                            <h3 className="text-3xl font-bold text-springer-charcoal mb-4">
                                {activeProgram.name}
                            </h3>

                            <p className="text-springer-gray text-lg leading-relaxed mb-8">
                                {activeProgram.description}
                            </p>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-springer-charcoal mb-4">
                                    Key Features
                                </h4>
                                {activeProgram.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-springer-green" />
                                        </div>
                                        <span className="text-springer-charcoal">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curriculum & Methodology */}
            <section className="py-20 lg:py-28 bg-springer-gray-light">
                <div className="section-padding">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Accordion */}
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-springer-red/10 text-springer-red text-sm font-medium rounded-full mb-4">
                                Curriculum Overview
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-springer-charcoal mb-8">
                                Our Approach to Learning
                            </h2>

                            <div className="space-y-4">
                                {curriculumItems.map((item) => {
                                    const Icon = item.icon;
                                    const isOpen = openAccordion === item.title;

                                    return (
                                        <div
                                            key={item.title}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm"
                                        >
                                            <button
                                                onClick={() => setOpenAccordion(isOpen ? null : item.title)}
                                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-springer-red/10 rounded-lg flex items-center justify-center">
                                                        <Icon className="w-5 h-5 text-springer-red" />
                                                    </div>
                                                    <span className="font-semibold text-springer-charcoal">
                                                        {item.title}
                                                    </span>
                                                </div>
                                                <ChevronDown
                                                    className={cn(
                                                        'w-5 h-5 text-springer-gray transition-transform',
                                                        isOpen && 'rotate-180'
                                                    )}
                                                />
                                            </button>
                                            <div
                                                className={cn(
                                                    'overflow-hidden transition-all duration-300',
                                                    isOpen ? 'max-h-96' : 'max-h-0'
                                                )}
                                            >
                                                <div className="px-5 pb-5 pl-19 ml-14 text-springer-gray leading-relaxed">
                                                    {item.content}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Image */}
                        <AnimatedCard direction="right" className="hidden lg:block">
                            <div className="relative h-full">
                                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                    <img
                                        src="/images/smart_classroom.jpg"
                                        alt="Learning Environment"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-springer-red">98%</div>
                                            <div className="text-xs text-springer-gray">Pass Rate</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-springer-green">25:1</div>
                                            <div className="text-xs text-springer-gray">Student-Teacher</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-springer-red">50+</div>
                                            <div className="text-xs text-springer-gray">Subjects</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Academic Calendar */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Academic Calendar"
                        title="Important Dates & Events"
                        description="Stay updated with the academic calendar and important events throughout the year."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { month: 'April', event: 'New Academic Year Begins', date: '1st April' },
                            { month: 'May', event: 'Summer Camp Activities', date: '1-31 May' },
                            { month: 'June', event: 'Mid-Term Examinations', date: '15-30 June' },
                            { month: 'August', event: 'Independence Day Celebration', date: '15th August' },
                            { month: 'October', event: 'Half-Yearly Examinations', date: '1-15 October' },
                            { month: 'November', event: 'Annual Sports Day', date: '15th November' },
                            { month: 'December', event: 'Winter Break', date: '25 Dec - 5 Jan' },
                            { month: 'January', event: 'Annual Day Celebration', date: '26th January' },
                            { month: 'March', event: 'Final Examinations', date: '1-31 March' },
                        ].map((item, index) => (
                            <AnimatedCard key={index} delay={index * 50}>
                                <div className="bg-springer-gray-light rounded-xl p-6 hover:bg-red-50 transition-colors group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-springer-red rounded-xl flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">{item.month.slice(0, 3)}</span>
                                        </div>
                                        <span className="text-sm text-springer-gray">{item.date}</span>
                                    </div>
                                    <h4 className="font-semibold text-springer-charcoal group-hover:text-springer-red transition-colors">
                                        {item.event}
                                    </h4>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
