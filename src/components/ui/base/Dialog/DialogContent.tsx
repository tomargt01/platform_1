'use client';

import React from 'react';
import { DialogContentProps } from './Dialog.types';
import { getThemeColors, getSizeClasses, getVariantStyles } from './Dialog.styles';

const DialogContent: React.FC<DialogContentProps> = ({
    children,
    size,
    theme,
    variant,
    customColors,
    className = '',
}) => {
    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);
    const variantStyles = getVariantStyles(variant, theme);

    return (
        <div
            className={`
        relative w-full ${sizeClasses} transform rounded-lg shadow-xl transition-all
        ${customColors?.background || themeColors.background}
        ${customColors?.border || themeColors.border}
        border
        ${className}
      `}
            role="dialog"
            aria-modal="true"
        >
            {children}
        </div>
    );
};

export default DialogContent;
