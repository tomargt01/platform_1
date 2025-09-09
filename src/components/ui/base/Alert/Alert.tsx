"use client";
import React from "react";
import { AlertTriangle, Info, X, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { alertVariants } from "./Alert.styles";
import type { AlertProps } from "./Alert.types";
import { cn } from "#/lib/utils/cn";

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            className,
            variant = "info",
            theme = "light",
            title,
            description,
            dismissible = false,
            onDismiss,
            action,
            ...props
        },
        ref
    ) => {
        const { t } = useTranslation();
        const [isVisible, setIsVisible] = React.useState(true);

        const handleDismiss = () => {
            setIsVisible(false);
            onDismiss?.();
        };

        if (!isVisible) return null;

        const Icon = {
            error: XCircle,
            warning: AlertTriangle,
            info: Info,
            critical: XCircle,
        }[variant];

        return (
            <div
                ref={ref}
                role="alert"
                data-testid="alert"
                data-variant={variant}
                data-theme={theme}
                className={cn(alertVariants({ variant, theme }), className)}
                {...props}
            >
                <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        {title && (
                            <h4 className="font-semibold text-base leading-5 mb-1">
                                {title}
                            </h4>
                        )}
                        {description && (
                            <p className="text-sm leading-5">{description}</p>
                        )}
                        {action && <div className="mt-3">{action}</div>}
                    </div>
                    {dismissible && (
                        <button
                            onClick={handleDismiss}
                            className="p-1 hover:bg-[var(--accent)]/10 rounded"
                            aria-label={t("alert.dismiss")}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

Alert.displayName = "Alert";
