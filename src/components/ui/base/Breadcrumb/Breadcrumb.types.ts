export type BreadcrumbSize = 'sm' | 'md' | 'lg';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isActive?: boolean;
    disabled?: boolean;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    size?: BreadcrumbSize;
    separator?: React.ReactNode;
    showHomeIcon?: boolean;
    maxItems?: number;
    className?: string;
    onItemClick?: (item: BreadcrumbItem, index: number) => void;
}
