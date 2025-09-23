import { Theme, ModalSize, ModalPlacement } from './Modal.types';

export const getThemeClasses = (theme: Theme) => {
    const themes = {
        light: {
            backdrop: 'bg-black bg-opacity-50',
            modal: 'bg-white text-gray-900',
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            textMuted: 'text-gray-500',
            button: 'bg-blue-600 hover:bg-blue-700 text-white',
            buttonSecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
        },
        dark: {
            backdrop: 'bg-black bg-opacity-70',
            modal: 'bg-gray-800 text-white',
            background: 'bg-gray-800',
            border: 'border-gray-600',
            text: 'text-white',
            textMuted: 'text-gray-300',
            button: 'bg-blue-600 hover:bg-blue-700 text-white',
            buttonSecondary: 'bg-gray-600 hover:bg-gray-500 text-white',
        },
        purple: {
            backdrop: 'bg-black bg-opacity-50',
            modal: 'bg-white text-gray-900',
            background: 'bg-white',
            border: 'border-purple-200',
            text: 'text-gray-900',
            textMuted: 'text-gray-500',
            button: 'bg-purple-600 hover:bg-purple-700 text-white',
            buttonSecondary: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
        },
        pink: {
            backdrop: 'bg-black bg-opacity-50',
            modal: 'bg-white text-gray-900',
            background: 'bg-white',
            border: 'border-pink-200',
            text: 'text-gray-900',
            textMuted: 'text-gray-500',
            button: 'bg-pink-600 hover:bg-pink-700 text-white',
            buttonSecondary: 'bg-pink-100 hover:bg-pink-200 text-pink-700',
        },
        green: {
            backdrop: 'bg-black bg-opacity-50',
            modal: 'bg-white text-gray-900',
            background: 'bg-white',
            border: 'border-green-200',
            text: 'text-gray-900',
            textMuted: 'text-gray-500',
            button: 'bg-green-600 hover:bg-green-700 text-white',
            buttonSecondary: 'bg-green-100 hover:bg-green-200 text-green-700',
        },
        blue: {
            backdrop: 'bg-black bg-opacity-50',
            modal: 'bg-white text-gray-900',
            background: 'bg-white',
            border: 'border-blue-200',
            text: 'text-gray-900',
            textMuted: 'text-gray-500',
            button: 'bg-blue-600 hover:bg-blue-700 text-white',
            buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
        },
    };
    return themes[theme];
};

export const getModalStyles = (size: ModalSize, placement: ModalPlacement) => {
    const sizes = {
        xs: 'max-w-xs w-full',
        sm: 'max-w-sm w-full',
        md: 'max-w-md w-full',
        lg: 'max-w-lg w-full',
        xl: 'max-w-2xl w-full',
        full: 'w-full h-full max-w-none',
    };

    const placements = {
        center: 'items-center justify-center',
        top: 'items-start justify-center pt-16',
        bottom: 'items-end justify-center pb-16',
        left: 'items-center justify-start pl-16',
        right: 'items-center justify-end pr-16',
    };

    const animations = {
        animationEnter: 'scale-100 opacity-100',
        animationExit: 'scale-95 opacity-0',
    };

    return {
        size: sizes[size],
        container: placements[placement],
        ...animations,
    };
};
