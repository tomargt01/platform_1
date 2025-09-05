"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

export default function NotFound() {
    const { t } = useTranslation();
    return (
        <Suspense>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
                <h1 className="text-3xl font-bold text-red-600">{t('notFound.title')}</h1>
                <p className="mt-2 text-gray-600">{t('notFound.description')}</p>
                <Link href="/" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    {t('notFound.backToHome')}
                </Link>
            </div>
        </Suspense>
    );
}
