'use client';
import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps {
    itemsLength: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    infiniteLoop?: boolean; // New: seamless infinite loop
}

export const useCarousel = ({
    itemsLength,
    autoPlay = false,
    autoPlayInterval = 3000,
    loop = true,
    infiniteLoop = false // New feature
}: UseCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToSlide = useCallback((index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 300);
    }, [isAnimating]);

    const nextSlide = useCallback(() => {
        if (isAnimating) return;

        if (infiniteLoop) {
            // Seamless infinite loop: 1→2→3→1
            const nextIndex = (currentIndex + 1) % itemsLength;
            goToSlide(nextIndex);
        } else if (loop) {
            // Regular loop with bounds check
            const nextIndex = currentIndex === itemsLength - 1 ? 0 : currentIndex + 1;
            goToSlide(nextIndex);
        } else {
            // No loop - stop at end
            const nextIndex = Math.min(currentIndex + 1, itemsLength - 1);
            goToSlide(nextIndex);
        }
    }, [currentIndex, itemsLength, loop, infiniteLoop, goToSlide, isAnimating]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;

        if (infiniteLoop) {
            // Seamless infinite loop: 3→2→1→3
            const prevIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1;
            goToSlide(prevIndex);
        } else if (loop) {
            // Regular loop
            const prevIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1;
            goToSlide(prevIndex);
        } else {
            // No loop - stop at start
            const prevIndex = Math.max(currentIndex - 1, 0);
            goToSlide(prevIndex);
        }
    }, [currentIndex, itemsLength, loop, infiniteLoop, goToSlide, isAnimating]);

    useEffect(() => {
        if (autoPlay && itemsLength > 1) {
            const interval = setInterval(nextSlide, autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [autoPlay, autoPlayInterval, nextSlide, itemsLength]);

    return {
        currentIndex,
        nextSlide,
        prevSlide,
        goToSlide,
        isAnimating,
    };
};
