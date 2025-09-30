import React from 'react';
import { GridItemProps } from './types';

export const GridItem: React.FC<GridItemProps> = ({
    colSpan = 1,
    className = '',
    children,
}) => {
    const spanClass = `col-span-${colSpan} ${className}`.trim();

    return <div className={spanClass}>{children}</div>;
};
