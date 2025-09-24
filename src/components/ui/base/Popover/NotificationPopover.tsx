'use client';

import React from 'react';
import BasePopover from './BasePopover';
import { NotificationItem, BasePopoverProps } from './Popover.types';
import { Bell, Check, X, Info, AlertTriangle, CheckCircle, XCircle, Settings } from 'lucide-react';

interface NotificationPopoverProps extends Omit<BasePopoverProps, 'children'> {
    notifications: NotificationItem[];
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearAll?: () => void;
    onNotificationClick?: (notification: NotificationItem) => void;
    children: React.ReactNode;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
    notifications,
    onMarkAsRead,
    onMarkAllAsRead,
    onClearAll,
    onNotificationClick,
    children,
    ...popoverProps
}) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    const getNotificationIcon = (type: NotificationItem['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'error':
                return <XCircle className="w-4 h-4 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            default:
                return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    return (
        <BasePopover {...popoverProps} size="xl" className="p-0">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center space-x-1">
                        {unreadCount > 0 && (
                            <button
                                onClick={onMarkAllAsRead}
                                className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 hover:bg-blue-50 rounded"
                            >
                                Mark all read
                            </button>
                        )}
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <Settings className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p>No notifications yet</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    }`}
                                onClick={() => onNotificationClick?.(notification)}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {notification.title}
                                            </h4>
                                            <div className="flex items-center space-x-1 ml-2">
                                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                                    {formatTime(notification.timestamp)}
                                                </span>
                                                {!notification.read && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onMarkAsRead?.(notification.id);
                                                        }}
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                        title="Mark as read"
                                                    >
                                                        <Check className="w-3 h-3 text-gray-400" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                                            {notification.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                    <div className="p-3 border-t bg-gray-50 text-center">
                        <button
                            onClick={onClearAll}
                            className="text-sm text-red-600 hover:text-red-800"
                        >
                            Clear all notifications
                        </button>
                    </div>
                )}
            </div>
            {children}
        </BasePopover>
    );
};

export default NotificationPopover;
