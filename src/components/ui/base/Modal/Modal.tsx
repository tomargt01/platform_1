'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { flushSync } from 'react-dom';
import { X, Move } from 'lucide-react';
import { BaseModalProps, ModalContentProps, ModalPosition } from './Modal.types';
import { getModalStyles, getThemeClasses } from './Modal.styles';

interface ModalProps extends BaseModalProps, ModalContentProps { }

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    theme = 'light',
    size = 'md',
    placement = 'center',
    backdrop = true,
    backdropClose = true,
    escapeClose = true,
    persistent = false,
    draggable = false,
    className = '',
    style,
    zIndex = 1000,
    showHeader = true,
    showFooter = true, // NEW: Default to true
    header,
    title,
    subtitle,
    content,
    footer,
    showCloseButton = true,
    closeButtonPosition = 'header',
    children,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); // NEW: Track drag offset
    const mountedRef = useRef(false);

    const [modalState, setModalState] = useState(() => ({
        isVisible: false,
        isAnimating: false,
        position: { x: 0, y: 0 }
    }));

    const themeClasses = getThemeClasses(theme);
    const modalStyles = getModalStyles(size, placement);

    // Modal state management
    useEffect(() => {
        if (isOpen) {
            if (!mountedRef.current) {
                mountedRef.current = true;
                flushSync(() => {
                    setModalState(prev => ({
                        ...prev,
                        isVisible: true,
                        isAnimating: true
                    }));
                });

                document.body.style.overflow = 'hidden';

                const timer = setTimeout(() => {
                    setModalState(prev => ({ ...prev, isAnimating: false }));
                }, 200);

                return () => clearTimeout(timer);
            }
        } else if (mountedRef.current) {
            mountedRef.current = false;
            setModalState(prev => ({ ...prev, isAnimating: true }));

            const timer = setTimeout(() => {
                setModalState({
                    isVisible: false,
                    isAnimating: false,
                    position: { x: 0, y: 0 }
                });
                document.body.style.overflow = 'unset';
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Escape key handler
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && escapeClose && isOpen && !persistent) {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape, { capture: true });
        }

        return () => {
            document.removeEventListener('keydown', handleEscape, { capture: true });
        };
    }, [isOpen, escapeClose, onClose, persistent]);

    const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && backdropClose && !persistent && !isDragging.current) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    }, [backdropClose, persistent, onClose]);

    const handleContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    const handleCloseClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    }, [onClose]);

    // FIXED: Draggable functionality - drag from anywhere on modal
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!draggable) return;

        e.preventDefault();
        e.stopPropagation();

        isDragging.current = true;

        // Get current modal position and mouse position
        const rect = modalRef.current?.getBoundingClientRect();
        const currentTransform = modalState.position;

        if (rect) {
            // Calculate offset from mouse position to modal's current position
            const offsetX = e.clientX - (rect.left + currentTransform.x);
            const offsetY = e.clientY - (rect.top + currentTransform.y);

            dragOffset.current = { x: offsetX, y: offsetY };

            const handleMouseMove = (moveEvent: MouseEvent) => {
                if (isDragging.current) {
                    // Calculate new position relative to viewport
                    const newX = moveEvent.clientX - dragOffset.current.x;
                    const newY = moveEvent.clientY - dragOffset.current.y;

                    setModalState(prev => ({
                        ...prev,
                        position: { x: newX, y: newY }
                    }));
                }
            };

            const handleMouseUp = () => {
                isDragging.current = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    }, [draggable, modalState.position]);

    if (!modalState.isVisible && !isOpen) {
        return null;
    }

    const modalContent = (
        <div
            ref={backdropRef}
            className={`fixed inset-0 flex ${modalStyles.container}`}
            style={{ zIndex }}
            onClick={handleBackdropClick}
        >
            {backdrop && (
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-200 ${isOpen && !modalState.isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
                        }`}
                />
            )}

            <div
                ref={modalRef}
                className={`
    relative bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-out
    ${modalStyles.size} ${themeClasses.modal} ${className}
    ${isOpen && !modalState.isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
    ${draggable ? 'cursor-move' : ''}
  `}
                style={{
                    ...style,
                    ...(modalState.position.x !== 0 || modalState.position.y !== 0) && {
                        transform: `translate(${modalState.position.x}px, ${modalState.position.y}px) scale(${isOpen && !modalState.isAnimating ? 1 : 0.95})`,
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        margin: 0
                    },
                }}
                onClick={handleContentClick}
                onMouseDown={draggable ? handleMouseDown : undefined} // FIXED: Entire modal is draggable
            >
                {/* Close button positioning */}
                {showCloseButton && closeButtonPosition === 'outside' && (
                    <button
                        type="button"
                        onClick={handleCloseClick}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors z-10"
                    >
                        <X size={16} />
                    </button>
                )}

                {showCloseButton && (!showHeader || closeButtonPosition === 'body') && closeButtonPosition !== 'outside' && closeButtonPosition !== 'header' && (
                    <button
                        type="button"
                        onClick={handleCloseClick}
                        className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors z-10"
                    >
                        <X size={16} />
                    </button>
                )}

                {/* FIXED: Conditional Header Rendering */}
                {showHeader && (header || title || (showCloseButton && closeButtonPosition === 'header')) && (
                    <div className={`flex items-center justify-between p-4 border-b ${themeClasses.border}`}>
                        <div className="flex-1">
                            {header || (
                                <div>
                                    {title && <h3 className={`text-lg font-semibold ${themeClasses.text}`}>{title}</h3>}
                                    {subtitle && <p className={`text-sm ${themeClasses.textMuted} mt-1`}>{subtitle}</p>}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            {draggable && (
                                <div className={`p-1 rounded ${themeClasses.textMuted} cursor-move`}>
                                    <Move size={16} />
                                </div>
                            )}

                            {showCloseButton && closeButtonPosition === 'header' && (
                                <button
                                    type="button"
                                    onClick={handleCloseClick}
                                    className={`p-1 rounded hover:bg-gray-100 ${themeClasses.textMuted} hover:text-gray-700`}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className={`${showHeader ? 'p-4' : 'p-6 pt-12'} ${themeClasses.background}`}>
                    {content || children}
                </div>

                {/* FIXED: Conditional Footer Rendering */}
                {showFooter && footer && (
                    <div className={`flex items-center justify-end space-x-2 p-4 border-t ${themeClasses.border}`}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default Modal;
