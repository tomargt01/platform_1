import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type Size = "xs" | "sm" | "md" | "lg";
export type Intent = "primary" | "secondary" | "ghost" | "destructive";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
    size?: Size;
    intent?: Intent;
    theme?: Theme;
    children: ReactNode;
}
