import { Bot, Code, Brain, Puzzle, FolderGit, Cpu, Lightbulb, Rocket } from 'lucide-react';
import { stemPrograms } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Code,
  Brain,
  Puzzle,
  FolderGit,
};

const features = [
  {
    icon: Cpu,
    title: "Modern Labs",
    description: "State-of-the-art computer and robotics labs with latest equipment",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Dedicated space for creative thinking and project development",
  },
  {
    icon: Rocket,
    title: "Competitions",
    description: "Regular participation in national and international STEM competitions",
  },
];

export function STEM() {
  return (
    <main className="pt-24">
      {/* Hero Banner with Image and Black Overlay */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/robotics_lab.jpg"
            alt="STEM Lab"
            className="w-full h-full object-cover"
          />
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="section-padding relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-springer-red text-white text-sm font-medium rounded-full mb-4">
              STEM & Skill Development
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Preparing Students for the <span className="text-springer-red">Future</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Our comprehensive STEM programs equip students with the skills and knowledge 
              needed to thrive in an increasingly technology-driven world.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-padding">
          <SectionHeader
            subtitle="Our Programs"
            title="STEM Education Excellence"
            description="Discover our range of STEM programs designed to inspire curiosity, foster innovation, and develop critical thinking skills."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {stemPrograms.map((program, index) => {
              const Icon = iconMap[program.icon];
              const isRed = program.color === 'red';

              return (
                <AnimatedCard key={program.id} delay={index * 100}>
                  <div className="group card-modern p-8 h-full">
                    <div 
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                        isRed 
                          ? 'bg-red-50 text-springer-red group-hover:bg-springer-red group-hover:text-white' 
                          : 'bg-green-50 text-springer-green group-hover:bg-springer-green group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-springer-charcoal mb-3 group-hover:text-springer-red transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-springer-gray leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-springer-gray-light">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedCard direction="left">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="/images/robotics_lab.jpg"
                    alt="STEM Lab"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-springer-red text-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm opacity-90">STEM Programs</div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard direction="right" delay={100}>
              <span className="inline-block px-4 py-1.5 bg-springer-green/10 text-springer-green text-sm font-medium rounded-full mb-4">
                Our Infrastructure
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-springer-charcoal mb-6">
                World-Class STEM Facilities
              </h2>
              <p className="text-springer-gray leading-relaxed mb-8">
                Our STEM facilities are designed to provide students with hands-on experience 
                using cutting-edge technology and equipment. From robotics kits to 3D printers, 
                we have everything needed to bring ideas to life.
              </p>

              <div className="space-y-6">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-springer-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-springer-red" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-springer-charcoal mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-springer-gray text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Skills Development */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="section-padding">
          <SectionHeader
            subtitle="Skill Development"
            title="Beyond the Classroom"
            description="We focus on developing essential 21st-century skills that prepare students for future success."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { skill: "Critical Thinking", level: 95 },
              { skill: "Problem Solving", level: 92 },
              { skill: "Creativity", level: 88 },
              { skill: "Collaboration", level: 90 },
              { skill: "Communication", level: 93 },
              { skill: "Digital Literacy", level: 96 },
              { skill: "Leadership", level: 85 },
              { skill: "Adaptability", level: 91 },
            ].map((item, index) => (
              <AnimatedCard key={item.skill} delay={index * 50}>
                <div className="text-center p-6 bg-springer-gray-light rounded-2xl">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - item.level / 100)}`}
                        className="text-springer-red"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-springer-charcoal">
                        {item.level}%
                      </span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-springer-charcoal text-sm">
                    {item.skill}
                  </h4>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-springer-green">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Explore STEM?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Enroll your child in our STEM programs and give them the skills they need for the future.
            </p>
            <a
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-springer-green font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              Apply for Admission
              <Rocket className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
