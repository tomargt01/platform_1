import { useMemo } from 'react';
import { UsePaginationProps, PaginationItem } from './Pagination.types';

export const DOTS = '...';

const range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
    currentPage,
    totalPages,
    siblingCount = 1,
    boundaryCount = 1,
}: UsePaginationProps): PaginationItem[] => {
    const paginationRange = useMemo(() => {
        // If total pages is less than or equal to the sum of boundary and sibling counts + current page + 2 dots
        const totalPageNumbers = siblingCount + boundaryCount * 2 + 5;

        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages).map(pageNumber => ({
                type: 'page' as const,
                page: pageNumber,
                selected: pageNumber === currentPage,
                disabled: false,
            }));
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount - 1;

        const items: PaginationItem[] = [];

        // Add first boundary pages
        for (let i = 1; i <= boundaryCount; i++) {
            items.push({
                type: 'page',
                page: i,
                selected: i === currentPage,
                disabled: false,
            });
        }

        // Add left dots if needed
        if (shouldShowLeftDots) {
            items.push({ type: 'dots' });
        }

        // Add sibling pages around current page
        const startPage = shouldShowLeftDots ? leftSiblingIndex : boundaryCount + 1;
        const endPage = shouldShowRightDots ? rightSiblingIndex : totalPages - boundaryCount;

        for (let i = startPage; i <= endPage; i++) {
            // Avoid duplicating boundary pages
            if (i > boundaryCount && i <= totalPages - boundaryCount) {
                items.push({
                    type: 'page',
                    page: i,
                    selected: i === currentPage,
                    disabled: false,
                });
            }
        }

        // Add right dots if needed
        if (shouldShowRightDots) {
            items.push({ type: 'dots' });
        }

        // Add last boundary pages
        for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
            if (i > boundaryCount) {
                items.push({
                    type: 'page',
                    page: i,
                    selected: i === currentPage,
                    disabled: false,
                });
            }
        }

        return items;
    }, [currentPage, totalPages, siblingCount, boundaryCount]);

    return paginationRange;
};
