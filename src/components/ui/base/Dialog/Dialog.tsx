'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';
import { DialogProps } from './Dialog.types';
import { getThemeColors, getVariantStyles } from './Dialog.styles';
import DialogOverlay from './DialogOverlay';
import DialogContent from './DialogContent';

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    children,
    theme = 'light',
    size = 'md',
    variant = 'default',
    customColors,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className = '',
    overlayClassName = '',
    contentClassName = '',

    // Footer props
    showFooter = false,
    primaryButtonText = 'Confirm',
    secondaryButtonText = 'Cancel',
    onPrimaryAction,
    onSecondaryAction,
    primaryButtonLoading = false,
    secondaryButtonLoading = false,

    // Custom components
    customHeader,
    customFooter,
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const themeColors = getThemeColors(theme);
    const variantStyles = getVariantStyles(variant, theme);

    // Handle escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && closeOnEscape && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, closeOnEscape, onClose]);

    // Focus management
    useEffect(() => {
        if (isOpen && dialogRef.current) {
            const focusableElements = dialogRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusableElement = focusableElements[0] as HTMLElement;
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePrimaryAction = () => {
        if (onPrimaryAction) {
            onPrimaryAction();
        } else {
            onClose();
        }
    };

    const handleSecondaryAction = () => {
        if (onSecondaryAction) {
            onSecondaryAction();
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    const dialogContent = (
        <div
            className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        ${customColors?.overlay || themeColors.overlay}
        ${overlayClassName}
      `}
            onClick={handleOverlayClick}
        >
            <DialogContent
                size={size}
                theme={theme}
                variant={variant}
                customColors={customColors}
                className={contentClassName}
            >
                <div ref={dialogRef} className={className}>
                    {/* Header */}
                    {customHeader || (title || showCloseButton) ? (
                        <div className={`
              flex items-center justify-between p-4
              ${variantStyles.headerBg}
              ${variant !== 'default' ? 'rounded-t-lg' : ''}
            `}>
                            <div className="flex items-center space-x-3">
                                {variantStyles.icon && (
                                    <span className={`text-xl ${variantStyles.iconColor}`}>
                                        {variantStyles.icon}
                                    </span>
                                )}
                                {title && (
                                    <h3 className={`text-lg font-semibold ${customColors?.text || themeColors.text}`}>
                                        {title}
                                    </h3>
                                )}
                            </div>

                            {showCloseButton && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={`
                    p-1 rounded-lg transition-colors
                    ${customColors?.text || themeColors.closeButton}
                    hover:bg-gray-100 dark:hover:bg-gray-700
                  `}
                                    aria-label="Close dialog"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ) : null}

                    {/* Content */}
                    <div className={`
            p-4 
            ${customColors?.text || themeColors.text}
            ${!title && !customHeader && variant === 'default' ? 'pt-6' : ''}
          `}>
                        {children}
                    </div>

                    {/* Footer */}
                    {customFooter || showFooter ? (
                        <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-600 rounded-b-lg">
                            {customFooter || (
                                <>
                                    {secondaryButtonText && (
                                        <button
                                            type="button"
                                            onClick={handleSecondaryAction}
                                            disabled={secondaryButtonLoading}
                                            className={`
                        px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${customColors?.secondaryButton || themeColors.secondaryButton}
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center space-x-2
                      `}
                                        >
                                            {secondaryButtonLoading && (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            )}
                                            <span>{secondaryButtonText}</span>
                                        </button>
                                    )}

                                    {primaryButtonText && (
                                        <button
                                            type="button"
                                            onClick={handlePrimaryAction}
                                            disabled={primaryButtonLoading}
                                            className={`
                        px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${customColors?.primaryButton || themeColors.primaryButton}
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center space-x-2
                      `}
                                        >
                                            {primaryButtonLoading && (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            )}
                                            <span>{primaryButtonText}</span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ) : null}
                </div>
            </DialogContent>
        </div>
    );

    // Use portal to render dialog at document body level
    return typeof window !== 'undefined'
        ? createPortal(dialogContent, document.body)
        : null;
};

export default Dialog;
