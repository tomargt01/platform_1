"use client";

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import I18nProvider from './I18nProvider';
import { Suspense } from 'react';

import * as Sentry from "@sentry/nextjs";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

    const user = { id: '123', email: 'user@example.com' }; // Replace with actual user logic
    if (user) {
        Sentry.setUser({ id: user.id, email: user.email });
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <Suspense fallback={<div>Loading...</div>}>
                    <I18nProvider>{children}</I18nProvider>
                </Suspense>
            </body>
        </html>
    );
}
