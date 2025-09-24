'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BasePopoverProps } from './Popover.types';
import { getThemeStyles, getSizeStyles } from './Popover.styles';

const BasePopover: React.FC<BasePopoverProps> = ({
    isOpen = false,
    onClose,
    placement = 'bottom',
    trigger = 'click',
    theme = 'light',
    size = 'md',
    showArrow = true,
    offset = 8,
    children,
    className = '',
    disabled = false,
    closeOnClickOutside = true,
    closeOnEscape = true,
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [internalOpen, setInternalOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);

    const isControlled = isOpen !== undefined;
    const open = isControlled ? isOpen : internalOpen;

    const themeStyles = getThemeStyles(theme);
    const sizeStyles = getSizeStyles(size);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open || !triggerRef.current || !popoverRef.current) return;

        const updatePosition = () => {
            const triggerRect = triggerRef.current!.getBoundingClientRect();
            const popoverRect = popoverRef.current!.getBoundingClientRect();
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight,
            };

            let top = 0;
            let left = 0;

            switch (placement) {
                case 'top':
                    top = triggerRect.top - popoverRect.height - offset;
                    left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + offset;
                    left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
                    left = triggerRect.left - popoverRect.width - offset;
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
                    left = triggerRect.right + offset;
                    break;
                case 'top-start':
                    top = triggerRect.top - popoverRect.height - offset;
                    left = triggerRect.left;
                    break;
                case 'bottom-start':
                    top = triggerRect.bottom + offset;
                    left = triggerRect.left;
                    break;
                // Add more placements as needed
                default:
                    top = triggerRect.bottom + offset;
                    left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
            }

            // Ensure popover stays within viewport
            if (left < 0) left = 8;
            if (left + popoverRect.width > viewport.width) {
                left = viewport.width - popoverRect.width - 8;
            }
            if (top < 0) top = 8;
            if (top + popoverRect.height > viewport.height) {
                top = viewport.height - popoverRect.height - 8;
            }

            setPosition({ top: top + window.scrollY, left: left + window.scrollX });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [open, placement, offset]);

    useEffect(() => {
        if (!closeOnClickOutside) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                open &&
                popoverRef.current &&
                triggerRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, closeOnClickOutside]);

    useEffect(() => {
        if (!closeOnEscape) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (open && event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape]);

    const handleOpen = () => {
        if (disabled) return;
        if (isControlled) {
            // onOpen callback if provided
        } else {
            setInternalOpen(true);
        }
    };

    const handleClose = () => {
        if (isControlled) {
            onClose?.();
        } else {
            setInternalOpen(false);
        }
    };

    const handleTrigger = () => {
        if (trigger === 'click') {
            if (open) {
                handleClose();
            } else {
                handleOpen();
            }
        }
    };

    const triggerProps = {
        onClick: trigger === 'click' ? handleTrigger : undefined,
        onMouseEnter: trigger === 'hover' ? handleOpen : undefined,
        onMouseLeave: trigger === 'hover' ? handleClose : undefined,
        onFocus: trigger === 'focus' ? handleOpen : undefined,
        onBlur: trigger === 'focus' ? handleClose : undefined,
    };

    if (!mounted) {
        return (
            <div ref={triggerRef} className={`inline-block ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
                {children}
            </div>
        );
    }

    return (
        <>
            <div
                ref={triggerRef}
                className={`inline-block ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                {...triggerProps}
            >
                {children}
            </div>

            {open && createPortal(
                <div
                    ref={popoverRef}
                    className={`
            fixed z-50 rounded-lg border transition-all duration-200
            ${themeStyles.background} ${themeStyles.border} ${themeStyles.text} ${themeStyles.shadow}
            ${sizeStyles.width} ${sizeStyles.padding} ${sizeStyles.text}
            ${className}
          `}
                    style={{
                        top: position.top,
                        left: position.left,
                    }}
                >
                    {showArrow && (
                        <div
                            className={`absolute w-2 h-2 rotate-45 border ${themeStyles.background} ${themeStyles.arrow}`}
                            style={{
                                top: placement.includes('top') ? '100%' : placement.includes('bottom') ? '-4px' : '50%',
                                left: placement.includes('left') ? '100%' : placement.includes('right') ? '-4px' : '50%',
                                transform: placement.includes('top') || placement.includes('bottom')
                                    ? 'translateX(-50%) rotate(45deg)'
                                    : 'translateY(-50%) rotate(45deg)',
                            }}
                        />
                    )}
                    <div className="relative z-10">
                        {/* Content will be rendered here by specific popover components */}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default BasePopover;
