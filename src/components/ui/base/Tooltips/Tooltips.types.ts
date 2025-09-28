// Tooltips.types.ts
import React from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right" | "auto";
export type TooltipAlign = "start" | "center" | "end";
export type TooltipSize = "sm" | "md" | "lg";
export type TooltipVariant = "flat" | "shadow" | "bordered";
export type TooltipTheme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type TooltipShape = "rounded" | "sharp" | "pill";
export type TooltipTrigger = "hover" | "click" | "focus" | "longPress";
export type TooltipTransition = "fade" | "slide" | "zoom" | "scale" | "flip";
export type AnimationEasing = "ease-in" | "ease-out" | "spring";

export interface TooltipProps {
    content: React.ReactNode;
    position?: TooltipPosition;
    align?: TooltipAlign;
    size?: TooltipSize;
    theme?: TooltipTheme;
    shape?: TooltipShape;
    trigger?: TooltipTrigger;
    showDelay?: number;
    hideDelay?: number;
    arrow?: boolean;
    arrowSize?: number;
    arrowStyle?: "solid" | "outline";
    variant?: TooltipVariant;
    transition?: TooltipTransition;
    interactive?: boolean;
    closable?: boolean;
    persistent?: boolean;
    zIndex?: number;
    className?: string;
    dynamicContent?: () => Promise<React.ReactNode>;
    animationEasing?: AnimationEasing;
    children: React.ReactNode;
}
