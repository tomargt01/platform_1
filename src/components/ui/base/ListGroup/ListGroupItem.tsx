'use client';

import React from 'react';
import { ListGroupItemProps } from './ListGroup.types';
import { getThemeStyles, getSizeStyles, getItemVariantStyles } from './ListGroup.styles';

interface ExtendedListGroupItemProps extends ListGroupItemProps {
    theme?: any;
    size?: any;
    index?: number;
    horizontal?: boolean;
    isFirst?: boolean;
    isLast?: boolean;
}

const ListGroupItem: React.FC<ExtendedListGroupItemProps> = ({
    children,
    active = false,
    disabled = false,
    href,
    onClick,
    className = '',
    variant = 'default',
    icon,
    badge,
    subtitle,
    theme = 'light',
    size = 'md',
    index,
    horizontal = false,
    isFirst = false,
    isLast = false,
}) => {
    const themeStyles = getThemeStyles(theme);
    const sizeStyles = getSizeStyles(size);
    const itemVariantStyles = getItemVariantStyles(variant, theme);

    const Component = href ? 'a' : onClick ? 'button' : 'div';

    const getBorderClasses = () => {
        if (horizontal) {
            return isLast ? '' : 'border-r';
        }
        return isLast ? '' : 'border-b';
    };

    const getRoundedClasses = () => {
        if (horizontal) {
            if (isFirst) return 'rounded-l-lg';
            if (isLast) return 'rounded-r-lg';
            return '';
        } else {
            if (isFirst) return 'rounded-t-lg';
            if (isLast) return 'rounded-b-lg';
            return '';
        }
    };

    const baseClasses = `
    flex items-center justify-between w-full text-left transition-all duration-200
    ${sizeStyles.item}
    ${getBorderClasses()}
    ${getRoundedClasses()}
    ${variant !== 'default' ? itemVariantStyles.background : ''}
    ${variant !== 'default' ? itemVariantStyles.text : themeStyles.text}
    ${active ? themeStyles.active : ''}
    ${disabled
            ? `${themeStyles.disabled} cursor-not-allowed`
            : onClick || href
                ? `${themeStyles.hover} cursor-pointer`
                : 'cursor-default'
        }
    ${className}
  `;

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    return (
        <Component
            href={href}
            onClick={handleClick}
            disabled={disabled}
            className={baseClasses}
        >
            <div className="flex items-center flex-1">
                {index && (
                    <span className={`mr-3 font-medium text-${theme === 'dark' ? 'gray-400' : 'gray-500'}`}>
                        {index}.
                    </span>
                )}

                {icon && (
                    <span className={`mr-3 ${sizeStyles.icon} flex-shrink-0`}>
                        {icon}
                    </span>
                )}

                <div className="flex-1">
                    <div className="flex items-center">
                        {children}
                    </div>
                    {subtitle && (
                        <div className={`text-sm opacity-70 mt-1`}>
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>

            {badge && (
                <span className={`
          inline-flex items-center justify-center rounded-full font-medium
          ${sizeStyles.badge}
          ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}
          ml-2 flex-shrink-0
        `}>
                    {badge}
                </span>
            )}
        </Component>
    );
};

export default ListGroupItem;
