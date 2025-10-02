"use client";
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { VerticalCarouselProps } from "./Carousel.types";
import { useCarousel } from "./hooks/useCarousel";
import { cn } from "#/lib/utils/cn";

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
    children,
    size = "md",
    controls = {},
    height = "400px",
    itemHeight = "100px",
    className = "",
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

    const itemHeightPx = parseInt(itemHeight, 10);

    return (
        <div className={cn("relative", className)}>
            <div
                className="relative overflow-hidden rounded-lg"
                style={{
                    height,
                    maxWidth: `var(--maxWidth-${size})`,
                    borderRadius: "var(--radius6px)",
                    border: "var(--1pxSolidBorder) var(--borderColor)",
                    backgroundColor: "var(--lightBg)",
                    padding: "var(--pad12px)",
                }}
            >
                <div
                    className="flex flex-col transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateY(-${currentIndex * itemHeightPx}px)`,
                        height: `${children.length * itemHeightPx}px`,
                    }}
                >
                    {children.map((child: React.ReactNode, index: number) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex items-center justify-center"
                            style={{ height: itemHeight }}
                        >
                            {child}
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {showArrows && children.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-1/2 -translate-x-1/2 top-2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-lg hover:bg-[var(--text)] transition-all flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                            aria-label="Previous Slide"
                        >
                            <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute left-1/2 -translate-x-1/2 bottom-2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-lg hover:bg-[var(--text)] transition-all flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10"
                            aria-label="Next Slide"
                        >
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator - Vertical */}
            {showDots && children.length > 1 && (
                <div className="flex flex-col space-y-2 absolute right-4 top-1/2 -translate-y-1/2">
                    {children.map((_: React.ReactNode, index: number) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "rounded-full transition-colors w-3 h-3",
                                index === currentIndex
                                    ? "bg-[var(--text)]"
                                    : "bg-[var(--secondary)]"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VerticalCarousel;
