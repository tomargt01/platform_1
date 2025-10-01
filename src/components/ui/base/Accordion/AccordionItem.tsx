'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AccordionItemProps } from './Accordion.types';
import { getSizeStyles, getVariantStyles } from './Accordion.styles';
import AccordionIcon from './AccordionIcon';

const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    children,
    size = 'md',
    variant = 'default',
    disabled = false,
    expanded: controlledExpanded,
    defaultExpanded = false,
    onToggle,
    className = '',
    icon,
    customIcon,
    showIcon = true,
    headerClassName = '',
    contentClassName = '',
    animationDuration = 300,
}) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);

    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
    const sizeStyles = getSizeStyles(size);
    const variantStyles = getVariantStyles(variant);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
        }
    }, [isExpanded, children]);

    useEffect(() => {
        if (isExpanded && contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [children, isExpanded]);

    const handleToggle = () => {
        if (disabled) return;
        const newExpanded = !isExpanded;
        if (controlledExpanded === undefined) {
            setInternalExpanded(newExpanded);
        }
        onToggle?.(newExpanded);
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: sizeStyles.headerPadding,
        fontSize: sizeStyles.fontSize,
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: isExpanded ? 'var(--accent)' : 'var(--background)',
        color: isExpanded ? 'var(--background)' : disabled ? 'var(--text)80' : 'var(--text)',  // <-- active text
        borderRadius: variant === 'separated' || variant === 'flush' ? '0' : sizeStyles.borderRadius,
        transition: `all ${animationDuration}ms ease-in-out`,
        userSelect: 'none',
        opacity: disabled ? 0.6 : 1,
        border: variantStyles.border,
        marginBottom: variantStyles.marginBottom,
    };

    const contentStyle: React.CSSProperties = {
        height: `${contentHeight}px`,
        overflow: 'hidden',
        transition: `height ${animationDuration}ms ease-in-out`,
        backgroundColor: 'var(--background)',
    };

    const innerContentStyle: React.CSSProperties = {
        padding: sizeStyles.contentPadding,
        fontSize: sizeStyles.fontSize,
        lineHeight: '1.5',
        color: 'var(--text)',
    };

    const containerStyle: React.CSSProperties = {
        ...variantStyles,
        opacity: disabled ? 0.7 : 1,
    };

    return (
        <div className={`accordion-item ${className}`} style={containerStyle}>
            {/* Header */}
            <div
                className={`accordion-header ${headerClassName}`}
                style={headerStyle}
                onClick={handleToggle}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle();
                    }
                }}
                tabIndex={disabled ? -1 : 0}
                role="button"
                aria-expanded={isExpanded}
                aria-disabled={disabled}
            >
                <div className="flex items-center">
                    {icon && (
                        <span className="accordion-title-icon mr-2">
                            {icon}
                        </span>
                    )}
                    <span className="accordion-title">{title}</span>
                </div>
                {showIcon && (
                    <AccordionIcon
                        isExpanded={isExpanded}
                        size={size}
                        customIcon={customIcon}
                        animationDuration={animationDuration}
                        // Pass color to icon: if expanded, var(--background); else var(--text)
                        color={isExpanded ? 'var(--background)' : 'var(--text)'}
                    />
                )}
            </div>
            {/* Content */}
            <div className="accordion-content" style={contentStyle}>
                <div
                    ref={contentRef}
                    className={`accordion-content-inner ${contentClassName}`}
                    style={innerContentStyle}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
