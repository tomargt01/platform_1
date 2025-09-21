import { AccordionTheme, AccordionSize, AccordionVariant } from './Accordion.types';

export const getThemeStyles = (theme: AccordionTheme) => {
    const themes = {
        light: {
            background: '#ffffff',
            text: '#1f2937',
            primary: '#3b82f6',
            secondary: '#e5e7eb',
            accent: '#2563eb',
            border: '#d1d5db',
            hover: '#f3f4f6',
            active: '#e5e7eb',
        },
        dark: {
            background: '#1f2937',
            text: '#f9fafb',
            primary: '#354358',
            secondary: '#4b5563',
            accent: '#3b82f6',
            border: '#374151',
            hover: '#374151',
            active: '#4b5563',
        },
        purple: {
            background: '#f5f3ff',
            text: '#4c1d95',
            primary: '#8b5cf6',
            secondary: '#ede9fe',
            accent: '#7c3aed',
            border: '#c4b5fd',
            hover: '#e4e7fd',
            active: '#ddd6fe',
        },
        pink: {
            background: '#fdf2f8',
            text: '#831843',
            primary: '#ec4899',
            secondary: '#fce7f3',
            accent: '#db2777',
            border: '#f9a8d4',
            hover: '#fce7f3',
            active: '#fbcfe8',
        },
        green: {
            background: '#ecfdf5',
            text: '#064e3b',
            primary: '#10b981',
            secondary: '#d1fae5',
            accent: '#059669',
            border: '#86efac',
            hover: '#d1fae5',
            active: '#bbf7d0',
        },
        blue: {
            background: '#eff6ff',
            text: '#1e40af',
            primary: '#3b82f6',
            secondary: '#dbeafe',
            accent: '#2563eb',
            border: '#93c5fd',
            hover: '#dbeafe',
            active: '#bfdbfe',
        },
    };
    return themes[theme];
};

export const getSizeStyles = (size: AccordionSize) => {
    const sizes = {
        sm: {
            headerPadding: '8px 12px',
            contentPadding: '8px 12px',
            fontSize: '14px',
            iconSize: '16px',
            borderRadius: '4px',
        },
        md: {
            headerPadding: '12px 16px',
            contentPadding: '12px 16px',
            fontSize: '16px',
            iconSize: '20px',
            borderRadius: '6px',
        },
        lg: {
            headerPadding: '16px 20px',
            contentPadding: '16px 20px',
            fontSize: '18px',
            iconSize: '24px',
            borderRadius: '8px',
        },
    };
    return sizes[size];
};

export const getVariantStyles = (variant: AccordionVariant, theme: AccordionTheme) => {
    const themeColors = getThemeStyles(theme);

    const variants = {
        default: {
            border: `1px solid ${themeColors.border}`,
            borderRadius: '6px',
            marginBottom: '8px',
            background: themeColors.background,
        },
        bordered: {
            border: `2px solid ${themeColors.primary}`,
            borderRadius: '8px',
            marginBottom: '12px',
            background: themeColors.background,
        },
        separated: {
            border: 'none',
            borderBottom: `1px solid ${themeColors.border}`,
            borderRadius: '0',
            marginBottom: '0',
            background: 'transparent',
        },
        flush: {
            border: 'none',
            borderRadius: '0',
            marginBottom: '0',
            background: 'transparent',
        },
        ghost: {
            border: 'none',
            borderRadius: '6px',
            marginBottom: '4px',
            background: 'transparent',
        },
    };

    return variants[variant];
};
