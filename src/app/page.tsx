"use client";

import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();

    if (process.env.NODE_ENV === 'development') {
        throw new Error('Test error from server component');
    }
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-blue-600">{t('welcome')}</h1>
            <p className="mt-2 text-gray-600">{t('description')}</p>
        </div>
    );
}
