'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BaseModalProps, InteractiveModalProps } from '../Modal.types';
import { X, Move } from 'lucide-react';

// Draggable Modal
export const DraggableModal: React.FC<InteractiveModalProps & {
    title: string;
    children: React.ReactNode;
}> = ({
    title,
    children,
    initialPosition = { x: 0, y: 0 },
    onPositionChange,
    ...modalProps
}) => {
        const [position, setPosition] = useState(initialPosition);
        const [isDragging, setIsDragging] = useState(false);
        const modalRef = useRef<HTMLDivElement>(null);
        const dragDataRef = useRef<{
            startX: number;
            startY: number;
            startPosX: number;
            startPosY: number;
        } | null>(null);

        // FIXED: Complete drag system - works from anywhere on modal
        const handleMouseDown = useCallback((e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            setIsDragging(true);

            // Store initial mouse position and modal position
            dragDataRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                startPosX: position.x || 0,
                startPosY: position.y || 0
            };

            const handleMouseMove = (moveEvent: MouseEvent) => {
                if (dragDataRef.current) {
                    // Calculate movement delta from initial position
                    const deltaX = moveEvent.clientX - dragDataRef.current.startX;
                    const deltaY = moveEvent.clientY - dragDataRef.current.startY;

                    // Apply delta to initial modal position
                    const newPosition = {
                        x: dragDataRef.current.startPosX + deltaX,
                        y: dragDataRef.current.startPosY + deltaY,
                    };

                    setPosition(newPosition);
                    onPositionChange?.(newPosition);
                }
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                dragDataRef.current = null;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }, [position, onPositionChange]);

        if (!modalProps.isOpen) return null;

        const content = (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={modalProps.onClose} />

                {/* FIXED: Entire modal is draggable */}
                <div
                    ref={modalRef}
                    className={`
          bg-white rounded-lg shadow-xl relative cursor-move select-none
          ${isDragging ? 'shadow-2xl' : ''}
        `}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        minWidth: '300px',
                        maxWidth: '500px',
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
                        <div className="flex items-center space-x-2">
                            <Move size={16} className="text-gray-400" />
                            <h3 className="font-medium">{title}</h3>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                modalProps.onClose();
                            }}
                            className="p-1 hover:bg-gray-200 rounded"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content - Also draggable */}
                    <div className="p-4">
                        {children}
                    </div>

                    {/* Drag indicator */}
                    {isDragging && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                            Position: {Math.round(position.x || 0)}, {Math.round(position.y || 0)}
                        </div>
                    )}
                </div>
            </div>
        );

        return createPortal(content, document.body);
    };

