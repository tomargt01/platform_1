"use client";
import React from "react";
import { checkboxVariants } from "./CheckBox.styles";
import type { CheckboxProps } from "./CheckBox.types";
import { cn } from "#/lib/utils/cn";

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            variantSize,
            intent,
            theme,
            label,
            type = "standard",
            disabled = false,
            checkedContent,
            onText = "",
            offText = "",
            borderColor,
            circleColor,
            bgColor,
            ...props
        },
        ref
    ) => {
        const isChecked = props.checked || false;

        // Intent-specific colors
        const getIntentColor = () => {
            switch(intent) {
                case 'success': return '#22c55e';
                case 'destructive': return '#ef4444';
                default: return circleColor || borderColor || "var(--primary)";
            }
        };

        const intentColor = getIntentColor();
        const effectivePrimary = borderColor || circleColor || "var(--primary)";
        const effectiveBg = bgColor || "var(--primary)";

        const contentClass = cn(
            `text-[${intentColor}]`,
        );

        return (
            <label
                className={cn(
                    checkboxVariants({ intent, variantSize, theme, type }),
                    "inline-flex items-center space-x-2 rtl:space-x-reverse",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
            >
                <input
                    ref={ref}
                    type="checkbox"
                    disabled={disabled}
                    aria-disabled={disabled}
                    className="peer hidden"
                    checked={isChecked}
                    onChange={props.onChange}
                    {...props}
                />
                <span
                    className={cn(
                        "relative flex items-center justify-center transition-all duration-200",
                        "h-6",
                        type === "standard" && "w-6 h-6 border rounded",
                        type === "standard" && "bg-white",
                        type === "standard" &&
                        isChecked &&
                        `peer-checked:bg-[${effectiveBg}] peer-checked:border-[${effectivePrimary}]`,
                        type === "toggle" && "w-14 rounded-full border",
                        type === "toggle" && "bg-white",
                        type === "toggle" && "border-[var(--border-color)]",
                        // Toggle background when checked
                        type === "toggle" && isChecked && "peer-checked:bg-[var(--toggle-bg)]",
                        // Circle styling - यहां main fix है
                        type === "toggle" &&
                        "after:content-[''] after:w-4 after:h-4 after:rounded-full after:absolute after:left-1 after:top-1 after:transition-transform after:duration-200",
                        // Circle background based on state
                        type === "toggle" && !isChecked && "after:bg-[var(--circle-color)]",
                        type === "toggle" && isChecked && "peer-checked:after:bg-white",
                        // Circle position
                        type === "toggle" && isChecked && "peer-checked:after:translate-x-[29.4px] after:-translate-y-[1px]",
                        type === "toggle" && !isChecked && "after:translate-x-0 after:-translate-y-[0.6px]"
                    )}
                    style={{
                        "--border-color": borderColor || "var(--border)",
                        "--circle-color": intentColor, // ✅ Intent-based circle color
                        "--toggle-bg": intent === 'success' ? '#22c55e' : intent === 'destructive' ? '#ef4444' : effectiveBg, // ✅ Intent-based background
                    } as React.CSSProperties}
                >
                    {type === "standard" && isChecked && (
                        <span className={cn(contentClass, "text-xs")}>✓</span>
                    )}
                    {type === "toggle" && (
                        <span
                            className={cn(
                                "absolute text-xs w-full flex justify-between px-1 z-10",
                                "top-1/2 -translate-y-1/2",
                                contentClass
                            )}
                        >
                            <span
                                className={cn(
                                    isChecked ? "opacity-100 ps-1 text-white" : "opacity-0",
                                    "transition-opacity duration-200"
                                )}
                            >
                                {onText}
                            </span>
                            <span
                                className={cn(
                                    !isChecked ? "opacity-100 pe-1" : "opacity-0",
                                    "transition-opacity duration-200"
                                )}
                            >
                                {offText}
                            </span>
                        </span>
                    )}
                    {checkedContent && (
                        <span className={cn(contentClass, "ml-2 text-xs")}>
                            {checkedContent}
                        </span>
                    )}
                </span>
                {label && <span className={contentClass}>{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";
