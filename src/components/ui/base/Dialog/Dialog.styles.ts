import { Theme, DialogSize, DialogVariant } from './Dialog.types';

export const getThemeColors = (theme: Theme) => {
    const themes = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            overlay: 'bg-gray-700 bg-opacity-50',
            primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
            secondaryButton: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300',
            closeButton: 'text-gray-400 hover:text-gray-600',
        },
        dark: {
            background: 'bg-gray-800',
            border: 'border-gray-600',
            text: 'text-white',
            overlay: 'bg-gray-700 bg-opacity-70',
            primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
            secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600',
            closeButton: 'text-gray-400 hover:text-gray-200',
        },
        purple: {
            background: 'bg-white',
            border: 'border-purple-200',
            text: 'text-gray-900',
            overlay: 'bg-gray-700 bg-opacity-70',
            primaryButton: 'bg-purple-600 hover:bg-purple-700 text-white',
            secondaryButton: 'bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300',
            closeButton: 'text-purple-400 hover:text-purple-600',
        },
        pink: {
            background: 'bg-white',
            border: 'border-pink-200',
            text: 'text-gray-900',
            overlay: 'bg-gray-700 bg-opacity-70',
            primaryButton: 'bg-pink-600 hover:bg-pink-700 text-white',
            secondaryButton: 'bg-pink-100 hover:bg-pink-200 text-pink-900 border border-pink-300',
            closeButton: 'text-pink-400 hover:text-pink-600',
        },
        green: {
            background: 'bg-white',
            border: 'border-green-200',
            text: 'text-gray-900',
            overlay: 'bg-gray-700 bg-opacity-70',
            primaryButton: 'bg-green-600 hover:bg-green-700 text-white',
            secondaryButton: 'bg-green-100 hover:bg-green-200 text-green-900 border border-green-300',
            closeButton: 'text-green-400 hover:text-green-600',
        },
        blue: {
            background: 'bg-white',
            border: 'border-blue-200',
            text: 'text-gray-900',
            overlay: 'bg-gray-700 bg-opacity-70',
            primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
            secondaryButton: 'bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300',
            closeButton: 'text-blue-400 hover:text-blue-600',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: DialogSize) => {
    const sizes = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full mx-4',
    };
    return sizes[size];
};

export const getVariantStyles = (variant: DialogVariant, theme: Theme) => {
    const themeColors = getThemeColors(theme);

    const variants = {
        default: {
            icon: null,
            headerBg: '',
            iconColor: '',
        },
        alert: {
            icon: '⚠️',
            headerBg: 'bg-yellow-50 border-b border-yellow-200',
            iconColor: 'text-yellow-600',
        },
        confirm: {
            icon: '❓',
            headerBg: 'bg-blue-50 border-b border-blue-200',
            iconColor: 'text-blue-600',
        },
        success: {
            icon: '✅',
            headerBg: 'bg-green-50 border-b border-green-200',
            iconColor: 'text-green-600',
        },
        warning: {
            icon: '⚠️',
            headerBg: 'bg-orange-50 border-b border-orange-200',
            iconColor: 'text-orange-600',
        },
        error: {
            icon: '❌',
            headerBg: 'bg-red-50 border-b border-red-200',
            iconColor: 'text-red-600',
        },
    };

    return variants[variant];
};
