import { ReactNode } from 'react';

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type LabelSize = "xs" | "sm" | "md" | "lg" | "xl";
export type LabelVariant = "default" | "required" | "optional" | "success" | "warning" | "error" | "info";
export type LabelPosition = "top" | "left" | "right" | "bottom";

export interface CustomColors {
    text?: string;
    background?: string;
    border?: string;
    requiredColor?: string;
    optionalColor?: string;
    successColor?: string;
    warningColor?: string;
    errorColor?: string;
    infoColor?: string;
    iconColor?: string;
}

export interface LabelProps {
    children: ReactNode;
    htmlFor?: string;
    theme?: Theme;
    size?: LabelSize;
    variant?: LabelVariant;
    customColors?: CustomColors;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    className?: string;

    // Icon and visual elements
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';

    // Description and tooltip
    description?: string;
    tooltip?: string;

    // Layout
    position?: LabelPosition;
    width?: string;

    // Interactive
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;

    // Accessibility
    'aria-label'?: string;
    'aria-describedby'?: string;
}

export interface LabelGroupProps {
    children: ReactNode;
    theme?: Theme;
    orientation?: 'horizontal' | 'vertical';
    spacing?: 'tight' | 'normal' | 'loose';
    className?: string;
    customColors?: CustomColors;
}
