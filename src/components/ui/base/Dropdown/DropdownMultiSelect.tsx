'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Check, CheckSquare, Square } from 'lucide-react';
import { DropdownMultiSelectProps } from './Dropdown.types';
import { getThemeColors, getSizeClasses } from './Dropdown.styles';
import Dropdown from './Dropdown';

const DropdownMultiSelect: React.FC<DropdownMultiSelectProps> = ({
    options,
    value = [],
    onChange,
    theme = 'light',
    size = 'md',
    customColors,
    disabled = false,
    placeholder = 'Select options...',
    className = '',
    error,
    label,
    required = false,
    searchable = false,
    clearable = false,
    loading = false,
    showIcons = true,
    maxSelectedShow = 3,
    selectAllOption = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    const selectedOptions = options.filter(opt => value.includes(opt.value));

    const filteredOptions = useMemo(() => {
        if (!searchable || !searchTerm) return options;
        return options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm, searchable]);

    const handleOptionToggle = (option: any) => {
        const newValue = value.includes(option.value)
            ? value.filter(v => v !== option.value)
            : [...value, option.value];
        onChange(newValue);
    };

    const handleSelectAll = () => {
        if (value.length === filteredOptions.length) {
            onChange([]);
        } else {
            onChange(filteredOptions.map(opt => opt.value));
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange([]);
    };

    const removeSelectedOption = (optionValue: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter(v => v !== optionValue));
    };

    const getDisplayText = () => {
        if (selectedOptions.length === 0) return placeholder;
        if (selectedOptions.length <= maxSelectedShow) {
            return selectedOptions.map(opt => opt.label).join(', ');
        }
        return `${selectedOptions.slice(0, maxSelectedShow).map(opt => opt.label).join(', ')} +${selectedOptions.length - maxSelectedShow} more`;
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
                        <div className="flex items-center flex-1 min-w-0">
                            {selectedOptions.length <= maxSelectedShow ? (
                                <div className="flex items-center flex-wrap gap-1">
                                    {selectedOptions.map(option => (
                                        <span
                                            key={option.id}
                                            className={`
                        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                        ${getCustomStyle('selectedBackground') || themeColors.selectedBackground}
                        ${getCustomStyle('selectedText') || themeColors.selectedText}
                      `}
                                        >
                                            {showIcons && option.icon && (
                                                <span className="w-3 h-3">{option.icon}</span>
                                            )}
                                            {option.label}
                                            {!disabled && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => removeSelectedOption(option.value, e)}
                                                    className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                                                >
                                                    <X className="w-2 h-2" />
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                    {selectedOptions.length === 0 && (
                                        <span className={`${getCustomStyle('disabledText') || themeColors.disabledText}`}>
                                            {placeholder}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <span className={`truncate ${getCustomStyle('text') || themeColors.text}`}>
                                    {getDisplayText()}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-1">
                            {clearable && selectedOptions.length > 0 && !disabled && (
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

                    {selectAllOption && filteredOptions.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className={`
                  w-full flex items-center space-x-2 text-left transition-all duration-150
                  ${sizeClasses.option}
                  ${getCustomStyle('text') || themeColors.text}
                  ${getCustomStyle('hoverBackground') || themeColors.hoverBackground}
                  cursor-pointer border-b
                  ${getCustomStyle('separatorColor') || themeColors.separatorColor}
                `}
                            >
                                {value.length === filteredOptions.length ? (
                                    <CheckSquare className={`${sizeClasses.icon} ${getCustomStyle('selectedText') || themeColors.selectedText}`} />
                                ) : (
                                    <Square className={`${sizeClasses.icon} ${getCustomStyle('iconColor') || themeColors.iconColor}`} />
                                )}
                                <span className="font-medium">
                                    {value.length === filteredOptions.length ? 'Deselect All' : 'Select All'}
                                </span>
                            </button>
                        </>
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
                                    onClick={() => handleOptionToggle(option)}
                                    disabled={option.disabled}
                                    className={`
                    w-full flex items-center space-x-2 text-left transition-all duration-150
                    ${sizeClasses.option}
                    ${option.disabled
                                            ? `${getCustomStyle('disabledText') || themeColors.disabledText} cursor-not-allowed`
                                            : value.includes(option.value)
                                                ? `${getCustomStyle('selectedBackground') || themeColors.selectedBackground} ${getCustomStyle('selectedText') || themeColors.selectedText}`
                                                : `${getCustomStyle('text') || themeColors.text} ${getCustomStyle('hoverBackground') || themeColors.hoverBackground} cursor-pointer`
                                        }
                  `}
                                >
                                    {value.includes(option.value) ? (
                                        <CheckSquare className={`${sizeClasses.icon} ${getCustomStyle('selectedText') || themeColors.selectedText}`} />
                                    ) : (
                                        <Square className={`${sizeClasses.icon} ${getCustomStyle('iconColor') || themeColors.iconColor}`} />
                                    )}

                                    {showIcons && option.icon && (
                                        <span className={`${sizeClasses.icon} ${getCustomStyle('iconColor') || themeColors.iconColor}`}>
                                            {option.icon}
                                        </span>
                                    )}
                                    <span className="truncate">{option.label}</span>
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

export default DropdownMultiSelect;
