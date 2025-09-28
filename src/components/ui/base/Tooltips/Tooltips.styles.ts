// Tooltips.styles.ts

import {
    TooltipAlign,
    TooltipPosition,
    TooltipSize,
    TooltipVariant,
    TooltipShape,
    TooltipTheme,
} from "./Tooltips.types";

// Base tooltip container classes
export const tooltipBaseClasses =
    "absolute z-50 select-none whitespace-nowrap font-medium transition-all pointer-events-auto";

// Size classes
export const getSizeClasses = (size: TooltipSize = "md") => {
    switch (size) {
        case "sm":
            return "text-xs px-2 py-1";
        case "lg":
            return "text-base px-4 py-2.5";
        default:
            return "text-sm px-3 py-2";
    }
};

// Shape classes
export const getShapeClasses = (shape: TooltipShape = "rounded") => {
    switch (shape) {
        case "sharp":
            return "rounded-none";
        case "pill":
            return "rounded-full";
        default:
            return "rounded-md";
    }
};

// Variant and shadow classes
export const getVariantClasses = (variant: TooltipVariant = "shadow") => {
    switch (variant) {
        case "flat":
            return "shadow-none border-transparent";
        case "bordered":
            return "border border-current shadow-none";
        default:
            return "shadow-lg border-transparent";
    }
};

// Theme color classes (using CSS variables for your theme system)
export const getThemeColorClasses = (
    theme: TooltipTheme = "light"
) => {
    return `
    bg-[var(--background)]
    text-[var(--text)]
    border-[var(--accent)]
  `;
};

function getPositionTransform(
    position: TooltipPosition = "top",
    align: TooltipAlign = "center"
) {
    // Define maps excluding 'auto' because it needs special handling
    const positionMap: Partial<Record<Exclude<TooltipPosition, "auto">, string>> = {
        top: "-bottom-2",
        bottom: "-top-2",
        left: "right-full mr-2",
        right: "left-full ml-2",
    };

    const alignMap: Record<TooltipAlign, string> = {
        start: "left-0",
        center: "left-1/2 -translate-x-1/2",
        end: "right-0",
    };

    if (position === "auto") {
        // For 'auto', return a fallback value or implement dynamic placement logic here
        return `${positionMap.top} ${alignMap.center}`;
    }

    return `${positionMap[position]} ${alignMap[align]}`;
}

export { getPositionTransform };



// Arrow styles will be handled in component using SVG or CSS before/after
