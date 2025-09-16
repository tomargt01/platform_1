import { ReactNode } from 'react';

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type DialogSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type DialogVariant = "default" | "alert" | "confirm" | "success" | "warning" | "error";

export interface CustomColors {
    background?: string;
    border?: string;
    text?: string;
    overlay?: string;
    primaryButton?: string;
    secondaryButton?: string;
}

export interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    theme?: Theme;
    size?: DialogSize;
    variant?: DialogVariant;
    customColors?: CustomColors;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
    overlayClassName?: string;
    contentClassName?: string;

    // Footer buttons
    showFooter?: boolean;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryAction?: () => void;
    onSecondaryAction?: () => void;
    primaryButtonLoading?: boolean;
    secondaryButtonLoading?: boolean;

    // Custom header and footer
    customHeader?: ReactNode;
    customFooter?: ReactNode;
}

export interface DialogContentProps {
    children: ReactNode;
    size: DialogSize;
    theme: Theme;
    variant: DialogVariant;
    customColors?: CustomColors;
    className?: string;
}

export interface DialogOverlayProps {
    isOpen: boolean;
    onClose?: () => void;
    closeOnOverlayClick: boolean;
    theme: Theme;
    customColors?: CustomColors;
    className?: string;
}
