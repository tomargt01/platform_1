'use client';

import React from 'react';
import { BaseProgressProps } from './ProgressBar.types';
import { getThemeStyles, getSizeStyles, getGradientStyle } from './ProgressBar.styles';

const LinearProgress: React.FC<BaseProgressProps> = ({
    value,
    max = 100,
    theme = 'light',
    size = 'md',
    variant = 'linear',
    showLabel = false,
    showPercentage = false,
    animated = false,
    striped = false,
    className = '',
    label,
    color,
    backgroundColor,
    height,
    width = '100%',
}) => {
    const themeStyles = getThemeStyles(theme);
    const sizeStyles = getSizeStyles(size);
    const percentage = Math.min((value / max) * 100, 100);

    const progressBarStyle: React.CSSProperties = {
        width: width,
        height: height || sizeStyles.height,
        backgroundColor: backgroundColor || themeStyles.secondary,
        borderRadius: '9999px',
        overflow: 'hidden',
        position: 'relative',
    };

    const fillStyle: React.CSSProperties = {
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color || themeStyles.primary,
        background: variant === 'gradient' ? getGradientStyle(theme) : undefined,
        borderRadius: 'inherit',
        transition: animated ? 'width 0.3s ease-in-out' : undefined,
        position: 'relative',
        overflow: 'hidden',
    };

    // Striped pattern
    if (striped) {
        fillStyle.backgroundImage = `linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    )`;
        fillStyle.backgroundSize = '1rem 1rem';

        if (animated) {
            fillStyle.animation = 'progress-bar-stripes 1s linear infinite';
        }
    }

    return (
        <div className={`progress-container ${className}`}>
            {(showLabel && label) && (
                <div className="flex justify-between items-center mb-1">
                    <span
                        className="text-sm font-medium"
                        style={{ color: themeStyles.text, fontSize: sizeStyles.fontSize }}
                    >
                        {label}
                    </span>
                    {showPercentage && (
                        <span
                            className="text-sm font-medium"
                            style={{ color: themeStyles.text, fontSize: sizeStyles.fontSize }}
                        >
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            )}

            <div style={progressBarStyle}>
                <div style={fillStyle}>
                    {animated && !striped && (
                        <div
                            className="absolute inset-0 opacity-25"
                            style={{
                                background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                animation: 'progress-shimmer 2s infinite',
                            }}
                        />
                    )}
                </div>

                {showPercentage && !showLabel && (
                    <div
                        className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                        style={{ color: percentage > 50 ? 'white' : themeStyles.text }}
                    >
                        {Math.round(percentage)}%
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes progress-bar-stripes {
          from {
            background-position: 1rem 0;
          }
          to {
            background-position: 0 0;
          }
        }
        
        @keyframes progress-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
        </div>
    );
};

export default LinearProgress;
