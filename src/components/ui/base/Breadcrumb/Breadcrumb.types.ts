import { ReactNode } from 'react';

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export type BreadcrumbSize = "sm" | "md" | "lg";

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: ReactNode;
    onClick?: () => void;
    isActive?: boolean;
    disabled?: boolean;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    theme?: Theme;
    size?: BreadcrumbSize;
    separator?: ReactNode;
    showHomeIcon?: boolean;
    maxItems?: number;
    className?: string;
    onItemClick?: (item: BreadcrumbItem, index: number) => void;
    customColors?: {
        text?: string;
        activeText?: string;
        hoverText?: string;
        separator?: string;
        background?: string;
    };
}
