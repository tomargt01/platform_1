"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { cardVariants } from "./Card.styles";
import type { CardProps } from "./Card.types";
import { cn } from "#/lib/utils/cn";
import { Button } from "../Button";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            intent = "default",
            size = "md",
            theme = "light",
            title,
            description,
            imageSrc,
            imageAlt,
            actions,
            count,
            icon: Icon,
            links,
            dataContent,
            children,
            ...props
        },
        ref
    ) => {
        const { t } = useTranslation();

        return (
            <div
                ref={ref}
                data-testid="card"
                data-intent={intent}
                data-theme={theme}
                data-size={size}
                className={cn(cardVariants({ intent, size, theme }), className)}
                {...props}
            >
                {intent === "count" ? (
                    <div className="flex items-center p-4">
                        {Icon && <Icon className="w-8 h-8 mr-3 text-[var(--primary)]" />}
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text)]">
                                {count || "0"}
                            </h2>
                            {title && (
                                <p className="text-sm text-[var(--text-secondary)]">
                                    {title}
                                </p>
                            )}
                        </div>
                    </div>
                ) : intent === "two-row" ? (
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            {title && (
                                <h2 className="text-lg font-semibold text-[var(--text)]">
                                    {title}
                                </h2>
                            )}
                            {links && links.length > 0 && (
                                <div className="flex space-x-2">
                                    {links.map((link, index) => (
                                        <Button
                                            key={index}
                                            intent={link.intent || "ghost"}
                                            size={link.size || "sm"}
                                            onClick={link.onClick}
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-2">
                            {dataContent || (
                                <p className="text-sm text-[var(--text-secondary)]">
                                    {description || t("card.noData")}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {imageSrc && (
                            <img
                                src={imageSrc}
                                alt={imageAlt || t("card.imageAlt")}
                                className="w-full h-48 object-cover rounded-t-md"
                            />
                        )}
                        <div className="p-4">
                            {title && (
                                <h2 className="text-lg font-semibold text-[var(--text)]">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                    {description}
                                </p>
                            )}
                            {children && <div className="mt-4">{children}</div>}
                            {actions && actions.length > 0 && (
                                <div className="mt-4 flex space-x-2">
                                    {actions.map((action, index) => (
                                        <Button
                                            key={index}
                                            intent={action.intent || "primary"}
                                            size={action.size || "sm"}
                                            onClick={action.onClick}
                                            disabled={action.disabled}
                                        >
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
);

Card.displayName = "Card";

export default Card;
