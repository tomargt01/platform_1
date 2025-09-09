import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type AlertVariant = "error" | "warning" | "info" | "critical";
export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export interface AlertProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    variant?: AlertVariant;
    theme?: Theme;
    title?: string | ReactNode;
    description?: string | ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    action?: ReactNode;
}
