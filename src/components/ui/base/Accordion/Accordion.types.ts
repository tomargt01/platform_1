export type AccordionTheme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionVariant = "default" | "bordered" | "separated" | "flush" | "ghost";

// Properly defined AccordionIconProps
export interface AccordionIconProps {
    isExpanded: boolean;
    theme: AccordionTheme;
    size: AccordionSize;
    customIcon?: React.ReactNode;
    animationDuration?: number;
}

export interface AccordionItemData {
    id: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
    defaultExpanded?: boolean;
}

export interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    theme?: AccordionTheme;
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
    items: AccordionItemData[];
    theme?: AccordionTheme;
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
