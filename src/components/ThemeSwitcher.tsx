"use client";

import { useThemeStore, Theme } from '#/lib/hooks/useThemeStore';
import { useTranslation } from 'react-i18next';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useThemeStore();
    const { t } = useTranslation();

    const themes: Theme[] = ['light', 'dark', 'purple', 'pink', 'green', 'blue'];

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as Theme;
        console.log('Switching to theme:', newTheme);
        setTheme(newTheme);
    };

    return (
        <div className="flex items-center gap-2 mt-4">
            <label htmlFor="theme-select" className="text-sm font-medium text-text">
                {t('theme')}
            </label>
            <select
                id="theme-select"
                value={theme}
                onChange={handleThemeChange}
                className="rounded border border-secondary bg-background p-2 text-text"
            >
                {themes.map((themeOption) => (
                    <option key={themeOption} value={themeOption}>
                        {t(`themes.${themeOption}`)}
                    </option>
                ))}
            </select>
        </div>
    );
}