// Bottom Sheet Modal
export const BottomSheetModal: React.FC<BaseModalProps & {
    title?: string;
    children: React.ReactNode;
    initialHeight?: string;
    minHeight?: number;
    maxHeight?: number;
    snapPoints?: Array<{ label: string; height: string; percentage: number }>;
    onHeightChange?: (height: string) => void;
}> = ({
    title,
    children,
    initialHeight = '50vh',
    minHeight = 200,
    maxHeight = window.innerHeight - 100,
    snapPoints = [
        { label: 'Small', height: '25vh', percentage: 25 },
        { label: 'Medium', height: '50vh', percentage: 50 },
        { label: 'Large', height: '75vh', percentage: 75 },
        { label: 'Full', height: '90vh', percentage: 90 }
    ],
    onHeightChange,
    ...modalProps
}) => {
        const [currentHeight, setCurrentHeight] = useState(initialHeight);
        const [isDragging, setIsDragging] = useState(false);
        const [isVisible, setIsVisible] = useState(false);
        const [isAnimating, setIsAnimating] = useState(false);
        const sheetRef = useRef<HTMLDivElement>(null);
        const dragStartRef = useRef<{ startY: number; startHeight: number } | null>(null);

        // Animation handling
        React.useEffect(() => {
            if (modalProps.isOpen) {
                setIsVisible(true);
                document.body.style.overflow = 'hidden';

                setTimeout(() => {
                    setIsAnimating(true);
                }, 10);
            } else {
                setIsAnimating(false);

                const timer = setTimeout(() => {
                    setIsVisible(false);
                    document.body.style.overflow = 'unset';
                }, 300);

                return () => clearTimeout(timer);
            }
        }, [modalProps.isOpen]);

        // FIXED: Functional drag handle for height adjustment
        const handleDragStart = useCallback((e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            setIsDragging(true);

            const currentHeightPx = sheetRef.current?.getBoundingClientRect().height || 0;

            dragStartRef.current = {
                startY: e.clientY,
                startHeight: currentHeightPx
            };

            const handleDragMove = (moveEvent: MouseEvent) => {
                if (dragStartRef.current) {
                    const deltaY = dragStartRef.current.startY - moveEvent.clientY; // Inverted for upward drag = increase height
                    const newHeightPx = Math.max(minHeight, Math.min(maxHeight, dragStartRef.current.startHeight + deltaY));
                    const newHeightVh = `${(newHeightPx / window.innerHeight) * 100}vh`;

                    setCurrentHeight(newHeightVh);
                    onHeightChange?.(newHeightVh);
                }
            };

            const handleDragEnd = () => {
                setIsDragging(false);
                dragStartRef.current = null;
                document.removeEventListener('mousemove', handleDragMove);
                document.removeEventListener('mouseup', handleDragEnd);
            };

            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
        }, [minHeight, maxHeight, onHeightChange]);

        // FIXED: Interactive snap points
        const handleSnapPointClick = (snapPoint: typeof snapPoints[0]) => {
            setCurrentHeight(snapPoint.height);
            onHeightChange?.(snapPoint.height);
        };

        if (!isVisible) return null;

        const slideClass = `transform transition-transform duration-300 ease-out ${isAnimating ? 'translate-y-0' : 'translate-y-full'
            }`;

        const content = (
            <div className="fixed inset-0 z-50 flex items-end">
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
                        }`}
                    onClick={modalProps.onClose}
                />

                <div
                    ref={sheetRef}
                    className={`w-full bg-white rounded-t-lg shadow-xl ${slideClass}`}
                    style={{ height: currentHeight }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* FIXED: Functional Drag Handle */}
                    <div className="flex flex-col items-center py-2">
                        <div
                            className={`w-8 h-1 rounded-full cursor-ns-resize transition-colors ${isDragging ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            onMouseDown={handleDragStart}
                        />
                        {isDragging && (
                            <div className="text-xs text-gray-500 mt-1">
                                Drag to resize
                            </div>
                        )}
                    </div>

                    {/* Header */}
                    {title && (
                        <div className="flex items-center justify-between px-4 pb-2">
                            <h3 className="text-lg font-medium">{title}</h3>
                            <button
                                onClick={modalProps.onClose}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}

                    {/* Content */}
                    <div className="px-4 pb-4 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
                        {children}
                    </div>

                    {/* FIXED: Interactive Custom Snap Points */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-lg border">
                            {snapPoints.map((snapPoint, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSnapPointClick(snapPoint)}
                                    className={`group relative`}
                                    title={snapPoint.label}
                                >
                                    <div className={`w-3 h-3 rounded-full transition-all ${currentHeight === snapPoint.height
                                            ? 'bg-blue-500 scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`} />

                                    {/* Tooltip */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                                            {snapPoint.label} ({snapPoint.percentage}%)
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );

        return createPortal(content, document.body);
    };

// Resizable Modal
export const ResizableModal: React.FC<InteractiveModalProps & {
    title: string;
    children: React.ReactNode;
}> = ({
    title,
    children,
    minWidth = 300,
    minHeight = 200,
    maxWidth = 800,
    maxHeight = 600,
    ...modalProps
}) => {
        const [dimensions, setDimensions] = useState({ width: 500, height: 400 });
        const [isResizing, setIsResizing] = useState(false);

        const handleMouseDown = (e: React.MouseEvent) => {
            setIsResizing(true);
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = dimensions.width;
            const startHeight = dimensions.height;

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + moveEvent.clientX - startX));
                const newHeight = Math.min(maxHeight, Math.max(minHeight, startHeight + moveEvent.clientY - startY));

                setDimensions({ width: newWidth, height: newHeight });
            };

            const handleMouseUp = () => {
                setIsResizing(false);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        if (!modalProps.isOpen) return null;

        const content = (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={modalProps.onClose} />
                <div
                    className="bg-white rounded-lg shadow-xl relative"
                    style={{ width: dimensions.width, height: dimensions.height }}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="font-medium">{title}</h3>
                        <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500">
                                {dimensions.width} × {dimensions.height}
                            </div>
                            <button onClick={modalProps.onClose} className="p-1 hover:bg-gray-100 rounded">
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 60px)' }}>
                        {children}
                    </div>

                    {/* Resize Handle */}
                    <div
                        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300 hover:bg-gray-400"
                        onMouseDown={handleMouseDown}
                        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
                    />
                </div>
            </div>
        );

        return createPortal(content, document.body);
    };

export const DrawerModal: React.FC<BaseModalProps & {
    title?: string;
    position: 'left' | 'right';
    children: React.ReactNode;
    width?: string;
}> = ({ title, position, children, width = '400px', ...modalProps }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (modalProps.isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';

            // Start animation after mount
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, 10); // Small delay for smooth transition

            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);

            // Hide after animation
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [modalProps.isOpen]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            e.preventDefault();
            e.stopPropagation();
            modalProps.onClose();
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isVisible) return null;

    const slideClass = position === 'left' ?
        `left-0 transform transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : '-translate-x-full'}` :
        `right-0 transform transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`;

    const content = (
        <div className="fixed inset-0 z-50" onClick={handleBackdropClick}>
            <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
                }`} />
            <div
                className={`absolute top-0 h-full bg-white shadow-xl ${slideClass}`}
                style={{ width }}
                onClick={handleContentClick}
            >
                {title && (
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                modalProps.onClose();
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
                <div className="p-4 h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
};
