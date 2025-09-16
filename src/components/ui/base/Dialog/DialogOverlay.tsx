'use client';

import React from 'react';
import { DialogOverlayProps } from './Dialog.types';
import { getThemeColors } from './Dialog.styles';

const DialogOverlay: React.FC<DialogOverlayProps> = ({
    isOpen,
    onClose,
    closeOnOverlayClick,
    theme,
    customColors,
    className = '',
}) => {
    const themeColors = getThemeColors(theme);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && onClose && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        ${customColors?.overlay || themeColors.overlay}
        ${className}
      `}
            onClick={handleOverlayClick}
            aria-hidden="true"
        />
    );
};

export default DialogOverlay;
