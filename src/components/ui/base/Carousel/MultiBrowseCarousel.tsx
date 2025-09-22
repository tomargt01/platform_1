'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MultiBrowseCarouselProps } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const MultiBrowseCarousel: React.FC<MultiBrowseCarouselProps> = ({
    children,
    theme = 'light',
    size = 'md',
    controls = {},
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
    gap = '1rem',
    className = '',
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = false,
        autoPlayInterval = 3000,
        loop = false,
    } = controls;

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength: Math.max(0, children.length - itemsPerView.desktop + 1),
        autoPlay,
        autoPlayInterval,
        loop,
    });

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    if (!children.length) return null;

    return (
        <div className={`relative ${className}`}>
            <div className="overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
                        gap
                    }}
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0"
                            style={{
                                width: `calc(${100 / itemsPerView.desktop}% - ${gap})`,
                            }}
                        >
                            <div className="block sm:hidden">
                                <div style={{ width: `calc(${100 / itemsPerView.mobile}% - ${gap})` }}>
                                    {child}
                                </div>
                            </div>
                            <div className="hidden sm:block md:hidden">
                                <div style={{ width: `calc(${100 / itemsPerView.tablet}% - ${gap})` }}>
                                    {child}
                                </div>
                            </div>
                            <div className="hidden md:block">
                                {child}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {showArrows && children.length > itemsPerView.desktop && (
                <>
                    <button
                        onClick={prevSlide}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10 transition-all`}
                    >
                        <ChevronLeft className="w-1/2 h-1/2" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10 transition-all`}
                    >
                        <ChevronRight className="w-1/2 h-1/2" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {showDots && children.length > itemsPerView.desktop && (
                <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: Math.max(0, children.length - itemsPerView.desktop + 1) }, (_, index) => (
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

export default MultiBrowseCarousel;
