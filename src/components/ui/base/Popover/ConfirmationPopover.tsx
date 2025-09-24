'use client';

import React from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import { AlertTriangle, CheckCircle, XCircle, Info, HelpCircle, Trash2 } from 'lucide-react';

interface ConfirmationPopoverProps extends Omit<BasePopoverProps, 'children'> {
    title?: string;
    message: string;
    type?: 'danger' | 'warning' | 'info' | 'success' | 'question';
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    loading?: boolean;
    destructive?: boolean;
    children: React.ReactNode;
}

const ConfirmationPopover: React.FC<ConfirmationPopoverProps> = ({
    title,
    message,
    type = 'warning',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    loading = false,
    destructive = false,
    children,
    ...popoverProps
}) => {
    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <XCircle className="w-6 h-6 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
            case 'info':
                return <Info className="w-6 h-6 text-blue-500" />;
            case 'success':
                return <CheckCircle className="w-6 h-6 text-green-500" />;
            case 'question':
                return <HelpCircle className="w-6 h-6 text-purple-500" />;
            default:
                return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
        }
    };

    const getColors = () => {
        if (destructive || type === 'danger') {
            return {
                confirmBg: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                confirmText: 'text-white',
                border: 'border-red-200',
            };
        }

        switch (type) {
            case 'success':
                return {
                    confirmBg: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
                    confirmText: 'text-white',
                    border: 'border-green-200',
                };
            case 'info':
                return {
                    confirmBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
                    confirmText: 'text-white',
                    border: 'border-blue-200',
                };
            case 'question':
                return {
                    confirmBg: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
                    confirmText: 'text-white',
                    border: 'border-purple-200',
                };
            default:
                return {
                    confirmBg: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
                    confirmText: 'text-white',
                    border: 'border-yellow-200',
                };
        }
    };

    const colors = getColors();

    const handleConfirm = () => {
        onConfirm?.();
    };

    const handleCancel = () => {
        onCancel?.();
        // Close popover logic would go here if needed
    };

    return (
        <BasePopover {...popoverProps} size="md" className={`p-0 border ${colors.border}`}>
            <div className="p-4">
                {/* Icon & Title */}
                <div className="flex items-start space-x-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                        {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                        {title && (
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {title}
                            </h3>
                        )}
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={`
              px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2
              ${colors.confirmBg} ${colors.confirmText}
            `}
                    >
                        {loading && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        <span>{confirmText}</span>
                    </button>
                </div>

                {/* Additional Info for Destructive Actions */}
                {(destructive || type === 'danger') && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-xs text-red-800">
                            <strong>Warning:</strong> This action cannot be undone.
                        </p>
                    </div>
                )}
            </div>
            {children}
        </BasePopover>
    );
};

export default ConfirmationPopover;
