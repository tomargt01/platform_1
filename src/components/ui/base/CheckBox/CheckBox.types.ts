import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type VariantSize = "xs" | "sm" | "md" | "lg";
export type Intent = "primary" | "secondary" | "ghost" | "destructive" | "success" | "white" | "gray" | "theme-adaptive";
export type CheckboxType = "standard" | "toggle";

export interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
    variantSize?: VariantSize;
    intent?: Intent;
    theme?: Theme;
    type?: CheckboxType;
    label?: ReactNode;
    disabled?: boolean;
    checkedContent?: ReactNode;
    onText?: string;
    offText?: string;
    borderColor?: string; // Custom border color
    circleColor?: string; // Custom circle color
    bgColor?: string; // Custom circle color
}
