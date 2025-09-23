/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/lib/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            perspective: {
                '1000': '1000px',
            },
            clipPath: {
                'inset-0-0-0-0': 'inset(0% 0% 0% 0%)',
                'inset-0-0-0-20': 'inset(0% 0% 0% 20%)',
                'inset-0-20-0-0': 'inset(0% 20% 0% 0%)',
                'inset-20-0-0-0': 'inset(20% 0% 0% 0%)',
                'inset-0-0-20-0': 'inset(0% 0% 20% 0%)',
            },
            transformStyle: {
                'preserve-3d': 'preserve-3d',
            },
            colors: {
                light: {
                    background: "#ffffff",
                    text: "#1f2937",
                    primary: "#3b82f6",
                    secondary: "#e5e7eb",
                    accent: "#2563eb",
                },
                dark: {
                    background: "#1f2937",
                    text: "#f9fafb",
                    primary: "#354358",//"#1d4ed8",
                    secondary: "#4b5563",
                    accent: "#3b82f6",
                },
                purple: {
                    background: "#f5f3ff",
                    text: "#4c1d95",
                    primary: "#8b5cf6",
                    secondary: "#ede9fe",
                    accent: "#7c3aed",
                },
                pink: {
                    background: "#fdf2f8",
                    text: "#831843",
                    primary: "#ec4899",
                    secondary: "#fce7f3",
                    accent: "#db2777",
                },
                green: {
                    background: "#ecfdf5",
                    text: "#064e3b",
                    primary: "#10b981",
                    secondary: "#d1fae5",
                    accent: "#059669",
                },
                blue: {
                    background: "#eff6ff",
                    text: "#1e40af",
                    primary: "#3b82f6",
                    secondary: "#dbeafe",
                    accent: "#2563eb",
                },
            },
        },
    },
    plugins: [],
};

