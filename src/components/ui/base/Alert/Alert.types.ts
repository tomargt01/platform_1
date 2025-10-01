import type { ReactNode } from 'react';

// Intent types for alerts
export type AlertIntent = 'info' | 'success' | 'warning' | 'error' | 'critical';

// Alert action button props
export interface AlertAction {
    label: string;
    onClick: () => void;
    intent?: 'primary' | 'secondary' | 'destructive';
    disabled?: boolean;
    loading?: boolean;
}

// Main Alert props (no theme!)
export interface AlertProps {
    // Intent (required, sets color and icon)
    intent: AlertIntent;
    // Content
    title?: string | ReactNode;
    description?: string | ReactNode;
    // Interactions
    dismissible?: boolean;
    onDismiss?: () => void;
    actions?: AlertAction[];
    // Customization
    customIcon?: React.ReactNode;
    showTimestamp?: boolean;
    details?: string | ReactNode;
    // Auto-dismiss
    timer?: number; // seconds
    onTimerComplete?: () => void;
    // Undo action
    undoAction?: () => void;
    // Layout & class
    className?: string;
}

