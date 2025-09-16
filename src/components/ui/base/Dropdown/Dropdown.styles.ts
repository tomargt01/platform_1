import { Theme, DropdownSize } from './Dropdown.types';

export const getThemeColors = (theme: Theme) => {
    const themes = {
        light: {
            background: 'bg-white',
            border: 'border-gray-300',
            text: 'text-gray-900',
            hoverBackground: 'hover:bg-gray-50',
            hoverText: 'hover:text-gray-900',
            selectedBackground: 'bg-blue-50',
            selectedText: 'text-blue-700',
            disabledText: 'text-gray-400',
            iconColor: 'text-gray-500',
            separatorColor: 'border-gray-200',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-gray-200',
            dropdownShadow: 'shadow-xl',
        },
        dark: {
            background: 'bg-gray-800',
            border: 'border-gray-600',
            text: 'text-white',
            hoverBackground: 'hover:bg-gray-700',
            hoverText: 'hover:text-white',
            selectedBackground: 'bg-blue-900',
            selectedText: 'text-blue-200',
            disabledText: 'text-gray-500',
            iconColor: 'text-gray-400',
            separatorColor: 'border-gray-600',
            dropdownBackground: 'bg-gray-800',
            dropdownBorder: 'border-gray-600',
            dropdownShadow: 'shadow-xl',
        },
        purple: {
            background: 'bg-white',
            border: 'border-purple-300',
            text: 'text-gray-900',
            hoverBackground: 'hover:bg-purple-50',
            hoverText: 'hover:text-purple-900',
            selectedBackground: 'bg-purple-100',
            selectedText: 'text-purple-800',
            disabledText: 'text-gray-400',
            iconColor: 'text-purple-500',
            separatorColor: 'border-purple-200',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-purple-200',
            dropdownShadow: 'shadow-lg shadow-purple-100',
        },
        pink: {
            background: 'bg-white',
            border: 'border-pink-300',
            text: 'text-gray-900',
            hoverBackground: 'hover:bg-pink-50',
            hoverText: 'hover:text-pink-900',
            selectedBackground: 'bg-pink-100',
            selectedText: 'text-pink-800',
            disabledText: 'text-gray-400',
            iconColor: 'text-pink-500',
            separatorColor: 'border-pink-200',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-pink-200',
            dropdownShadow: 'shadow-lg shadow-pink-100',
        },
        green: {
            background: 'bg-white',
            border: 'border-green-300',
            text: 'text-gray-900',
            hoverBackground: 'hover:bg-green-50',
            hoverText: 'hover:text-green-900',
            selectedBackground: 'bg-green-100',
            selectedText: 'text-green-800',
            disabledText: 'text-gray-400',
            iconColor: 'text-green-500',
            separatorColor: 'border-green-200',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-green-200',
            dropdownShadow: 'shadow-lg shadow-green-100',
        },
        blue: {
            background: 'bg-white',
            border: 'border-blue-300',
            text: 'text-gray-900',
            hoverBackground: 'hover:bg-blue-50',
            hoverText: 'hover:text-blue-900',
            selectedBackground: 'bg-blue-100',
            selectedText: 'text-blue-800',
            disabledText: 'text-gray-400',
            iconColor: 'text-blue-500',
            separatorColor: 'border-blue-200',
            dropdownBackground: 'bg-white',
            dropdownBorder: 'border-blue-200',
            dropdownShadow: 'shadow-lg shadow-blue-100',
        },
    };
    return themes[theme];
};

export const getDropdownZIndex = () => ({
    dropdown: 'z-[9999]', // Very high z-index
    overlay: 'z-[9998]',
    trigger: 'z-[1]'
});

export const getSizeClasses = (size: DropdownSize) => {
    const sizes = {
        sm: {
            trigger: 'px-2 py-1 text-sm',
            option: 'px-3 py-1.5 text-sm',
            icon: 'w-3 h-3',
            chevron: 'w-3 h-3',
        },
        md: {
            trigger: 'px-3 py-2 text-base',
            option: 'px-4 py-2 text-base',
            icon: 'w-4 h-4',
            chevron: 'w-4 h-4',
        },
        lg: {
            trigger: 'px-4 py-3 text-lg',
            option: 'px-5 py-3 text-lg',
            icon: 'w-5 h-5',
            chevron: 'w-5 h-5',
        },
    };
    return sizes[size];
};
