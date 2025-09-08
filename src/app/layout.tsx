"use client";

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import I18nProvider from './I18nProvider';
import { Suspense, useEffect } from 'react';
import { useThemeStore } from '#/lib/hooks/useThemeStore';
import { getValidTheme } from '#/lib/utils/themeUtils';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useThemeStore();

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme-storage');
        const initialTheme = getValidTheme(storedTheme);
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, [setTheme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <html lang="en" data-theme={theme}>
            <body className={inter.className}>
                <Suspense fallback={<div>Loading...</div>}>
                    <I18nProvider>{children}</I18nProvider>
                </Suspense>
            </body>
        </html>
    );
}
