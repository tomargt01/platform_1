'use client';

import React from 'react';
import Modal from '../Modal';
import { ConfirmModalProps, FeedbackModalProps } from '../Modal.types';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

// Confirmation Modal
export const ConfirmationModal: React.FC<ConfirmModalProps> = ({
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    type = 'default',
    ...modalProps
}) => {
    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return { color: 'bg-red-600 hover:bg-red-700', icon: <AlertTriangle className="text-red-500" /> };
            case 'warning':
                return { color: 'bg-yellow-600 hover:bg-yellow-700', icon: <AlertTriangle className="text-yellow-500" /> };
            case 'success':
                return { color: 'bg-green-600 hover:bg-green-700', icon: <CheckCircle className="text-green-500" /> };
            default:
                return { color: 'bg-blue-600 hover:bg-blue-700', icon: <Info className="text-blue-500" /> };
        }
    };

    const typeStyles = getTypeStyles();

    return (
        <Modal
            {...modalProps}
            title={title}
            content={
                <div className="flex items-start space-x-3">
                    {typeStyles.icon}
                    <p className="text-gray-700">{message}</p>
                </div>
            }
            footer={
                <div className="flex space-x-2">
                    <button
                        onClick={onCancel || modalProps.onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white rounded transition-colors ${typeStyles.color}`}
                    >
                        {confirmText}
                    </button>
                </div>
            }
        />
    );
};

// Alert Modal
export const AlertModal: React.FC<FeedbackModalProps> = ({
    type,
    title,
    message,
    autoClose = false,
    duration = 3000,
    ...modalProps
}) => {
    React.useEffect(() => {
        if (autoClose && modalProps.isOpen) {
            const timer = setTimeout(modalProps.onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, modalProps.isOpen, modalProps.onClose]);

    const getAlertStyles = () => {
        switch (type) {
            case 'success':
                return { bg: 'bg-green-50', icon: <CheckCircle className="text-green-500" size={24} />, border: 'border-green-200' };
            case 'error':
                return { bg: 'bg-red-50', icon: <AlertTriangle className="text-red-500" size={24} />, border: 'border-red-200' };
            case 'warning':
                return { bg: 'bg-yellow-50', icon: <AlertTriangle className="text-yellow-500" size={24} />, border: 'border-yellow-200' };
            case 'info':
                return { bg: 'bg-blue-50', icon: <Info className="text-blue-500" size={24} />, border: 'border-blue-200' };
        }
    };

    const alertStyles = getAlertStyles();

    return (
        <Modal
            {...modalProps}
            size="sm"
            content={
                <div className={`p-4 rounded-lg border ${alertStyles.bg} ${alertStyles.border}`}>
                    <div className="flex items-start space-x-3">
                        {alertStyles.icon}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
                            <p className="text-gray-700">{message}</p>
                        </div>
                    </div>
                </div>
            }
            footer={
                <button
                    onClick={modalProps.onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                    Close
                </button>
            }
        />
    );
};

// Information Modal
export const InformationModal: React.FC<{
    title?: string;
    content: React.ReactNode;
    isOpen: boolean;
    showHeader: boolean;
    showFooter: boolean;
    closeButtonPosition: String;
    onClose: () => void;
}> = ({ title, content, isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            content={content}
            footer={
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Got it
                </button>
            }
        />
    );
};
