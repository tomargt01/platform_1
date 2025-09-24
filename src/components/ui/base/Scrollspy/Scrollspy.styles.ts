import { ScrollspyTheme, ScrollspyVariant } from './Scrollspy.types';

export const getScrollspyStyles = (theme: ScrollspyTheme, variant: ScrollspyVariant, isActive: boolean) => {
    const themeMap = {
        light: {
            activeBg: 'bg-blue-100',
            activeText: 'text-blue-600',
            border: 'border-blue-600',
        },
        dark: {
            activeBg: 'bg-gray-800',
            activeText: 'text-white',
            border: 'border-indigo-500',
        },
        purple: {
            activeBg: 'bg-purple-100',
            activeText: 'text-purple-800',
            border: 'border-purple-500',
        },
        pink: {
            activeBg: 'bg-pink-100',
            activeText: 'text-pink-800',
            border: 'border-pink-500',
        },
        green: {
            activeBg: 'bg-green-100',
            activeText: 'text-green-800',
            border: 'border-green-500',
        },
        blue: {
            activeBg: 'bg-blue-100',
            activeText: 'text-blue-800',
            border: 'border-blue-500',
        }
    };

    const t = themeMap[theme] || themeMap.light;

    switch (variant) {
        case 'background':
            return isActive ? `${t.activeBg} ${t.activeText} font-semibold` : 'text-gray-600 hover:bg-gray-50';
        case 'text':
            return isActive ? `${t.activeText} font-semibold` : 'text-gray-600';
        case 'left-border':
            return isActive ? `border-l-4 ${t.border} ${t.activeText} font-semibold bg-gray-50` : 'border-l-4 border-transparent text-gray-600';
        case 'right-border':
            return isActive ? `border-r-4 ${t.border} ${t.activeText} font-semibold bg-gray-50` : 'border-r-4 border-transparent text-gray-600';
        default:
            return isActive ? `${t.activeText} font-semibold` : 'text-gray-600';
    }
};
