'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useCarousel } from './hooks/useCarousel';
import { cn } from '#/lib/utils/cn';

export interface ContentSlide {
    id: string;
    title: string;
    content: string;
    image?: string;
    cta?: {
        text: string;
        onClick: () => void;
    };
}

export interface ContentCarouselProps {
    content: ContentSlide[];
    size?: 'sm' | 'md' | 'lg';
    controls?: {
        showArrows?: boolean;
        showDots?: boolean;
        autoPlay?: boolean;
        autoPlayInterval?: number;
        loop?: boolean;
    };
    layout?: 'image-left' | 'image-right' | 'image-top';
    className?: string;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({
    content,
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

    if (!content.length) return null;

    const currentContent = content[currentIndex];

    const getLayoutClasses = () => {
        switch (layout) {
            case 'image-right': return 'flex-row-reverse';
            case 'image-top': return 'flex-col';
            default: return 'flex-row';
        }
    };

    return (
        <div className={cn('relative mx-auto', className)}>
            <div
                className={cn(
                    'rounded-lg overflow-hidden shadow-md',
                    'bg-[var(--lightBg)] border-[var(--borderColor)]',
                    `p-[var(--pad12px)]`,
                    `max-w-[var(--maxWidth-${size})]`,
                    'transition-shadow duration-200'
                )}
            >
                <div
                    className={cn(
                        'flex items-center min-h-[400px]',
                        getLayoutClasses(),
                        layout === 'image-top' ? 'flex-col' : 'md:flex-row flex-col'
                    )}
                >
                    {/* Image Section */}
                    {currentContent.image && (
                        <div
                            className={cn(
                                layout === 'image-top' ? 'w-full' : 'w-full md:w-1/2',
                                layout === 'image-top' ? 'h-48' : 'h-64 md:h-auto'
                            )}
                        >
                            <img
                                src={currentContent.image}
                                alt={currentContent.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content Section */}
                    <div
                        className={cn(
                            currentContent.image
                                ? layout === 'image-top'
                                    ? 'w-full'
                                    : 'w-full md:w-1/2'
                                : 'w-full',
                            'flex flex-col justify-center'
                        )}
                    >
                        <h2
                            className={cn(
                                'font-bold mb-4 leading-tight',
                                'text-[var(--text)]',
                                size === 'sm' ? 'text-lg' :
                                    size === 'md' ? 'text-xl' :
                                        'text-2xl'
                            )}
                        >
                            {currentContent.title}
                        </h2>

                        <p
                            className={cn(
                                'opacity-80 leading-relaxed mb-6',
                                'text-[var(--text)]',
                                size === 'sm' ? 'text-sm' :
                                    size === 'md' ? 'text-base' :
                                        'text-lg'
                            )}
                        >
                            {currentContent.content}
                        </p>

                        {currentContent.cta && (
                            <div>
                                <button
                                    onClick={currentContent.cta.onClick}
                                    className="bg-[var(--text)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity flex items-center space-x-2 group"
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
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-lg hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-lg hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator */}
            {showDots && content.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {content.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                'rounded-full transition-colors',
                                index === currentIndex
                                    ? 'bg-[var(--text)]'
                                    : 'bg-[var(--secondary)]',
                                size === 'sm' ? 'w-2 h-2' :
                                    size === 'md' ? 'w-3 h-3' :
                                        'w-4 h-4'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentCarousel;
