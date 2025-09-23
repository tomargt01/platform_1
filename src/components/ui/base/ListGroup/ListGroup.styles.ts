import { Theme, ListGroupVariant, ListGroupSize } from './ListGroup.types';

export const getThemeStyles = (theme: Theme) => {
    const themes = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            hover: 'hover:bg-gray-50',
            active: 'bg-blue-50 text-blue-700 border-blue-500',
            disabled: 'bg-gray-50 text-gray-400',
        },
        dark: {
            background: 'bg-gray-800',
            border: 'border-gray-600',
            text: 'text-white',
            hover: 'hover:bg-gray-700',
            active: 'bg-blue-900 text-blue-200 border-blue-600',
            disabled: 'bg-gray-700 text-gray-500',
        },
        purple: {
            background: 'bg-white',
            border: 'border-purple-200',
            text: 'text-gray-900',
            hover: 'hover:bg-purple-50',
            active: 'bg-purple-100 text-purple-800 border-purple-500',
            disabled: 'bg-gray-50 text-gray-400',
        },
        pink: {
            background: 'bg-white',
            border: 'border-pink-200',
            text: 'text-gray-900',
            hover: 'hover:bg-pink-50',
            active: 'bg-pink-100 text-pink-800 border-pink-500',
            disabled: 'bg-gray-50 text-gray-400',
        },
        green: {
            background: 'bg-white',
            border: 'border-green-200',
            text: 'text-gray-900',
            hover: 'hover:bg-green-50',
            active: 'bg-green-100 text-green-800 border-green-500',
            disabled: 'bg-gray-50 text-gray-400',
        },
        blue: {
            background: 'bg-white',
            border: 'border-blue-200',
            text: 'text-gray-900',
            hover: 'hover:bg-blue-50',
            active: 'bg-blue-100 text-blue-800 border-blue-500',
            disabled: 'bg-gray-50 text-gray-400',
        },
    };
    return themes[theme];
};

export const getVariantStyles = (variant: ListGroupVariant) => {
    const variants = {
        default: 'rounded-lg border',
        flush: 'rounded-none border-x-0',
        bordered: 'rounded-lg border-2',
        minimal: 'rounded-none border-0',
    };
    return variants[variant];
};

export const getSizeStyles = (size: ListGroupSize) => {
    const sizes = {
        sm: {
            item: 'px-3 py-2 text-sm',
            icon: 'w-4 h-4',
            badge: 'px-2 py-0.5 text-xs',
        },
        md: {
            item: 'px-4 py-3 text-base',
            icon: 'w-5 h-5',
            badge: 'px-2.5 py-1 text-sm',
        },
        lg: {
            item: 'px-6 py-4 text-lg',
            icon: 'w-6 h-6',
            badge: 'px-3 py-1.5 text-base',
        },
    };
    return sizes[size];
};

export const getItemVariantStyles = (variant: string, theme: Theme) => {
    const baseTheme = getThemeStyles(theme);

    const variants = {
        default: baseTheme,
        success: {
            background: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50',
            text: theme === 'dark' ? 'text-green-200' : 'text-green-800',
            border: 'border-green-500/20',
        },
        danger: {
            background: theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50',
            text: theme === 'dark' ? 'text-red-200' : 'text-red-800',
            border: 'border-red-500/20',
        },
        warning: {
            background: theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50',
            text: theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800',
            border: 'border-yellow-500/20',
        },
        info: {
            background: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50',
            text: theme === 'dark' ? 'text-blue-200' : 'text-blue-800',
            border: 'border-blue-500/20',
        },
        primary: {
            background: theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50',
            text: theme === 'dark' ? 'text-purple-200' : 'text-purple-800',
            border: 'border-purple-500/20',
        },
    };

    return variants[variant as keyof typeof variants] || variants.default;
};
