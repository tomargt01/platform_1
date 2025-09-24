'use client';

import React from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import { HelpCircle, Info, BookOpen, ExternalLink } from 'lucide-react';

interface HelpTooltipPopoverProps extends Omit<BasePopoverProps, 'children'> {
    title?: string;
    content: string | React.ReactNode;
    type?: 'info' | 'help' | 'tip' | 'warning';
    showIcon?: boolean;
    links?: Array<{
        label: string;
        url: string;
        external?: boolean;
    }>;
    maxWidth?: string;
    children: React.ReactNode;
}

const HelpTooltipPopover: React.FC<HelpTooltipPopoverProps> = ({
    title,
    content,
    type = 'info',
    showIcon = true,
    links = [],
    maxWidth = '320px',
    children,
    ...popoverProps
}) => {
    const getIcon = () => {
        switch (type) {
            case 'help':
                return <HelpCircle className="w-5 h-5 text-blue-500" />;
            case 'tip':
                return <BookOpen className="w-5 h-5 text-green-500" />;
            case 'warning':
                return <Info className="w-5 h-5 text-yellow-500" />;
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'help':
                return {
                    border: 'border-blue-200',
                    bg: 'bg-blue-50',
                    titleText: 'text-blue-900',
                    contentText: 'text-blue-800',
                };
            case 'tip':
                return {
                    border: 'border-green-200',
                    bg: 'bg-green-50',
                    titleText: 'text-green-900',
                    contentText: 'text-green-800',
                };
            case 'warning':
                return {
                    border: 'border-yellow-200',
                    bg: 'bg-yellow-50',
                    titleText: 'text-yellow-900',
                    contentText: 'text-yellow-800',
                };
            default:
                return {
                    border: 'border-blue-200',
                    bg: 'bg-blue-50',
                    titleText: 'text-blue-900',
                    contentText: 'text-blue-800',
                };
        }
    };

    const colors = getColors();

    return (
        <BasePopover
            {...popoverProps}
            size="md"
            trigger="hover"
            className={`p-0 ${colors.border}`}
            // style={{ maxWidth }}
        >
            <div className="p-4">
                {/* Header */}
                {(showIcon || title) && (
                    <div className="flex items-start space-x-3 mb-3">
                        {showIcon && (
                            <div className="flex-shrink-0 mt-0.5">
                                {getIcon()}
                            </div>
                        )}
                        {title && (
                            <h4 className={`text-sm font-semibold ${colors.titleText}`}>
                                {title}
                            </h4>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className={`text-sm leading-relaxed ${colors.contentText}`}>
                    {typeof content === 'string' ? (
                        <p>{content}</p>
                    ) : (
                        content
                    )}
                </div>

                {/* Links */}
                {links.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="space-y-2">
                            {links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                >
                                    <span>{link.label}</span>
                                    {link.external && <ExternalLink className="w-3 h-3" />}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Keyboard Hint */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to close
                    </p>
                </div>
            </div>
            {children}
        </BasePopover>
    );
};

export default HelpTooltipPopover;
