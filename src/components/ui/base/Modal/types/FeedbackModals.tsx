'use client';

import React from 'react';
import Modal from '../Modal';
import { FeedbackModalProps } from '../Modal.types';
import { CheckCircle, XCircle, AlertTriangle, Info, Loader } from 'lucide-react';

// Success Modal
export const SuccessModal: React.FC<Omit<FeedbackModalProps, 'type'> & {
    actionText?: string;
    onAction?: () => void;
}> = ({ title, message, actionText, onAction, ...modalProps }) => {
    return (
        <Modal
            {...modalProps}
            size="sm"
            content={
                <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600">{message}</p>
                </div>
            }
            footer={
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={modalProps.onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Close
                    </button>
                    {actionText && onAction && (
                        <button
                            onClick={() => {
                                onAction();
                                modalProps.onClose();
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            {actionText}
                        </button>
                    )}
                </div>
            }
        />
    );
};

// Error Modal
export const ErrorModal: React.FC<Omit<FeedbackModalProps, 'type'> & {
    error?: Error;
    retryAction?: () => void;
}> = ({ title, message, error, retryAction, ...modalProps }) => {
    return (
        <Modal
            {...modalProps}
            size="md"
            content={
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 mb-4">{message}</p>

                            {error && (
                                <details className="bg-gray-50 rounded-lg p-3">
                                    <summary className="cursor-pointer text-sm font-medium text-gray-700">
                                        Technical Details
                                    </summary>
                                    <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">
                                        {error.stack || error.message}
                                    </pre>
                                </details>
                            )}
                        </div>
                    </div>
                </div>
            }
            footer={
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={modalProps.onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Close
                    </button>
                    {retryAction && (
                        <button
                            onClick={() => {
                                retryAction();
                                modalProps.onClose();
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            }
        />
    );
};

// Warning Modal
export const WarningModal: React.FC<Omit<FeedbackModalProps, 'type'> & {
    proceedText?: string;
    onProceed?: () => void;
}> = ({ title, message, proceedText = 'Proceed', onProceed, ...modalProps }) => {
    return (
        <Modal
            {...modalProps}
            size="sm"
            content={
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600">{message}</p>
                        </div>
                    </div>
                </div>
            }
            footer={
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={modalProps.onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    {onProceed && (
                        <button
                            onClick={() => {
                                onProceed();
                                modalProps.onClose();
                            }}
                            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                            {proceedText}
                        </button>
                    )}
                </div>
            }
        />
    );
};

// Info Modal  
export const InfoModal: React.FC<Omit<FeedbackModalProps, 'type'> & {
    details?: string[];
}> = ({ title, message, details, ...modalProps }) => {
    return (
        <Modal
            {...modalProps}
            size="md"
            content={
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Info className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 mb-4">{message}</p>

                            {details && details.length > 0 && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <ul className="space-y-2">
                                        {details.map((detail, index) => (
                                            <li key={index} className="text-sm text-blue-800 flex items-center">
                                                <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
            footer={
                <button
                    onClick={modalProps.onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Got it
                </button>
            }
        />
    );
};

// Loading Modal
export const LoadingModal: React.FC<{
    isOpen: boolean;
    onClose?: () => void; // NEW: Make onClose optional but functional
    title?: string;
    message: string;
    showProgress?: boolean;
    progress?: number;
    allowClose?: boolean; // NEW: Control if user can close
}> = ({
    isOpen,
    onClose,
    title = 'Loading...',
    message,
    showProgress = false,
    progress = 0,
    allowClose = false // NEW: Default to false for loading states
}) => {
        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose || (() => { })}
                backdrop={true}
                backdropClose={allowClose}
                escapeClose={allowClose}
                persistent={!allowClose}
                size="sm"
                showCloseButton={allowClose}
                content={
                    <div className="text-center py-6">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-600 mb-4">{message}</p>

                        {showProgress && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Progress</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                }
            />
        );
    };
