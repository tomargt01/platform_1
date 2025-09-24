'use client';

import React, { useState } from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import {
    Share,
    Copy,
    Check,
    Mail,
    MessageCircle,
    Facebook,
    Twitter,
    Linkedin,
    Link,
    Download,
    QrCode
} from 'lucide-react';

interface SharePopoverProps extends Omit<BasePopoverProps, 'children'> {
    url?: string;
    title?: string;
    description?: string;
    showCopyLink?: boolean;
    showEmailShare?: boolean;
    showSocialShare?: boolean;
    showQRCode?: boolean;
    showDownload?: boolean;
    customActions?: Array<{
        label: string;
        icon: React.ReactNode;
        onClick: () => void;
        color?: string;
    }>;
    onCopy?: (url: string) => void;
    children: React.ReactNode;
}

const SharePopover: React.FC<SharePopoverProps> = ({
    url = window?.location?.href || '',
    title = 'Share this content',
    description = '',
    showCopyLink = true,
    showEmailShare = true,
    showSocialShare = true,
    showQRCode = false,
    showDownload = false,
    customActions = [],
    onCopy,
    children,
    ...popoverProps
}) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            onCopy?.(url);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const shareViaEmail = () => {
        const subject = encodeURIComponent(title);
        const body = encodeURIComponent(`${description}\n\n${url}`);
        window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    };

    const shareOnSocial = (platform: string) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);

        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        };

        const shareUrl = urls[platform as keyof typeof urls];
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    const socialPlatforms = [
        {
            name: 'facebook',
            label: 'Facebook',
            icon: <Facebook className="w-4 h-4" />,
            color: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            name: 'twitter',
            label: 'Twitter',
            icon: <Twitter className="w-4 h-4" />,
            color: 'bg-sky-500 hover:bg-sky-600',
        },
        {
            name: 'linkedin',
            label: 'LinkedIn',
            icon: <Linkedin className="w-4 h-4" />,
            color: 'bg-blue-700 hover:bg-blue-800',
        },
        {
            name: 'whatsapp',
            label: 'WhatsApp',
            icon: <MessageCircle className="w-4 h-4" />,
            color: 'bg-green-600 hover:bg-green-700',
        },
    ];

    return (
        <BasePopover {...popoverProps} size="md" className="p-0">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center space-x-2 mb-4">
                    <Share className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Share</h3>
                </div>

                {/* Copy Link */}
                {showCopyLink && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Share Link
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                value={url}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-gray-50 text-gray-600"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                                title="Copy link"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {showEmailShare && (
                        <button
                            onClick={shareViaEmail}
                            className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <Mail className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Email</span>
                        </button>
                    )}

                    {showQRCode && (
                        <button
                            onClick={() => console.log('Generate QR Code')}
                            className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <QrCode className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">QR Code</span>
                        </button>
                    )}

                    {showDownload && (
                        <button
                            onClick={() => console.log('Download')}
                            className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Download</span>
                        </button>
                    )}
                </div>

                {/* Social Share */}
                {showSocialShare && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Social Media
                        </label>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {socialPlatforms.map((platform) => (
                                <button
                                    key={platform.name}
                                    onClick={() => shareOnSocial(platform.name)}
                                    className={`
                    flex items-center justify-center space-x-2 p-3 text-white rounded-md transition-colors
                    ${platform.color}
                  `}
                                >
                                    {platform.icon}
                                    <span className="text-sm font-medium">{platform.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Custom Actions */}
                {customActions.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            More Options
                        </label>
                        <div className="space-y-2">
                            {customActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.onClick}
                                    className={`
                    w-full flex items-center space-x-3 p-3 rounded-md transition-colors
                    ${action.color || 'border border-gray-300 hover:bg-gray-50'}
                  `}
                                >
                                    {action.icon}
                                    <span className="text-sm font-medium">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Note */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        Share responsibly. Check privacy settings before sharing.
                    </p>
                </div>
            </div>
            {children}
        </BasePopover>
    );
};

export default SharePopover;
