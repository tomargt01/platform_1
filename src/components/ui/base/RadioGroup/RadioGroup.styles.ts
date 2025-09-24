import { RadioTheme, RadioSize } from './RadioGroup.types';

export const THEME_STYLES: Record<RadioTheme, any> = {
    purple: {
        border: "border-purple-600", dot: "bg-purple-600", focus: "ring-purple-200"
    },
    blue: { border: "border-blue-600", dot: "bg-blue-600", focus: "ring-blue-200" },
    green: { border: "border-green-600", dot: "bg-green-600", focus: "ring-green-200" },
    pink: { border: "border-pink-600", dot: "bg-pink-600", focus: "ring-pink-200" },
    light: { border: "border-gray-300", dot: "bg-gray-300", focus: "ring-blue-100" },
    dark: { border: "border-gray-700", dot: "bg-gray-700", focus: "ring-blue-900" }
};

export const RADIO_SIZE: Record<RadioSize, string> = {
    sm: "w-5 h-4",
    md: "w-6 h-5",
    lg: "w-7 h-6"
};

export const DOT_SIZE: Record<RadioSize, string> = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3"
};
