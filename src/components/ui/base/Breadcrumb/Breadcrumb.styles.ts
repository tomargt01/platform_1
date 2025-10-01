import { BreadcrumbSize } from './Breadcrumb.types';

export const getSizeClasses = (size: BreadcrumbSize) => {
    const sizes = {
        sm: {
            containerPadding: 'var(--pad8px) var(--pad12px)',
            textFontSize: 'var(--font-xs)',
            iconSize: 'var(--icon-sm)',
            separatorMargin: '0 var(--margin4px)',
        },
        md: {
            containerPadding: 'var(--pad12px) var(--space-3)',
            textFontSize: 'var(--font-sm)',
            iconSize: 'var(--icon-md)',
            separatorMargin: '0 var(--margin8px)',
        },
        lg: {
            containerPadding: 'var(--space-4) var(--space-3)',
            textFontSize: 'var(--font-md)',
            iconSize: 'var(--icon-lg)',
            separatorMargin: '0 var(--margin8px)',
        },
    };
    return sizes[size];
};
