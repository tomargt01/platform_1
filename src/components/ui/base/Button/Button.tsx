"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "./Button.styles";
import type { ButtonProps } from "./Button.types";
import { cn } from "#/lib/utils/cn";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            size,
            intent,
            variant,
            children,
            leftIcon: LeftIcon,
            rightIcon: RightIcon,
            loading = false,
            onClick,
            disabled,
            ...props
        },
        ref
    ) => {
        const [internalLoading, setInternalLoading] = useState(false);
        const isLoading = loading || internalLoading;

        const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                setInternalLoading(true);
                try {
                    await onClick(e);
                } finally {
                    setInternalLoading(false);
                }
            }
        };

        return (
            <button
                ref={ref}
                data-testid="button"
                data-intent={intent}
                data-size={size}
                data-variant={variant}
                disabled={disabled || isLoading}
                aria-disabled={disabled || isLoading}
                aria-busy={isLoading}
                onClick={handleClick}
                className={cn(
                    buttonVariants({ intent, size, variant }),
                    isLoading && "cursor-wait",
                    className
                )}
                {...props}
            >
                {LeftIcon && !isLoading && variant !== "iconOnly" && (
                    <LeftIcon className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                )}
                {isLoading && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2 rtl:ml-2 rtl:mr-0" />
                )}
                {children}
                {RightIcon && !isLoading && variant !== "iconOnly" && (
                    <RightIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
