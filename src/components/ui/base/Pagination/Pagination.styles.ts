import { Theme, PaginationSize } from './Pagination.types';

export const getThemeColors = (theme: Theme) => {
    const themes = {
        light: {
            container: 'bg-white border-gray-200',
            button: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
            activeButton: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700',
            disabledButton: 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
            pageInfo: 'text-gray-600',
            dots: 'text-gray-400',
        },
        dark: {
            container: 'bg-gray-800 border-gray-700',
            button: 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700',
            activeButton: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700',
            disabledButton: 'bg-gray-900 border-gray-700 text-gray-600 cursor-not-allowed',
            pageInfo: 'text-gray-400',
            dots: 'text-gray-500',
        },
        purple: {
            container: 'bg-white border-purple-200',
            button: 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50',
            activeButton: 'bg-purple-600 border-purple-600 text-white hover:bg-purple-700',
            disabledButton: 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
            pageInfo: 'text-purple-600',
            dots: 'text-purple-400',
        },
        pink: {
            container: 'bg-white border-pink-200',
            button: 'bg-white border-pink-200 text-pink-700 hover:bg-pink-50',
            activeButton: 'bg-pink-600 border-pink-600 text-white hover:bg-pink-700',
            disabledButton: 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
            pageInfo: 'text-pink-600',
            dots: 'text-pink-400',
        },
        green: {
            container: 'bg-white border-green-200',
            button: 'bg-white border-green-200 text-green-700 hover:bg-green-50',
            activeButton: 'bg-green-600 border-green-600 text-white hover:bg-green-700',
            disabledButton: 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
            pageInfo: 'text-green-600',
            dots: 'text-green-400',
        },
        blue: {
            container: 'bg-white border-blue-200',
            button: 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50',
            activeButton: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700',
            disabledButton: 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
            pageInfo: 'text-blue-600',
            dots: 'text-blue-400',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: PaginationSize) => {
    const sizes = {
        sm: {
            button: 'px-2 py-1 text-xs min-w-[28px] h-7',
            pageInfo: 'text-xs',
            gap: 'gap-1',
        },
        md: {
            button: 'px-3 py-2 text-sm min-w-[36px] h-9',
            pageInfo: 'text-sm',
            gap: 'gap-2',
        },
        lg: {
            button: 'px-4 py-3 text-base min-w-[44px] h-11',
            pageInfo: 'text-base',
            gap: 'gap-3',
        },
    };
    return sizes[size];
};
