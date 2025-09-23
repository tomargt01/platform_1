'use client';
import React, { useState } from 'react';
import {
    ImageCarousel,
    ProductCarousel,
} from '#/components/ui/base/Carousel';
import { Theme, IndicatorType } from '#/components/ui/base/Carousel/Carousel.types';
import { Collapse } from '#/components/ui/base/Collapse';

const EnhancedCarouselDashboard = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const themes: Theme[] = ['light', 'dark', 'purple', 'pink', 'green', 'blue'];

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
                        </div>
                    </div>
                </div>
            </div>

            <Collapse
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                title="Settings Panel"
                theme={currentTheme}
                size="md"
            >
                Your content here
            </Collapse>

            <Collapse
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen(!isMenuOpen)}
                direction="horizontal"
                title="Menu"
                theme={currentTheme}
                variant="card"
                className="mt-2"
            >
                <div className="w-64">Navigation content</div>
            </Collapse>
        </div>
    );
};

export default EnhancedCarouselDashboard;
