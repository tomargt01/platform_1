'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Check } from 'lucide-react';
import { DropdownSelectProps } from './Dropdown.types';
import { getThemeColors, getSizeClasses } from './Dropdown.styles';
import Dropdown from './Dropdown';

const DropdownSelect: React.FC<DropdownSelectProps> = ({
    options,
    value,
    onChange,
    theme = 'light',
    size = 'md',
    customColors,
    disabled = false,
    placeholder = 'Select option...',
    className = '',
    error,
    label,
    required = false,
    searchable = false,
    clearable = false,
    loading = false,
    showIcons = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    const selectedOption = options.find(opt => opt.value === value);

    const filteredOptions = useMemo(() => {
        if (!searchable || !searchTerm) return options;
        return options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm, searchable]);

    const handleOptionSelect = (option: any) => {
        onChange(option.value);
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    const getCustomStyle = (property: string) => {
        if (!customColors) return '';
        return (customColors as any)[property] || '';
    };

    return (
        <div className={className}>
            {label && (
                <label className={`block text-sm font-medium mb-1 ${getCustomStyle('text') || themeColors.text}`}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <Dropdown
                trigger={
                    <div className={`
            w-full flex items-center justify-between rounded-lg border transition-all duration-200
            focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50
            ${getCustomStyle('background') || themeColors.background}
            ${getCustomStyle('border') || themeColors.border}
            ${sizeClasses.trigger}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${error ? 'border-red-500' : ''}
          `}>
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                            {selectedOption && showIcons && selectedOption.icon && (
                                <span className={`${sizeClasses.icon} ${getCustomStyle('iconColor') || themeColors.iconColor}`}>
                                    {selectedOption.icon}
                                </span>
                            )}
                            <span className={`
                truncate
                ${selectedOption
                                    ? getCustomStyle('text') || themeColors.text
                                    : getCustomStyle('disabledText') || themeColors.disabledText
                                }
              `}>
                                {selectedOption ? selectedOption.label : placeholder}
                            </span>
                        </div>

                        <div className="flex items-center space-x-1">
                            {clearable && selectedOption && !disabled && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className={`p-0.5 rounded hover:bg-gray-200 ${getCustomStyle('iconColor') || themeColors.iconColor}`}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                }
                theme={theme}
                size={size}
                customColors={customColors}
                disabled={disabled}
                loading={loading}
                isOpen={isOpen}
                onToggle={setIsOpen}
            >
                <div className="py-1">
                    {searchable && (
                        <div className="px-3 py-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search options..."
                                    className={`
                    w-full pl-8 pr-3 py-1 text-sm rounded border
                    ${getCustomStyle('background') || themeColors.background}
                    ${getCustomStyle('border') || themeColors.border}
                    ${getCustomStyle('text') || themeColors.text}
                    focus:outline-none focus:ring-1 focus:ring-blue-500
                  `}
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className={`px-4 py-2 text-sm ${getCustomStyle('disabledText') || themeColors.disabledText}`}>
                                No options found
                            </div>
                        ) : (
                            filteredOptions.map(option => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={option.disabled}
                                    className={`
                    w-full flex items-center justify-between text-left transition-all duration-150
                    ${sizeClasses.option}
                    ${option.disabled
                                            ? `${getCustomStyle('disabledText') || themeColors.disabledText} cursor-not-allowed`
                                            : option.value === value
                                                ? `${getCustomStyle('selectedBackground') || themeColors.selectedBackground} ${getCustomStyle('selectedText') || themeColors.selectedText}`
                                                : `${getCustomStyle('text') || themeColors.text} ${getCustomStyle('hoverBackground') || themeColors.hoverBackground} cursor-pointer`
                                        }
                  `}
                                >
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        {showIcons && option.icon && (
                                            <span className={`${sizeClasses.icon} ${getCustomStyle('iconColor') || themeColors.iconColor}`}>
                                                {option.icon}
                                            </span>
                                        )}
                                        <span className="truncate">{option.label}</span>
                                    </div>

                                    {option.value === value && (
                                        <Check className={`${sizeClasses.icon} ${getCustomStyle('selectedText') || themeColors.selectedText}`} />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </Dropdown>

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

export default DropdownSelect;
