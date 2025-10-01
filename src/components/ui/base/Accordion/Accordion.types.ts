export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'flush' | 'ghost';

export interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    size?: AccordionSize;
    variant?: AccordionVariant;
    disabled?: boolean;
    expanded?: boolean;
    defaultExpanded?: boolean;
    onToggle?: (expanded: boolean) => void;
    className?: string;
    icon?: React.ReactNode;
    customIcon?: React.ReactNode;
    showIcon?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    animationDuration?: number;
}

export interface AccordionGroupProps {
    items: {
        id: string;
        title: string;
        content: React.ReactNode;
        disabled?: boolean;
        defaultExpanded?: boolean;
    }[];
    size?: AccordionSize;
    variant?: AccordionVariant;
    allowMultiple?: boolean;
    collapsible?: boolean;
    className?: string;
    onItemToggle?: (itemId: string, expanded: boolean) => void;
    defaultExpandedItems?: string[];
    expandedItems?: string[];
    animationDuration?: number;
}

// Properly defined AccordionIconProps
export interface AccordionIconProps {
    isExpanded: boolean;
    size: AccordionSize;
    customIcon?: React.ReactNode;
    animationDuration?: number;
    color?: string;
}

export interface AccordionItemData {
    id: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
    defaultExpanded?: boolean;
}
