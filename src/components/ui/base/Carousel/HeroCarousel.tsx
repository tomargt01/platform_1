'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroCarouselProps } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const HeroCarousel: React.FC<HeroCarouselProps> = ({
    slides,
    theme = 'light',
    size = 'lg',
    controls = {},
    height = '60vh',
    overlayOpacity = 0.4,
    className = '',
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = true,
        autoPlayInterval = 5000,
        loop = true,
    } = controls;

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength: slides.length,
        autoPlay,
        autoPlayInterval,
        loop,
    });

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    if (!slides.length) return null;

    return (
        <div className={`relative w-full ${className}`} style={{ height }}>
            <div className="relative w-full h-full overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                        >
                            {slide.overlay && (
                                <div
                                    className="absolute inset-0 bg-black"
                                    style={{ opacity: overlayOpacity }}
                                />
                            )}

                            <div className="relative z-10 h-full flex items-center justify-center">
                                <div className="text-center text-white max-w-4xl px-6">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                        {slide.title}
                                    </h1>
                                    {slide.subtitle && (
                                        <h2 className="text-xl md:text-2xl mb-6 opacity-90">
                                            {slide.subtitle}
                                        </h2>
                                    )}
                                    {slide.description && (
                                        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                                            {slide.description}
                                        </p>
                                    )}

                                    {slide.cta && (
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            {slide.cta.primary && (
                                                <button
                                                    onClick={slide.cta.primary.onClick}
                                                    className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                                >
                                                    {slide.cta.primary.text}
                                                </button>
                                            )}
                                            {slide.cta.secondary && (
                                                <button
                                                    onClick={slide.cta.secondary.onClick}
                                                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                                                >
                                                    {slide.cta.secondary.text}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {showArrows && slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className={`absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white ${sizeClasses.arrow} flex items-center justify-center backdrop-blur-sm transition-all z-20`}
                    >
                        <ChevronLeft className="w-1/2 h-1/2" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white ${sizeClasses.arrow} flex items-center justify-center backdrop-blur-sm transition-all z-20`}
                    >
                        <ChevronRight className="w-1/2 h-1/2" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {showDots && slides.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-white scale-125'
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroCarousel;
