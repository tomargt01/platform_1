import { Theme, AutocompleteSize } from './Autocomplete.types';

export const getThemeColors = (theme: Theme) => {
    const themes = {
        light: {
            background: 'bg-white',
            border: 'border-gray-300 focus:border-blue-500',
            text: 'text-gray-900',
            placeholder: 'placeholder-gray-500',
            selectedOption: 'bg-blue-600 text-white',
            hoveredOption: 'bg-gray-100',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-gray-200',
            noResultsText: 'text-gray-500',
        },
        dark: {
            background: 'bg-gray-800',
            border: 'border-gray-600 focus:border-blue-400',
            text: 'text-white',
            placeholder: 'placeholder-gray-400',
            selectedOption: 'bg-blue-600 text-white',
            hoveredOption: 'bg-gray-700',
            dropdownBackground: 'bg-gray-800',
            dropdownBorder: 'border-gray-600',
            noResultsText: 'text-gray-400',
        },
        purple: {
            background: 'bg-white',
            border: 'border-purple-300 focus:border-purple-500',
            text: 'text-gray-900',
            placeholder: 'placeholder-gray-500',
            selectedOption: 'bg-purple-600 text-white',
            hoveredOption: 'bg-purple-50',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-purple-200',
            noResultsText: 'text-gray-500',
        },
        pink: {
            background: 'bg-white',
            border: 'border-pink-300 focus:border-pink-500',
            text: 'text-gray-900',
            placeholder: 'placeholder-gray-500',
            selectedOption: 'bg-pink-600 text-white',
            hoveredOption: 'bg-pink-50',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-pink-200',
            noResultsText: 'text-gray-500',
        },
        green: {
            background: 'bg-white',
            border: 'border-green-300 focus:border-green-500',
            text: 'text-gray-900',
            placeholder: 'placeholder-gray-500',
            selectedOption: 'bg-green-600 text-white',
            hoveredOption: 'bg-green-50',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-green-200',
            noResultsText: 'text-gray-500',
        },
        blue: {
            background: 'bg-white',
            border: 'border-blue-300 focus:border-blue-500',
            text: 'text-gray-900',
            placeholder: 'placeholder-gray-500',
            selectedOption: 'bg-blue-600 text-white',
            hoveredOption: 'bg-blue-50',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-blue-200',
            noResultsText: 'text-gray-500',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: AutocompleteSize) => {
    const sizes = {
        sm: {
            input: 'px-2 py-1 text-sm',
            option: 'px-2 py-1 text-sm',
            icon: 'w-4 h-4',
            dropdown: 'text-sm',
        },
        md: {
            input: 'px-3 py-2 text-base',
            option: 'px-3 py-2 text-base',
            icon: 'w-5 h-5',
            dropdown: 'text-base',
        },
        lg: {
            input: 'px-4 py-3 text-lg',
            option: 'px-4 py-3 text-lg',
            icon: 'w-6 h-6',
            dropdown: 'text-lg',
        },
    };
    return sizes[size];
};
