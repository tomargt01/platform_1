export type ProgressTheme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ProgressVariant =
    | "linear"
    | "circular"
    | "semi-circular"
    | "dotted"
    | "stepped"
    | "gradient"
    | "striped";

export interface BaseProgressProps {
    value: number; // 0-100
    max?: number;
    theme?: ProgressTheme;
    size?: ProgressSize;
    variant?: ProgressVariant;
    showLabel?: boolean;
    showPercentage?: boolean;
    animated?: boolean;
    striped?: boolean;
    className?: string;
    label?: string;
    color?: string;
    backgroundColor?: string;
    height?: number | string;
    width?: number | string;
}

export interface CircularProgressProps extends BaseProgressProps {
    strokeWidth?: number;
    radius?: number;
    clockwise?: boolean;
    showText?: boolean;
    textColor?: string;
}

export interface StepProgressProps {
    steps: Array<{
        label: string;
        completed: boolean;
        active?: boolean;
    }>;
    theme?: ProgressTheme;
    size?: ProgressSize;
    className?: string;
}

export interface DottedProgressProps extends BaseProgressProps {
    dotCount?: number;
    dotSize?: number;
    spacing?: number;
}
