'use client';

import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { BaseModalProps } from '../Modal.types';
import { ChevronLeft, ChevronRight, X, Download, ZoomIn, ZoomOut, RotateCw, Play, Pause, Volume2 } from 'lucide-react';

// Image/Video Lightbox Modal
export interface LightboxModalProps extends BaseModalProps {
    items: Array<{
        type: 'image' | 'video';
        src: string;
        alt?: string;
        title?: string;
        description?: string;
    }>;
    currentIndex: number;
    onIndexChange?: (index: number) => void;
    showThumbnails?: boolean;
    allowDownload?: boolean;
}

export interface LightboxModalProps extends BaseModalProps {
    items: Array<{
        type: 'image' | 'video';
        src: string;
        alt?: string;
        title?: string;
        description?: string;
    }>;
    currentIndex: number;
    onIndexChange?: (index: number) => void;
    showThumbnails?: boolean;
    allowDownload?: boolean;
}

// FIXED: Lightbox Modal with proper navigation
export const LightboxModal: React.FC<LightboxModalProps> = ({
    items,
    currentIndex: initialIndex,
    onIndexChange,
    showThumbnails = true,
    allowDownload = true,
    ...modalProps
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [currentItem, setCurrentItem] = useState(items[initialIndex]);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    // FIXED: Update current item when index changes
    useEffect(() => {
        if (items[currentIndex]) {
            setCurrentItem(items[currentIndex]);
            setZoom(1); // Reset zoom when changing images
            setRotation(0); // Reset rotation when changing images
        }
    }, [currentIndex, items]);

    // FIXED: Navigation functions
    const nextItem = () => {
        const newIndex = (currentIndex + 1) % items.length;
        setCurrentIndex(newIndex);
        onIndexChange?.(newIndex);
    };

    const prevItem = () => {
        const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        onIndexChange?.(newIndex);
    };

    const goToItem = (index: number) => {
        setCurrentIndex(index);
        onIndexChange?.(index);
    };

    // FIXED: Keyboard navigation
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (modalProps.isOpen) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        prevItem();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        nextItem();
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [modalProps.isOpen, currentIndex]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = currentItem.src;
        link.download = currentItem.title || 'download';
        link.click();
    };

    return (
        <Modal
            {...modalProps}
            size="full"
            placement="center"
            showCloseButton={true}
            closeButtonPosition="outside"
            showHeader={false}
            showFooter={false}
            content={
                <div className="flex flex-col h-screen bg-black text-white">
                    {/* Top Controls */}
                    <div className="flex items-center justify-between p-4 bg-black bg-opacity-75">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm">{currentIndex + 1} / {items.length}</span>
                            {currentItem.title && <h3 className="text-lg font-medium">{currentItem.title}</h3>}
                        </div>

                        <div className="flex items-center space-x-2">
                            {currentItem.type === 'image' && (
                                <>
                                    <button
                                        onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                                        className="p-2 hover:bg-gray-700 rounded"
                                    >
                                        <ZoomOut size={20} />
                                    </button>
                                    <button
                                        onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                                        className="p-2 hover:bg-gray-700 rounded"
                                    >
                                        <ZoomIn size={20} />
                                    </button>
                                    <button
                                        onClick={() => setRotation((rotation + 90) % 360)}
                                        className="p-2 hover:bg-gray-700 rounded"
                                    >
                                        <RotateCw size={20} />
                                    </button>
                                </>
                            )}

                            {allowDownload && (
                                <button onClick={handleDownload} className="p-2 hover:bg-gray-700 rounded">
                                    <Download size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex items-center justify-center relative">
                        {/* FIXED: Navigation Arrows */}
                        {items.length > 1 && (
                            <>
                                <button
                                    onClick={prevItem}
                                    className="absolute left-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full transition-all"
                                    disabled={items.length <= 1}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextItem}
                                    className="absolute right-4 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full transition-all"
                                    disabled={items.length <= 1}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {/* Media Content */}
                        <div className="max-w-full max-h-full flex items-center justify-center">
                            {currentItem && (
                                <>
                                    {currentItem.type === 'image' ? (
                                        <img
                                            key={currentIndex} // FIXED: Force re-render on index change
                                            src={currentItem.src}
                                            alt={currentItem.alt}
                                            className="max-w-full max-h-full object-contain transition-transform duration-300"
                                            style={{
                                                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                                            }}
                                        />
                                    ) : (
                                        <video
                                            key={currentIndex} // FIXED: Force re-render on index change
                                            src={currentItem.src}
                                            controls
                                            className="max-w-full max-h-full"
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* FIXED: Thumbnails */}
                    {showThumbnails && items.length > 1 && (
                        <div className="p-4 bg-black bg-opacity-75">
                            <div className="flex justify-center space-x-2 overflow-x-auto">
                                {items.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToItem(index)}
                                        className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden transition-all ${index === currentIndex ? 'border-blue-500 scale-110' : 'border-gray-600 hover:border-gray-400'
                                            }`}
                                    >
                                        {item.type === 'image' ? (
                                            <img src={item.src} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                <div className="text-xs">▶</div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {currentItem.description && (
                        <div className="p-4 bg-black bg-opacity-75 text-center">
                            <p className="text-sm text-gray-300">{currentItem.description}</p>
                        </div>
                    )}
                </div>
            }
        />
    );
};

// Preview Modal
export const PreviewModal: React.FC<BaseModalProps & {
    title: string;
    content: React.ReactNode;
    previewType?: 'document' | 'code' | 'text';
}> = ({ title, content, previewType = 'document', ...modalProps }) => {
    return (
        <Modal
            {...modalProps}
            size="xl"
            title={`Preview: ${title}`}
            content={
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
                    {previewType === 'code' ? (
                        <pre className="text-sm font-mono bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                            {content}
                        </pre>
                    ) : (
                        <div className="prose max-w-none">
                            {content}
                        </div>
                    )}
                </div>
            }
            footer={
                <button
                    onClick={modalProps.onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Close Preview
                </button>
            }
        />
    );
};

// Fullscreen Modal
export const FullscreenModal: React.FC<BaseModalProps & {
    title?: string;
    children: React.ReactNode;
}> = ({ title, children, ...modalProps }) => {
    return (
        <Modal
            {...modalProps}
            size="full"
            placement="center"
            content={
                <div className="h-screen flex flex-col">
                    {title && (
                        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                            <h2 className="text-xl font-semibold">{title}</h2>
                            <button onClick={modalProps.onClose} className="p-2 hover:bg-gray-200 rounded">
                                <X size={20} />
                            </button>
                        </div>
                    )}
                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            }
        />
    );
};
