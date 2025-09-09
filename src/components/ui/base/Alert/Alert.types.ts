import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { Intent } from "../Button/Button.types";
import type { HTMLMotionProps } from "framer-motion";

// List of HTML props that conflict with Framer Motion's props
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

export type AlertVariant = "error" | "warning" | "info" | "critical";
export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export interface AlertAction {
    label: string;
    onClick: () => void;
    intent?: Intent;
    disabled?: boolean;
    loading?: boolean;
}

export interface AlertProps
    extends Omit<HTMLMotionProps<"div">, "title" | ConflictingProps> {
    variant?: AlertVariant;
    theme?: Theme;
    title?: string | ReactNode;
    description?: string | ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    actions?: AlertAction[];
    customIcon?: LucideIcon;
    showTimestamp?: boolean;
    details?: string | ReactNode;
    timer?: number; // Timer duration in seconds
    onTimerComplete?: () => void; // Callback when timer completes
    undoAction?: () => void; // Callback for undo action
}
