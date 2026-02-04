import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { achievements } from '@/data/siteData';
import { Counter } from '@/components/ui-custom/Counter';
import { Award, TrendingUp, Users, BookOpen } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  "Years of Excellence": Award,
  "Total Students": Users,
  "Expert Faculty": BookOpen,
  "Board Results": TrendingUp,
};

export function Achievements() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 lg:py-28 bg-springer-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-springer-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-springer-green rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
            Our Achievements
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our journey of excellence is reflected in these remarkable numbers
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {achievements.map((item, index) => {
            const Icon = iconMap[item.label] || Award;
            
            return (
              <div
                key={item.label}
                className={`text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-6'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-springer-red to-red-600 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <Counter 
                    end={item.value} 
                    suffix={item.suffix}
                    duration={2500}
                  />
                </div>
                
                <div className="text-white/60 text-sm font-medium">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
