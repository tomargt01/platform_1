"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { inputVariants } from "./Input.styles";
import type { InputProps } from "./Input.types";
import { cn } from "#/lib/utils/cn";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            inputSize,
            intent,
            theme,
            type = "text",
            disabled,
            placeholder,
            value,
            onChange,
            leftIcon: LeftIcon,
            rightIcon: RightIcon,
            placeholderIcon: PlaceholderIcon,
            prefixButton,
            suffixButton,
            ...props
        },
        ref
    ) => {
        const { t } = useTranslation();
        const [isFocused, setIsFocused] = useState(false);

        return (
            <div className="relative flex items-center">
                {prefixButton && (
                    <div className="absolute left-0 z-10 ml-[1.8px]">
                        {React.cloneElement(React.Children.only(prefixButton) as React.ReactElement, {
                            className: cn("rounded-r-none", (prefixButton as React.ReactElement).props.className),
                        })}
                    </div>
                )}
                {LeftIcon && (
                    <LeftIcon
                        className={cn(
                            "absolute w-4 h-4 text-gray-600",
                            inputSize === "xs" ? "left-2 top-1/2 -translate-y-1/2" : "left-3 top-1/2 -translate-y-1/2",
                            prefixButton && "left-16"
                        )}
                    />
                )}
                <input
                    ref={ref}
                    type={type}
                    data-testid="input"
                    data-intent={intent}
                    data-theme={theme}
                    data-size={inputSize}
                    disabled={disabled}
                    placeholder={t(placeholder || "")}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        inputVariants({ intent, inputSize, theme, focused: isFocused }),
                        "focus:border-inherit",
                        LeftIcon && (inputSize === "xs" ? "pl-9" : "pl-10"),
                        RightIcon && (inputSize === "xs" ? "pr-7" : "pr-10"),
                        prefixButton && "pl-20",
                        suffixButton && "pr-20",
                        disabled && "cursor-not-allowed opacity-50",
                        className
                    )}
                    {...props}
                />
                {PlaceholderIcon && !value && (
                    <PlaceholderIcon
                        className={cn(
                            "absolute w-4 h-4 text-gray-400",
                            inputSize === "xs" ? "left-1/2 top-1/2 -translate-y-1/2" : "left-1/2 top-1/2 -translate-y-1/2",
                            "-translate-x-1/2"
                        )}
                    />
                )}
                {RightIcon && (
                    <RightIcon
                        className={cn(
                            "absolute w-4 h-4 text-gray-600",
                            inputSize === "xs" ? "right-2 top-1/2 -translate-y-1/2" : "right-3 top-1/2 -translate-y-1/2",
                            suffixButton && "right-16"
                        )}
                    />
                )}
                {suffixButton && (
                    <div className="absolute right-0 z-10 mr-[1.7px]">
                        {React.cloneElement(React.Children.only(suffixButton) as React.ReactElement, {
                            className: cn("rounded-l-none", (suffixButton as React.ReactElement).props.className),
                        })}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
