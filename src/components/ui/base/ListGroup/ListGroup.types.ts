export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type ListGroupVariant = "default" | "flush" | "bordered" | "minimal";
export type ListGroupSize = "sm" | "md" | "lg";

export interface ListGroupProps {
    children: React.ReactNode;
    theme?: Theme;
    variant?: ListGroupVariant;
    size?: ListGroupSize;
    className?: string;
    horizontal?: boolean | "sm" | "md" | "lg" | "xl";
    numbered?: boolean;
}

export interface ListGroupItemProps {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: "default" | "success" | "danger" | "warning" | "info" | "primary";
    icon?: React.ReactNode;
    badge?: string | number;
    subtitle?: string;
}
