import { Theme, DatePickerSize } from './DatePicker.types';

export const getThemeColors = (theme: Theme) => {
    // CSS variables use karne ke liye ye approach
    const themes = {
        light: {
            background: 'bg-[var(--lightBg)]',
            border: 'border-gray-300',
            text: 'text-[var(--text)]',
            selectedDate: 'bg-[var(--accent)] text-white',
            currentDate: 'bg-[var(--secondary)] text-[var(--accent)]',
            hoverDate: 'hover:bg-[var(--secondary)]',
            calendarBackground: 'bg-[var(--lightBg)]',
            headerBackground: 'bg-[var(--secondary)]',
            primaryColor: 'var(--primary)',
            accentColor: 'var(--accent)',
        },
        dark: {
            background: 'bg-[var(--background)]',
            border: 'border-gray-600',
            text: 'text-[var(--text)]',
            selectedDate: 'bg-[var(--accent)] text-white',
            currentDate: 'bg-[var(--primary)] text-[var(--text)]',
            hoverDate: 'hover:bg-[var(--secondary)]',
            calendarBackground: 'bg-[var(--background)]',
            headerBackground: 'bg-[var(--secondary)]',
            primaryColor: 'var(--primary)',
            accentColor: 'var(--accent)',
        },
        purple: {
            background: 'bg-[var(--lightBg)]',
            border: 'border-purple-300',
            text: 'text-[var(--text)]',
            selectedDate: 'bg-[var(--accent)] text-white',
            currentDate: 'bg-[var(--secondary)] text-[var(--accent)]',
            hoverDate: 'hover:bg-[var(--secondary)]',
            calendarBackground: 'bg-[var(--lightBg)]',
            headerBackground: 'bg-[var(--secondary)]',
            primaryColor: 'var(--primary)',
            accentColor: 'var(--accent)',
        },
        pink: {
            background: 'bg-[var(--lightBg)]',
            border: 'border-pink-300',
            text: 'text-[var(--text)]',
            selectedDate: 'bg-[var(--accent)] text-white',
            currentDate: 'bg-[var(--secondary)] text-[var(--accent)]',
            hoverDate: 'hover:bg-[var(--secondary)]',
            calendarBackground: 'bg-[var(--lightBg)]',
            headerBackground: 'bg-[var(--secondary)]',
            primaryColor: 'var(--primary)',
            accentColor: 'var(--accent)',
        },
        green: {
            background: 'bg-[var(--lightBg)]',
            border: 'border-green-300',
            text: 'text-[var(--text)]',
            selectedDate: 'bg-[var(--accent)] text-white',
            currentDate: 'bg-[var(--secondary)] text-[var(--accent)]',
            hoverDate: 'hover:bg-[var(--secondary)]',
            calendarBackground: 'bg-[var(--lightBg)]',
            headerBackground: 'bg-[var(--secondary)]',
            primaryColor: 'var(--primary)',
            accentColor: 'var(--accent)',
        },
        blue: {
            background: 'bg-[var(--lightBg)]',
            border: 'border-blue-300',
            text: 'text-[var(--text)]',
            selectedDate: 'bg-[var(--accent)] text-white',
            currentDate: 'bg-[var(--secondary)] text-[var(--accent)]',
            hoverDate: 'hover:bg-[var(--secondary)]',
            calendarBackground: 'bg-[var(--lightBg)]',
            headerBackground: 'bg-[var(--secondary)]',
            primaryColor: 'var(--primary)',
            accentColor: 'var(--accent)',
        },
    };
    return themes[theme] || themes.light;
};

export const getSizeClasses = (size: DatePickerSize) => {
    const sizes = {
        sm: {
            input: 'px-2 py-1 text-sm',
            calendar: 'text-sm',
            day: 'w-7 h-7 text-xs',
        },
        md: {
            input: 'px-3 py-2 text-base',
            calendar: 'text-base',
            day: 'w-8 h-8 text-sm',
        },
        lg: {
            input: 'px-4 py-3 text-lg',
            calendar: 'text-lg',
            day: 'w-10 h-10 text-base',
        },
    };
    return sizes[size];
};
