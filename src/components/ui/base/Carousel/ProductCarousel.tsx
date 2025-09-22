'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { ProductCarouselProps, IndicatorType } from './Carousel.types';
import { getThemeColors, getSizeClasses } from './Carousel.styles';
import { useCarousel } from './hooks/useCarousel';

const ProductCarousel: React.FC<ProductCarouselProps> = ({
    products,
    theme = 'light',
    size = 'md',
    controls = {},
    showPrice = true,
    showRating = true,
    showActions = true,
    itemsPerView = 3,
    layoutType = 'scrollable',
    gridRows = 2,
    className = '',
}) => {
    const {
        showArrows = true,
        showDots = true,
        autoPlay = false,
        autoPlayInterval = 4000,
        loop = true,
        infiniteLoop = false,
        indicatorType = 'dots',
    } = controls;

    // For grid layout, we don't need carousel functionality
    const itemsLength = layoutType === 'grid'
        ? Math.ceil(products.length / (itemsPerView * gridRows))
        : Math.max(0, products.length - itemsPerView + 1);

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength,
        autoPlay: layoutType === 'scrollable' ? autoPlay : false,
        autoPlayInterval,
        loop,
        infiniteLoop,
    });

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    if (!products.length) return null;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const getIndicatorContent = (index: number, type: IndicatorType) => {
        switch (type) {
            case 'numeric':
                return (index + 1).toString();
            case 'roman':
                const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
                return romanNumerals[index] || (index + 1).toString();
            case 'alphabetic':
                return String.fromCharCode(65 + index);
            case 'squares':
                return '■';
            case 'diamonds':
                return '♦';
            default:
                return '•';
        }
    };

    const renderProduct = (product: any) => (
        <div className={`${themeColors.card} rounded-lg ${themeColors.shadow} overflow-hidden group h-full`}>
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        {product.badge}
                    </span>
                )}
            </div>

            <div className={`${sizeClasses.padding}`}>
                <h3 className={`font-semibold ${themeColors.text} ${sizeClasses.text} mb-2 line-clamp-2`}>
                    {product.name}
                </h3>

                {showRating && product.rating && (
                    <div className="flex items-center mb-2">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className={`ml-2 text-sm ${themeColors.text} opacity-70`}>
                            ({product.rating})
                        </span>
                    </div>
                )}

                {showPrice && (
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <span className={`font-bold ${themeColors.accent} ${sizeClasses.text}`}>
                                ₹{product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    ₹{product.originalPrice}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {showActions && product.onAddToCart && (
                    <button
                        onClick={product.onAddToCart}
                        className={`w-full ${themeColors.activeDot} text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </button>
                )}
            </div>
        </div>
    );

    if (layoutType === 'grid') {
        // Grid Layout: 2 rows, items arranged in grid
        const itemsPerPage = itemsPerView * gridRows;
        const currentPageProducts = products.slice(
            currentIndex * itemsPerPage,
            (currentIndex + 1) * itemsPerPage
        );

        return (
            <div className={`relative ${className}`}>
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
                        gridTemplateRows: `repeat(${gridRows}, 1fr)`
                    }}
                >
                    {currentPageProducts.map((product) => (
                        <div key={product.id}>
                            {renderProduct(product)}
                        </div>
                    ))}
                </div>

                {/* Navigation for grid */}
                {showArrows && products.length > itemsPerPage && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10`}
                        >
                            <ChevronLeft className="w-1/2 h-1/2" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10`}
                        >
                            <ChevronRight className="w-1/2 h-1/2" />
                        </button>
                    </>
                )}

                {/* Enhanced Indicators for grid */}
                {showDots && products.length > itemsPerPage && (
                    <div className="flex justify-center space-x-2 mt-6">
                        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
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
    }

    // Scrollable Layout (original)
    return (
        <div className={`relative ${className}`}>
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                        width: `${(products.length / itemsPerView) * 100}%`
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="px-2"
                            style={{ width: `${100 / products.length}%` }}
                        >
                            {renderProduct(product)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {showArrows && products.length > itemsPerView && (
                <>
                    <button
                        onClick={prevSlide}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10`}
                    >
                        <ChevronLeft className="w-1/2 h-1/2" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full ${themeColors.arrow} ${sizeClasses.arrow} flex items-center justify-center shadow-lg z-10`}
                    >
                        <ChevronRight className="w-1/2 h-1/2" />
                    </button>
                </>
            )}

            {/* Enhanced Indicators */}
            {showDots && products.length > itemsPerView && (
                <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: itemsLength }, (_, index) => (
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

export default ProductCarousel;
