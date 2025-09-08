// src/components/ui/Button/Button.types.ts
import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type Size = "xs" | "sm" | "md" | "lg";
export type Intent = "primary" | "secondary" | "ghost" | "destructive";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    size?: Size;
    intent?: Intent;
    theme?: Theme;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    loading?: boolean;
    disabled?: boolean;
    children: ReactNode;
}
