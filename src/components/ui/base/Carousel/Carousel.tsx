"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselProps } from "./Carousel.types";
import { useCarousel } from "./hooks/useCarousel";
import { cn } from "#/lib/utils/cn";

const Carousel: React.FC<CarouselProps> = ({
    items,
    size = "md",
    controls = {},
    className = "",
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = false,
        autoPlayInterval = 3000,
        loop = true,
        infiniteLoop = false,
    } = controls;

    const { currentIndex, nextSlide, prevSlide, goToSlide, isAnimating } =
        useCarousel({
            itemsLength: items.length,
            autoPlay,
            autoPlayInterval,
            loop,
            infiniteLoop,
        });

    if (!items.length) return null;

    return (
        <div
            className={cn(
                "relative w-full mx-auto overflow-hidden",
                className
            )}
            style={{
                maxWidth: `var(--maxWidth-${size})`,
                padding: "var(--pad12px)",
                borderRadius: "var(--radius6px)",
                backgroundColor: "var(--background)",
                border: "var(--1pxSolidBorder) var(--borderColor)",
                boxShadow: "var(--shadow-lg)",
            }}
        >
            {/* Carousel Items Container */}
            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-full"
                            style={{ borderRadius: "var(--radius6px)" }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrows */}
            {showArrows && items.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        disabled={isAnimating}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--accent)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={isAnimating}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--accent)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10"
                        aria-label="Next Slide"
                    >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </>
            )}

            {/* Dots Indicators */}
            {showDots && items.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={cn(
                                "rounded-full transition-colors w-3 h-3",
                                idx === currentIndex
                                    ? "bg-[var(--accent)]"
                                    : "bg-[var(--dot)]"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;
