'use client';

import React from 'react';
import { LabelGroupProps } from './Label.types';
import { getThemeColors } from './Label.styles';

const LabelGroup: React.FC<LabelGroupProps> = ({
    children,
    theme = 'light',
    orientation = 'vertical',
    spacing = 'normal',
    className = '',
    customColors,
}) => {
    const themeColors = getThemeColors(theme);

    const getSpacingClass = () => {
        const spacingMap = {
            horizontal: {
                tight: 'space-x-2',
                normal: 'space-x-4',
                loose: 'space-x-6',
            },
            vertical: {
                tight: 'space-y-1',
                normal: 'space-y-2',
                loose: 'space-y-4',
            },
        };
        return spacingMap[orientation][spacing];
    };

    const getOrientationClass = () => {
        return orientation === 'horizontal' ? 'flex flex-wrap items-center' : 'flex flex-col';
    };

    return (
        <div className={`
      ${getOrientationClass()}
      ${getSpacingClass()}
      ${className}
    `}>
            {children}
        </div>
    );
};

export default LabelGroup;
