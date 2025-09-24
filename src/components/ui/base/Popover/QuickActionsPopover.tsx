'use client';

import React from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import { Plus, Users, FileText, Calendar, Settings, Download, Share, Archive } from 'lucide-react';

interface QuickAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color?: string;
    disabled?: boolean;
}

interface QuickActionsPopoverProps extends Omit<BasePopoverProps, 'children'> {
    actions?: QuickAction[];
    onActionClick?: (action: QuickAction) => void;
    children: React.ReactNode;
}

const QuickActionsPopover: React.FC<QuickActionsPopoverProps> = ({
    actions = [],
    onActionClick,
    children,
    ...popoverProps
}) => {
    const defaultActions: QuickAction[] = [
        {
            id: 'new-student',
            label: 'Add Student',
            icon: <Users className="w-5 h-5" />,
            onClick: () => console.log('Add Student'),
            color: 'bg-blue-500 hover:bg-blue-600'
        },
        {
            id: 'new-class',
            label: 'Create Class',
            icon: <FileText className="w-5 h-5" />,
            onClick: () => console.log('Create Class'),
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            id: 'schedule',
            label: 'Schedule Event',
            icon: <Calendar className="w-5 h-5" />,
            onClick: () => console.log('Schedule Event'),
            color: 'bg-purple-500 hover:bg-purple-600'
        },
        {
            id: 'export',
            label: 'Export Data',
            icon: <Download className="w-5 h-5" />,
            onClick: () => console.log('Export Data'),
            color: 'bg-orange-500 hover:bg-orange-600'
        },
        {
            id: 'share',
            label: 'Share Report',
            icon: <Share className="w-5 h-5" />,
            onClick: () => console.log('Share Report'),
            color: 'bg-pink-500 hover:bg-pink-600'
        },
        {
            id: 'settings',
            label: 'Quick Settings',
            icon: <Settings className="w-5 h-5" />,
            onClick: () => console.log('Quick Settings'),
            color: 'bg-gray-500 hover:bg-gray-600'
        },
    ];

    const finalActions = actions.length > 0 ? actions : defaultActions;

    const handleActionClick = (action: QuickAction) => {
        if (action.disabled) return;

        action.onClick();
        onActionClick?.(action);
    };

    return (
        <BasePopover {...popoverProps} size="lg" className="p-0">
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <Plus className="w-5 h-5 text-gray-600 mr-2" />
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {finalActions.map((action) => (
                        <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            disabled={action.disabled}
                            className={`
                flex flex-col items-center justify-center p-4 rounded-lg text-white transition-all
                ${action.color || 'bg-gray-500 hover:bg-gray-600'}
                ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                min-h-[80px]
              `}
                        >
                            <div className="mb-2">
                                {action.icon}
                            </div>
                            <span className="text-sm font-medium text-center">
                                {action.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Additional Actions */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                        <Archive className="w-4 h-4" />
                        <span>View All Actions</span>
                    </button>
                </div>
            </div>
            {children}
        </BasePopover>
    );
};

export default QuickActionsPopover;
