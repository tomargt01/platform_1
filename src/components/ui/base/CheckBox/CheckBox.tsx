"use client";
import React from "react";
import { checkboxVariants } from "./CheckBox.styles";
import type { CheckboxProps } from "./CheckBox.types";
import { cn } from "#/lib/utils/cn";

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            variantSize = "md",
            intent = "primary",
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

        // Use global CSS variables or override with passed props
        const effectiveBorderColor = borderColor || "var(--border)";
        const effectiveCircleColor = circleColor || "var(--primary)";
        const effectiveBgColor = bgColor || "var(--primary)";

        const contentClass = cn(
            `${intent === 'primary' ? "text-[var(--primary)]" : "text-[var(--error)]"}`,
            checkboxVariants({ intent, variantSize, type })
        );

        return (
            <label
                className={cn(
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
                        type === "standard" && "bg-[var(--lightBg)]",
                        type === "standard" &&
                        isChecked &&
                        "peer-checked:bg-[var(--secondary)] peer-checked:border-[var(--text)]",
                        type === "toggle" && "w-14 rounded-full border",
                        type === "toggle" && "bg-[var(--lightBg)] border-[var(--border)]",
                        type === "toggle" && isChecked && "peer-checked:bg-[var(--secondary)]",
                        type === "toggle" &&
                        "after:content-[''] after:w-4 after:h-4 after:rounded-full after:absolute after:left-1 after:top-1 after:transition-transform after:duration-200",
                        type === "toggle" && !isChecked && "after:bg-[var(--secondary)]",
                        type === "toggle" && isChecked && "peer-checked:after:bg-[var(--lightBg)]",
                        type === "toggle" &&
                        isChecked &&
                        "peer-checked:after:translate-x-[29.4px] after:-translate-y-[1px]",
                        type === "toggle" && !isChecked && "after:translate-x-0 after:-translate-y-[0.6px]"
                    )}
                    style={
                        {
                            "--border-color": effectiveBorderColor,
                            "--circle-color": effectiveCircleColor,
                            "--toggle-bg": effectiveBgColor,
                        } as React.CSSProperties
                    }
                >
                    {type === "standard" && isChecked && (
                        <span className={cn("text-xs", contentClass)}>&#10003;</span>
                    )}
                    {type === "toggle" && (
                        <span
                            className={cn(
                                "absolute text-xs w-full flex justify-between px-1 z-10 top-1/2 -translate-y-1/2",
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
                </span>
                {label && <span className={contentClass}>{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
