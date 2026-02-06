'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Camera } from 'lucide-react';

const galleryImages = [
    { id: 1, src: '/images/gallery/image 01 (1).webp', alt: 'School Gallery Image 1' },
    { id: 2, src: '/images/gallery/image 01 (2).webp', alt: 'School Gallery Image 2' },
    { id: 3, src: '/images/gallery/image 01 (3).webp', alt: 'School Gallery Image 3' },
    { id: 4, src: '/images/gallery/image 01 (4).webp', alt: 'School Gallery Image 4' },
    { id: 5, src: '/images/gallery/image 01 (5).webp', alt: 'School Gallery Image 5' },
    { id: 6, src: '/images/gallery/image 01 (6).webp', alt: 'School Gallery Image 6' },
    { id: 7, src: '/images/gallery/image 01 (7).webp', alt: 'School Gallery Image 7' },
    { id: 8, src: '/images/gallery/image 01 (8).webp', alt: 'School Gallery Image 8' },
    { id: 9, src: '/images/gallery/image 01 (9).webp', alt: 'School Gallery Image 9' },
    { id: 10, src: '/images/gallery/image 01 (10).webp', alt: 'School Gallery Image 10' },
    { id: 11, src: '/images/gallery/image 01 (11).webp', alt: 'School Gallery Image 11' },
    { id: 12, src: '/images/gallery/image 01 (12).webp', alt: 'School Gallery Image 12' },
    { id: 13, src: '/images/gallery/image 01 (13).webp', alt: 'School Gallery Image 13' },
    { id: 14, src: '/images/gallery/image 01 (14).webp', alt: 'School Gallery Image 14' },
    { id: 15, src: '/images/gallery/image 01 (15).webp', alt: 'School Gallery Image 15' },
    { id: 16, src: '/images/gallery/image 01 (16).webp', alt: 'School Gallery Image 16' },
    { id: 17, src: '/images/gallery/image 01 (17).webp', alt: 'School Gallery Image 17' },
    { id: 18, src: '/images/gallery/image 01 (18).webp', alt: 'School Gallery Image 18' },
    { id: 19, src: '/images/gallery/image 01 (19).webp', alt: 'School Gallery Image 19' },
    { id: 20, src: '/images/gallery/image 01 (20).webp', alt: 'School Gallery Image 20' },
    { id: 21, src: '/images/gallery/image 01 (21).webp', alt: 'School Gallery Image 21' },
    { id: 22, src: '/images/gallery/image 01 (22).webp', alt: 'School Gallery Image 22' },
    { id: 23, src: '/images/gallery/image 01 (23).webp', alt: 'School Gallery Image 23' },
    { id: 24, src: '/images/gallery/image 01 (24).webp', alt: 'School Gallery Image 24' },
    { id: 25, src: '/images/gallery/image 01 (25).webp', alt: 'School Gallery Image 25' },
    { id: 26, src: '/images/gallery/image 01 (26).webp', alt: 'School Gallery Image 26' },
    { id: 27, src: '/images/gallery/image 01 (27).webp', alt: 'School Gallery Image 27' },
    { id: 28, src: '/images/gallery/image 01 (28).webp', alt: 'School Gallery Image 28' },
    { id: 29, src: '/images/gallery/image 01 (29).webp', alt: 'School Gallery Image 29' },
    { id: 30, src: '/images/gallery/image 01 (30).webp', alt: 'School Gallery Image 30' },
    { id: 31, src: '/images/gallery/image 01 (31).webp', alt: 'School Gallery Image 31' },
    { id: 32, src: '/images/gallery/image 01 (32).webp', alt: 'School Gallery Image 32' },
    { id: 33, src: '/images/gallery/image 01 (33).webp', alt: 'School Gallery Image 33' },
    { id: 34, src: '/images/gallery/image 01 (34).webp', alt: 'School Gallery Image 34' },
    { id: 35, src: '/images/gallery/image 01 (35).webp', alt: 'School Gallery Image 35' },
    { id: 36, src: '/images/gallery/image 01 (36).webp', alt: 'School Gallery Image 36' },
    { id: 37, src: '/images/gallery/image 01 (37).webp', alt: 'School Gallery Image 37' },
    { id: 38, src: '/images/gallery/image 01 (38).webp', alt: 'School Gallery Image 38' },
    { id: 39, src: '/images/gallery/image 01 (39).webp', alt: 'School Gallery Image 39' },
    { id: 40, src: '/images/gallery/image 01 (40).webp', alt: 'School Gallery Image 40' },
    { id: 41, src: '/images/gallery/image 01 (41).webp', alt: 'School Gallery Image 41' },
    { id: 42, src: '/images/gallery/image 01 (42).webp', alt: 'School Gallery Image 42' },
    { id: 43, src: '/images/gallery/image 01 (43).webp', alt: 'School Gallery Image 43' },
    { id: 44, src: '/images/gallery/image 01 (44).webp', alt: 'School Gallery Image 44' },
    { id: 45, src: '/images/gallery/image 01 (45).webp', alt: 'School Gallery Image 45' },
    { id: 46, src: '/images/gallery/image 01 (46).webp', alt: 'School Gallery Image 46' },
    { id: 47, src: '/images/gallery/image 01 (47).webp', alt: 'School Gallery Image 47' },
    { id: 48, src: '/images/gallery/image 01 (48).webp', alt: 'School Gallery Image 48' },
    { id: 49, src: '/images/gallery/image 01 (49).webp', alt: 'School Gallery Image 49' },
    { id: 50, src: '/images/gallery/image 01 (50).webp', alt: 'School Gallery Image 50' },
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    return (
        <main className="pt-24">
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/campus_exterior.jpg"
                        alt="Campus"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="section-padding relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 bg-springer-red text-white text-sm font-medium rounded-full mb-4">
                            Photo Gallery
                        </span>
                        <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6">
                            Explore Our <span className="text-springer-red">Campus Life</span>
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            Take a visual journey through Springer Public School. From our state-of-the-art facilities
                            to memorable moments of student achievements, explore the vibrant life at our campus.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 lg:py-28 bg-white">
                <div className="section-padding">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-4"
                    >
                        {galleryImages.map((image, index) => {
                            const heightVariants = [
                                'row-span-1',
                                'row-span-2',
                                'row-span-1',
                                'row-span-2',
                                'row-span-1',
                                'row-span-1',
                                'row-span-2',
                                'row-span-1',
                            ];
                            const heightClass = heightVariants[index % heightVariants.length];

                            return (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.02 }}
                                    className={`${heightClass} group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300`}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Hover Icon */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                            <Camera className="w-4 h-4 text-springer-red" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-springer-red transition-colors duration-200 z-10"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-6xl max-h-[90vh] w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    className="object-contain"
                                    sizes="90vw"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
