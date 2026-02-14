import type { Metadata } from 'next';
import Image from 'next/image';
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
                        <span className="inline-block px-4 py-1 bg-springer-red text-white text-xs font-medium rounded-full mb-4">
                            About Us
                        </span>
                        <h1 className="text-xl lg:text-3xl font-semibold text-white mb-6">
                            Building a Legacy of <span className="text-springer-red">Excellence</span>
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            Springer Public School, Gorakhpur, is a premier K–12 ICSE-affiliated institution with a rich
                            legacy of academic excellence, innovation, and visionary leadership. Established in 1992, the
                            school has been a pioneer in quality English-medium education in Eastern Uttar Pradesh for
                            over three decades.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Sections */}
            <section className="py-20 lg:py-24 bg-white">
                <div className="section-padding">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {/* Vision */}
                        <AnimatedCard>
                            <div className="bg-red-50 rounded-3xl p-8 lg:p-10 h-full border border-red-100/50">
                                <div className="w-14 h-14 bg-springer-red rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200">
                                    <Lightbulb className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-xl lg:text-2xl font-semibold text-springer-charcoal mb-4">
                                    Our Vision
                                </h2>
                                <p className="text-springer-gray leading-relaxed text-sm lg:text-base">
                                    To be a leading educational institution that nurtures creative thinkers,
                                    compassionate leaders, and responsible global citizens who contribute
                                    positively to society and drive positive change in the world.
                                </p>
                            </div>
                        </AnimatedCard>

                        {/* Mission */}
                        <AnimatedCard delay={100}>
                            <div className="bg-green-50 rounded-3xl p-8 lg:p-10 h-full border border-green-100/50">
                                <div className="w-14 h-14 bg-springer-green rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                                    <Award className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-xl lg:text-2xl font-semibold text-springer-charcoal mb-4">
                                    Our Mission
                                </h2>
                                <p className="text-springer-gray leading-relaxed text-sm lg:text-base">
                                    To provide a holistic education that combines academic excellence with
                                    character development, fostering critical thinking, creativity, and
                                    ethical values in a supportive and inclusive learning environment.
                                </p>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-20 lg:py-24 bg-springer-gray-light">
                <div className="section-padding">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-center">
                        <AnimatedCard direction="left">
                            <div className="flex justify-center lg:justify-start">
                                <div className="relative w-[280px]">
                                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card">
                                        <img
                                            src="/images/founder.jpg"
                                            alt="Late Shri Vaibhav Srivastava"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 bg-springer-red text-white p-6 rounded-2xl shadow-lg">
                                        <div className="text-3xl font-bold">30+</div>
                                        <div className="text-sm opacity-90">Years of Legacy</div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>

                        <AnimatedCard direction="right" delay={100}>
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-springer-red/10 text-springer-red text-sm font-medium rounded-full mb-4">
                                    Our Foundation & Visionary Founder
                                </span>
                                <h2 className="text-2xl lg:text-3xl font-semibold text-springer-charcoal mb-4">
                                    Late Shri Vaibhav Srivastava
                                </h2>
                                <div className="space-y-4 text-springer-gray leading-relaxed text-sm lg:text-base">
                                    <p>
                                        Springer Public School was founded by Late Shri Vaibhav Srivastava, a visionary educationist
                                        and engineer, whose personal journey deeply shaped the philosophy of the institution.
                                    </p>
                                    <p>
                                        A meritorious student and District Topper in HSC, he earned a Gold Medal in Civil Engineering
                                        from BIT Mesra. Driven by a desire to provide world-class education to his hometown region,
                                        he envisioned an institution that matched national standards while remaining rooted in strong values.
                                    </p>
                                    <p>
                                        In 1992, he formally registered the Springer Education Foundation Society, laying the foundation
                                        for what would become a cornerstone of education in Gorakhpur.
                                    </p>
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Pioneering Milestones */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="A Pioneer in the Region"
                        title="Setting the Standard for Decades"
                        description="Springer Public School has consistently been a trendsetter, introducing modern education and facilities back when they were still in their infancy."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-red-50 rounded-2xl">
                            <h3 className="font-semibold text-lg mb-2 text-springer-charcoal">CISCE Affiliation</h3>
                            <p className="text-springer-gray text-sm">In 1996, it became the first unaided ICSE school in the region, bringing global standards home.</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-2xl">
                            <h3 className="font-semibold text-lg mb-2 text-springer-charcoal">Tech-First Education</h3>
                            <p className="text-springer-gray text-sm">Established the first fully functional Computer Lab in 1998 in association with NIIT.</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-2xl">
                            <h3 className="font-semibold text-lg mb-2 text-springer-charcoal">Holistic Facilities</h3>
                            <p className="text-springer-gray text-sm">Among the first in Eastern UP to offer equestrian (horse riding) and swimming to its students.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transition & Resilience Section */}
            <section className="py-20 lg:py-24 bg-springer-gray-light">
                <div className="section-padding">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-center">
                        <AnimatedCard direction="left" className="order-2 lg:order-1">
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-springer-green/10 text-springer-green text-sm font-medium rounded-full mb-4">
                                    Resilience & Continuity of Vision
                                </span>
                                <h2 className="text-2xl lg:text-3xl font-semibold text-springer-charcoal mb-4">
                                    Mrs. Shipra Srivastava
                                </h2>
                                <p className="text-springer-gray leading-relaxed mb-6 text-sm lg:text-base">
                                    Following the untimely demise of the founder in 2011, Mrs. Shipra Srivastava—a renowned social
                                    worker and former Member of the UP State Women Commission—assumed charge. Under her
                                    stewardship, the school stayed true to its mission of providing quality, value-based education.
                                </p>
                                <div className="font-semibold text-springer-charcoal text-lg">Mrs. Shipra Srivastava</div>
                                <div className="text-springer-gray">Secretary, Springer Education Foundation Society</div>
                            </div>
                        </AnimatedCard>

                        <AnimatedCard direction="right" className="order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div className="relative w-[280px]">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card">
                                    <img
                                        src="/images/persons/shipra_srivastava.webp"
                                        alt="Mrs. Shipra Srivastava"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Managing Director Section */}
            <section className="py-20 lg:py-24 bg-white">
                <div className="section-padding">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-center">
                        <AnimatedCard direction="left" className="flex justify-center lg:justify-start">
                            <div className="relative w-[280px]">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-card">
                                    <img
                                        src="/images/persons/arjun_vaibhav.webp"
                                        alt="Mr. Arjun Vaibhav Srivastava"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-springer-green text-white p-6 rounded-2xl shadow-lg">
                                    <div className="text-sm font-medium uppercase tracking-wider">Managing Director</div>
                                    <div className="text-xs opacity-90 mt-1">Innovation Leader</div>
                                </div>
                            </div>
                        </AnimatedCard>

                        <AnimatedCard direction="right" delay={100}>
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-springer-green/10 text-springer-green text-sm font-medium rounded-full mb-4">
                                    A New Era of Leadership & Innovation
                                </span>
                                <h2 className="text-2xl lg:text-3xl font-semibold text-springer-charcoal mb-4">
                                    Mr. Arjun Vaibhav Srivastava
                                </h2>
                                <div className="space-y-4 text-springer-gray leading-relaxed text-sm lg:text-base">
                                    <p>
                                        In 2020, Mr. Arjun Vaibhav Srivastava stepped into leadership, quickly pivoting the school to
                                        structured online learning during the pandemic—a first for the region.
                                    </p>
                                    <p>
                                        An alumnus of IIT Jodhpur, he brings deep expertise in Computer Science, Entrepreneurship,
                                        and Data Engineering to the institution. Under his dynamic leadership, Springer has entered
                                        a phase of rapid innovation and national recognition.
                                    </p>
                                    <p>
                                        He has spearheaded partnerships with IIT Madras, established cutting-edge AI labs, and
                                        introduced financial literacy—ensuring Springer students are future-ready.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <div className="font-semibold text-springer-charcoal text-lg">Mr. Arjun Vaibhav Srivastava</div>
                                    <div className="text-springer-gray font-medium">Managing Director & Visionary Leader</div>
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Milestones and Recognition */}
            <section className="py-20 lg:py-28 bg-springer-charcoal text-white overflow-hidden relative">
                <div className="section-padding">
                    <SectionHeader
                        subtitle="Springer Today"
                        title="Nationally Recognised & Future-Ready"
                        description="From top state rankings to innovative partnerships, we are redefining what modern education looks like."
                        className="text-white"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                            <h4 className="font-semibold text-xl mb-3 text-springer-red">Ranked #1</h4>
                            <p className="text-sm text-white/70">In Gorakhpur and #2 in Uttar Pradesh by EducationWorld Magazine (2025-26).</p>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                            <h4 className="font-semibold text-xl mb-3 text-springer-red">IIT Madras Partner</h4>
                            <p className="text-sm text-white/70">Collaboration for courses in AI, Data Science, and Architecture.</p>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                            <h4 className="font-semibold text-xl mb-3 text-springer-red">AI & Robotics Lab</h4>
                            <p className="text-sm text-white/70">Fully functional lab from session 2025-26 with Future Gurukuls.</p>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                            <h4 className="font-semibold text-xl mb-3 text-springer-red">Financial Literacy</h4>
                            <p className="text-sm text-white/70">First school in the region to introduce Financial Literacy for Grades VI-X.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="section-padding">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 bg-springer-red/10 text-springer-red text-sm font-medium rounded-full mb-4">
                            Our Philosophy
                        </span>
                        <h2 className="text-xl lg:text-3xl font-semibold text-springer-charcoal mb-8">
                            Dream Big. Achieve with Integrity.
                        </h2>
                        <p className="text-sm lg:text-lg text-springer-gray leading-relaxed mb-6">
                            At Springer, education is not limited to academic achievement. We are committed to nurturing
                            curious minds, ethical values, leadership qualities, and life-ready skills, preparing students to
                            excel in an ever-evolving global landscape.
                        </p>
                        <p className="text-springer-gray italic text-xs lg:text-sm">
                            With the blessings and enduring vision of Late Vaibhav Srivastava, we continue to blend
                            legacy with innovation, empowering generations of learners.
                        </p>
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
                                        <h3 className="text-xl font-semibold text-springer-charcoal mb-3">
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
                            '/images/about-page-campus-gallery/jpeg-optimizer_transport_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_2_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_4_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_AI $ robotics lab_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_7709_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_8726_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_8936_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_8937_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_8956_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_8971_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_9765_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_9783_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_9808_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_9885_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_9894_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_9895_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_NKF_9927_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_Recreation ground_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_bio_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_chem_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_comp_converted.webp',
                            '/images/about-page-campus-gallery/jpeg-optimizer_phy_converted.webp',
                        ].map((image, index) => (
                            <AnimatedCard key={index} delay={index * 50} className={index === 0 || index % 6 === 0 ? 'col-span-2 row-span-2' : ''}>
                                <div className="group relative overflow-hidden rounded-xl aspect-square">
                                    <Image
                                        src={image}
                                        alt={`Campus ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
