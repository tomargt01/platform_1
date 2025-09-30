import React from 'react';
import { GridProps } from './types';

// export interface GridProps {
//     columns?: number;      // Number of columns, default 3
//     gap?: number;          // Gap size (Tailwind spacing scale), default 4
//     className?: string;    // Additional Tailwind utility classes
//     children: React.ReactNode;
// }

export const Grid: React.FC<GridProps> = ({
    columns = 3,
    gap = 4,
    className = '',
    children,
}) => {
    // Construct Tailwind grid classes
    const gridClass = `grid grid-cols-${columns} gap-${gap} ${className}`.trim();

    return <div className={gridClass}>{children}</div>;
};
