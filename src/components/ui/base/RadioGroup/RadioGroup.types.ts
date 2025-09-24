export type RadioTheme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type RadioSize = "sm" | "md" | "lg";

export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioProps {
    checked: boolean;
    value: string;
    label?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    theme?: RadioTheme;
    size?: RadioSize;
    name: string;
}

export interface RadioGroupProps {
    name: string;
    value: string;
    options: RadioOption[];
    onChange: (value: string) => void;
    theme?: RadioTheme;
    size?: RadioSize;
    disabled?: boolean;
    row?: boolean;
    label?: string;
    className?: string;
}
