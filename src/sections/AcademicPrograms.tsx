'use client';

import { useState } from 'react';
import { Check, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { academicPrograms } from '@/data/siteData';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { cn } from '@/lib/utils';

export function AcademicPrograms() {
  const [activeTab, setActiveTab] = useState(academicPrograms[0].id);
  const activeProgram = academicPrograms.find(p => p.id === activeTab) || academicPrograms[0];

  return (
    <section className="py-20 lg:py-28 bg-springer-gray-light">
      <div className="section-padding">
        <SectionHeader
          subtitle="Academic Programs"
          title="Programs Tailored for Every Stage"
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
                  : 'bg-white text-springer-charcoal hover:bg-springer-red/10 hover:text-springer-red'
              )}
            >
              <GraduationCap className="w-4 h-4" />
              {program.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
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
                <div className="lg:text-2xl text-lg font-semibold">{activeProgram.grades}</div>
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

              <h3 className="text-2xl lg:text-3xl font-semibold text-springer-charcoal mb-4">
                {activeProgram.name}
              </h3>

              <p className="text-springer-gray lg:text-lg text-base leading-relaxed mb-8">
                {activeProgram.description}
              </p>

              <div className="space-y-4">
                <h4 className="lg:text-xl text-lg font-semibold text-springer-charcoal mb-4">
                  Key Features
                </h4>
                {activeProgram.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 lg:w-4 lg:h-4 text-springer-green" />
                    </div>
                    <span className="lg:text-base text-sm text-springer-charcoal">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
