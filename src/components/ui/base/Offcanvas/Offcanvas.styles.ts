import { Theme, OffCanvasSize, OffCanvasPosition, BackdropType } from './OffCanvas.types';

interface ThemeColors {
    background: string;
    border: string;
    text: string;
    header: string;
    footer: string;
    shadow: string;
}

interface SizeClasses {
    main: string;
    height: string;
}

interface PositionClasses {
    container: string;
    transform: {
        closed: string;
        open: string;
    };
}

export const getThemeColors = (theme: Theme): ThemeColors => {
    const themes: Record<Theme, ThemeColors> = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            header: 'bg-gray-50 border-gray-200',
            footer: 'bg-gray-50 border-gray-200',
            shadow: 'shadow-xl',
        },
        dark: {
            background: 'bg-gray-900',
            border: 'border-gray-700',
            text: 'text-white',
            header: 'bg-gray-800 border-gray-700',
            footer: 'bg-gray-800 border-gray-700',
            shadow: 'shadow-2xl',
        },
        purple: {
            background: 'bg-white dark:bg-purple-600',
            border: 'border-purple-200 dark:border-purple-700',
            text: 'text-gray-900 dark:text-white',
            header: 'bg-purple-50 dark:bg-purple-600 border-purple-200 dark:border-purple-700',
            footer: 'bg-purple-50 dark:bg-purple-600 border-purple-200 dark:border-purple-700',
            shadow: 'shadow-purple-500/20 shadow-xl',
        },
        pink: {
            background: 'bg-white dark:bg-pink-600',
            border: 'border-pink-200 dark:border-pink-700',
            text: 'text-gray-900 dark:text-white',
            header: 'bg-pink-50 dark:bg-pink-600 border-pink-200 dark:border-pink-700',
            footer: 'bg-pink-50 dark:bg-pink-600 border-pink-200 dark:border-pink-700',
            shadow: 'shadow-pink-500/20 shadow-xl',
        },
        green: {
            background: 'bg-white dark:bg-green-600',
            border: 'border-green-200 dark:border-green-700',
            text: 'text-gray-900 dark:text-white',
            header: 'bg-green-50 dark:bg-green-600 border-green-200 dark:border-green-700',
            footer: 'bg-green-50 dark:bg-green-600 border-green-200 dark:border-green-700',
            shadow: 'shadow-green-500/20 shadow-xl',
        },
        blue: {
            background: 'bg-white dark:bg-blue-600',
            border: 'border-blue-200 dark:border-blue-700',
            text: 'text-gray-900 dark:text-white',
            header: 'bg-blue-50 dark:bg-blue-600 border-blue-200 dark:border-blue-700',
            footer: 'bg-blue-50 dark:bg-blue-600 border-blue-200 dark:border-blue-700',
            shadow: 'shadow-blue-500/20 shadow-xl',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: OffCanvasSize, position: OffCanvasPosition): SizeClasses => {
    const isHorizontal = position === 'left' || position === 'right';

    if (isHorizontal) {
        const widthSizes: Record<OffCanvasSize, string> = {
            xs: 'w-64',     // 256px
            sm: 'w-80',     // 320px
            md: 'w-96',     // 384px
            lg: 'w-[28rem]', // 448px
            xl: 'w-[32rem]', // 512px
            full: 'w-full',
        };
        return {
            main: widthSizes[size],
            height: 'h-full',
        };
    } else {
        const heightSizes: Record<OffCanvasSize, string> = {
            xs: 'h-64',     // 256px
            sm: 'h-80',     // 320px
            md: 'h-96',     // 384px
            lg: 'h-[28rem]', // 448px
            xl: 'h-[32rem]', // 512px
            full: 'h-full',
        };
        return {
            main: heightSizes[size],
            height: 'w-full',
        };
    }
};

export const getBackdropClasses = (backdropType: BackdropType): string => {
    const backdrops: Record<BackdropType, string> = {
        blur: 'bg-black/50 backdrop-blur-sm',
        dark: 'bg-black/80',
        light: 'bg-white/80',
        transparent: 'bg-transparent',
        custom: '',
    };
    return backdrops[backdropType];
};

export const getPositionClasses = (position: OffCanvasPosition): PositionClasses => {
    const positions: Record<OffCanvasPosition, PositionClasses> = {
        left: {
            container: 'left-0 top-0',
            transform: {
                closed: '-translate-x-full',
                open: 'translate-x-0',
            }
        },
        right: {
            container: 'right-0 top-0',
            transform: {
                closed: 'translate-x-full',
                open: 'translate-x-0',
            }
        },
        top: {
            container: 'top-0 left-0',
            transform: {
                closed: '-translate-y-full',
                open: 'translate-y-0',
            }
        },
        bottom: {
            container: 'bottom-0 left-0',
            transform: {
                closed: 'translate-y-full',
                open: 'translate-y-0',
            }
        },
    };
    return positions[position];
};

// Utility function for creating consistent class strings
export const createClassString = (...classes: (string | undefined | null | false)[]): string => {
    return classes
        .filter(Boolean)
        .join(' ')
        .trim()
        .replace(/\s+/g, ' ');
};
