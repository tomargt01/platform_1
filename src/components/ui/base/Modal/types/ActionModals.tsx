'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../Modal';
import { BaseModalProps } from '../Modal.types';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

// Action Choice Modal
export const ActionChoiceModal: React.FC<BaseModalProps & {
    title: string;
    message: string;
    actions: Array<{
        label: string;
        action: () => void;
        variant: 'primary' | 'secondary' | 'danger';
        icon?: React.ReactNode;
    }>;
}> = ({ title, message, actions, ...modalProps }) => {
    const getButtonClass = (variant: string) => {
        switch (variant) {
            case 'primary': return 'bg-blue-600 hover:bg-blue-700 text-white';
            case 'danger': return 'bg-red-600 hover:bg-red-700 text-white';
            default: return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
        }
    };

    return (
        <Modal
            {...modalProps}
            title={title}
            content={
                <div className="space-y-4">
                    <p className="text-gray-700">{message}</p>
                    <div className="grid grid-cols-1 gap-3">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    action.action();
                                    modalProps.onClose();
                                }}
                                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${getButtonClass(action.variant)}`}
                            >
                                {action.icon}
                                <span>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            }
        />
    );
};

// Contextual Modal
export const ContextualModal: React.FC<BaseModalProps & {
    triggerElement: HTMLElement | null;
    content: React.ReactNode;
    offsetX?: number;
    offsetY?: number;
}> = ({
    triggerElement,
    content,
    offsetX = 0,
    offsetY = 10,
    ...modalProps
}) => {
        const [position, setPosition] = useState({ x: 0, y: 0, visible: false });
        const modalRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (modalProps.isOpen && triggerElement) {
                const updatePosition = () => {
                    const rect = triggerElement.getBoundingClientRect();
                    const modalRect = modalRef.current?.getBoundingClientRect();

                    let x = rect.left + offsetX;
                    let y = rect.bottom + offsetY;

                    // Prevent modal from going off screen
                    if (modalRect) {
                        if (x + modalRect.width > window.innerWidth) {
                            x = rect.right - modalRect.width - offsetX;
                        }
                        if (y + modalRect.height > window.innerHeight) {
                            y = rect.top - modalRect.height - offsetY;
                        }
                    }

                    setPosition({ x, y, visible: true });
                };

                // Initial position
                updatePosition();

                // Update on scroll/resize
                const handleUpdate = () => updatePosition();
                window.addEventListener('scroll', handleUpdate);
                window.addEventListener('resize', handleUpdate);

                return () => {
                    window.removeEventListener('scroll', handleUpdate);
                    window.removeEventListener('resize', handleUpdate);
                };
            } else {
                setPosition(prev => ({ ...prev, visible: false }));
            }
        }, [modalProps.isOpen, triggerElement, offsetX, offsetY]);

        // Click outside handler
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
                    triggerElement && !triggerElement.contains(event.target as Node)) {
                    modalProps.onClose();
                }
            };

            if (modalProps.isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [modalProps.isOpen, modalProps.onClose, triggerElement]);

        if (!modalProps.isOpen || !position.visible) {
            return null;
        }

        const modalContent = (
            <div
                ref={modalRef}
                className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: modalProps.isOpen ? 'scale(1)' : 'scale(0.95)',
                    opacity: modalProps.isOpen ? 1 : 0,
                    transition: 'all 0.2s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {content}
            </div>
        );

        return createPortal(modalContent, document.body);
    };

// Progress Modal
export const ProgressModal: React.FC<BaseModalProps & {
    title: string;
    progress: number;
    status: 'loading' | 'success' | 'error';
    message: string;
    onCancel?: () => void;
}> = ({ title, progress, status, message, onCancel, ...modalProps }) => {
    const getStatusIcon = () => {
        switch (status) {
            case 'success': return <CheckCircle className="text-green-500" size={24} />;
            case 'error': return <XCircle className="text-red-500" size={24} />;
            default: return <Clock className="text-blue-500 animate-spin" size={24} />;
        }
    };

    return (
        <Modal
            {...modalProps}
            title={title}
            backdrop={status === 'loading'}
            content={
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        {getStatusIcon()}
                        <span className="text-gray-700">{message}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${status === 'error' ? 'bg-red-500' : status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                    }`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            }
            footer={
                status === 'loading' && onCancel ? (
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                ) : status !== 'loading' ? (
                    <button
                        onClick={modalProps.onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Close
                    </button>
                ) : null
            }
        />
    );
};
