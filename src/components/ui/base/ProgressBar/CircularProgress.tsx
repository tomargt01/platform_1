'use client';

import React from 'react';
import { CircularProgressProps } from './ProgressBar.types';
import { getThemeStyles } from './ProgressBar.styles';

const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    max = 100,
    theme = 'light',
    size = 'md',
    strokeWidth = 8,
    radius = 50,
    clockwise = true,
    showText = true,
    textColor,
    showPercentage = true,
    animated = true,
    className = '',
    label,
    color,
}) => {
    const themeStyles = getThemeStyles(theme);
    const percentage = Math.min((value / max) * 100, 100);

    const sizeMap = {
        xs: { radius: 30, strokeWidth: 4, fontSize: '10px' },
        sm: { radius: 40, strokeWidth: 6, fontSize: '12px' },
        md: { radius: 50, strokeWidth: 8, fontSize: '14px' },
        lg: { radius: 60, strokeWidth: 10, fontSize: '16px' },
        xl: { radius: 80, strokeWidth: 12, fontSize: '20px' },
    };

    const sizeConfig = sizeMap[size];
    const actualRadius = radius || sizeConfig.radius;
    const actualStrokeWidth = strokeWidth || sizeConfig.strokeWidth;
    const normalizedRadius = actualRadius - actualStrokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const svgSize = (actualRadius + actualStrokeWidth) * 2;

    return (
        <div className={`circular-progress-container ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
            <svg
                height={svgSize}
                width={svgSize}
                style={{ transform: clockwise ? 'rotate(-90deg)' : 'rotate(-90deg) scaleX(-1)' }}
            >
                {/* Background circle */}
                <circle
                    stroke={themeStyles.secondary}
                    fill="transparent"
                    strokeWidth={actualStrokeWidth}
                    r={normalizedRadius}
                    cx={actualRadius + actualStrokeWidth}
                    cy={actualRadius + actualStrokeWidth}
                />

                {/* Progress circle */}
                <circle
                    stroke={color || themeStyles.primary}
                    fill="transparent"
                    strokeWidth={actualStrokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={actualRadius + actualStrokeWidth}
                    cy={actualRadius + actualStrokeWidth}
                    style={{
                        transition: animated ? 'stroke-dashoffset 0.5s ease-in-out' : undefined,
                    }}
                />
            </svg>

            {showText && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                        color: textColor || themeStyles.text,
                        fontSize: sizeConfig.fontSize,
                        fontWeight: 'bold',
                    }}
                >
                    {showPercentage && <span>{Math.round(percentage)}%</span>}
                    {label && <span className="text-xs mt-1 text-center">{label}</span>}
                </div>
            )}
        </div>
    );
};

export default CircularProgress;
