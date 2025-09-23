'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { OffCanvasProps, DrawerState } from './OffCanvas.types';
import {
    getThemeColors,
    getSizeClasses,
    getBackdropClasses,
    getPositionClasses
} from './OffCanvas.styles';

const OffCanvas: React.FC<OffCanvasProps> = ({
    isOpen,
    onClose,
    position = 'right',
    size = 'md',
    theme = 'light',
    animationType = 'slide',
    animationDuration = 300,
    backdropType = 'blur',
    closeOnBackdropClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    customColors,
    className = '',
    children,
    header,
    footer,
    zIndex = 1050,
    persistent = false,
    lockBodyScroll = true,
}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [animating, setAnimating] = useState<boolean>(false);

    const drawerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLElement | null>(null);

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size, position);
    const baseBackdropClasses = getBackdropClasses(backdropType);
    const positionClasses = getPositionClasses(position);

    // Handle mounting and visibility with proper timing
    useEffect(() => {
        if (isOpen) {
            // Mount the component first
            setMounted(true);
            setAnimating(true);

            // Then trigger the animation after a micro-delay
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });
        } else {
            if (mounted) {
                // Start closing animation
                setAnimating(true);
                setVisible(false);

                // Unmount after animation completes
                const timer = setTimeout(() => {
                    setMounted(false);
                    setAnimating(false);
                }, animationDuration + 50);

                return () => clearTimeout(timer);
            }
        }
    }, [isOpen, mounted, animationDuration]);

    // Handle body scroll lock
    useEffect(() => {
        if (lockBodyScroll && visible) {
            bodyRef.current = document.body;
            const scrollY = window.scrollY;

            // Store original styles
            const originalStyle = {
                position: bodyRef.current.style.position,
                top: bodyRef.current.style.top,
                width: bodyRef.current.style.width,
                overflow: bodyRef.current.style.overflow,
            };

            // Apply scroll lock
            bodyRef.current.style.position = 'fixed';
            bodyRef.current.style.top = `-${scrollY}px`;
            bodyRef.current.style.width = '100%';
            bodyRef.current.style.overflow = 'hidden';

            return () => {
                if (bodyRef.current) {
                    // Restore original styles
                    Object.assign(bodyRef.current.style, originalStyle);
                    window.scrollTo(0, scrollY);
                }
            };
        }
    }, [visible, lockBodyScroll]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && closeOnEscape && visible && !persistent) {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [visible, closeOnEscape, onClose, persistent]);

    const handleBackdropClick = useCallback((event: React.MouseEvent) => {
        if (event.target === backdropRef.current && closeOnBackdropClick && !persistent) {
            onClose();
        }
    }, [closeOnBackdropClick, onClose, persistent]);

    // Fixed: Explicit return type and no circular reference
    const getDrawerClasses = (): string => {
        const baseClasses = `
      fixed ${positionClasses.container} ${sizeClasses.main} ${sizeClasses.height}
      ${themeColors.background} ${themeColors.border} ${themeColors.shadow}
      ${customColors?.background || ''}
      ${className}
      flex flex-col border
      transition-all duration-${animationDuration} ease-in-out
      will-change-transform transform-gpu
    `.trim().replace(/\s+/g, ' ');

        // Position-specific transforms
        const getTransform = (): string => {
            switch (position) {
                case 'left':
                    return visible ? 'translate-x-0' : '-translate-x-full';
                case 'right':
                    return visible ? 'translate-x-0' : 'translate-x-full';
                case 'top':
                    return visible ? 'translate-y-0' : '-translate-y-full';
                case 'bottom':
                    return visible ? 'translate-y-0' : 'translate-y-full';
                default:
                    return visible ? 'translate-x-0' : 'translate-x-full';
            }
        };

        return `${baseClasses} ${getTransform()}`;
    };

    // Fixed: Explicit return type and proper backdrop handling
    const getEnhancedBackdropClasses = (): string => {
        // Enhanced backdrop based on type
        const getBackdropTypeClasses = (): string => {
            switch (backdropType) {
                case 'blur':
                    return 'bg-black/50 backdrop-blur-sm';
                case 'dark':
                    return 'bg-black/80';
                case 'light':
                    return 'bg-white/80';
                case 'transparent':
                    return 'bg-transparent';
                case 'custom':
                    return customColors?.backdrop || 'bg-black/50';
                default:
                    return 'bg-black/50 backdrop-blur-sm';
            }
        };

        const baseClasses = `
      fixed inset-0
      transition-all duration-${animationDuration} ease-in-out
      ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      will-change-opacity
    `.trim().replace(/\s+/g, ' ');

        return `${baseClasses} ${getBackdropTypeClasses()}`;
    };

    const getCloseIcon = (): React.ReactNode => {
        const iconProps = { className: "w-5 h-5" };

        switch (position) {
            case 'left':
                return <ChevronLeft {...iconProps} />;
            case 'right':
                return <ChevronRight {...iconProps} />;
            case 'top':
                return <ChevronUp {...iconProps} />;
            case 'bottom':
                return <ChevronDown {...iconProps} />;
            default:
                return <X {...iconProps} />;
        }
    };

    // Don't render if not mounted
    if (!mounted) return null;

    const drawerContent = (
        <div className="offcanvas-portal">
            {/* Enhanced Backdrop with proper z-index */}
            <div
                ref={backdropRef}
                className={getEnhancedBackdropClasses()}
                style={{
                    zIndex: zIndex - 1,
                    position: 'fixed',
                    inset: 0,
                }}
                onClick={handleBackdropClick}
                aria-hidden="true"
            />

            {/* Drawer Container with higher z-index */}
            <div
                ref={drawerRef}
                className={getDrawerClasses()}
                style={{
                    zIndex: zIndex,
                    position: 'fixed',
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="offcanvas-title"
            >
                {/* Header */}
                {(header || showCloseButton) && (
                    <div
                        className={`
              flex items-center justify-between p-4 border-b flex-shrink-0
              ${themeColors.header} ${customColors?.header || ''}
              transition-opacity duration-${Math.min(animationDuration, 200)} ease-in-out
              ${visible ? 'opacity-100' : 'opacity-0'}
            `.trim().replace(/\s+/g, ' ')}
                    >
                        <div className="flex-1" id="offcanvas-title">
                            {header}
                        </div>

                        {showCloseButton && !persistent && (
                            <button
                                onClick={onClose}
                                className={`
                  ml-4 p-2 rounded-lg transition-all duration-200
                  ${themeColors.text} hover:bg-gray-100 dark:hover:bg-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  hover:scale-110 active:scale-95
                `.trim().replace(/\s+/g, ' ')}
                                aria-label="Close drawer"
                                type="button"
                            >
                                {getCloseIcon()}
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div
                    className={`
            flex-1 overflow-auto ${themeColors.text}
            transition-opacity duration-${Math.min(animationDuration, 250)} ease-in-out
            ${visible ? 'opacity-100' : 'opacity-0'}
          `.trim().replace(/\s+/g, ' ')}
                >
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div
                        className={`
              p-4 border-t flex-shrink-0 ${themeColors.footer} ${customColors?.footer || ''}
              transition-opacity duration-${Math.min(animationDuration, 200)} ease-in-out
              ${visible ? 'opacity-100' : 'opacity-0'}
            `.trim().replace(/\s+/g, ' ')}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(drawerContent, document.body);
};

export default OffCanvas;
