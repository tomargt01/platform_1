"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toastVariants } from "./Tabs.styles";
import type { ToastProps } from "./Tabs.types";
import { cn } from "#/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    (
        {
            className,
            variant = "info", // Default to "info" from the union type
            theme = "light",
            title,
            description,
            customIcon,
            duration = 5000,
            onDismiss,
            ...props
        },
        ref
    ) => {
        const { t } = useTranslation();
        const [isVisible, setIsVisible] = useState(true);
        const [progress, setProgress] = useState(100);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onDismiss?.();
            }, duration);

            const progressInterval = setInterval(() => {
                setProgress((prev) => (prev > 0 ? prev - (100 / (duration / 1000)) : 0));
            }, 100);

            return () => {
                clearTimeout(timer);
                clearInterval(progressInterval);
            };
        }, [duration, onDismiss]);

        const handleDismiss = () => {
            setIsVisible(false);
            onDismiss?.();
        };

        if (!isVisible) return null;

        return (
            <AnimatePresence>
                <motion.div
                    ref={ref}
                    role="status"
                    aria-live="polite"
                    data-testid="toast"
                    className={cn(
                        toastVariants({ variant, theme }),
                        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[300px] rounded-lg shadow-lg",
                        className
                    )}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    {...props}
                >
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            {customIcon || <div className="w-5 h-5" />}
                            <div>
                                {title && (
                                    <p className="text-sm font-medium">{title}</p>
                                )}
                                {description && (
                                    <p className="text-sm">{description}</p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="p-1 hover:bg-[var(--accent)]/20 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            aria-label={t("toast.dismiss")}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <motion.div
                        className="h-1 rounded-b-lg"
                        initial={{ width: "100%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: duration / 1000 }}
                    />
                </motion.div>
            </AnimatePresence>
        );
    }
);

Toast.displayName = "Toast";
