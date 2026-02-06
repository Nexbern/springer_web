'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-springer-red to-red-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/10 rounded-full" />
      <div className="absolute top-1/2 right-20 w-4 h-4 bg-white/20 rounded-full" />

      <div className="section-padding relative z-10" ref={ref}>
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6"
          >
            Begin Your Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6"
          >
            Ready to Shape Your Child's Future?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Join Springer Public School and give your child the gift of quality education,
            holistic development, and a bright future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-springer-red font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
            >
              Apply for Admission
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/pdf/prospectus.pdf';
                link.download = 'Prospectus.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download Prospectus
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex items-center gap-2 text-white/80">
              <FileText className="w-5 h-5" />
              <span className="text-sm">CBSE Affiliated</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">30+ Years of Excellence</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">2500+ Happy Students</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
