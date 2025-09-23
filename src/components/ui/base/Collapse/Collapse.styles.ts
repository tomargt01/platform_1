import { Theme, CollapseSize, CollapseVariant } from './Collapse.types';

export const getThemeColors = (theme: Theme) => {
    const themes = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            headerBackground: 'bg-gray-50',
            headerText: 'text-gray-800',
            hover: 'hover:bg-gray-100',
            shadow: 'shadow-sm',
        },
        dark: {
            background: 'bg-gray-800',
            border: 'border-gray-700',
            text: 'text-white',
            headerBackground: 'bg-gray-900',
            headerText: 'text-gray-100',
            hover: 'hover:bg-gray-700',
            shadow: 'shadow-lg',
        },
        purple: {
            background: 'bg-white',
            border: 'border-purple-200',
            text: 'text-gray-900',
            headerBackground: 'bg-purple-50',
            headerText: 'text-purple-800',
            hover: 'hover:bg-purple-100',
            shadow: 'shadow-purple-100 shadow-md',
        },
        pink: {
            background: 'bg-white',
            border: 'border-pink-200',
            text: 'text-gray-900',
            headerBackground: 'bg-pink-50',
            headerText: 'text-pink-800',
            hover: 'hover:bg-pink-100',
            shadow: 'shadow-pink-100 shadow-md',
        },
        green: {
            background: 'bg-white',
            border: 'border-green-200',
            text: 'text-gray-900',
            headerBackground: 'bg-green-50',
            headerText: 'text-green-800',
            hover: 'hover:bg-green-100',
            shadow: 'shadow-green-100 shadow-md',
        },
        blue: {
            background: 'bg-white',
            border: 'border-blue-200',
            text: 'text-gray-900',
            headerBackground: 'bg-blue-50',
            headerText: 'text-blue-800',
            hover: 'hover:bg-blue-100',
            shadow: 'shadow-blue-100 shadow-md',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: CollapseSize) => {
    const sizes = {
        sm: {
            header: 'px-3 py-2 text-sm',
            content: 'px-3 py-2 text-sm',
            icon: 'w-4 h-4',
            spacing: 'space-y-1',
        },
        md: {
            header: 'px-4 py-3 text-base',
            content: 'px-4 py-3 text-base',
            icon: 'w-5 h-5',
            spacing: 'space-y-2',
        },
        lg: {
            header: 'px-6 py-4 text-lg',
            content: 'px-6 py-4 text-lg',
            icon: 'w-6 h-6',
            spacing: 'space-y-3',
        },
    };
    return sizes[size];
};

export const getVariantClasses = (variant: CollapseVariant) => {
    const variants = {
        default: {
            container: 'rounded-lg border',
            header: 'rounded-t-lg',
            content: 'border-t',
        },
        accordion: {
            container: 'border-b last:border-b-0',
            header: 'border-l-4',
            content: 'border-l-4 border-t-0',
        },
        card: {
            container: 'rounded-xl border shadow-lg',
            header: 'rounded-t-xl',
            content: 'border-t rounded-b-xl',
        },
        minimal: {
            container: 'border-l-2',
            header: 'pl-4',
            content: 'pl-4',
        },
    };
    return variants[variant];
};
