'use client';

import React from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import { Info, AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface InfoPopoverProps extends Omit<BasePopoverProps, 'children'> {
    title?: string;
    message: string | React.ReactNode;
    type?: 'info' | 'success' | 'warning' | 'error';
    showIcon?: boolean;
    actions?: Array<{
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary';
    }>;
    children: React.ReactNode;
}

const InfoPopover: React.FC<InfoPopoverProps> = ({
    title,
    message,
    type = 'info',
    showIcon = true,
    actions = [],
    children,
    ...popoverProps
}) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'error':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success':
                return {
                    border: 'border-green-200',
                    bg: 'bg-green-50',
                    titleText: 'text-green-900',
                    messageText: 'text-green-800',
                    primaryButton: 'bg-green-600 hover:bg-green-700 text-white',
                };
            case 'warning':
                return {
                    border: 'border-yellow-200',
                    bg: 'bg-yellow-50',
                    titleText: 'text-yellow-900',
                    messageText: 'text-yellow-800',
                    primaryButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
                };
            case 'error':
                return {
                    border: 'border-red-200',
                    bg: 'bg-red-50',
                    titleText: 'text-red-900',
                    messageText: 'text-red-800',
                    primaryButton: 'bg-red-600 hover:bg-red-700 text-white',
                };
            default:
                return {
                    border: 'border-blue-200',
                    bg: 'bg-blue-50',
                    titleText: 'text-blue-900',
                    messageText: 'text-blue-800',
                    primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
                };
        }
    };

    const colors = getColors();

    return (
        <BasePopover
            {...popoverProps}
            size="md"
            className={`p-0 ${colors.border}`}
        >
            <div className="p-4">
                {/* Header */}
                <div className="flex items-start space-x-3">
                    {showIcon && (
                        <div className="flex-shrink-0 mt-0.5">
                            {getIcon()}
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        {title && (
                            <h3 className={`text-sm font-semibold mb-1 ${colors.titleText}`}>
                                {title}
                            </h3>
                        )}

                        <div className={`text-sm leading-relaxed ${colors.messageText}`}>
                            {typeof message === 'string' ? (
                                <p>{message}</p>
                            ) : (
                                message
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {actions.length > 0 && (
                    <div className="flex justify-end space-x-2 mt-4">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${action.variant === 'primary'
                                        ? `${colors.primaryButton} focus:ring-${type === 'info' ? 'blue' : type}-500`
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500'
                                    }
                `}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {children}
        </BasePopover>
    );
};

export default InfoPopover;
