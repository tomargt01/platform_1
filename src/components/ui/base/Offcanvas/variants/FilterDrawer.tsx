'use client';

import React, { useState } from 'react';
import OffCanvas from '../OffCanvas';
import { OffCanvasProps } from '../OffCanvas.types';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterOption {
    key: string;
    label: string;
    type: 'select' | 'multiselect' | 'range' | 'date' | 'checkbox';
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    value?: any;
}

interface FilterDrawerProps extends Omit<OffCanvasProps, 'children'> {
    filters: FilterOption[];
    onApplyFilters: (filters: Record<string, any>) => void;
    onResetFilters: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
    filters,
    onApplyFilters,
    onResetFilters,
    ...props
}) => {
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});

    const handleFilterChange = (key: string, value: any) => {
        setFilterValues(prev => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filterValues);
        props.onClose();
    };

    const handleReset = () => {
        setFilterValues({});
        onResetFilters();
    };

    const renderFilterInput = (filter: FilterOption) => {
        const value = filterValues[filter.key] || filter.value;

        switch (filter.type) {
            case 'select':
                return (
                    <select
                        value={value || ''}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">Select {filter.label}</option>
                        {filter.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={value || false}
                            onChange={(e) => handleFilterChange(filter.key, e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <span>{filter.label}</span>
                    </label>
                );

            case 'range':
                return (
                    <div className="space-y-2">
                        <input
                            type="range"
                            min={filter.min}
                            max={filter.max}
                            value={value || filter.min}
                            onChange={(e) => handleFilterChange(filter.key, parseInt(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{filter.min}</span>
                            <span>{value || filter.min}</span>
                            <span>{filter.max}</span>
                        </div>
                    </div>
                );

            default:
                return (
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        placeholder={`Enter ${filter.label}`}
                        className="w-full p-2 border rounded-lg"
                    />
                );
        }
    };

    return (
        <OffCanvas
            {...props}
            header={
                <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span className="font-medium">Filters</span>
                </div>
            }
            footer={
                <div className="flex space-x-3">
                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>
            }
        >
            <div className="p-4 space-y-6">
                {filters.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            {filter.label}
                        </label>
                        {renderFilterInput(filter)}
                    </div>
                ))}
            </div>
        </OffCanvas>
    );
};

export default FilterDrawer;
