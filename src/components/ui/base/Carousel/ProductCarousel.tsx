'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { ProductCarouselProps, IndicatorType } from './Carousel.types';
import { useCarousel } from './hooks/useCarousel';
import { cn } from '#/lib/utils/cn';

const ProductCarousel: React.FC<ProductCarouselProps> = ({
    products,
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

    // For grid layout, slides are pages; for scrollable, slides are positions.
    const itemsLength =
        layoutType === 'grid'
            ? Math.ceil(products.length / (itemsPerView * gridRows))
            : Math.max(0, products.length - itemsPerView + 1);

    const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel({
        itemsLength,
        autoPlay: layoutType === 'scrollable' ? autoPlay : false,
        autoPlayInterval,
        loop,
        infiniteLoop,
    });

    if (!products.length) return null;

    // Render star rating
    const renderStars = (rating: number) =>
        Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));

    // Render pagination/indicator content
    const getIndicatorContent = (index: number, type: IndicatorType): string => {
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

    // Render a single product card
    const renderProduct = (product: any) => (
        <div className={`bg-[var(--lightBg)] rounded-lg shadow-md overflow-hidden group h-full ${className}`}>
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

            <div className="p-[var(--pad12px)]">
                <h3 className={`font-semibold text-[var(--text)] text-lg mb-2 line-clamp-2`}>
                    {product.name}
                </h3>

                {showRating && product.rating && (
                    <div className="flex items-center mb-2">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="ml-2 text-sm text-[var(--text)] opacity-70">
                            ({product.rating})
                        </span>
                    </div>
                )}

                {showPrice && (
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <span className={`font-bold text-[var(--accent)] text-lg`}>
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
                        className={`w-full bg-[var(--text)] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </button>
                )}
            </div>
        </div>
    );

    // Grid Layout
    if (layoutType === 'grid') {
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
                        gridTemplateColumns: `repeat(${itemsPerView}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
                    }}
                >
                    {currentPageProducts.map((product) => (
                        <div key={product.id}>
                            {renderProduct(product)}
                        </div>
                    ))}
                </div>

                {showArrows && products.length > itemsPerPage && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10`}
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10`}
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </>
                )}

                {showDots && products.length > itemsPerPage && (
                    <div className="flex justify-center space-x-2 mt-6">
                        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-colors flex items-center justify-center ${indicatorType === 'numeric' || indicatorType === 'roman' || indicatorType === 'alphabetic'
                                        ? `w-8 h-8 rounded text-sm font-medium ${index === currentIndex
                                            ? 'bg-[var(--text)] text-white'
                                            : 'bg-[var(--secondary)] text-[var(--text)] hover:bg-[var(--text)] hover:text-white'
                                        }`
                                        : `rounded-full w-3 h-3 ${index === currentIndex ? 'bg-[var(--text)]' : 'bg-[var(--secondary)]'
                                        }`
                                    }`}
                            >
                                {indicatorType === 'numeric' || indicatorType === 'roman' || indicatorType === 'alphabetic'
                                    ? getIndicatorContent(index, indicatorType)
                                    : indicatorType === 'squares' || indicatorType === 'diamonds'
                                        ? <span className={`${index === currentIndex ? 'text-[var(--accent)]' : 'text-[var(--dot)]'}`}>
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

    // Scrollable Layout
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
                            style={{ width: `${100 / itemsPerView}%` }}
                        >
                            {renderProduct(product)}
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && products.length > itemsPerView && (
                <>
                    <button
                        onClick={prevSlide}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10`}
                    >
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--background)] border-[var(--borderColor)] text-[var(--text)] shadow-md hover:bg-[var(--text)] transition-colors flex items-center justify-center w-8 h-8 md:w-10 md:h-10 z-10`}
                    >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </>
            )}

            {showDots && products.length > itemsPerView && (
                <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: itemsLength }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-colors flex items-center justify-center ${indicatorType === 'numeric' || indicatorType === 'roman' || indicatorType === 'alphabetic'
                                    ? `w-8 h-8 rounded text-sm font-medium ${index === currentIndex
                                        ? 'bg-[var(--text)] text-white'
                                        : 'bg-[var(--secondary)] text-[var(--text)] hover:bg-[var(--text)] hover:text-white'
                                    }`
                                    : `rounded-full w-3 h-3 ${index === currentIndex ? 'bg-[var(--text)]' : 'bg-[var(--secondary)]'
                                    }`
                                }`}
                        >
                            {indicatorType === 'numeric' || indicatorType === 'roman' || indicatorType === 'alphabetic'
                                ? getIndicatorContent(index, indicatorType)
                                : indicatorType === 'squares' || indicatorType === 'diamonds'
                                    ? <span className={`${index === currentIndex ? 'text-[var(--accent)]' : 'text-[var(--dot)]'}`}>
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
