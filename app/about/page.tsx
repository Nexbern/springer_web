import type { Metadata } from 'next';
import { coreValues, schoolInfo } from '@/data/siteData';
import { AnimatedCard } from '@/components/ui-custom/AnimatedCard';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Award, Shield, Lightbulb, Heart, Handshake, Scale } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us',
    description: `Learn about ${schoolInfo.name}'s vision, mission, and 30+ years of excellence in education. Discover our core values and world-class campus.`,
};

const iconMap: Record<string, React.ElementType> = {
    Award,
    Shield,
    Lightbulb,
    Heart,
    Handshake,
    Scale,
};

export default function AboutPage() {
    return (
        <main className="pt-24">
            {/* Hero Banner with Image and Black Overlay */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/campus_exterior.jpg"
                        alt="Campus"
                        className="w-full h-full object-cover"
                    />
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 bg-springer-red text-white text-sm font-medium rounded-full mb-4">
                            About Us
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Building a Legacy of <span className="text-springer-red">Excellence</span>
                        </h1>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Since 1995, Springer Public School has been at the forefront of quality education,
                            nurturing young minds and shaping future leaders with a perfect blend of tradition and innovation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Vision */}
                        <AnimatedCard>
                            <div className="bg-red-50 rounded-3xl p-8 lg:p-10 h-full">
                                <div className="w-16 h-16 bg-springer-red rounded-2xl flex items-center justify-center mb-6">
                                    <Lightbulb className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-springer-charcoal mb-4">
                                    Our Vision
                                </h2>
                                <p className="text-springer-gray leading-relaxed">
                                    To be a leading educational institution that nurtures creative thinkers,
                                    compassionate leaders, and responsible global citizens who contribute
                                    positively to society and drive positive change in the world.
                                </p>
                            </div>
                        </AnimatedCard>

                        {/* Mission */}
                        <AnimatedCard delay={100}>
                            <div className="bg-green-50 rounded-3xl p-8 lg:p-10 h-full">
                                <div className="w-16 h-16 bg-springer-green rounded-2xl flex items-center justify-center mb-6">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-springer-charcoal mb-4">
                                    Our Mission
                                </h2>
                                <p className="text-springer-gray leading-relaxed">
                                    To provide a holistic education that combines academic excellence with
                                    character development, fostering critical thinking, creativity, and
                                    ethical values in a supportive and inclusive learning environment.
                                </p>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Founder's Message */}
            <section className="py-20 lg:py-28 bg-springer-gray-light">
                <div className="section-padding">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <AnimatedCard direction="left">
                            <div className="relative">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card">
                                    <img
                                        src="/images/founder.jpg"
                                        alt="Founder"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-springer-red text-white p-6 rounded-2xl shadow-lg">
                                    <div className="text-3xl font-bold">30+</div>
                                    <div className="text-sm opacity-90">Years of Legacy</div>
                                </div>
                            </div>
                        </AnimatedCard>

                        <AnimatedCard direction="right" delay={100}>
                            <span className="inline-block px-4 py-1.5 bg-springer-red/10 text-springer-red text-sm font-medium rounded-full mb-4">
                                Founder's Message
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-springer-charcoal mb-4">
                                A Dream That Became Reality
                            </h2>
                            <div className="space-y-4 text-springer-gray leading-relaxed">
                                <p>
                                    When I founded Springer Public School in 1995, I had a simple yet profound vision:
                                    to create an institution that would not just impart knowledge, but shape character
                                    and inspire excellence.
                                </p>
                                <p>
                                    Over the past three decades, we have grown from a small school with big dreams to
                                    a premier educational institution that has touched the lives of thousands of students.
                                    Our alumni are making their mark across the globe, and that fills me with immense pride.
                                </p>
                                <p>
                                    Education is not just about textbooks and examinations. It is about nurturing curious
                                    minds, fostering creativity, and building the confidence to face life's challenges.
                                    At Springer, we are committed to this holistic approach to education.
                                </p>
                            </div>
                            <div className="mt-8">
                                <div className="font-bold text-springer-charcoal text-lg">Dr. R.K. Sharma</div>
                                <div className="text-springer-gray">Founder, Springer Public School</div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <AnimatedCard direction="left" className="order-2 lg:order-1">
                            <span className="inline-block px-4 py-1.5 bg-springer-green/10 text-springer-green text-sm font-medium rounded-full mb-4">
                                Principal's Message
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-springer-charcoal mb-4">
                                Nurturing Excellence, Inspiring Success
                            </h2>
                            <div className="space-y-4 text-springer-gray leading-relaxed">
                                <p>
                                    Welcome to Springer Public School, where every child is valued, every talent is
                                    nurtured, and every dream is supported. As the Principal, I am honored to lead
                                    this institution of excellence.
                                </p>
                                <p>
                                    Our dedicated team of educators works tirelessly to create a learning environment
                                    that is both challenging and supportive. We believe in the potential of every
                                    student and strive to help them discover and develop their unique strengths.
                                </p>
                                <p>
                                    In today's rapidly changing world, we are committed to preparing our students
                                    not just for examinations, but for life. Our focus on STEM education, critical
                                    thinking, and character development ensures that our students are ready for
                                    whatever the future holds.
                                </p>
                            </div>
                            <div className="mt-8">
                                <div className="font-bold text-springer-charcoal text-lg">Mrs. Anjali Gupta</div>
                                <div className="text-springer-gray">Principal, Springer Public School</div>
                            </div>
                        </AnimatedCard>

                        <AnimatedCard direction="right" delay={100} className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card">
                                    <img
                                        src="/images/principal.jpg"
                                        alt="Principal"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-springer-green text-white p-6 rounded-2xl shadow-lg">
                                    <div className="text-3xl font-bold">18+</div>
                                    <div className="text-sm opacity-90">Years of Leadership</div>
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 lg:py-28 bg-springer-gray-light">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Our Values"
                        title="The Pillars of Our Institution"
                        description="These core values guide everything we do at Springer Public School, from our teaching methods to our interactions with the community."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {coreValues.map((value, index) => {
                            const Icon = iconMap[value.icon];
                            return (
                                <AnimatedCard key={value.title} delay={index * 100}>
                                    <div className="bg-white rounded-2xl p-8 h-full group hover:shadow-lg transition-shadow">
                                        <div className="w-14 h-14 bg-gradient-to-br from-springer-red to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-springer-charcoal mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-springer-gray leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </AnimatedCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Campus Gallery */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Campus Gallery"
                        title="Explore Our World-Class Campus"
                        description="Take a virtual tour of our state-of-the-art facilities designed to provide the best learning environment."
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            '/images/campus_exterior.jpg',
                            '/images/smart_classroom.jpg',
                            '/images/science_lab.jpg',
                            '/images/library.jpg',
                            '/images/sports_ground.jpg',
                            '/images/transport.jpg',
                            '/images/robotics_lab.jpg',
                            '/images/hero_students_modern_classroom.jpg',
                        ].map((image, index) => (
                            <AnimatedCard key={index} delay={index * 50} className={index === 0 ? 'col-span-2 row-span-2' : ''}>
                                <div className="group relative overflow-hidden rounded-xl aspect-square">
                                    <img
                                        src={image}
                                        alt={`Campus ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
