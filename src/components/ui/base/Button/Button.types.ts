import type { ReactNode, ComponentPropsWithoutRef, ElementType } from "react";
import type { ButtonVariants } from "./Button.styles";

export type Size = "xs" | "sm" | "md" | "lg";
export type Intent = "primary" | "secondary" | "ghost" | "destructive" | "outline";
export type Variant = "default" | "pill" | "square" | "raised" | "expandable" | "iconOnly" | "fullWidth";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    size?: Size;
    intent?: Intent;
    variant?: Variant;
    leftIcon?: ElementType;
    rightIcon?: ElementType;
    loading?: boolean;
    disabled?: boolean;
    children: ReactNode;
}
