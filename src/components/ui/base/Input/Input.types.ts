import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type InputSize = "xs" | "sm" | "md" | "lg";
export type Intent = "primary" | "secondary" | "ghost" | "destructive";

export interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
    inputSize?: InputSize;
    intent?: Intent;
    theme?: Theme;
    type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date";
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    placeholderIcon?: LucideIcon;
    prefixButton?: ReactNode;
    suffixButton?: ReactNode;
}
