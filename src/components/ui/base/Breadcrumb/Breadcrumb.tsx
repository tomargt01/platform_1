'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import {
    Home,
    ChevronRight,
    MoreHorizontal
} from 'lucide-react';
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
import { getThemeColors, getSizeClasses } from './Breadcrumb.styles';

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items,
    theme = 'light',
    size = 'md',
    separator = <ChevronRight />,
    showHomeIcon = true,
    maxItems = 5,
    className = '',
    onItemClick,
    customColors,
}) => {
    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    // Process items for overflow handling
    const processedItems = React.useMemo(() => {
        if (items.length <= maxItems) {
            return items;
        }

        const firstItem = items[0];
        const lastItems = items.slice(-(maxItems - 2));

        return [
            firstItem,
            { label: '...', href: undefined, disabled: true },
            ...lastItems,
        ];
    }, [items, maxItems]);

    const handleItemClick = (item: BreadcrumbItem, index: number, event: React.MouseEvent) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (item.onClick) {
            event.preventDefault();
            item.onClick();
        }

        if (onItemClick) {
            onItemClick(item, index);
        }
    };

    const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
        const isActive = isLast || item.isActive;
        const isClickable = item.href || item.onClick;

        const itemClasses = `
      inline-flex items-center gap-1.5 transition-colors duration-200
      ${sizeClasses.text}
      ${isActive
                ? `${customColors?.activeText || themeColors.activeText} font-medium`
                : `${customColors?.text || themeColors.text}`
            }
      ${isClickable && !item.disabled
                ? `${customColors?.hoverText || themeColors.hoverText} cursor-pointer`
                : ''
            }
      ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `;

        const content = (
            <>
                {item.icon && (
                    <span className={`${sizeClasses.icon} flex-shrink-0 inline-flex items-center justify-center`}>
                        {item.icon}
                    </span>
                )}
                {index === 0 && showHomeIcon && !item.icon && (
                    <Home className={`${sizeClasses.icon} flex-shrink-0`} />
                )}
                <span className="truncate leading-none">{item.label}</span>
            </>
        );

        if (item.href && !item.disabled) {
            return (
                <Link
                    href={item.href}
                    className={itemClasses}
                    onClick={(e) => handleItemClick(item, index, e)}
                >
                    {content}
                </Link>
            );
        }

        if (item.onClick && !item.disabled) {
            return (
                <button
                    type="button"
                    className={itemClasses}
                    onClick={(e) => handleItemClick(item, index, e)}
                >
                    {content}
                </button>
            );
        }

        return (
            <span className={itemClasses}>
                {content}
            </span>
        );
    };

    const renderSeparator = (index: number) => {
        const separatorClasses = `
      ${sizeClasses.icon} ${sizeClasses.separator} 
      flex-shrink-0 inline-flex items-center justify-center
      ${customColors?.separator || themeColors.separator}
    `;

        if (React.isValidElement(separator)) {
            return React.cloneElement(separator as React.ReactElement, {
                key: `separator-${index}`,
                className: separatorClasses,
            });
        }

        return (
            <span key={`separator-${index}`} className={separatorClasses}>
                {separator}
            </span>
        );
    };

    return (
        <nav
            className={`
        inline-flex items-center rounded-lg
        ${customColors?.background || themeColors.background}
        ${sizeClasses.container}
        ${className}
      `}
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center">
                {processedItems.map((item, index) => {
                    const isLast = index === processedItems.length - 1;

                    return (
                        <Fragment key={`breadcrumb-${index}`}>
                            <li className="inline-flex items-center">
                                {renderBreadcrumbItem(item, index, isLast)}
                            </li>
                            {!isLast && (
                                <li className="inline-flex items-center">
                                    {renderSeparator(index)}
                                </li>
                            )}
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
