import { ReactNode, CSSProperties } from 'react';

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type ModalPlacement = "center" | "top" | "bottom" | "left" | "right";
export type ModalAnimation = "fade" | "slide" | "scale" | "flip" | "none";

export interface ModalPosition {
    x?: number;
    y?: number;
}

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme?: Theme;
    size?: ModalSize;
    placement?: ModalPlacement;
    animation?: ModalAnimation;
    backdrop?: boolean;
    backdropClose?: boolean;
    escapeClose?: boolean;
    persistent?: boolean;
    draggable?: boolean;
    resizable?: boolean;
    className?: string;
    style?: CSSProperties;
    zIndex?: number;
    showHeader?: boolean;
    showFooter?: boolean; // NEW: Control footer visibility
}

export interface ModalContentProps {
    header?: ReactNode;
    title?: string;
    subtitle?: string;
    content?: ReactNode;
    footer?: ReactNode;
    showCloseButton?: boolean;
    closeButtonPosition?: "header" | "outside" | "body";
    children?: ReactNode;
}
export interface LightboxModalProps extends BaseModalProps {
    items: Array<{
        type: 'image' | 'video';
        src: string;
        alt?: string;
        title?: string;
        description?: string;
    }>;
    currentIndex: number;
    onIndexChange?: (index: number) => void;
    showThumbnails?: boolean;
    allowDownload?: boolean;
}

export interface ModalContentProps {
    header?: ReactNode;
    title?: string;
    subtitle?: string;
    content?: ReactNode;
    footer?: ReactNode;
    showCloseButton?: boolean;
    closeButtonPosition?: "header" | "outside" | "body"; // NEW: Added "body" option
    children?: ReactNode;
}

export interface FormModalProps extends BaseModalProps {
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
    submitText?: string;
    cancelText?: string;
    loading?: boolean;
    disabled?: boolean;
    validation?: boolean;
}

export interface ConfirmModalProps extends BaseModalProps {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    type?: "default" | "danger" | "warning" | "success";
}

export interface FeedbackModalProps extends BaseModalProps {
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    autoClose?: boolean;
    duration?: number;
}

export interface InteractiveModalProps extends BaseModalProps {
    initialPosition?: ModalPosition;
    onPositionChange?: (position: ModalPosition) => void;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    showHeader?: boolean;
}
