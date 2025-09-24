'use client';

import React, { useState } from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps, FilterOption } from './Popover.types';
import { Filter, X, Check, Search } from 'lucide-react';

interface FilterPopoverProps extends Omit<BasePopoverProps, 'children'> {
    filters: FilterOption[];
    onApplyFilters?: (filters: FilterOption[]) => void;
    onClearFilters?: () => void;
    showSearch?: boolean;
    showApplyButton?: boolean;
    children: React.ReactNode;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
    filters,
    onApplyFilters,
    onClearFilters,
    showSearch = true,
    showApplyButton = true,
    children,
    ...popoverProps
}) => {
    const [localFilters, setLocalFilters] = useState<FilterOption[]>(filters);
    const [searchQuery, setSearchQuery] = useState('');

    const updateFilter = (filterId: string, changes: Partial<FilterOption>) => {
        setLocalFilters(prev =>
            prev.map(filter =>
                filter.id === filterId
                    ? { ...filter, ...changes }
                    : filter
            )
        );
    };

    const handleCheckboxChange = (filterId: string, checked: boolean) => {
        updateFilter(filterId, { checked });
    };

    const handleApplyFilters = () => {
        onApplyFilters?.(localFilters);
    };

    const handleClearFilters = () => {
        const clearedFilters = localFilters.map(filter => ({
            ...filter,
            checked: false,
            value: '',
        }));
        setLocalFilters(clearedFilters);
        onClearFilters?.();
    };

    const getActiveFilterCount = () => {
        return localFilters.filter(filter =>
            filter.checked || (filter.value && filter.value.length > 0)
        ).length;
    };

    const filteredFilters = localFilters.filter(filter =>
        searchQuery === '' ||
        filter.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderFilterInput = (filter: FilterOption) => {
        switch (filter.type) {
            case 'checkbox':
                return (
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id={filter.id}
                            checked={filter.checked || false}
                            onChange={(e) => handleCheckboxChange(filter.id, e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={filter.id} className="text-sm font-medium text-gray-700">
                            {filter.label}
                        </label>
                    </div>
                );

            case 'select':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {filter.label}
                        </label>
                        <select
                            value={filter.value || ''}
                            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All</option>
                            {filter.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            case 'date':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {filter.label}
                        </label>
                        <input
                            type="date"
                            value={filter.value || ''}
                            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                );

            case 'range':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {filter.label}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={filter.value || '0'}
                            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0</span>
                            <span className="font-medium">{filter.value || '0'}</span>
                            <span>100</span>
                        </div>
                    </div>
                );

            default:
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {filter.label}
                        </label>
                        <input
                            type="text"
                            value={filter.value || ''}
                            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Enter ${filter.label.toLowerCase()}`}
                        />
                    </div>
                );
        }
    };

    return (
        <BasePopover {...popoverProps} size="lg" className="p-0">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">Filters</h3>
                        {getActiveFilterCount() > 0 && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {getActiveFilterCount()} active
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleClearFilters}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center space-x-1"
                    >
                        <X className="w-4 h-4" />
                        <span>Clear All</span>
                    </button>
                </div>

                {/* Search */}
                {showSearch && (
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search filters..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                )}

                {/* Filters List */}
                <div className="max-h-80 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {filteredFilters.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No filters found
                            </p>
                        ) : (
                            filteredFilters.map((filter) => (
                                <div key={filter.id} className="space-y-2">
                                    {renderFilterInput(filter)}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer */}
                {showApplyButton && (
                    <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} selected
                        </p>

                        <div className="flex space-x-2">
                            <button
                                onClick={handleClearFilters}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Clear
                            </button>

                            <button
                                onClick={handleApplyFilters}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-1"
                            >
                                <Check className="w-4 h-4" />
                                <span>Apply Filters</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {children}
        </BasePopover>
    );
};

export default FilterPopover;
