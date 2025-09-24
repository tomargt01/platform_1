import { Theme, PopoverSize } from './Popover.types';

export const getThemeStyles = (theme: Theme) => {
    const themes = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            shadow: 'shadow-lg',
            arrow: 'border-gray-200',
        },
        dark: {
            background: 'bg-gray-800',
            border: 'border-gray-600',
            text: 'text-white',
            shadow: 'shadow-xl',
            arrow: 'border-gray-600',
        },
        purple: {
            background: 'bg-white',
            border: 'border-purple-200',
            text: 'text-gray-900',
            shadow: 'shadow-lg shadow-purple-100',
            arrow: 'border-purple-200',
        },
        pink: {
            background: 'bg-white',
            border: 'border-pink-200',
            text: 'text-gray-900',
            shadow: 'shadow-lg shadow-pink-100',
            arrow: 'border-pink-200',
        },
        green: {
            background: 'bg-white',
            border: 'border-green-200',
            text: 'text-gray-900',
            shadow: 'shadow-lg shadow-green-100',
            arrow: 'border-green-200',
        },
        blue: {
            background: 'bg-white',
            border: 'border-blue-200',
            text: 'text-gray-900',
            shadow: 'shadow-lg shadow-blue-100',
            arrow: 'border-blue-200',
        },
    };
    return themes[theme];
};

export const getSizeStyles = (size: PopoverSize) => {
    const sizes = {
        sm: {
            width: 'w-48',
            padding: 'p-2',
            text: 'text-xs',
        },
        md: {
            width: 'w-64',
            padding: 'p-3',
            text: 'text-sm',
        },
        lg: {
            width: 'w-80',
            padding: 'p-4',
            text: 'text-base',
        },
        xl: {
            width: 'w-96',
            padding: 'p-6',
            text: 'text-base',
        },
    };
    return sizes[size];
};
