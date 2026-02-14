'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * StackedImageSlider Component
 * 
 * A premium image slider featuring a 3D-like stacking effect where images
 * are tilted to the left and layered. It includes auto-play and manual navigation.
 */

// --- Configuration ---
const SLIDE_DURATION = 4000; // Time in ms between slides
const ANIMATION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)';

const IMAGES = [
    '/images/about-intro/1.webp',
    '/images/about-intro/2.webp',
    '/images/about-intro/3.webp',
    '/images/about-intro/4.webp',
];

const ImageStack = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
        }, SLIDE_DURATION);

        return () => clearInterval(interval);
    }, []);

    /**
     * Calculates the visual styles for an image based on its position in the stack.
     * Left-sided tilt transformation (Original design).
     */
    const getImageStyle = (index: number) => {
        const totalImages = IMAGES.length;
        const position = (index - currentIndex + totalImages) % totalImages;

        const baseStyle: React.CSSProperties = {
            position: 'absolute',
            transition: `all 0.8s ${ANIMATION_TIMING}`,
            width: '100%',
            height: '100%',
        };

        // Front image (Position 0) - Most prominent, tilted left
        if (position === 0) {
            return {
                ...baseStyle,
                transform: 'rotate(-8deg) translateX(0%) translateY(0%) scale(1)',
                zIndex: 30,
                opacity: 1,
            };
        }
        // Second image (Position 1) - Peeking from behind on the right
        else if (position === 1) {
            return {
                ...baseStyle,
                transform: 'rotate(-4deg) translateX(15%) translateY(-8%) scale(0.92)',
                zIndex: 20,
                opacity: 0.9,
            };
        }
        // Third image (Position 2) - Further back and slightly higher on the right
        else if (position === 2) {
            return {
                ...baseStyle,
                transform: 'rotate(0deg) translateX(25%) translateY(-15%) scale(0.84)',
                zIndex: 10,
                opacity: 0.7,
            };
        }
        // Background/Hidden images (Position 3+)
        else {
            return {
                ...baseStyle,
                transform: 'rotate(4deg) translateX(-30%) translateY(10%) scale(0.8)',
                zIndex: 0,
                opacity: 0,
            };
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center py-6 md:py-12 px-4">
            {/* Container with responsive sizing */}
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-[4/3]">
                {IMAGES.map((image, index) => (
                    <div
                        key={index}
                        style={getImageStyle(index)}
                        className="absolute inset-0"
                    >
                        <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white border border-white/20">
                            <Image
                                src={image}
                                alt={`Slide ${index + 1}`}
                                fill
                                sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 450px, 500px"
                                className="object-cover"
                                priority={index === currentIndex}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination dots with responsive spacing */}
            <div className="mt-8 md:mt-12 lg:mt-16 flex gap-2 md:gap-3">
                {IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-8 md:w-10 bg-springer-red shadow-lg shadow-springer-red/30'
                                : 'w-2 md:w-2.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageStack;