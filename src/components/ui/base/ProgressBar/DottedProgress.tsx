'use client';

import React from 'react';
import { DottedProgressProps } from './ProgressBar.types';
import { getThemeStyles } from './ProgressBar.styles';

const DottedProgress: React.FC<DottedProgressProps> = ({
    value,
    max = 100,
    theme = 'light',
    size = 'md',
    dotCount = 20,
    dotSize = 8,
    spacing = 4,
    animated = true,
    className = '',
    showPercentage = false,
    color,
}) => {
    const themeStyles = getThemeStyles(theme);
    const percentage = Math.min((value / max) * 100, 100);
    const activeDots = Math.round((percentage / 100) * dotCount);

    const sizeMap = {
        xs: { dotSize: 4, spacing: 2 },
        sm: { dotSize: 6, spacing: 3 },
        md: { dotSize: 8, spacing: 4 },
        lg: { dotSize: 10, spacing: 5 },
        xl: { dotSize: 12, spacing: 6 },
    };

    const sizeConfig = sizeMap[size];
    const actualDotSize = dotSize || sizeConfig.dotSize;
    const actualSpacing = spacing || sizeConfig.spacing;

    return (
        <div className={`dotted-progress-container ${className}`}>
            <div
                className="flex items-center"
                style={{ gap: `${actualSpacing}px` }}
            >
                {Array.from({ length: dotCount }, (_, index) => (
                    <div
                        key={index}
                        className="rounded-full transition-all duration-300"
                        style={{
                            width: `${actualDotSize}px`,
                            height: `${actualDotSize}px`,
                            backgroundColor: index < activeDots
                                ? (color || themeStyles.primary)
                                : themeStyles.secondary,
                            opacity: index < activeDots ? 1 : 0.3,
                            transform: animated && index < activeDots ? 'scale(1.1)' : 'scale(1)',
                            transitionDelay: animated ? `${index * 50}ms` : '0ms',
                        }}
                    />
                ))}
            </div>

            {showPercentage && (
                <div
                    className="text-center mt-2 text-sm font-medium"
                    style={{ color: themeStyles.text }}
                >
                    {Math.round(percentage)}%
                </div>
            )}
        </div>
    );
};

export default DottedProgress;
