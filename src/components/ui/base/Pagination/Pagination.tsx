'use client';

import React from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal
} from 'lucide-react';
import { PaginationProps } from './Pagination.types';
import { getThemeColors, getSizeClasses } from './Pagination.styles';
import { usePagination, DOTS } from './usePagination';

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    theme = 'light',
    size = 'md',
    variant = 'advanced',
    showFirstLast = true,
    showPrevNext = true,
    showPageNumbers = true,
    showPageInfo = false,
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    className = '',
    maxVisiblePages = 7,
    customLabels = {},
}) => {
    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    const paginationItems = usePagination({
        currentPage,
        totalPages,
        siblingCount,
        boundaryCount,
    });

    const labels = {
        first: 'First',
        previous: 'Previous',
        next: 'Next',
        last: 'Last',
        of: 'of',
        page: 'Page',
        ...customLabels,
    };

    const handlePageChange = (page: number) => {
        if (disabled || page < 1 || page > totalPages || page === currentPage) {
            return;
        }
        onPageChange(page);
    };

    const renderButton = (
        content: React.ReactNode,
        onClick: () => void,
        isDisabled: boolean = false,
        isActive: boolean = false,
        ariaLabel?: string,
        key?: string | number // Added key parameter
    ) => {
        const isButtonDisabled = disabled || isDisabled;

        return (
            <button
                key={key} // Add key prop here
                onClick={onClick}
                disabled={isButtonDisabled}
                aria-label={ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                className={`
          inline-flex items-center justify-center border rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
          ${sizeClasses.button}
          ${isActive
                        ? themeColors.activeButton
                        : isButtonDisabled
                            ? themeColors.disabledButton
                            : themeColors.button
                    }
          ${isActive ? 'focus:ring-blue-500' : 'focus:ring-gray-300'}
        `}
            >
                {content}
            </button>
        );
    };

    if (variant === 'minimal') {
        return (
            <div className={`flex items-center justify-between ${className}`}>
                {showPageInfo && (
                    <div className={`${themeColors.pageInfo} ${sizeClasses.pageInfo}`}>
                        {labels.page} {currentPage} {labels.of} {totalPages}
                    </div>
                )}

                <div className={`flex items-center ${sizeClasses.gap}`}>
                    {renderButton(
                        <ChevronLeft className="w-4 h-4" />,
                        () => handlePageChange(currentPage - 1),
                        currentPage <= 1,
                        false,
                        labels.previous,
                        'prev-button' // Unique key
                    )}

                    {renderButton(
                        <ChevronRight className="w-4 h-4" />,
                        () => handlePageChange(currentPage + 1),
                        currentPage >= totalPages,
                        false,
                        labels.next,
                        'next-button' // Unique key
                    )}
                </div>
            </div>
        );
    }

    if (variant === 'basic') {
        const visiblePages = Math.min(maxVisiblePages, totalPages);
        const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages, startPage + visiblePages - 1);
        const adjustedStartPage = Math.max(1, endPage - visiblePages + 1);

        return (
            <div className={`flex items-center justify-center ${sizeClasses.gap} ${className}`}>
                {showPrevNext && renderButton(
                    <ChevronLeft className="w-4 h-4" />,
                    () => handlePageChange(currentPage - 1),
                    currentPage <= 1,
                    false,
                    labels.previous,
                    'prev-button'
                )}

                {showPageNumbers && Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => {
                    const page = adjustedStartPage + i;
                    return renderButton(
                        page.toString(),
                        () => handlePageChange(page),
                        false,
                        page === currentPage,
                        `Go to page ${page}`,
                        `page-${page}` // Unique key for each page
                    );
                })}

                {showPrevNext && renderButton(
                    <ChevronRight className="w-4 h-4" />,
                    () => handlePageChange(currentPage + 1),
                    currentPage >= totalPages,
                    false,
                    labels.next,
                    'next-button'
                )}
            </div>
        );
    }

    // Advanced variant (default) - FIXED VERSION
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {showPageInfo && (
                <div className={`text-center ${themeColors.pageInfo} ${sizeClasses.pageInfo}`}>
                    {labels.page} {currentPage} {labels.of} {totalPages}
                </div>
            )}

            <div className={`flex items-center justify-center ${sizeClasses.gap}`}>
                {/* First Page Button */}
                {showFirstLast && renderButton(
                    <ChevronsLeft className="w-4 h-4" />,
                    () => handlePageChange(1),
                    currentPage <= 1,
                    false,
                    labels.first,
                    'first-button'
                )}

                {/* Previous Button */}
                {showPrevNext && renderButton(
                    <ChevronLeft className="w-4 h-4" />,
                    () => handlePageChange(currentPage - 1),
                    currentPage <= 1,
                    false,
                    labels.previous,
                    'prev-button'
                )}

                {/* Page Numbers - FIXED with proper keys */}
                {showPageNumbers && paginationItems.map((item, index) => {
                    if (item.type === 'dots') {
                        return (
                            <div
                                key={`dots-${index}-${currentPage}`} // Unique key for dots
                                className={`inline-flex items-center justify-center ${sizeClasses.button} ${themeColors.dots}`}
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </div>
                        );
                    }

                    return renderButton(
                        item.page?.toString() || '',
                        () => handlePageChange(item.page!),
                        item.disabled,
                        item.selected,
                        `Go to page ${item.page}`,
                        `page-${item.page}-${index}` // Unique key combining page number and index
                    );
                })}

                {/* Next Button */}
                {showPrevNext && renderButton(
                    <ChevronRight className="w-4 h-4" />,
                    () => handlePageChange(currentPage + 1),
                    currentPage >= totalPages,
                    false,
                    labels.next,
                    'next-button'
                )}

                {/* Last Page Button */}
                {showFirstLast && renderButton(
                    <ChevronsRight className="w-4 h-4" />,
                    () => handlePageChange(totalPages),
                    currentPage >= totalPages,
                    false,
                    labels.last,
                    'last-button'
                )}
            </div>
        </div>
    );
};

export default Pagination;
