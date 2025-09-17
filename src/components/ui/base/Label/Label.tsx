'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { LabelProps, CustomColors } from './Label.types';
import { getThemeColors, getSizeClasses, getVariantStyles, getPositionClasses } from './Label.styles';

const Label: React.FC<LabelProps> = ({
    children,
    htmlFor,
    theme = 'light',
    size = 'md',
    variant = 'default',
    customColors,
    required = false,
    optional = false,
    disabled = false,
    className = '',

    // Icon and visual elements
    icon,
    iconPosition = 'left',

    // Description and tooltip
    description,
    tooltip,

    // Layout
    position = 'top',
    width,

    // Interactive
    onClick,
    onMouseEnter,
    onMouseLeave,

    // Accessibility
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);
    const variantStyles = getVariantStyles(variant, theme);
    const positionClasses = getPositionClasses(position);

    // Override variant if required or optional props are set
    const finalVariant = required ? 'required' : optional ? 'optional' : variant;
    const finalVariantStyles = getVariantStyles(finalVariant, theme);

    // Fix for the custom colors function - use proper typing
    const getCustomStyle = (property: keyof CustomColors): string => {
        return customColors?.[property] || '';
    };

    const handleMouseEnter = () => {
        if (tooltip) setShowTooltip(true);
        onMouseEnter?.();
    };

    const handleMouseLeave = () => {
        if (tooltip) setShowTooltip(false);
        onMouseLeave?.();
    };

    const renderIcon = () => {
        if (icon) return icon;
        if (finalVariantStyles.icon && finalVariant !== 'default') {
            return (
                <span className={`
          ${sizeClasses.text} font-medium
          ${getCustomStyle('iconColor') || finalVariantStyles.iconColor || themeColors.iconColor}
        `}>
                    {finalVariantStyles.icon}
                </span>
            );
        }
        return null;
    };

    const renderTooltip = () => {
        if (!tooltip || !showTooltip) return null;

        return (
            <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap -top-10 left-1/2 transform -translate-x-1/2">
                {tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
        );
    };

    const labelContent = (
        <div className={`
      relative inline-flex items-center transition-all duration-200
      ${iconPosition === 'right' ? 'flex-row-reverse' : ''}
      ${sizeClasses.spacing}
      ${onClick ? 'cursor-pointer' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${!disabled && onClick ? themeColors.hoverColor : ''}
    `}>
            {renderIcon()}

            <span className={`
        font-medium select-none
        ${sizeClasses.text}
        ${getCustomStyle('text') || finalVariantStyles.textColor}
        ${disabled ? themeColors.disabledColor : ''}
      `}>
                {children}
            </span>

            {tooltip && (
                <HelpCircle className={`
          ml-1 cursor-help
          ${sizeClasses.icon}
          ${getCustomStyle('iconColor') || themeColors.iconColor}
        `} />
            )}

            {renderTooltip()}
        </div>
    );

    const labelElement = htmlFor ? (
        <label
            htmlFor={htmlFor}
            className={`
        block
        ${getCustomStyle('background') || finalVariantStyles.bgColor}
        ${positionClasses.label}
        ${className}
      `}
            style={{ width }}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
        >
            {labelContent}
        </label>
    ) : (
        <div
            className={`
        block
        ${getCustomStyle('background') || finalVariantStyles.bgColor}
        ${positionClasses.label}
        ${className}
      `}
            style={{ width }}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
        >
            {labelContent}
        </div>
    );

    if (description) {
        return (
            <div className="space-y-1">
                {labelElement}
                <p className={`
          ${sizeClasses.text === 'text-xs' ? 'text-xs' : 'text-sm'}
          ${getCustomStyle('text') || themeColors.optionalColor}
        `}>
                    {description}
                </p>
            </div>
        );
    }

    return labelElement;
};

export default Label;
