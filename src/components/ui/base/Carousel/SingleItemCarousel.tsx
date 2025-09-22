'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SingleItemCarouselProps } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const SingleItemCarousel: React.FC<SingleItemCarouselProps> = ({
    children,
    theme = 'light',
    size = 'md',
    controls = {},
    fade = false,
    className = '',
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = false,
        autoPlayInterval = 3000,
        loop = true,
    } = controls;

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength: children.length,
        autoPlay,
        autoPlayInterval,
        loop,
    });

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    if (!children.length) return null;

    return (
        <div className={`relative ${sizeClasses.container} mx-auto ${className}`}>
            <div className="relative overflow-hidden rounded-lg">
                {fade ? (
                    // Fade transition
                    <div className="relative">
                        {children.map((child, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                    }`}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                ) : (
                    // Slide transition
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {children.map((child, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                {child}
                            </div>
                        ))}
                    </div>
                )}

                {/* Navigation Arrows */}
                {showArrows && children.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10 transition-all`}
                        >
                            <ChevronLeft className="w-1/2 h-1/2" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10 transition-all`}
                        >
                            <ChevronRight className="w-1/2 h-1/2" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator */}
            {showDots && children.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    {children.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`rounded-full ${sizeClasses.dot} transition-colors ${index === currentIndex ? themeColors.activeDot : themeColors.dot
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SingleItemCarousel;
