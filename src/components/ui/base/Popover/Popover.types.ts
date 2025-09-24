import { ReactNode } from 'react';

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type PopoverPlacement = "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end";
export type PopoverSize = "sm" | "md" | "lg" | "xl";
export type PopoverTrigger = "click" | "hover" | "focus" | "manual";

export interface BasePopoverProps {
    isOpen?: boolean;
    onClose?: () => void;
    placement?: PopoverPlacement;
    trigger?: PopoverTrigger;
    theme?: Theme;
    size?: PopoverSize;
    showArrow?: boolean;
    offset?: number;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
}

export interface PopoverContentProps extends BasePopoverProps {
    content: ReactNode;
    title?: string;
    maxWidth?: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
    lastActive?: Date;
}

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
}

export interface MenuItem {
    id: string;
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    divider?: boolean;
    submenu?: MenuItem[];
}

export interface FilterOption {
    id: string;
    label: string;
    value: string;
    type: 'checkbox' | 'radio' | 'select' | 'date' | 'range';
    options?: { label: string; value: string }[];
    checked?: boolean;
}
