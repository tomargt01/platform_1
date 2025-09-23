'use client';

import React, { useState } from 'react';
import Modal from '../Modal';
import { BaseModalProps } from '../Modal.types';

// Nested Modals
export const NestedModal: React.FC<BaseModalProps & {
    title: string;
    children: React.ReactNode;
    nested?: {
        title: string;
        content: React.ReactNode;
        isOpen: boolean;
        onClose: () => void;
    };
}> = ({ title, children, nested, ...modalProps }) => {
    return (
        <>
            <Modal
                {...modalProps}
                title={title}
                content={children}
                zIndex={1000}
            />

            {nested && (
                <Modal
                    isOpen={nested.isOpen}
                    onClose={nested.onClose}
                    title={nested.title}
                    content={nested.content}
                    zIndex={1100}
                    size="sm"
                />
            )}
        </>
    );
};

// Multi-content Modal with Tabs
export const MultiContentModal: React.FC<BaseModalProps & {
    tabs: Array<{
        id: string;
        label: string;
        content: React.ReactNode;
        icon?: React.ReactNode;
    }>;
}> = ({ tabs, ...modalProps }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id);

    return (
        <Modal
            {...modalProps}
            size="xl"
            content={
                <div>
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-200 -mx-4 -mt-4 px-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4">
                        {tabs.find(tab => tab.id === activeTab)?.content}
                    </div>
                </div>
            }
        />
    );
};

// Split Modal
export const SplitModal: React.FC<BaseModalProps & {
    title: string;
    leftContent: React.ReactNode;
    rightContent: React.ReactNode;
    leftTitle?: string;
    rightTitle?: string;
}> = ({ title, leftContent, rightContent, leftTitle, rightTitle, ...modalProps }) => {
    return (
        <Modal
            {...modalProps}
            title={title}
            size="xl"
            content={
                <div className="grid grid-cols-2 gap-6 h-96">
                    {/* Left Panel */}
                    <div className="border-r border-gray-200 pr-6">
                        {leftTitle && (
                            <h4 className="font-medium text-gray-900 mb-4">{leftTitle}</h4>
                        )}
                        <div className="h-full overflow-y-auto">
                            {leftContent}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="pl-2">
                        {rightTitle && (
                            <h4 className="font-medium text-gray-900 mb-4">{rightTitle}</h4>
                        )}
                        <div className="h-full overflow-y-auto">
                            {rightContent}
                        </div>
                    </div>
                </div>
            }
        />
    );
};

// Persistent Modal (stays open on backdrop click)
export const PersistentModal: React.FC<BaseModalProps & {
    title: string;
    children: React.ReactNode;
    warningMessage?: string;
}> = ({ title, children, warningMessage, ...modalProps }) => {
    const [showWarning, setShowWarning] = useState(false);

    const handleBackdropClick = () => {
        if (warningMessage) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
        }
    };

    return (
        <Modal
            {...modalProps}
            title={title}
            persistent={true}
            backdropClose={false}
            content={
                <div>
                    {showWarning && warningMessage && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">{warningMessage}</p>
                        </div>
                    )}
                    {children}
                </div>
            }
            // Override backdrop click
            onClose={() => {
                handleBackdropClick();
            }}
        />
    );
};
