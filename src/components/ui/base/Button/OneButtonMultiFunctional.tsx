"use client";
import React, { useState, useEffect, useRef, ReactNode, FC } from "react";
import { Button } from "./Button"; // Your existing Button component
import { cn } from "#/lib/utils/cn";

interface ActionItem {
    icon: ReactNode;
    onClick: () => void;
    ariaLabel?: string;
}

interface OneButtonMultiFunctionalProps {
    intent?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "default" | "pill" | "square" | "raised" | "fullWidth" | "iconOnly";
    mainIcon: ReactNode;
    actions: ActionItem[];
    direction?: "top" | "bottom" | "left" | "right";
}

export const OneButtonMultiFunctional: FC<OneButtonMultiFunctionalProps> = ({
    intent = "primary",
    size = "md",
    variant = "iconOnly",
    mainIcon,
    actions,
    direction = "top",
}) => {
    const [expanded, setExpanded] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const clearHideTimeout = () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const scheduleHide = () => {
        clearHideTimeout();
        timeoutRef.current = window.setTimeout(() => setExpanded(false), 2000);
    };

    useEffect(() => {
        return () => clearHideTimeout();
    }, []);

    const handleMouseEnter = () => {
        clearHideTimeout();
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        scheduleHide();
    };

    // Position classes based on direction prop
    const positionClass = {
        top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
        left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
        right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    }[direction];

    return (
        <div
            className="relative flex items-center rounded-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Button
                intent={intent}
                size={size}
                variant={variant}
                aria-label={expanded ? "Close actions" : "Open actions"}
                className="rounded-full"
                onClick={() => setExpanded((v) => !v)}
            >
                {mainIcon}
            </Button>

            {expanded && (
                <div
                    className={cn(
                        "absolute flex space-x-2 bg-transparent rounded-full p-2 z-50",
                        positionClass
                    )}
                >
                    {actions.map((action, i) => (
                        <div className="p-1 rounded-full bg-white shadow-lg ">
                            <Button
                                key={i}
                                intent={intent}
                                size={size}
                                variant="iconOnly"
                                aria-label={action.ariaLabel}
                                onClick={() => {
                                    action.onClick();
                                    setExpanded(false);
                                }}
                                onMouseEnter={clearHideTimeout}
                                onMouseLeave={scheduleHide}
                            >
                                {action.icon}
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
