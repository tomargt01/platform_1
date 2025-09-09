"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { badgeVariants } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";
import { cn } from "#/lib/utils/cn";

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            size,
            intent,
            theme,
            children,
            ...props
        },
        ref
    ) => {
        const { t } = useTranslation();

        return (
            <span
                ref={ref}
                data-testid="badge"
                data-intent={intent}
                data-theme={theme}
                data-size={size}
                className={cn(
                    badgeVariants({ intent, size, theme }),
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";
