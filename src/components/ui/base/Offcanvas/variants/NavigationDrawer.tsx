'use client';

import React from 'react';
import OffCanvas from '../OffCanvas';
import { OffCanvasProps } from '../OffCanvas.types';
import {
    Home,
    Users,
    Settings,
    BarChart3,
    Calendar,
    FileText,
    Bell,
    LogOut
} from 'lucide-react';

interface NavigationItem {
    label: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
    badge?: string;
    submenu?: NavigationItem[];
}

interface NavigationDrawerProps extends Omit<OffCanvasProps, 'children'> {
    navigationItems?: NavigationItem[];
    user?: {
        name: string;
        avatar?: string;
        role?: string;
    };
    onNavigate?: (item: NavigationItem) => void;
}

const defaultNavigationItems: NavigationItem[] = [
    { label: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/dashboard' },
    { label: 'Students', icon: <Users className="w-5 h-5" />, href: '/students' },
    { label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, href: '/analytics' },
    { label: 'Calendar', icon: <Calendar className="w-5 h-5" />, href: '/calendar' },
    { label: 'Reports', icon: <FileText className="w-5 h-5" />, href: '/reports' },
    { label: 'Notifications', icon: <Bell className="w-5 h-5" />, href: '/notifications', badge: '3' },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/settings' },
];

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
    navigationItems = defaultNavigationItems,
    user,
    onNavigate,
    ...props
}) => {
    const handleItemClick = (item: NavigationItem) => {
        if (onNavigate) {
            onNavigate(item);
        }
        if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <OffCanvas
            {...props}
            header={
                user && (
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                user.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            {user.role && <div className="text-xs text-gray-500">{user.role}</div>}
                        </div>
                    </div>
                )
            }
        >
            <nav className="p-4">
                <ul className="space-y-2">
                    {navigationItems.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleItemClick(item)}
                                className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <div className="flex items-center space-x-3">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </OffCanvas>
    );
};

export default NavigationDrawer;
