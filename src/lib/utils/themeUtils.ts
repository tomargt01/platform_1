type Theme = 'light' | 'dark' | 'purple' | 'pink' | 'green' | 'blue';

export function getValidTheme(storedTheme: string | null): Theme {
    const validThemes: Theme[] = ['light', 'dark', 'purple', 'pink', 'green', 'blue'];
    return validThemes.includes(storedTheme as Theme) ? (storedTheme as Theme) : 'light';
}
