import React, { useEffect, useRef, useState } from "react";
import {
    TooltipProps,
    TooltipTransition,
    TooltipTheme,
    TooltipPosition,
    TooltipAlign,
    TooltipSize,
    TooltipShape,
    TooltipVariant,
} from "./Tooltips.types";
import {
    tooltipBaseClasses,
    getSizeClasses,
    getShapeClasses,
    getVariantClasses,
    getThemeColorClasses,
} from "./Tooltips.styles";
import { useClickOutside, useDelayedVisibility } from "./utilities";
import { TooltipsPortal } from "./TooltipsPortal";
import useTooltipPosition from "./useTooltipPosition";

export function Tooltips({
    content,
    children,
    position = "top",
    align = "center",
    size = "md",
    theme = "light",
    shape = "rounded",
    trigger = "hover",
    showDelay = 0,
    hideDelay = 0,
    arrow = true,
    arrowSize = 8,
    arrowStyle = "solid",
    variant = "shadow",
    transition = "fade",
    interactive = false,
    closable = false,
    persistent = false,
    zIndex = 9999,
    className = "",
    dynamicContent,
    animationEasing = "ease-out",
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [fetchedContent, setFetchedContent] = useState<React.ReactNode>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Manage dynamic content fetching
    useEffect(() => {
        if (dynamicContent && isVisible) {
            dynamicContent().then(setFetchedContent).catch(() => setFetchedContent(null));
        } else {
            setFetchedContent(null);
        }
    }, [dynamicContent, isVisible]);

    // Handle show/hide delay
    const shouldRender = useDelayedVisibility(isVisible, showDelay, hideDelay);

    // Click outside helps to close tooltip when clicking outside, if interactive and non-persistent
    useClickOutside(tooltipRef, () => {
        if (interactive && !persistent) {
            setIsVisible(false);
        }
    });

    // Calculate tooltip position using hook
    const pos = useTooltipPosition(isVisible, position, align, triggerRef, tooltipRef);

    // Keyboard accessibility for Escape to close tooltip
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape" && isVisible && interactive && closable) {
                setIsVisible(false);
            }
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isVisible, interactive, closable]);

    // Compose CSS classes for tooltip container
    const classes = [
        tooltipBaseClasses,
        getSizeClasses(size),
        getShapeClasses(shape),
        getVariantClasses(variant),
        getThemeColorClasses(theme),
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Content to show - dynamic or static
    const displayContent = dynamicContent ? fetchedContent || "Loading..." : content;

    // Arrow CSS classes
    const arrowStyleClasses = arrow
        ? `absolute w-2 h-2 bg-[var(--background)] rotate-45 border-[var(--accent)] border-l-0 border-t-0 ${arrowStyle === "solid" ? "" : "bg-transparent"
        }`
        : "";

    // Tooltip inline styles with dynamic position, z-index, and animation easing
    const inlineStyle = {
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex,
        animationTimingFunction: animationEasing,
    } as React.CSSProperties;

    function CloseIcon() {
        return (
            <button
                onClick={() => setIsVisible(false)}
                aria-label="Close tooltip"
                className="absolute top-1 right-1 text-sm hover:text-red-500 focus:outline-none"
            >
                ×
            </button>
        );
    }

    if (!shouldRender) {
        // Render triggers children only when tooltip is not showing
        return (
            <div
                ref={triggerRef}
                onMouseEnter={() => trigger === "hover" && setIsVisible(true)}
                onMouseLeave={() => trigger === "hover" && setIsVisible(false)}
                onClick={() => trigger === "click" && setIsVisible((v) => !v)}
                onFocus={() => trigger === "focus" && setIsVisible(true)}
                onBlur={() => trigger === "focus" && setIsVisible(false)}
                style={{ display: "inline-block" }}
            >
                {children}
            </div>
        );
    }

    // Tooltip renders wrapped trigger + portal popup
    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={() => trigger === "hover" && setIsVisible(true)}
                onMouseLeave={() => trigger === "hover" && setIsVisible(false)}
                onClick={() => trigger === "click" && setIsVisible((v) => !v)}
                onFocus={() => trigger === "focus" && setIsVisible(true)}
                onBlur={() => trigger === "focus" && setIsVisible(false)}
                style={{ display: "inline-block" }}
            >
                {children}
            </div>

            <TooltipsPortal>
                <div
                    ref={tooltipRef}
                    role="tooltip"
                    className={classes}
                    style={{
                        ...inlineStyle,
                        position: "fixed",
                        top: pos.top,
                        left: pos.left,
                        zIndex,
                        pointerEvents: interactive ? "auto" : "none"
                    }}
                    aria-hidden={!isVisible}
                    tabIndex={interactive ? 0 : -1}
                    onMouseEnter={() => interactive && setIsVisible(true)}
                    onMouseLeave={() => !persistent && setIsVisible(false)}
                >
                    {closable && <CloseIcon />}
                    {displayContent}
                    {arrow && (
                        <span
                            style={{
                                position: "absolute",
                                // Dynamically place the arrow based on the position
                                ...(position === "top" ? { bottom: -6, left: "50%", transform: "translateX(-50%)" } :
                                    position === "bottom" ? { top: -6, left: "50%", transform: "translateX(-50%)" } :
                                        position === "left" ? { right: -6, top: "50%", transform: "translateY(-50%)" } :
                                            position === "right" ? { left: -6, top: "50%", transform: "translateY(-50%)" } : {}
                                ),
                                width: arrowSize,
                                height: arrowSize,
                                zIndex: zIndex + 1,
                                display: "block",
                            }}
                        >
                            <svg width={arrowSize} height={arrowSize}>
                                <polygon
                                    points={position === "top" ? `0,${arrowSize} ${arrowSize / 2},0 ${arrowSize},${arrowSize}` :
                                        position === "bottom" ? `0,0 ${arrowSize / 2},${arrowSize} ${arrowSize},0` :
                                            position === "left" ? `${arrowSize},0 ${arrowSize},${arrowSize} 0,${arrowSize / 2}` :
                                                position === "right" ? `0,0 ${arrowSize},${arrowSize / 2} 0,${arrowSize}` : ""}
                                    fill="var(--background)"
                                    stroke="var(--accent)"
                                    strokeWidth={arrowStyle === "outline" ? 1 : 0}
                                />
                            </svg>
                        </span>
                    )}
                </div>
            </TooltipsPortal>

        </>
    );
}

export default Tooltips;
