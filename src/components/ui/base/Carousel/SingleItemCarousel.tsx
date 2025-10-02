'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SingleItemCarouselProps } from './Carousel.types';
import { useCarousel } from './hooks/useCarousel';
import { cn } from '#/lib/utils/cn';

const SingleItemCarousel: React.FC<SingleItemCarouselProps> = ({
    children,
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

    if (!children.length) return null;

    return (
        <div
            className={cn(
                `relative mx-auto rounded-lg overflow-hidden bg-[var(--lightBg)] border-[var(--borderColor)] shadow-md p-[var(--pad12px)]`,
                className,
                `max-w-[var(--maxWidth-${size})]`
            )}
        >
            <div className="relative overflow-hidden rounded-lg">
                {fade ? (
                    <div className="relative">
                        {children.map((child, index: number) => (
                            <div
                                key={index}
                                className={cn(
                                    'transition-opacity duration-500',
                                    index === currentIndex
                                        ? 'opacity-100'
                                        : 'opacity-0 absolute inset-0'
                                )}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {children.map((child, index: number) => (
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
                            disabled={currentIndex === 0}
                            className={cn(
                                'absolute left-4 top-1/2 -translate-y-1/2 rounded-full',
                                'bg-[var(--background)] border-[var(--borderColor)]',
                                'text-[var(--text)] shadow hover:bg-[var(--text)] transition-colors',
                                'flex items-center justify-center',
                                'w-8 h-8 md:w-10 md:h-10 z-10'
                            )}
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex === children.length - 1}
                            className={cn(
                                'absolute right-4 top-1/2 -translate-y-1/2 rounded-full',
                                'bg-[var(--background)] border-[var(--borderColor)]',
                                'text-[var(--text)] shadow hover:bg-[var(--text)] transition-colors',
                                'flex items-center justify-center',
                                'w-8 h-8 md:w-10 md:h-10 z-10'
                            )}
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator */}
            {showDots && children.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {children.map((_: React.ReactNode, index: number) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                'rounded-full transition-colors w-3 h-3',
                                index === currentIndex
                                    ? 'bg-[var(--text)]'
                                    : 'bg-[var(--secondary)]'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SingleItemCarousel;
