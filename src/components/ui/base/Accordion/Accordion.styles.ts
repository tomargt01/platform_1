import { AccordionSize, AccordionVariant } from './Accordion.types';

export const getSizeStyles = (size: AccordionSize) => {
    const sizes = {
        sm: {
            headerPadding: 'var(--space-2) var(--space-3)',
            contentPadding: 'var(--space-2) var(--space-3)',
            fontSize: 'var(--font-sm)',
            iconSize: 'var(--icon-sm)',
            borderRadius: 'var(--radius-xs)',
        },
        md: {
            headerPadding: 'var(--space-3) var(--space-4)',
            contentPadding: 'var(--space-3) var(--space-4)',
            fontSize: 'var(--font-md)',
            iconSize: 'var(--icon-md)',
            borderRadius: 'var(--radius-sm)',
        },
        lg: {
            headerPadding: 'var(--space-4) var(--space-5)',
            contentPadding: 'var(--space-4) var(--space-5)',
            fontSize: 'var(--font-lg)',
            iconSize: 'var(--icon-lg)',
            borderRadius: 'var(--radius-md)',
        },
    };
    return sizes[size];
};

export const getVariantStyles = (variant: AccordionVariant) => {
    const variants = {
        default: {
            border: 'var(--border-width-1) var(--border-style) var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-2)',
            background: 'var(--background)',
        },
        bordered: {
            border: 'var(--border-2) var(--primary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-3)',
            background: 'var(--background)',
        },
        separated: {
            border: 'none',
            borderBottom: 'var(--border-width-1) var(--border-style) var(--border-color)',
            borderRadius: '0',
            marginBottom: '0',
            background: 'transparent',
        },
        flush: {
            border: 'none',
            borderRadius: '0',
            marginBottom: '0',
            background: 'transparent',
        },
        ghost: {
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-1)',
            background: 'transparent',
        },
    };
    return variants[variant];
};
