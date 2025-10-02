'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageCarouselProps, IndicatorType } from './Carousel.types';
import { useCarousel } from './hooks/useCarousel';
import { cn } from '#/lib/utils/cn';

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
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
        <div
            className={cn(
                `relative mx-auto rounded-lg overflow-hidden bg-[var(--lightBg)] border-[var(--borderColor)] shadow-lg p-[var(--pad12px)]`,
                className,
                `max-w-[var(--maxWidth-${size})]`
            )}
        >
            {/* Images Container */}
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index: number) => (
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

                            {/* Overlay (Text, Caption) */}
                            {showTextOverlay && (image.title || image.caption || image.description) && (
                                <div
                                    className={`${getOverlayClasses()} bg-[var(--overlay)] text-[var(--text)] p-[var(--pad16px)]`}
                                >
                                    <div className={`${overlayType === 'center' ? 'text-center' : ''}`}>
                                        {image.title && (
                                            <h3 className="font-bold mb-2 text-xl">{image.title}</h3>
                                        )}
                                        {image.description && (
                                            <p className="mb-2">{image.description}</p>
                                        )}
                                        {image.caption && (
                                            <p className="opacity-90">{image.caption}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Regular Caption (when overlay is disabled) */}
                            {!showTextOverlay && image.caption && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-[var(--overlay)] text-[var(--text)] p-[var(--pad16px)]"
                                >
                                    <p>{image.caption}</p>
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
                            disabled={currentIndex === 0}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex === images.length - 1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots & Indicators */}
            {showDots && images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {images.map((_: typeof images[0], index: number) => {
                        const isActive = index === currentIndex;
                        const baseClass = cn(
                            'flex items-center justify-center transition-colors',
                            {
                                'w-8 h-8 rounded-full font-medium': indicatorType === 'numeric' || indicatorType === 'roman' || indicatorType === 'alphabetic',
                                'rounded-full w-3 h-3': indicatorType === 'dots' || indicatorType === 'squares' || indicatorType === 'diamonds',
                            }
                        );
                        const variantClass = isActive
                            ? 'bg-[var(--text)] text-white'
                            : 'bg-[var(--secondary)] hover:bg-[var(--text)] hover:text-white';
                        const content = getIndicatorContent(index, indicatorType);
                        return (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`${baseClass} ${variantClass}`}
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                {indicatorType !== 'dots' && (indicatorType !== 'squares' && indicatorType !== 'diamonds')
                                    ? content
                                    : indicatorType === 'squares' || indicatorType === 'diamonds'
                                        ? <span className={`${isActive ? 'text-[var(--secondary)]' : 'text-[var(--dot)]'}`}>{content}</span>
                                        : null
                                }
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
