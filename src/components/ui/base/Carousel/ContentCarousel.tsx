'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ContentCarouselProps } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const ContentCarousel: React.FC<ContentCarouselProps> = ({
    content,
    theme = 'light',
    size = 'md',
    controls = {},
    layout = 'image-left',
    className = '',
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = false,
        autoPlayInterval = 4000,
        loop = true,
    } = controls;

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength: content.length,
        autoPlay,
        autoPlayInterval,
        loop,
    });

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    if (!content.length) return null;

    const currentContent = content[currentIndex];

    const getLayoutClasses = () => {
        switch (layout) {
            case 'image-right':
                return 'flex-row-reverse';
            case 'image-top':
                return 'flex-col';
            default:
                return 'flex-row';
        }
    };

    return (
        <div className={`relative ${sizeClasses.container} mx-auto ${className}`}>
            <div className={`${themeColors.card} rounded-lg ${themeColors.shadow} overflow-hidden`}>
                <div className={`flex ${getLayoutClasses()} ${layout === 'image-top' ? 'flex-col' : 'md:flex-row flex-col'} items-center min-h-[400px]`}>
                    {/* Image Section */}
                    {currentContent.image && (
                        <div className={`${layout === 'image-top' ? 'w-full' : 'w-full md:w-1/2'} ${layout === 'image-top' ? 'h-48' : 'h-64 md:h-auto'}`}>
                            <img
                                src={currentContent.image}
                                alt={currentContent.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className={`${currentContent.image ? (layout === 'image-top' ? 'w-full' : 'w-full md:w-1/2') : 'w-full'} ${sizeClasses.padding} flex flex-col justify-center`}>
                        <h2 className={`${sizeClasses.title} font-bold ${themeColors.text} mb-4 leading-tight`}>
                            {currentContent.title}
                        </h2>

                        <p className={`${sizeClasses.text} ${themeColors.text} opacity-80 leading-relaxed mb-6`}>
                            {currentContent.content}
                        </p>

                        {currentContent.cta && (
                            <div>
                                <button
                                    onClick={currentContent.cta.onClick}
                                    className={`${themeColors.activeDot} text-white px-6 py-3 rounded-md hover:opacity-90 transition-all flex items-center space-x-2 group`}
                                >
                                    <span>{currentContent.cta.text}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Arrows */}
                {showArrows && content.length > 1 && (
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
            {showDots && content.length > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                    {content.map((_, index) => (
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

export default ContentCarousel;
