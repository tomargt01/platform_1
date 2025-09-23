export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export type OffCanvasPosition = "left" | "right" | "top" | "bottom";

export type OffCanvasSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export type AnimationType =
    | "slide"
    | "push"
    | "overlay"
    | "parallax"
    | "scale"
    | "fold"
    | "squeeze"
    | "reveal"
    | "flip";

export type BackdropType = "blur" | "dark" | "light" | "transparent" | "custom";

export interface CustomColors {
    background?: string;
    border?: string;
    text?: string;
    backdrop?: string;
    header?: string;
    footer?: string;
}

export interface OffCanvasProps {
    isOpen: boolean;
    onClose: () => void;
    position?: OffCanvasPosition;
    size?: OffCanvasSize;
    theme?: Theme;
    animationType?: AnimationType;
    animationDuration?: number;
    backdropType?: BackdropType;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    customColors?: CustomColors;
    className?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    zIndex?: number;
    persistent?: boolean;
    lockBodyScroll?: boolean;
}

export interface DrawerState {
    isOpen: boolean;
    isAnimating: boolean;
    animationType: AnimationType;
    position: OffCanvasPosition;
}
