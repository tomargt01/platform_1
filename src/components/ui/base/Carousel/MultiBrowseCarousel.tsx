'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MultiBrowseCarouselProps } from './Carousel.types';
import { useCarousel } from './hooks/useCarousel';
import { cn } from '#/lib/utils/cn';

const MultiBrowseCarousel: React.FC<MultiBrowseCarouselProps> = ({
    children,
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

    const slideCount = Math.max(0, React.Children.count(children) - itemsPerView.desktop + 1);

    const { currentIndex, nextSlide, prevSlide, goToSlide, isAnimating } = useCarousel({
        itemsLength: slideCount,
        autoPlay,
        autoPlayInterval,
        loop,
    });

    if (React.Children.count(children) === 0) return null;

    return (
        <div className={cn('relative', className)}>
            <div className="rounded-lg overflow-hidden border-[var(--borderColor)] bg-[var(--lightBg)] shadow-lg p-[var(--pad12px)]">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
                        gap,
                    }}
                >
                    {React.Children.map(children, (child, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0"
                            style={{ width: `calc(${100 / itemsPerView.desktop}% - ${gap})` }}
                        >
                            <div className="block sm:hidden">
                                <div style={{ width: `calc(${100 / itemsPerView.mobile}% - ${gap})` }}>{child}</div>
                            </div>
                            <div className="hidden sm:block md:hidden">
                                <div style={{ width: `calc(${100 / itemsPerView.tablet}% - ${gap})` }}>{child}</div>
                            </div>
                            <div className="hidden md:block">{child}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {showArrows && React.Children.count(children) > itemsPerView.desktop && (
                <>
                    <button
                        onClick={prevSlide}
                        disabled={isAnimating}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-all flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={isAnimating}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-all flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                        aria-label="Next Slide"
                    >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {showDots && React.Children.count(children) > itemsPerView.desktop && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: slideCount }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                'rounded-full transition-colors',
                                index === currentIndex ? 'bg-[var(--text)]' : 'bg-[var(--secondary)]',
                                size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiBrowseCarousel;
