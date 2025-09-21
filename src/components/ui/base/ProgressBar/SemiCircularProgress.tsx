'use client';

import React from 'react';
import { CircularProgressProps } from './ProgressBar.types';
import { getThemeStyles } from './ProgressBar.styles';

const SemiCircularProgress: React.FC<CircularProgressProps> = ({
    value,
    max = 100,
    theme = 'light',
    size = 'md',
    strokeWidth = 8,
    radius = 50,
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
    const circumference = normalizedRadius * Math.PI; // Half circle
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const svgWidth = (actualRadius + actualStrokeWidth) * 2;
    const svgHeight = actualRadius + actualStrokeWidth + 10;

    return (
        <div className={`semi-circular-progress-container ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
            <svg
                height={svgHeight}
                width={svgWidth}
                style={{ transform: 'rotate(-90deg)' }}
            >
                {/* Background arc */}
                <path
                    d={`M ${actualStrokeWidth} ${actualRadius + actualStrokeWidth} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${svgWidth - actualStrokeWidth} ${actualRadius + actualStrokeWidth}`}
                    fill="transparent"
                    stroke={themeStyles.secondary}
                    strokeWidth={actualStrokeWidth}
                    strokeLinecap="round"
                />

                {/* Progress arc */}
                <path
                    d={`M ${actualStrokeWidth} ${actualRadius + actualStrokeWidth} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${svgWidth - actualStrokeWidth} ${actualRadius + actualStrokeWidth}`}
                    fill="transparent"
                    stroke={color || themeStyles.primary}
                    strokeWidth={actualStrokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        transition: animated ? 'stroke-dashoffset 0.5s ease-in-out' : undefined,
                    }}
                />
            </svg>

            {showText && (
                <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
                    style={{
                        color: textColor || themeStyles.text,
                        fontSize: sizeConfig.fontSize,
                        fontWeight: 'bold',
                    }}
                >
                    {showPercentage && <div>{Math.round(percentage)}%</div>}
                    {label && <div className="text-xs mt-1">{label}</div>}
                </div>
            )}
        </div>
    );
};

export default SemiCircularProgress;
