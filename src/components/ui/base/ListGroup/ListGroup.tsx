'use client';

import React from 'react';
import { ListGroupProps } from './ListGroup.types';
import { getThemeStyles, getVariantStyles } from './ListGroup.styles';

const ListGroup: React.FC<ListGroupProps> = ({
    children,
    theme = 'light',
    variant = 'default',
    size = 'md',
    className = '',
    horizontal = false,
    numbered = false,
}) => {
    const themeStyles = getThemeStyles(theme);
    const variantStyles = getVariantStyles(variant);

    const getHorizontalClass = () => {
        if (!horizontal) return '';
        if (horizontal === true) return 'flex flex-row';
        return `flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row`;
    };

    return (
        <div
            className={`
        list-group overflow-hidden
        ${themeStyles.background} ${themeStyles.border} ${themeStyles.text}
        ${variantStyles}
        ${getHorizontalClass()}
        ${className}
      `}
            data-theme={theme}
            data-variant={variant}
            data-size={size}
            data-numbered={numbered}
        >
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        theme,
                        size,
                        variant,
                        index: numbered ? index + 1 : undefined,
                        horizontal,
                        isFirst: index === 0,
                        isLast: index === React.Children.count(children) - 1,
                    });
                }
                return child;
            })}
        </div>
    );
};

export default ListGroup;
