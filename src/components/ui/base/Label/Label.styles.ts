import { Theme, LabelSize, LabelVariant, LabelPosition } from './Label.types';

export const getThemeColors = (theme: Theme) => {
    const themes: Record<Theme, {
        text: string;
        background: string;
        border: string;
        requiredColor: string;
        optionalColor: string;
        successColor: string;
        warningColor: string;
        errorColor: string;
        infoColor: string;
        iconColor: string;
        disabledColor: string;
        hoverColor: string;
    }> = {
        light: {
            text: 'text-gray-700',
            background: 'bg-transparent',
            border: 'border-gray-300',
            requiredColor: 'text-red-500',
            optionalColor: 'text-gray-400',
            successColor: 'text-green-600',
            warningColor: 'text-yellow-600',
            errorColor: 'text-red-600',
            infoColor: 'text-blue-600',
            iconColor: 'text-gray-500',
            disabledColor: 'text-gray-400',
            hoverColor: 'hover:text-gray-900',
        },
        dark: {
            text: 'text-gray-200',
            background: 'bg-transparent',
            border: 'border-gray-600',
            requiredColor: 'text-red-400',
            optionalColor: 'text-gray-500',
            successColor: 'text-green-400',
            warningColor: 'text-yellow-400',
            errorColor: 'text-red-400',
            infoColor: 'text-blue-400',
            iconColor: 'text-gray-400',
            disabledColor: 'text-gray-600',
            hoverColor: 'hover:text-white',
        },
        purple: {
            text: 'text-purple-700',
            background: 'bg-transparent',
            border: 'border-purple-300',
            requiredColor: 'text-red-500',
            optionalColor: 'text-purple-400',
            successColor: 'text-green-600',
            warningColor: 'text-yellow-600',
            errorColor: 'text-red-600',
            infoColor: 'text-purple-600',
            iconColor: 'text-purple-500',
            disabledColor: 'text-purple-300',
            hoverColor: 'hover:text-purple-900',
        },
        pink: {
            text: 'text-pink-700',
            background: 'bg-transparent',
            border: 'border-pink-300',
            requiredColor: 'text-red-500',
            optionalColor: 'text-pink-400',
            successColor: 'text-green-600',
            warningColor: 'text-yellow-600',
            errorColor: 'text-red-600',
            infoColor: 'text-pink-600',
            iconColor: 'text-pink-500',
            disabledColor: 'text-pink-300',
            hoverColor: 'hover:text-pink-900',
        },
        green: {
            text: 'text-green-700',
            background: 'bg-transparent',
            border: 'border-green-300',
            requiredColor: 'text-red-500',
            optionalColor: 'text-green-400',
            successColor: 'text-green-600',
            warningColor: 'text-yellow-600',
            errorColor: 'text-red-600',
            infoColor: 'text-green-600',
            iconColor: 'text-green-500',
            disabledColor: 'text-green-300',
            hoverColor: 'hover:text-green-900',
        },
        blue: {
            text: 'text-blue-700',
            background: 'bg-transparent',
            border: 'border-blue-300',
            requiredColor: 'text-red-500',
            optionalColor: 'text-blue-400',
            successColor: 'text-green-600',
            warningColor: 'text-yellow-600',
            errorColor: 'text-red-600',
            infoColor: 'text-blue-600',
            iconColor: 'text-blue-500',
            disabledColor: 'text-blue-300',
            hoverColor: 'hover:text-blue-900',
        },
    };
    return themes[theme];
};

export const getSizeClasses = (size: LabelSize) => {
    const sizes: Record<LabelSize, {
        text: string;
        icon: string;
        spacing: string;
        padding: string;
    }> = {
        xs: {
            text: 'text-xs',
            icon: 'w-3 h-3',
            spacing: 'space-x-1',
            padding: 'px-1 py-0.5',
        },
        sm: {
            text: 'text-sm',
            icon: 'w-3.5 h-3.5',
            spacing: 'space-x-1.5',
            padding: 'px-1.5 py-0.5',
        },
        md: {
            text: 'text-base',
            icon: 'w-4 h-4',
            spacing: 'space-x-2',
            padding: 'px-2 py-1',
        },
        lg: {
            text: 'text-lg',
            icon: 'w-5 h-5',
            spacing: 'space-x-2.5',
            padding: 'px-2.5 py-1.5',
        },
        xl: {
            text: 'text-xl',
            icon: 'w-6 h-6',
            spacing: 'space-x-3',
            padding: 'px-3 py-2',
        },
    };
    return sizes[size];
};

export const getVariantStyles = (variant: LabelVariant, theme: Theme) => {
    const themeColors = getThemeColors(theme);

    const variants: Record<LabelVariant, {
        textColor: string;
        bgColor: string;
        borderColor: string;
        icon: string | null;
        iconColor?: string;
    }> = {
        default: {
            textColor: themeColors.text,
            bgColor: themeColors.background,
            borderColor: themeColors.border,
            icon: null,
        },
        required: {
            textColor: themeColors.text,
            bgColor: themeColors.background,
            borderColor: themeColors.border,
            icon: '*',
            iconColor: themeColors.requiredColor,
        },
        optional: {
            textColor: themeColors.text,
            bgColor: themeColors.background,
            borderColor: themeColors.border,
            icon: '(optional)',
            iconColor: themeColors.optionalColor,
        },
        success: {
            textColor: themeColors.successColor,
            bgColor: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50',
            borderColor: 'border-green-200',
            icon: '✓',
            iconColor: themeColors.successColor,
        },
        warning: {
            textColor: themeColors.warningColor,
            bgColor: theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: '⚠',
            iconColor: themeColors.warningColor,
        },
        error: {
            textColor: themeColors.errorColor,
            bgColor: theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50',
            borderColor: 'border-red-200',
            icon: '✕',
            iconColor: themeColors.errorColor,
        },
        info: {
            textColor: themeColors.infoColor,
            bgColor: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50',
            borderColor: 'border-blue-200',
            icon: 'ℹ',
            iconColor: themeColors.infoColor,
        },
    };

    return variants[variant];
};

export const getPositionClasses = (position: LabelPosition) => {
    const positions: Record<LabelPosition, {
        container: string;
        label: string;
    }> = {
        top: {
            container: 'flex flex-col',
            label: 'mb-1',
        },
        bottom: {
            container: 'flex flex-col-reverse',
            label: 'mt-1',
        },
        left: {
            container: 'flex items-center',
            label: 'mr-2',
        },
        right: {
            container: 'flex items-center flex-row-reverse',
            label: 'ml-2',
        },
    };
    return positions[position];
};
