"use client";
import React from "react";
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
        return (
            <div
                ref={ref}
                data-testid="card"
                data-intent={intent}
                data-size={size}
                className={cn(cardVariants({ intent, size }), className)}
                {...props}
            >
                {intent === "count" ? (
                    <div className="flex items-center p-[var(--pad16px)]">
                        {Icon && <Icon className="w-8 h-8 mr-3 color-[var(--primary)]" />}
                        <div>
                            <h2 className="text-2xl font-bold color-[var(--text)]">
                                {count || "0"}
                            </h2>
                            {title && (
                                <p className="text-sm color-[var(--text-secondary)]">
                                    {title}
                                </p>
                            )}
                        </div>
                    </div>
                ) : intent === "twoRow" ? (
                        <div className="p-[var(--pad16px)] border">
                        <div className="flex justify-between items-center mb-[var(--margin16px)]">
                            {title && (
                                <h2 className="text-lg font-semibold color-[var(--text)]">
                                    {title}
                                </h2>
                            )}
                            {links && links.length > 0 && (
                                <div className="flex gap-[var(--margin8px)]">
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
                        <div className="mt-[var(--margin8px)]">
                            {dataContent || (
                                <p className="text-sm color-[var(--text-secondary)]">
                                    {description || "card.noData"}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {imageSrc && (
                            <img
                                src={imageSrc}
                                alt={imageAlt || "card.imageAlt"}
                                className="w-full h-48 object-cover rounded-t-[var(--radius8px)]"
                            />
                        )}
                        <div className="p-[var(--pad16px)] border">
                            {title && (
                                <h2 className="text-lg font-semibold color-[var(--text)]">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-[var(--margin8px)] text-sm color-[var(--text-secondary)]">
                                    {description}
                                </p>
                            )}
                            {children && <div className="mt-[var(--margin16px)]">{children}</div>}
                            {actions && actions.length > 0 && (
                                <div className="mt-[var(--margin16px)] flex gap-[var(--margin8px)]">
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
