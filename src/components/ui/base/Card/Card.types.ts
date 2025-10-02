import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ButtonProps } from "../Button";
import { LucideIcon } from "lucide-react";

export type Size = "sm" | "md" | "lg";
export type Intent = "default" | "outlined" | "elevated" | "count" | "twoRow";

export interface CardAction {
    label: string;
    intent?: ButtonProps["intent"];
    size?: ButtonProps["size"];
    onClick?: () => void;
    disabled?: boolean;
}

export interface CardLink {
    label: string;
    intent?: ButtonProps["intent"];
    size?: ButtonProps["size"];
    onClick?: () => void;
}

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
    intent?: Intent;
    size?: Size;
    title?: string;
    description?: string;
    imageSrc?: string;
    imageAlt?: string;
    actions?: CardAction[];
    count?: string | number;
    icon?: LucideIcon;
    links?: CardLink[];
    dataContent?: ReactNode;
    children?: ReactNode;
}
