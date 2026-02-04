import { Brain, Cpu, Shield, Users } from 'lucide-react';
import { whyChooseUs } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Cpu,
  Shield,
  Users,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="section-padding">
        <SectionHeader
          subtitle="Why Springer Public School"
          title="Excellence in Every Aspect"
          description="We provide a nurturing environment where students can discover their potential, develop their talents, and prepare for a successful future."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isRed = item.color === 'red';

            return (
              <AnimatedCard key={item.id} delay={index * 100}>
                <div className="group card-modern p-8 h-full">
                  {/* Icon */}
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                      isRed 
                        ? 'bg-red-50 text-springer-red group-hover:bg-springer-red group-hover:text-white' 
                        : 'bg-green-50 text-springer-green group-hover:bg-springer-green group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-springer-charcoal mb-3 group-hover:text-springer-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-springer-gray leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative Element */}
                  <div 
                    className={`mt-6 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-full ${
                      isRed ? 'bg-springer-red' : 'bg-springer-green'
                    }`}
                  />
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
