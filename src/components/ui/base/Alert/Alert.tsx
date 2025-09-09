"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle, Info, X, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { alertVariants } from "./Alert.styles";
import type { AlertProps } from "./Alert.types";
import { cn } from "#/lib/utils/cn";
import { Button } from "../Button";
import { motion, AnimatePresence } from "framer-motion";

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
            actions = [],
            customIcon,
            showTimestamp = false,
            details,
            timer,
            onTimerComplete,
            undoAction,
            ...props
        },
        ref
    ) => {
        const { t } = useTranslation();
        const [isVisible, setIsVisible] = useState(true);
        const [isDetailsOpen, setIsDetailsOpen] = useState(false);
        const [confirmDismiss, setConfirmDismiss] = useState(variant === "critical");
        const [countdown, setCountdown] = useState<number | null>(timer || null);
        const [isUndoing, setIsUndoing] = useState(false);

        // Handle timer countdown
        useEffect(() => {
            let timerId: NodeJS.Timeout | null = null;
            if (timer && countdown !== null && countdown > 0) {
                timerId = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev === null || prev <= 1) {
                            clearInterval(timerId!);
                            if (onTimerComplete) {
                                onTimerComplete();
                                setIsVisible(false);
                                onDismiss?.();
                            }
                            return null;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
            return () => {
                if (timerId) clearInterval(timerId);
            };
        }, [timer, countdown, onTimerComplete, onDismiss]);

        // Handle accessibility focus
        useEffect(() => {
            if (isVisible && ref && "current" in ref && ref.current) {
                ref.current.setAttribute("tabindex", "-1");
                ref.current.focus();
            }
        }, [isVisible, ref]);

        const handleDismiss = () => {
            if (confirmDismiss) {
                if (window.confirm(t("alert.confirmDismiss"))) {
                    setIsVisible(false);
                    onDismiss?.();
                    setCountdown(null); // Stop timer
                }
            } else {
                setIsVisible(false);
                onDismiss?.();
                setCountdown(null); // Stop timer
            }
        };

        const handleUndo = () => {
            setIsUndoing(true);
            undoAction?.();
            setIsVisible(false);
            onDismiss?.();
        };

        const timestamp = showTimestamp
            ? new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            : undefined;

        if (!isVisible) return null;

        const Icon = customIcon || {
            error: XCircle,
            warning: AlertTriangle,
            info: Info,
            critical: XCircle,
        }[variant];

        return (
            <AnimatePresence>
                <motion.div
                    ref={ref}
                    role="alert"
                    aria-live="assertive"
                    data-testid="alert"
                    data-variant={variant}
                    data-theme={theme}
                    className={cn(alertVariants({ variant, theme }), className)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    tabIndex={-1}
                    {...props}
                >
                    <div className="flex items-start gap-3">
                        <Icon
                            className={cn(
                                "flex-shrink-0 mt-0.5",
                                variant === "critical" ? "w-6 h-6" : "w-5 h-5"
                            )}
                        />
                        <div className="flex-1">
                            {title && (
                                <h4 className="font-bold text-lg leading-6 mb-1">
                                    {title}
                                </h4>
                            )}
                            {description && (
                                <p className="text-sm leading-5 font-medium">
                                    {description}
                                    {countdown !== null && (
                                        <span className="ml-2 font-bold text-[var(--primary)]">
                                            ({t("alert.countdown", { count: countdown })})
                                        </span>
                                    )}
                                </p>
                            )}
                            {showTimestamp && timestamp && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {t("alert.timestamp", { timestamp })}
                                </p>
                            )}
                            {details && (
                                <div className="mt-2">
                                    <Button
                                        intent="ghost"
                                        size="sm"
                                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                                    >
                                        {isDetailsOpen
                                            ? t("alert.hideDetails")
                                            : t("alert.showDetails")}
                                    </Button>
                                    {isDetailsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-sm text-gray-600 mt-2"
                                        >
                                            {details}
                                        </motion.div>
                                    )}
                                </div>
                            )}
                            {(actions.length > 0 || undoAction) && (
                                <div className="mt-3 flex gap-2">
                                    {undoAction && (
                                        <Button
                                            intent="primary"
                                            size="sm"
                                            onClick={handleUndo}
                                            disabled={isUndoing}
                                            loading={isUndoing}
                                        >
                                            {t("alert.undo")}
                                        </Button>
                                    )}
                                    {actions.map((action, index) => (
                                        <Button
                                            key={index}
                                            intent={action.intent || "secondary"}
                                            size="sm"
                                            onClick={action.onClick}
                                            disabled={action.disabled}
                                            loading={action.loading}
                                        >
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {dismissible && (
                            <button
                                onClick={handleDismiss}
                                className="p-1 hover:bg-[var(--accent)]/20 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                aria-label={t("alert.dismiss")}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }
);

Alert.displayName = "Alert";
