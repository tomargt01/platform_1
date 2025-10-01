"use client";

import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '#/components/ThemeSwitcher';
import Link from 'next/link';

export default function Home() {
    const { t } = useTranslation();
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <h1 className="text-3xl font-bold text-primary">{t('welcome')}</h1>
            <p className="mt-2 text-text">{t('description')}</p>
            <ThemeSwitcher />
            <Link
                href='/dashboard'
            >
                Go To Dashboard
            </Link>
        </div>
    );
}
