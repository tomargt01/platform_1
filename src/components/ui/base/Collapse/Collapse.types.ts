export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export type CollapseDirection = "vertical" | "horizontal";

export type CollapseVariant = "default" | "accordion" | "card" | "minimal";

export type CollapseSize = "sm" | "md" | "lg";

export interface CollapseProps {
    children: React.ReactNode;
    isOpen: boolean;
    onToggle?: () => void;
    direction?: CollapseDirection;
    variant?: CollapseVariant;
    theme?: Theme;
    size?: CollapseSize;
    title?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    duration?: number;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
    customColors?: {
        background?: string;
        border?: string;
        text?: string;
        headerBackground?: string;
        headerText?: string;
    };
}

export interface AccordionProps {
    items: AccordionItem[];
    theme?: Theme;
    variant?: CollapseVariant;
    size?: CollapseSize;
    allowMultiple?: boolean;
    defaultOpenItems?: number[];
    className?: string;
    customColors?: {
        background?: string;
        border?: string;
        text?: string;
        headerBackground?: string;
        headerText?: string;
    };
}

export interface AccordionItem {
    id: number;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
}
