'use client';
import React, { useState } from 'react';
import {
    ImageCarousel,
    ProductCarousel,
} from '#/components/ui/base/Carousel';
import { Theme, IndicatorType } from '#/components/ui/base/Carousel/Carousel.types';

const EnhancedCarouselDashboard = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>('light');
    const [indicatorType, setIndicatorType] = useState<IndicatorType>('dots');

    // Sample data with enhanced text content for overlays
    const sampleImages = [
        {
            id: '1',
            src: 'https://picsum.photos/800/600?random=1',
            alt: 'Sample 1',
            caption: 'Beautiful landscape photography',
            title: 'Mountain Views',
            description: 'Breathtaking mountain scenery captured at golden hour'
        },
        {
            id: '2',
            src: 'https://picsum.photos/800/600?random=2',
            alt: 'Sample 2',
            caption: 'Modern architecture design',
            title: 'Urban Architecture',
            description: 'Contemporary building design in the city center'
        },
        {
            id: '3',
            src: 'https://picsum.photos/800/600?random=3',
            alt: 'Sample 3',
            caption: 'Nature photography',
            title: 'Forest Path',
            description: 'A peaceful walking trail through the woods'
        },
    ];

    const sampleProducts = [
        {
            id: '1',
            name: 'Premium Laptop',
            price: 45999,
            originalPrice: 55999,
            image: 'https://picsum.photos/300/300?random=10',
            rating: 4,
            badge: 'Sale',
            onAddToCart: () => alert('Added laptop to cart!'),
        },
        {
            id: '2',
            name: 'Wireless Headphones',
            price: 12999,
            image: 'https://picsum.photos/300/300?random=11',
            rating: 5,
            onAddToCart: () => alert('Added headphones to cart!'),
        },
        {
            id: '3',
            name: 'Smart Watch',
            price: 8999,
            originalPrice: 12999,
            image: 'https://picsum.photos/300/300?random=12',
            rating: 4,
            badge: 'New',
            onAddToCart: () => alert('Added watch to cart!'),
        },
        {
            id: '4',
            name: 'Gaming Mouse',
            price: 2999,
            image: 'https://picsum.photos/300/300?random=13',
            rating: 4,
            onAddToCart: () => alert('Added mouse to cart!'),
        },
    ];

    const themes: Theme[] = ['light', 'dark', 'purple', 'pink', 'green', 'blue'];
    const indicatorTypes: IndicatorType[] = ['dots', 'numeric', 'roman', 'alphabetic', 'squares', 'diamonds'];

    return (
        <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b`}>
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className={`text-3xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Enhanced Carousel Dashboard
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div>
                                <label className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'} mr-2`}>
                                    Theme:
                                </label>
                                <select
                                    value={currentTheme}
                                    onChange={(e) => setCurrentTheme(e.target.value as Theme)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {themes.map((theme) => (
                                        <option key={theme} value={theme}>
                                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'} mr-2`}>
                                    Indicators:
                                </label>
                                <select
                                    value={indicatorType}
                                    onChange={(e) => setIndicatorType(e.target.value as IndicatorType)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {indicatorTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
                {/* Image Carousel - Without Text Overlay */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Image Carousel - Without Text Overlay
                    </h2>
                    <ImageCarousel
                        images={sampleImages}
                        theme={currentTheme}
                        size="md"
                        aspectRatio="16/9"
                        showTextOverlay={false}
                        controls={{
                            showArrows: true,
                            showDots: true,
                            autoPlay: true,
                            infiniteLoop: true,
                            indicatorType: indicatorType,
                        }}
                    />
                </section>

                {/* Image Carousel - With Text Overlay (Bottom) */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Image Carousel - With Text Overlay (Bottom)
                    </h2>
                    <ImageCarousel
                        images={sampleImages}
                        theme={currentTheme}
                        size="md"
                        aspectRatio="16/9"
                        showTextOverlay={true}
                        overlayType="bottom"
                        controls={{
                            showArrows: true,
                            showDots: true,
                            autoPlay: true,
                            infiniteLoop: true,
                            indicatorType: indicatorType,
                        }}
                    />
                </section>

                {/* Image Carousel - With Text Overlay (Center) */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Image Carousel - With Text Overlay (Center)
                    </h2>
                    <ImageCarousel
                        images={sampleImages}
                        theme={currentTheme}
                        size="md"
                        aspectRatio="16/9"
                        showTextOverlay={true}
                        overlayType="center"
                        controls={{
                            showArrows: true,
                            showDots: true,
                            autoPlay: true,
                            infiniteLoop: true,
                            indicatorType: indicatorType,
                        }}
                    />
                </section>

                {/* Product Carousel - Scrollable Layout */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Product Carousel - Scrollable Layout
                    </h2>
                    <ProductCarousel
                        products={sampleProducts}
                        theme={currentTheme}
                        size="md"
                        itemsPerView={3}
                        layoutType="scrollable"
                        showPrice={true}
                        showRating={true}
                        showActions={true}
                        controls={{
                            showArrows: true,
                            showDots: true,
                            infiniteLoop: true,
                            indicatorType: indicatorType,
                        }}
                    />
                </section>

                {/* Product Carousel - Grid Layout */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Product Carousel - Grid Layout (2 Rows)
                    </h2>
                    <ProductCarousel
                        products={sampleProducts}
                        theme={currentTheme}
                        size="md"
                        itemsPerView={2}
                        layoutType="grid"
                        gridRows={2}
                        showPrice={true}
                        showRating={true}
                        showActions={true}
                        controls={{
                            showArrows: true,
                            showDots: true,
                            indicatorType: indicatorType,
                        }}
                    />
                </section>

                {/* Indicator Types Demo */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        All Indicator Types Demo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {indicatorTypes.map((type) => (
                            <div key={type}>
                                <h3 className={`text-lg font-semibold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} capitalize`}>
                                    {type} Indicators
                                </h3>
                                <ImageCarousel
                                    images={sampleImages.slice(0, 3)}
                                    theme={currentTheme}
                                    size="sm"
                                    controls={{
                                        showArrows: true,
                                        showDots: true,
                                        infiniteLoop: true,
                                        indicatorType: type,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EnhancedCarouselDashboard;
