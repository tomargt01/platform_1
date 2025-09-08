/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/lib/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    background: '#ffffff',
                    text: '#1f2937',
                    primary: '#2563eb',
                    secondary: '#6b7280',
                    accent: '#3b82f6',
                },
                dark: {
                    background: '#1f2937',
                    text: '#e5e7eb',
                    primary: '#60a5fa',
                    secondary: '#9ca3af',
                    accent: '#93c5fd',
                },
                purple: {
                    background: '#f5f3ff',
                    text: '#4c1d95',
                    primary: '#7c3aed',
                    secondary: '#a78bfa',
                    accent: '#c4b5fd',
                },
                pink: {
                    background: '#fdf2f8',
                    text: '#831843',
                    primary: '#ec4899',
                    secondary: '#f472b6',
                    accent: '#f9a8d4',
                },
                green: {
                    background: '#ecfdf5',
                    text: '#064e3b',
                    primary: '#10b981',
                    secondary: '#34d399',
                    accent: '#6ee7b7',
                },
                blue: {
                    background: '#eff6ff',
                    text: '#1e3a8a',
                    primary: '#3b82f6',
                    secondary: '#60a5fa',
                    accent: '#93c5fd',
                },
            },
        },
    },
    plugins: [],
};
