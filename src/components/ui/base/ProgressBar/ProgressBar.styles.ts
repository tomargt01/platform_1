import { ProgressTheme, ProgressSize } from './ProgressBar.types';

export const getThemeStyles = (theme: ProgressTheme) => {
    const themes = {
        light: {
            primary: '#3b82f6',
            secondary: '#e5e7eb',
            accent: '#2563eb',
            text: '#1f2937',
            background: '#ffffff',
        },
        dark: {
            primary: '#354358',
            secondary: '#4b5563',
            accent: '#3b82f6',
            text: '#f9fafb',
            background: '#1f2937',
        },
        purple: {
            primary: '#8b5cf6',
            secondary: '#ede9fe',
            accent: '#7c3aed',
            text: '#4c1d95',
            background: '#f5f3ff',
        },
        pink: {
            primary: '#ec4899',
            secondary: '#fce7f3',
            accent: '#db2777',
            text: '#831843',
            background: '#fdf2f8',
        },
        green: {
            primary: '#10b981',
            secondary: '#d1fae5',
            accent: '#059669',
            text: '#064e3b',
            background: '#ecfdf5',
        },
        blue: {
            primary: '#3b82f6',
            secondary: '#dbeafe',
            accent: '#2563eb',
            text: '#1e40af',
            background: '#eff6ff',
        },
    };
    return themes[theme];
};

export const getSizeStyles = (size: ProgressSize) => {
    const sizes = {
        xs: { height: '2px', fontSize: '10px', padding: '1px' },
        sm: { height: '4px', fontSize: '12px', padding: '2px' },
        md: { height: '8px', fontSize: '14px', padding: '4px' },
        lg: { height: '12px', fontSize: '16px', padding: '6px' },
        xl: { height: '16px', fontSize: '18px', padding: '8px' },
    };
    return sizes[size];
};

export const getGradientStyle = (theme: ProgressTheme) => {
    const gradients = {
        light: 'linear-gradient(45deg, #3b82f6, #2563eb)',
        dark: 'linear-gradient(45deg, #354358, #3b82f6)',
        purple: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
        pink: 'linear-gradient(45deg, #ec4899, #db2777)',
        green: 'linear-gradient(45deg, #10b981, #059669)',
        blue: 'linear-gradient(45deg, #3b82f6, #2563eb)',
    };
    return gradients[theme];
};
