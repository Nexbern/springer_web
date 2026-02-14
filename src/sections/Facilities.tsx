'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui-custom/SectionHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';

const infrastructureFacilities = [
    {
        id: 1,
        name: 'Smart Classrooms',
        image: '/images/infrastructure/smart_classroom.webp',
        description: 'Modern classrooms equipped with interactive smart boards, projectors, and digital learning tools for enhanced student engagement.'
    },
    {
        id: 2,
        name: 'AI & Robotics Lab',
        image: '/images/infrastructure/ai&robotics_lab.webp',
        description: 'State-of-the-art AI and Robotics laboratory where students explore cutting-edge technology and develop innovative projects.'
    },
    {
        id: 3,
        name: 'Computer Lab',
        image: '/images/infrastructure/computer_lab.webp',
        description: 'Fully equipped computer lab with latest hardware and software, providing hands-on experience in programming and digital literacy.'
    },
    {
        id: 4,
        name: 'Physics Laboratory',
        image: '/images/infrastructure/physics_lab.webp',
        description: 'Well-equipped physics lab with modern apparatus for conducting experiments and understanding scientific principles.'
    },
    {
        id: 5,
        name: 'Chemistry Laboratory',
        image: '/images/infrastructure/chemistry_lab.webp',
        description: 'Advanced chemistry lab with safety equipment and modern instruments for practical learning and experimentation.'
    },
    {
        id: 6,
        name: 'Biology Laboratory',
        image: '/images/infrastructure/bio_lab.webp',
        description: 'Comprehensive biology lab with microscopes, specimens, and models for detailed study of life sciences.'
    },
    {
        id: 7,
        name: 'Sports Ground',
        image: '/images/infrastructure/ground.webp',
        description: 'Expansive sports ground for cricket, football, and athletics, promoting physical fitness and team spirit.'
    },
    {
        id: 8,
        name: 'Recreation Ground',
        image: '/images/infrastructure/recreation_ground.webp',
        description: 'Dedicated recreation area for outdoor activities, games, and physical education classes.'
    },
    {
        id: 9,
        name: 'School Transport',
        image: '/images/infrastructure/transport.webp',
        description: 'Safe and reliable school bus service covering major routes across the city with GPS tracking and trained drivers.'
    },
    {
        id: 10,
        name: 'Canteen',
        image: '/images/infrastructure/canteen.webp',
        description: 'Hygienic canteen serving nutritious meals and snacks, maintaining high standards of food quality and safety.'
    },
    {
        id: 11,
        name: 'Achievements Gallery',
        image: '/images/infrastructure/Achievements.webp',
        description: 'Showcase of our students\' remarkable achievements in academics, sports, and co-curricular activities.'
    },
    {
        id: 12,
        name: 'Swimming Pool',
        image: '/images/infrastructure/swim.webp',
        description: 'Modern school swimming pool promoting fitness, safety, teamwork, and excellence among students.'
    }
];

export function Facilities() {
    return (
        <section className="py-20 lg:py-28 bg-springer-gray-light">
            <div className="section-padding">
                <SectionHeader
                    subtitle="Our Facilities"
                    title="World-Class Infrastructure"
                    description="State-of-the-art facilities designed to provide the best learning environment for our students."
                />

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        className="facilities-swiper"
                    >
                        {infrastructureFacilities.map((facility) => (
                            <SwiperSlide key={facility.id}>
                                <div className="card-modern overflow-hidden h-full group">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={facility.image}
                                            alt={facility.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">
                                            {facility.name}
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-springer-gray leading-relaxed">
                                            {facility.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-springer-red hover:text-white transition-all duration-300 hidden md:flex"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-springer-red hover:text-white transition-all duration-300 hidden md:flex"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
