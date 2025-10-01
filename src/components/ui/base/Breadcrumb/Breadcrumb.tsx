import React, { Fragment, useMemo } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
import { getSizeClasses } from './Breadcrumb.styles';

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items,
    size = 'md',
    separator = <ChevronRight />,
    showHomeIcon = true,
    maxItems = 5,
    className = '',
    onItemClick,
}) => {
    const sizeClasses = getSizeClasses(size);

    const processedItems = useMemo(() => {
        if (items.length <= maxItems) return items;
        const firstItem = items[0];
        const lastItems = items.slice(-(maxItems - 2));
        return [firstItem, { label: '...', disabled: true }, ...lastItems];
    }, [items, maxItems]);

    // Handle click logic: Only prevent default if there’s a custom onClick
    const handleItemClick = (item: BreadcrumbItem, index: number, event: React.MouseEvent) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (item.onClick) {
            event.preventDefault();
            item.onClick();
        }
    };

    const renderBreadcrumbItem = (
        item: BreadcrumbItem,
        index: number,
        isLast: boolean
    ) => {
        const isActive = isLast || item.isActive;
        const isClickable = item.href || item.onClick;

        const itemStyle: React.CSSProperties = {
            color: isActive ? 'var(--accent)' : 'var(--text)',
            fontWeight: isActive ? 'bold' : 'normal',
            fontSize: sizeClasses.textFontSize,
            cursor: isClickable && !item.disabled ? 'pointer' : 'default',
            opacity: item.disabled ? 0.5 : 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            transition: 'color 0.2s ease',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };

        const iconStyle: React.CSSProperties = {
            width: sizeClasses.iconSize,
            height: sizeClasses.iconSize,
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)'
        };

        const content = (
            <>
                {item.icon ? (
                    <span style={iconStyle}>{item.icon}</span>
                ) : index === 0 && showHomeIcon ? (
                    <Home style={iconStyle} />
                ) : null}
                <span>{item.label}</span>
            </>
        );

        if (item.href && !item.disabled) {
            return (
                <Link
                    href={item.href}
                    onClick={item.onClick ? (e) => handleItemClick(item, index, e) : undefined}
                    style={itemStyle}
                    aria-current={isActive ? 'page' : undefined}
                    key={`breadcrumb-link-${index}`}
                >
                    {content}
                </Link>
            );
        }

        if (item.onClick && !item.disabled) {
            return (
                <button
                    type="button"
                    onClick={(e) => handleItemClick(item, index, e)}
                    style={itemStyle}
                    key={`breadcrumb-button-${index}`}
                >
                    {content}
                </button>
            );
        }

        return (
            <span style={itemStyle} key={`breadcrumb-span-${index}`}>
                {content}
            </span>
        );
    };

    const renderSeparator = (index: number) => {
        const separatorStyle: React.CSSProperties = {
            color: 'var(--placeholder)',
            width: sizeClasses.iconSize,
            height: sizeClasses.iconSize,
            marginLeft: 'var(--margin8px)',
            marginRight: 'var(--margin8px)',
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        if (React.isValidElement(separator)) {
            return React.cloneElement(separator as React.ReactElement, {
                key: `separator-${index}`,
                style: separatorStyle,
            });
        }

        return (
            <span key={`separator-${index}`} style={separatorStyle}>
                {separator}
            </span>
        );
    };

    return (
        <nav
            aria-label="Breadcrumb"
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--background)',
                border: 'var(--OneSolidBorder) var(--borderColor)',
                padding: sizeClasses.containerPadding,
                overflow: 'hidden',
            }}
        >
            <ol style={{ display: 'inline-flex', alignItems: 'center', margin: 0, padding: 0 }}>
                {processedItems.map((item, index) => {
                    const isLast = index === processedItems.length - 1;
                    return (
                        <Fragment key={`breadcrumb-${index}`}>
                            <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                                {renderBreadcrumbItem(item, index, isLast)}
                            </li>
                            {!isLast && (
                                <li style={{ display: 'inline-flex', alignItems: 'center' }}>
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
