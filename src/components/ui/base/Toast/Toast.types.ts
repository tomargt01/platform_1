import type { ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";

type ConflictingProps =
    | "onDrag"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDragStart"
    | "onDrop"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration";

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export type ToastVariant = "info" | "success" | "inProgress" | "error";

export interface ToastProps
    extends Omit<HTMLMotionProps<"div">, "title" | ConflictingProps> {
    variant?: ToastVariant; // Restricted to defined variants
    theme?: Theme;
    title?: string | ReactNode;
    description?: string | ReactNode;
    customIcon?: ReactNode;
    duration?: number;
    onDismiss?: () => void;
}
