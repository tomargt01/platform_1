'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TestimonialCarouselProps } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
    testimonials,
    theme = 'light',
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

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength: testimonials.length,
        autoPlay,
        autoPlayInterval,
        loop,
    });

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    if (!testimonials.length) return null;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className={`relative ${sizeClasses.container} mx-auto ${className}`}>
            <div className={`${themeColors.card} rounded-lg ${themeColors.shadow} ${sizeClasses.padding} text-center relative overflow-hidden`}>
                {/* Quote Icon */}
                <div className={`flex justify-center mb-4`}>
                    <Quote className={`w-8 h-8 ${themeColors.accent} opacity-50`} />
                </div>

                {/* Testimonial Content */}
                <div className="min-h-[200px] flex flex-col justify-center">
                    <blockquote className={`${sizeClasses.text} ${themeColors.text} mb-6 leading-relaxed max-w-3xl mx-auto`}>
                        "{currentTestimonial.content}"
                    </blockquote>

                    {/* Rating */}
                    {showRating && currentTestimonial.rating && (
                        <div className="flex justify-center mb-4">
                            {renderStars(currentTestimonial.rating)}
                        </div>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center justify-center space-x-4">
                        {showAvatar && currentTestimonial.avatar && (
                            <img
                                src={currentTestimonial.avatar}
                                alt={currentTestimonial.author}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        )}

                        <div className="text-left">
                            <div className={`font-semibold ${themeColors.text} ${sizeClasses.text}`}>
                                {currentTestimonial.author}
                            </div>
                            {currentTestimonial.role && (
                                <div className={`text-sm ${themeColors.accent} opacity-80`}>
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
            {showDots && testimonials.length > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                    {testimonials.map((_, index) => (
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

export default TestimonialCarousel;
