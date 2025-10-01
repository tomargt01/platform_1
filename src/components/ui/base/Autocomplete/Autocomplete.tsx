'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    ChevronDown,
    X,
    Check,
    Loader2,
    AlertCircle,
} from 'lucide-react';
import { AutocompleteProps, AutocompleteOption } from './Autocomplete.types';
import { getSizeClasses } from './Autocomplete.styles';
import { useAutocompleteLogic, useAsyncOptions } from './Autocomplete.hooks';

const Autocomplete: React.FC<AutocompleteProps> = ({
    options = [],
    onInputChange,
    onFocus,
    onBlur,
    onSelect,
    size = 'md',
    intent = 'primary',
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
    ...props
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selectedValues, setSelectedValues] = useState<AutocompleteOption[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const sizeClasses = getSizeClasses(size);

    const isMultiple = 'multiple' in props && props.multiple;
    const value = 'value' in props ? props.value : undefined;
    const onChange = 'onChange' in props ? props.onChange : undefined;

    const {
        inputValue,
        setInputValue,
        isOpen,
        setIsOpen,
        selectedIndex,
        setSelectedIndex,
        filteredOptions,
        handleKeyDown,
    } = useAutocompleteLogic(options, filterType, maxResults);

    const { asyncOptions, isLoading: asyncLoading, loadOptions } = useAsyncOptions(
        onLoadOptions,
        minInputLength
    );

    useEffect(() => {
        if (isMultiple && value) {
            setSelectedValues(value as AutocompleteOption[]);
        }
    }, [isMultiple, value]);

    useEffect(() => {
        if (!isMultiple && value) {
            if (typeof value === 'object' && value !== null) {
                setInputValue((value as AutocompleteOption).label);
            } else if (value !== null) {
                setInputValue(String(value));
            }
        }
    }, [isMultiple, value]);

    const displayOptions = useMemo(() => {
        return onLoadOptions ? asyncOptions : filteredOptions;
    }, [onLoadOptions, asyncOptions, filteredOptions]);

    const groupedOptions = useMemo(() => {
        if (!groupBy) return { '': displayOptions };
        return displayOptions.reduce((groups, option) => {
            const group = String((option as any)[groupBy] || '');
            if (!groups[group]) groups[group] = [];
            groups[group].push(option);
            return groups;
        }, {} as Record<string, AutocompleteOption[]>);
    }, [displayOptions, groupBy]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSelectedIndex(-1);
            }
        };

        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, setIsOpen, setSelectedIndex]);

    useEffect(() => {
        if (onLoadOptions && inputValue.length >= minInputLength) {
            const timeoutId = setTimeout(() => loadOptions(inputValue), 300);
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
            (onChange as any)?.(newSelectedValues, option);
        } else {
            setInputValue(option.label);
            setIsOpen(false);
            (onChange as any)?.(option, option);
            onSelect?.(option);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setSelectedValues([]);
        if (isMultiple) {
            (onChange as any)?.([]);
        } else {
            (onChange as any)?.(null);
        }
        inputRef.current?.focus();
    };

    const handleKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const selectedOption = handleKeyDown(e);
        if (selectedOption) handleOptionClick(selectedOption);
    };

    const getCustomStyle = (type: string) => {
        if (!customColors) return '';
        return (customColors as any)[type] || '';
    };

    const renderOptionContent = (option: AutocompleteOption) => {
        if (renderOption) return renderOption(option);
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
                <label className="block text-sm font-medium mb-1 text-[var(--text)]">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {isMultiple && selectedValues.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2 p-[var(--pad8px)] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]">
                        {selectedValues.map((value, index) => (
                            <span
                                key={`${value.value}-${index}`}
                                className="inline-flex items-center gap-1 px-[var(--pad8px)] py-[var(--pad4px)] text-xs rounded-[var(--radius-sm)] bg-[var(--primary)] text-white"
                            >
                                {value.label}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newValues = selectedValues.filter((_, i) => i !== index);
                                        setSelectedValues(newValues);
                                        (onChange as any)?.(newValues);
                                    }}
                                    className="hover:opacity-75 ml-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
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
                        className={`w-full rounded-lg border outline-none transition-all
              bg-[var(--background)] border-[var(--border)]
              text-[var(--text)] placeholder-[var(--placeholder)]
              ${sizeClasses.input}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500' : ''}
              ${isFocused ? 'ring-2 ring-opacity-50' : ''}
              ${showIcon || (clearable && inputValue) ? 'pr-10' : ''}
              ${getCustomStyle('background')} ${getCustomStyle('border')} ${getCustomStyle('text')}`}
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        aria-autocomplete="list"
                    />
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
                                className={`${sizeClasses.icon} text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </div>
            )}

            {helperText && !error && (
                <p className="text-gray-500 text-xs mt-1">{helperText}</p>
            )}

            {isOpen && !disabled && (
                <div
                    ref={dropdownRef}
                    className={`absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto shadow-lg rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--dropdown-bg)] text-[var(--text)] ${sizeClasses.dropdown}`}
                    role="listbox"
                >
                    {(isLoading || asyncLoading) ? (
                        <div className={`${sizeClasses.option} text-center text-[var(--no-result-text)]`}>
                            <Loader2 className="w-4 h-4 mx-auto animate-spin" />
                            <div className="mt-1">{loadingText}</div>
                        </div>
                    ) : displayOptions.length === 0 ? (
                        <div className={`${sizeClasses.option} text-center text-[var(--no-result-text)] ${getCustomStyle('noResultsText')}`}>
                            {inputValue.length < minInputLength
                                ? `Type at least ${minInputLength} characters to search`
                                : noResultsText
                            }
                        </div>
                    ) : (
                        Object.entries(groupedOptions).map(([group, groupOptions]) => (
                            <div key={group}>
                                {group && (
                                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
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
                                            className={`w-full text-left transition-colors ${sizeClasses.option} ${option.disabled
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'cursor-pointer hover:bg-[var(--hover-bg)]'
                                                } ${isSelected ? 'bg-[var(--selected-bg)] text-white' : ''} ${isMultiSelected && !isSelected ? 'bg-blue-50' : ''
                                                }`}
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
