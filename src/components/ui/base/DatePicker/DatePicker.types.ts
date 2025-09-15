export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export type DatePickerSize = "sm" | "md" | "lg";

export interface CustomColors {
    border?: string;
    background?: string;
    text?: string;
    selectedDate?: string;
    selectedFrom?: string;
    selectedTo?: string;
    currentDate?: string;
    hoverDate?: string;
}

export interface BaseDatePickerProps {
    theme?: Theme;
    size?: DatePickerSize;
    customColors?: CustomColors;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    label?: string;
    error?: string;
}

export interface SingleDatePickerProps extends BaseDatePickerProps {
    value?: Date | null; // undefined remove kiya
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

export interface DateRangePickerProps extends BaseDatePickerProps {
    startDate?: Date | null; // undefined remove kiya
    endDate?: Date | null; // undefined remove kiya
    onChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
    minDate?: Date;
    maxDate?: Date;
    placeholderStart?: string;
    placeholderEnd?: string;
}

