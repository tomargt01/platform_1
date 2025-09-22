'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    Search,
    ChevronDown,
    X,
    Check,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { AutocompleteProps, AutocompleteOption } from './Autocomplete.types';
import { getThemeColors, getSizeClasses } from './Autocomplete.styles';
import { useAutocompleteLogic, useAsyncOptions } from './Autocomplete.hooks';

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
    const {
        options = [],
        onInputChange,
        onFocus,
        onBlur,
        onSelect,
        theme = 'light',
        size = 'md',
        customColors,
        className = '',
        placeholder = 'Search...',
        disabled = false,
        required = false,
        clearable = true,
        freeSolo = false,
        filterType = 'contains',
        minInputLength = 0,
        maxResults,
        noResultsText = 'No results found',
        loadingText = 'Loading...',
        isLoading = false,
        onLoadOptions,
        label,
        error,
        helperText,
        showIcon = true,
        showClear = true,
        groupBy,
        renderOption,
        renderInput,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selectedValues, setSelectedValues] = useState<AutocompleteOption[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    // Determine if multiple mode
    const isMultiple = props.multiple === true;

    // Use custom hooks
    const {
        inputValue,
        setInputValue,
        isOpen,
        setIsOpen,
        selectedIndex,
        setSelectedIndex,
        filteredOptions,
        handleKeyDown
    } = useAutocompleteLogic(options, filterType, maxResults);

    const { asyncOptions, isLoading: asyncLoading, loadOptions } = useAsyncOptions(
        onLoadOptions,
        minInputLength
    );

    // Initialize selected values from props
    useEffect(() => {
        if (isMultiple && props.value) {
            setSelectedValues(props.value);
        }
    }, [isMultiple, props.value]);

    // Set input value for single selection
    useEffect(() => {
        if (!isMultiple && props.value) {
            const value = props.value;
            if (typeof value === 'object' && value !== null) {
                setInputValue(value.label);
            } else if (value !== null) {
                setInputValue(String(value));
            }
        }
    }, [isMultiple, props.value]);

    // Determine which options to show
    const displayOptions = useMemo(() => {
        if (onLoadOptions) {
            return asyncOptions;
        }
        return filteredOptions;
    }, [onLoadOptions, asyncOptions, filteredOptions]);

    // Group options if groupBy is specified
    const groupedOptions = useMemo(() => {
        if (!groupBy) return { '': displayOptions };

        return displayOptions.reduce((groups, option) => {
            const group = (option as any)[groupBy] || '';
            if (!groups[group]) groups[group] = [];
            groups[group].push(option);
            return groups;
        }, {} as Record<string, AutocompleteOption[]>);
    }, [displayOptions, groupBy]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSelectedIndex(-1);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen, setSelectedIndex]);

    // Handle async loading
    useEffect(() => {
        if (onLoadOptions && inputValue.length >= minInputLength) {
            const timeoutId = setTimeout(() => {
                loadOptions(inputValue);
            }, 300);

            return () => clearTimeout(timeoutId);
        }
    }, [inputValue, onLoadOptions, minInputLength, loadOptions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setIsOpen(true);
        setSelectedIndex(-1);
        onInputChange?.(newValue);
    };

    const handleOptionClick = (option: AutocompleteOption) => {
        if (isMultiple) {
            const newSelectedValues = [...selectedValues];
            const existingIndex = newSelectedValues.findIndex(v => v.value === option.value);

            if (existingIndex >= 0) {
                newSelectedValues.splice(existingIndex, 1);
            } else {
                newSelectedValues.push(option);
            }

            setSelectedValues(newSelectedValues);
            (props as any).onChange?.(newSelectedValues, option);
        } else {
            setInputValue(option.label);
            setIsOpen(false);
            (props as any).onChange?.(option, option);
            onSelect?.(option);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setSelectedValues([]);
        if (isMultiple) {
            (props as any).onChange?.([]);
        } else {
            (props as any).onChange?.(null);
        }
        inputRef.current?.focus();
    };

    const handleKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const selectedOption = handleKeyDown(e);
        if (selectedOption) {
            handleOptionClick(selectedOption);
        }
    };

    const getCustomStyle = (type: string) => {
        if (!customColors) return '';
        return (customColors as any)[type] || '';
    };

    const renderOptionContent = (option: AutocompleteOption) => {
        if (renderOption) {
            return renderOption(option);
        }

        return (
            <div className="flex items-center gap-2">
                {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                        <div className="text-xs opacity-75">{option.description}</div>
                    )}
                </div>
                {isMultiple && selectedValues.some(v => v.value === option.value) && (
                    <Check className="w-4 h-4" />
                )}
            </div>
        );
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {label && (
                <label className={`block text-sm font-medium mb-1 ${themeColors.text}`}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {/* Selected values display for multiple mode */}
                {isMultiple && selectedValues.length > 0 && (
                    <div className={`
            flex flex-wrap gap-1 mb-2 p-2 rounded border
            ${themeColors.background} ${themeColors.border}
          `}>
                        {selectedValues.map((value, index) => (
                            <span
                                key={`${value.value}-${index}`}
                                className={`
                  inline-flex items-center gap-1 px-2 py-1 text-xs rounded
                  ${themeColors.selectedOption} ${getCustomStyle('selectedOption')}
                `}
                            >
                                {value.label}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newValues = selectedValues.filter((_, i) => i !== index);
                                        setSelectedValues(newValues);
                                        (props as any).onChange?.(newValues);
                                    }}
                                    className="hover:opacity-75"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Input field - Fixed props spreading */}
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => {
                            setIsFocused(true);
                            setIsOpen(true);
                            onFocus?.();
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                            setTimeout(() => {
                                onBlur?.();
                            }, 200);
                        }}
                        onKeyDown={handleKeyDownWrapper}
                        disabled={disabled}
                        placeholder={placeholder}
                        required={required}
                        aria-label={ariaLabel}
                        aria-describedby={ariaDescribedBy}
                        className={`
              w-full rounded-lg border outline-none transition-all
              ${themeColors.background} ${themeColors.border} 
              ${themeColors.text} ${themeColors.placeholder}
              ${sizeClasses.input}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500' : ''}
              ${isFocused ? 'ring-2 ring-opacity-50' : ''}
              ${showIcon || (clearable && inputValue) ? 'pr-10' : ''}
              ${getCustomStyle('background')} ${getCustomStyle('border')} ${getCustomStyle('text')}
            `}
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        aria-autocomplete="list"
                    />

                    {/* Icons */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        {(isLoading || asyncLoading) && (
                            <Loader2 className={`${sizeClasses.icon} animate-spin text-gray-400`} />
                        )}

                        {clearable && (inputValue || (isMultiple && selectedValues.length > 0)) && showClear && !disabled && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className={sizeClasses.icon} />
                            </button>
                        )}

                        {showIcon && (
                            <ChevronDown
                                className={`
                  ${sizeClasses.icon} text-gray-400 transition-transform
                  ${isOpen ? 'rotate-180' : ''}
                `}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </div>
            )}

            {/* Helper text */}
            {helperText && !error && (
                <p className="text-gray-500 text-xs mt-1">{helperText}</p>
            )}

            {/* Dropdown */}
            {isOpen && !disabled && (
                <div
                    ref={dropdownRef}
                    className={`
            absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto
            shadow-lg rounded-lg border
            ${themeColors.dropdownBackground} ${themeColors.dropdownBorder}
            ${sizeClasses.dropdown}
          `}
                    role="listbox"
                >
                    {(isLoading || asyncLoading) ? (
                        <div className={`${sizeClasses.option} text-center ${themeColors.noResultsText}`}>
                            <Loader2 className="w-4 h-4 mx-auto animate-spin" />
                            <div className="mt-1">{loadingText}</div>
                        </div>
                    ) : displayOptions.length === 0 ? (
                        <div className={`${sizeClasses.option} text-center ${themeColors.noResultsText} ${getCustomStyle('noResultsText')}`}>
                            {inputValue.length < minInputLength
                                ? `Type at least ${minInputLength} characters to search`
                                : noResultsText
                            }
                        </div>
                    ) : (
                        Object.entries(groupedOptions).map(([group, groupOptions]) => (
                            <div key={group}>
                                {group && (
                                    <div className={`px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0`}>
                                        {group}
                                    </div>
                                )}
                                {groupOptions.map((option, index) => {
                                    const globalIndex = displayOptions.findIndex(o => o.value === option.value);
                                    const isSelected = globalIndex === selectedIndex;
                                    const isMultiSelected = isMultiple && selectedValues.some(v => v.value === option.value);

                                    return (
                                        <button
                                            key={`${option.value}-${index}`}
                                            type="button"
                                            onClick={() => handleOptionClick(option)}
                                            disabled={option.disabled}
                                            className={`
                        w-full text-left transition-colors
                        ${sizeClasses.option}
                        ${option.disabled
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'cursor-pointer hover:' + themeColors.hoveredOption
                                                }
                        ${isSelected ? themeColors.selectedOption + ' ' + getCustomStyle('selectedOption') : ''}
                        ${isMultiSelected && !isSelected ? 'bg-blue-50' : ''}
                      `}
                                            role="option"
                                            aria-selected={isSelected}
                                        >
                                            {renderOptionContent(option)}
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Autocomplete;
