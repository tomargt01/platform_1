'use client';

import React from 'react';
import { StepProgressProps } from './ProgressBar.types';
import { getThemeStyles } from './ProgressBar.styles';
import { Check } from 'lucide-react';

const StepProgress: React.FC<StepProgressProps> = ({
    steps,
    theme = 'light',
    size = 'md',
    className = '',
}) => {
    const themeStyles = getThemeStyles(theme);

    const sizeMap = {
        xs: { stepSize: 20, fontSize: '10px', lineHeight: '2px' },
        sm: { stepSize: 24, fontSize: '12px', lineHeight: '3px' },
        md: { stepSize: 32, fontSize: '14px', lineHeight: '4px' },
        lg: { stepSize: 40, fontSize: '16px', lineHeight: '5px' },
        xl: { stepSize: 48, fontSize: '18px', lineHeight: '6px' },
    };

    const sizeConfig = sizeMap[size];

    return (
        <div className={`step-progress-container ${className}`}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center">
                            {/* Step Circle */}
                            <div
                                className="flex items-center justify-center rounded-full border-2 transition-all duration-300"
                                style={{
                                    width: `${sizeConfig.stepSize}px`,
                                    height: `${sizeConfig.stepSize}px`,
                                    backgroundColor: step.completed
                                        ? themeStyles.primary
                                        : step.active
                                            ? themeStyles.background
                                            : themeStyles.secondary,
                                    borderColor: step.completed || step.active
                                        ? themeStyles.primary
                                        : themeStyles.secondary,
                                    color: step.completed
                                        ? 'white'
                                        : step.active
                                            ? themeStyles.primary
                                            : themeStyles.text,
                                }}
                            >
                                {step.completed ? (
                                    <Check size={sizeConfig.stepSize * 0.5} />
                                ) : (
                                    <span style={{ fontSize: sizeConfig.fontSize }}>
                                        {index + 1}
                                    </span>
                                )}
                            </div>

                            {/* Step Label */}
                            <span
                                className="mt-2 text-center text-xs font-medium max-w-20"
                                style={{
                                    color: step.completed || step.active
                                        ? themeStyles.text
                                        : themeStyles.secondary,
                                    fontSize: sizeConfig.fontSize,
                                }}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                            <div
                                className="flex-1 mx-2"
                                style={{
                                    height: sizeConfig.lineHeight,
                                    backgroundColor: step.completed
                                        ? themeStyles.primary
                                        : themeStyles.secondary,
                                    borderRadius: '2px',
                                    transition: 'background-color 0.3s ease-in-out',
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default StepProgress;
