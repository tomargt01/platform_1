'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, ChevronUp, ChevronLeft } from 'lucide-react';
import { CollapseProps } from './Collapse.types';
import { getThemeColors, getSizeClasses, getVariantClasses } from './Collapse.styles';

const Collapse: React.FC<CollapseProps> = ({
    children,
    isOpen,
    onToggle,
    direction = 'vertical',
    variant = 'default',
    theme = 'light',
    size = 'md',
    title,
    icon,
    disabled = false,
    duration = 300,
    className = '',
    headerClassName = '',
    contentClassName = '',
    customColors,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [contentWidth, setContentWidth] = useState<number>(0);

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);
    const variantClasses = getVariantClasses(variant);

    // Measure content dimensions
    useEffect(() => {
        if (contentRef.current) {
            if (direction === 'vertical') {
                setContentHeight(contentRef.current.scrollHeight);
            } else {
                setContentWidth(contentRef.current.scrollWidth);
            }
        }
    }, [children, direction]);

    // Update dimensions when content changes
    useEffect(() => {
        if (contentRef.current && isOpen) {
            if (direction === 'vertical') {
                setContentHeight(contentRef.current.scrollHeight);
            } else {
                setContentWidth(contentRef.current.scrollWidth);
            }
        }
    }, [isOpen, children, direction]);

    const getCollapseIcon = () => {
        if (direction === 'vertical') {
            return isOpen ? <ChevronUp className={sizeClasses.icon} /> : <ChevronDown className={sizeClasses.icon} />;
        } else {
            return isOpen ? <ChevronLeft className={sizeClasses.icon} /> : <ChevronRight className={sizeClasses.icon} />;
        }
    };

    const getContentStyle = () => {
        const baseStyle = {
            transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            overflow: 'hidden',
        };

        if (direction === 'vertical') {
            return {
                ...baseStyle,
                height: isOpen ? `${contentHeight}px` : '0px',
                width: 'auto',
            };
        } else {
            return {
                ...baseStyle,
                width: isOpen ? `${contentWidth}px` : '0px',
                height: 'auto',
            };
        }
    };

    const handleToggle = () => {
        if (!disabled && onToggle) {
            onToggle();
        }
    };

    return (
        <div
            className={`
        ${variantClasses.container}
        ${themeColors.background}
        ${themeColors.border}
        ${themeColors.shadow}
        ${className}
      `}
        >
            {title && (
                <button
                    type="button"
                    onClick={handleToggle}
                    disabled={disabled}
                    className={`
            w-full flex items-center justify-between text-left transition-colors
            ${variantClasses.header}
            ${themeColors.headerBackground}
            ${customColors?.headerBackground || ''}
            ${themeColors.headerText}
            ${customColors?.headerText || ''}
            ${sizeClasses.header}
            ${disabled ? 'opacity-50 cursor-not-allowed' : `${themeColors.hover} cursor-pointer`}
            ${headerClassName}
          `}
                >
                    <div className="flex items-center space-x-3">
                        {icon && <span className="flex-shrink-0">{icon}</span>}
                        <span className="font-medium">{title}</span>
                    </div>
                    <span className={`flex-shrink-0 transition-transform duration-${duration}`}>
                        {getCollapseIcon()}
                    </span>
                </button>
            )}

            <div
                style={getContentStyle()}
                className={`
          ${variantClasses.content}
          ${themeColors.background}
          ${customColors?.background || ''}
          ${themeColors.border}
          ${customColors?.border || ''}
        `}
            >
                <div
                    ref={contentRef}
                    className={`
            ${themeColors.text}
            ${customColors?.text || ''}
            ${sizeClasses.content}
            ${contentClassName}
          `}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Collapse;
