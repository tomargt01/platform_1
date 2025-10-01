import React, { useState, useEffect, useRef } from 'react';
import { AlertProps } from './Alert.types';
import { alertVariants } from './Alert.styles';
import { cn } from '#/lib/utils/cn';
import { Button } from '../Button';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

// Icon mapping for built-in icons
const defaultIconMap = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    critical: XCircle,
};


export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            intent,
            title,
            description,
            dismissible,
            onDismiss,
            actions,
            customIcon,
            showTimestamp,
            details,
            timer,
            onTimerComplete,
            undoAction,
            className,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(true);
        const [isDetailsOpen, setIsDetailsOpen] = useState(false);
        const [countdown, setCountdown] = useState<number | null>(timer || null);

        // Choose the default icon component
        const DefaultIcon = defaultIconMap[intent] || Info;


        // Auto-dismiss timer
        useEffect(() => {
            let timerId: NodeJS.Timeout | null = null;
            if (timer && countdown !== null && countdown > 0) {
                timerId = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev === null || prev <= 1) {
                            clearInterval(timerId!);
                            if (onTimerComplete) {
                                onTimerComplete();
                                setIsVisible(false);
                                onDismiss?.();
                            }
                            return null;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
            return () => {
                if (timerId) clearInterval(timerId);
            };
        }, [timer, countdown, onTimerComplete, onDismiss]);

        // Accessibility focus
        useEffect(() => {
            if (isVisible && ref && 'current' in ref && ref.current) {
                ref.current.setAttribute('tabindex', '-1');
                ref.current.focus();
            }
        }, [isVisible, ref]);

        // Handlers
        const handleDismiss = () => {
            setIsVisible(false);
            onDismiss?.();
            setCountdown(null);
        };

        const handleUndo = () => {
            undoAction?.();
            setIsVisible(false);
            onDismiss?.();
        };

        // Timestamp
        const timestamp = showTimestamp
            ? new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            : undefined;

        if (!isVisible) return null;


        return (
            <div
                ref={ref}
                role="alert"
                className={cn(
                    alertVariants({ intent }),
                    'flex items-start gap-3',
                    className
                )}
                {...props}
            >
                {customIcon ? (
                    <>{customIcon}</> // Render the element directly
                ) : (
                    <DefaultIcon
                        className={cn('flex-shrink-0 mt-0.5', intent === 'critical' ? 'w-6 h-6' : 'w-5 h-5')}
                    />
                )}
                <div className="flex-1">
                    {title && <h4 className="font-bold text-lg leading-6 mb-1">{title}</h4>}
                    {description && (
                        <p className="text-sm leading-5 font-medium">
                            {description}
                            {countdown !== null && (
                                <span className="ml-2 font-bold" style={{ color: 'var(--alert-text)' }}>
                                    ({countdown}s)
                                </span>
                            )}
                        </p>
                    )}
                    {showTimestamp && timestamp && (
                        <p className="text-xs mt-1" style={{ color: 'var(--alert-text)' }}>
                            {timestamp}
                        </p>
                    )}
                    {details && (
                        <div className="mt-2">
                            <Button
                                intent="primary"
                                size="sm"
                                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            >
                                {isDetailsOpen ? 'Hide details' : 'Show details'}
                            </Button>
                            {isDetailsOpen && (
                                <div className="text-sm mt-2" style={{ color: 'var(--alert-text)' }}>
                                    {details}
                                </div>
                            )}
                        </div>
                    )}
                    {(actions?.length || undoAction) && (
                        <div className="mt-3 flex gap-2">
                            {undoAction && (
                                <Button
                                    intent="primary"
                                    size="sm"
                                    onClick={handleUndo}
                                >
                                    Undo
                                </Button>
                            )}
                            {actions?.map((action, index) => (
                                <Button
                                    key={index}
                                    intent={action.intent || 'secondary'}
                                    size="sm"
                                    onClick={action.onClick}
                                    disabled={action.disabled}
                                    loading={action.loading}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="p-1 rounded focus:outline-none focus:ring-2"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        );
    }
);
