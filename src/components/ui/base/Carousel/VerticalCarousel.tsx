'use client';
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { VerticalCarouselProps } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
    children,
    theme = 'light',
    size = 'md',
    controls = {},
    height = '400px',
    itemHeight = '100px',
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
        <div className={`relative ${className}`}>
            <div
                className="relative overflow-hidden rounded-lg"
                style={{ height }}
            >
                <div
                    className="flex flex-col transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateY(-${currentIndex * parseInt(itemHeight)}px)`,
                        height: `${children.length * parseInt(itemHeight)}px`
                    }}
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0"
                            style={{ height: itemHeight }}
                        >
                            {child}
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {showArrows && children.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`absolute left-1/2 -translate-x-1/2 top-2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10 transition-all`}
                        >
                            <ChevronUp className="w-1/2 h-1/2" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`absolute left-1/2 -translate-x-1/2 bottom-2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10 transition-all`}
                        >
                            <ChevronDown className="w-1/2 h-1/2" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator - Vertical */}
            {showDots && children.length > 1 && (
                <div className="flex flex-col space-y-2 absolute right-4 top-1/2 -translate-y-1/2">
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

export default VerticalCarousel;
