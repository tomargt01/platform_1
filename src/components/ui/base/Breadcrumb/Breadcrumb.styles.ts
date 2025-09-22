import { Theme, BreadcrumbSize } from './Breadcrumb.types';

export const getThemeColors = (theme: Theme) => {
    const themes = {
        light: {
            text: 'text-gray-600',
            activeText: 'text-gray-900',
            hoverText: 'hover:text-gray-800',
            separator: 'text-gray-400',
            background: 'bg-white',
            border: 'border-gray-200',
        },
        dark: {
            text: 'text-gray-400',
            activeText: 'text-white',
            hoverText: 'hover:text-gray-200',
            separator: 'text-gray-500',
            background: 'bg-gray-800',
            border: 'border-gray-600',
        },
        purple: {
            text: 'text-purple-600',
            activeText: 'text-purple-900',
            hoverText: 'hover:text-purple-800',
            separator: 'text-purple-400',
            background: 'bg-purple-50',
            border: 'border-purple-200',
        },
        pink: {
            text: 'text-pink-600',
            activeText: 'text-pink-900',
            hoverText: 'hover:text-pink-800',
            separator: 'text-pink-400',
            background: 'bg-pink-50',
            border: 'border-pink-200',
        },
        green: {
            text: 'text-green-600',
            activeText: 'text-green-900',
            hoverText: 'hover:text-green-800',
            separator: 'text-green-400',
            background: 'bg-green-50',
            border: 'border-green-200',
        },
        blue: {
            text: 'text-blue-600',
            activeText: 'text-blue-900',
            hoverText: 'hover:text-blue-800',
            separator: 'text-blue-400',
            background: 'bg-blue-50',
            border: 'border-blue-200',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: BreadcrumbSize) => {
    const sizes = {
        sm: {
            container: 'px-2 py-1',
            text: 'text-xs',
            icon: 'w-3 h-3',
            separator: 'mx-1',
        },
        md: {
            container: 'px-3 py-2',
            text: 'text-sm',
            icon: 'w-4 h-4',
            separator: 'mx-2',
        },
        lg: {
            container: 'px-4 py-3',
            text: 'text-base',
            icon: 'w-5 h-5',
            separator: 'mx-3',
        },
    };
    return sizes[size];
};
