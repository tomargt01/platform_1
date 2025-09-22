'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageCarouselProps, IndicatorType } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    theme = 'light',
    size = 'md',
    controls = {},
    aspectRatio = '16/9',
    objectFit = 'cover',
    overlayType = 'bottom',
    showTextOverlay = false,
    className = '',
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = false,
        autoPlayInterval = 3000,
        loop = true,
        infiniteLoop = false,
        indicatorType = 'dots',
    } = controls;

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength: images.length,
        autoPlay,
        autoPlayInterval,
        loop,
        infiniteLoop,
    });

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    if (!images.length) return null;

    const getIndicatorContent = (index: number, type: IndicatorType) => {
        switch (type) {
            case 'numeric':
                return (index + 1).toString();
            case 'roman':
                const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
                return romanNumerals[index] || (index + 1).toString();
            case 'alphabetic':
                return String.fromCharCode(65 + index); // A, B, C...
            case 'squares':
                return '■';
            case 'diamonds':
                return '♦';
            default:
                return '•';
        }
    };

    const getOverlayClasses = () => {
        switch (overlayType) {
            case 'center':
                return 'absolute inset-0 flex items-center justify-center';
            case 'top':
                return 'absolute top-0 left-0 right-0';
            case 'bottom':
            default:
                return 'absolute bottom-0 left-0 right-0';
        }
    };

    return (
        <div className={`relative ${sizeClasses.container} mx-auto ${className}`}>
            {/* Main Image */}
            <div className={`relative overflow-hidden rounded-lg ${themeColors.background}`}>
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className="w-full flex-shrink-0 relative"
                            style={{ aspectRatio }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={`w-full h-full object-${objectFit}`}
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />

                            {/* Text Overlay */}
                            {showTextOverlay && (image.title || image.caption || image.description) && (
                                <div className={`${getOverlayClasses()} ${themeColors.overlay || 'bg-black bg-opacity-50'} text-white p-4`}>
                                    <div className={`${overlayType === 'center' ? 'text-center' : ''}`}>
                                        {image.title && (
                                            <h3 className={`${sizeClasses.title} font-bold mb-2`}>
                                                {image.title}
                                            </h3>
                                        )}
                                        {image.description && (
                                            <p className={`${sizeClasses.text} mb-2`}>
                                                {image.description}
                                            </p>
                                        )}
                                        {image.caption && (
                                            <p className={`${sizeClasses.text} opacity-90`}>
                                                {image.caption}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Regular caption (when overlay is disabled) */}
                            {!showTextOverlay && image.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                    <p className={sizeClasses.text}>{image.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {showArrows && images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10`}
                        >
                            <ChevronLeft className="w-1/2 h-1/2" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10`}
                        >
                            <ChevronRight className="w-1/2 h-1/2" />
                        </button>
                    </>
                )}
            </div>

            {/* Enhanced Indicators */}
            {showDots && images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-colors flex items-center justify-center ${indicatorType === 'numeric' || indicatorType === 'roman' || indicatorType === 'alphabetic'
                                    ? `w-8 h-8 rounded text-sm font-medium ${index === currentIndex
                                        ? `${themeColors.activeDot} text-white`
                                        : `${themeColors.dot} ${themeColors.text} hover:${themeColors.activeDot} hover:text-white`
                                    }`
                                    : `rounded-full ${sizeClasses.dot} ${index === currentIndex ? themeColors.activeDot : themeColors.dot
                                    }`
                                }`}
                        >
                            {(indicatorType === 'numeric' || indicatorType === 'roman' || indicatorType === 'alphabetic')
                                ? getIndicatorContent(index, indicatorType)
                                : indicatorType === 'squares' || indicatorType === 'diamonds'
                                    ? <span className={`${index === currentIndex ? themeColors.activeDot.replace('bg-', 'text-') : themeColors.dot.replace('bg-', 'text-')}`}>
                                        {getIndicatorContent(index, indicatorType)}
                                    </span>
                                    : null
                            }
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
