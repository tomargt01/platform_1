import { Theme, CarouselSize } from './Carousel.types';

export const getThemeColors = (theme: Theme) => {
    const themes = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            accent: 'text-blue-600',
            arrow: 'bg-white text-gray-700 hover:bg-gray-50',
            dot: 'bg-gray-300',
            activeDot: 'bg-blue-600',
            card: 'bg-white',
            shadow: 'shadow-md',
            overlay: 'bg-gray-100',
        },
        dark: {
            background: 'bg-gray-900',
            border: 'border-gray-700',
            text: 'text-white',
            accent: 'text-blue-400',
            arrow: 'bg-gray-800 text-white hover:bg-gray-700',
            dot: 'bg-gray-600',
            activeDot: 'bg-blue-500',
            card: 'bg-gray-800',
            shadow: 'shadow-xl',
            overlay: 'bg-gray-800',
        },
        purple: {
            background: 'bg-white',
            border: 'border-purple-200',
            text: 'text-gray-900',
            accent: 'text-purple-600',
            arrow: 'bg-white text-purple-700 hover:bg-purple-50',
            dot: 'bg-purple-300',
            activeDot: 'bg-purple-600',
            card: 'bg-white',
            shadow: 'shadow-md',
            overlay: 'bg-purple-100',
        },
        pink: {
            background: 'bg-white',
            border: 'border-pink-200',
            text: 'text-gray-900',
            accent: 'text-pink-600',
            arrow: 'bg-white text-pink-700 hover:bg-pink-50',
            dot: 'bg-pink-300',
            activeDot: 'bg-pink-600',
            card: 'bg-white',
            shadow: 'shadow-md',
            overlay: 'bg-pink-100',
        },
        green: {
            background: 'bg-white',
            border: 'border-green-200',
            text: 'text-gray-900',
            accent: 'text-green-600',
            arrow: 'bg-white text-green-700 hover:bg-green-50',
            dot: 'bg-green-300',
            activeDot: 'bg-green-600',
            card: 'bg-white',
            shadow: 'shadow-md',
            overlay: 'bg-green-100',
        },
        blue: {
            background: 'bg-white',
            border: 'border-blue-200',
            text: 'text-gray-900',
            accent: 'text-blue-600',
            arrow: 'bg-white text-blue-700 hover:bg-blue-50',
            dot: 'bg-blue-300',
            activeDot: 'bg-blue-600',
            card: 'bg-white',
            shadow: 'shadow-md',
            overlay: 'bg-blue-100',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: CarouselSize) => {
    const sizes = {
        sm: {
            container: 'max-w-sm',
            arrow: 'w-8 h-8 text-sm',
            dot: 'w-2 h-2',
            text: 'text-sm',
            padding: 'p-2',
            title: 'text-lg',
            subtitle: 'text-sm',
        },
        md: {
            container: 'max-w-4xl',
            arrow: 'w-10 h-10 text-base',
            dot: 'w-3 h-3',
            text: 'text-base',
            padding: 'p-4',
            title: 'text-xl',
            subtitle: 'text-base',
        },
        lg: {
            container: 'max-w-6xl',
            arrow: 'w-12 h-12 text-lg',
            dot: 'w-4 h-4',
            text: 'text-lg',
            padding: 'p-6',
            title: 'text-2xl',
            subtitle: 'text-lg',
        },
    };
    return sizes[size];
};

export const getTransitionClasses = () => ({
    slide: 'transition-transform duration-300 ease-in-out',
    fade: 'transition-opacity duration-500 ease-in-out',
    scale: 'transition-all duration-300 ease-in-out transform hover:scale-105',
});
