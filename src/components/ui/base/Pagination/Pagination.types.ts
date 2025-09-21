export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "basic" | "advanced" | "minimal";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    theme?: Theme;
    size?: PaginationSize;
    variant?: PaginationVariant;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    showPageNumbers?: boolean;
    showPageInfo?: boolean;
    siblingCount?: number;
    boundaryCount?: number;
    disabled?: boolean;
    className?: string;
    maxVisiblePages?: number;
    customLabels?: {
        first?: string;
        previous?: string;
        next?: string;
        last?: string;
        of?: string;
        page?: string;
    };
}

export interface UsePaginationProps {
    currentPage: number;
    totalPages: number;
    siblingCount?: number;
    boundaryCount?: number;
}

export interface PaginationItem {
    type: 'page' | 'dots' | 'prev' | 'next' | 'first' | 'last';
    page?: number;
    disabled?: boolean;
    selected?: boolean;
}
