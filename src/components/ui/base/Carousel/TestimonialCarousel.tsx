'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TestimonialCarouselProps } from './Carousel.types';
import { useCarousel } from './hooks/useCarousel';
import { cn } from '#/lib/utils/cn';

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
    testimonials,
    size = 'md',
    controls = {},
    showAvatar = true,
    showRating = true,
    className = '',
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = true,
        autoPlayInterval = 5000,
        loop = true,
    } = controls;

    const { currentIndex, nextSlide, prevSlide, goToSlide, isAnimating } = useCarousel({
        itemsLength: testimonials.length,
        autoPlay,
        autoPlayInterval,
        loop,
    });

    if (!testimonials.length) return null;

    // Rating stars (uses Tailwind colors directly—replace if you use CSS vars for stars)
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className={cn('relative', className)}>
            <div
                className="rounded-lg overflow-hidden text-center relative"
                style={{
                    backgroundColor: 'var(--lightBg)',
                    border: 'var(--1pxSolidBorder) var(--borderColor)',
                    boxShadow: 'var(--shadow-md)',
                    padding: 'var(--pad12px)',
                    borderRadius: 'var(--radius6px)',
                    maxWidth: `var(--maxWidth-${size})`,
                }}
            >
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                    <Quote className="w-8 h-8 text-[var(--accent)] opacity-50" />
                </div>

                {/* Testimonial Content */}
                <div className="min-h-[200px] flex flex-col justify-center">
                    <blockquote className="mb-6 leading-relaxed max-w-3xl mx-auto text-[var(--text)] text-base">
                        "{currentTestimonial.content}"
                    </blockquote>

                    {/* Rating */}
                    {showRating && currentTestimonial.rating && (
                        <div className="flex justify-center mb-4">
                            {renderStars(currentTestimonial.rating)}
                        </div>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center justify-center gap-4">
                        {showAvatar && currentTestimonial.avatar && (
                            <img
                                src={currentTestimonial.avatar}
                                alt={currentTestimonial.author}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        )}

                        <div className="text-left">
                            <div className="font-semibold text-[var(--text)] text-base">
                                {currentTestimonial.author}
                            </div>
                            {currentTestimonial.role && (
                                <div className="text-sm text-[var(--accent)] opacity-80">
                                    {currentTestimonial.role}
                                    {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                {showArrows && testimonials.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            disabled={isAnimating}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={isAnimating}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10"
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator */}
            {showDots && testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={cn(
                                'rounded-full transition-colors w-3 h-3',
                                idx === currentIndex
                                    ? 'bg-[var(--text)]'
                                    : 'bg-[var(--secondary)]'
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestimonialCarousel;
