import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Checkbox } from '../CheckBox';
import { SelectProps, SelectOption, OptionGroup, Option } from './Select.types';
import { THEME_STYLES } from './Select.styles';

function isOptionGroup(item: SelectOption): item is OptionGroup {
    return item.type === "group";
}

const Select: React.FC<SelectProps> = ({
    options,
    multiple = false,
    searchable = false,
    theme = 'light',
    selectedValues,
    onChange,
    placeholder = 'Select...',
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;

        if (options.some(isOptionGroup)) {
            return options
                .map(item => {
                    if (isOptionGroup(item)) {
                        return {
                            ...item,
                            options: item.options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase())),
                        };
                    }
                    return item;
                })
                .filter(item => !isOptionGroup(item) || item.options.length > 0);
        }

        return (options as Option[]).filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [options, searchTerm]);

    const isOptionSelected = useCallback((value: string) => selectedValues.includes(value), [selectedValues]);

    const toggleOption = (value: string) => {
        if (multiple) {
            if (isOptionSelected(value)) {
                onChange(selectedValues.filter(v => v !== value));
            } else {
                onChange([...selectedValues, value]);
            }
        } else {
            onChange([value]);
            setIsOpen(false);
        }
    };

    // Handles toggle only via checkbox on group to avoid event conflicts
    const toggleGroup = (group: OptionGroup) => {
        const groupValues = group.options.map(o => o.value);
        const isAllSelected = groupValues.every(v => selectedValues.includes(v));
        if (isAllSelected) {
            onChange(selectedValues.filter(v => !groupValues.includes(v)));
        } else {
            onChange([...new Set([...selectedValues, ...groupValues])]);
        }
    };

    const renderSelectedValues = () => {
        if (selectedValues.length === 0) return placeholder;
        const allOptions = options.reduce<Option[]>((all, o) => {
            if (isOptionGroup(o)) {
                return [...all, ...o.options];
            }
            return [...all, o];
        }, []);
        const selectedLabels = allOptions.filter(opt => selectedValues.includes(opt.value)).map(opt => opt.label);
        return selectedLabels.join(', ');
    };

    const themeStyles = THEME_STYLES[theme];

    return (
        <div className={`relative w-full ${className ?? ''}`} ref={containerRef}>
            {/* Input box */}
            <div
                className={`cursor-pointer rounded border px-3 py-2 flex items-center justify-between ${themeStyles.inputBg} ${themeStyles.inputText}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="truncate" title={renderSelectedValues()}>
                    {renderSelectedValues()}
                </div>
                <div>
                    <svg
                        className={`w-4 h-4 ml-2 ${themeStyles.inputText}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Dropdown options */}
            {isOpen && (
                <div
                    className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded border shadow-lg ${themeStyles.optionBg} ${themeStyles.optionText}`}
                >
                    {/* Search Input */}
                    {searchable && (
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className={`w-full px-3 py-2 border-b ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none`}
                        />
                    )}

                    {/* Options List */}
                    {filteredOptions.map(item => {
                        if (isOptionGroup(item)) {
                            // Group header with checkbox - prevent opening/closing dropdown when clicking checkbox
                            return (
                                <div key={item.groupName} className="p-2 border-b last:border-b-0">
                                    <div className="font-semibold flex items-center mb-1">
                                        <Checkbox
                                            checked={item.options.every(opt => isOptionSelected(opt.value))}
                                            onChange={() => toggleGroup(item)}
                                            label={item.groupName}
                                        />
                                    </div>
                                    <div className="pl-6 flex flex-col space-y-1 max-h-40 overflow-auto">
                                        {item.options.map(opt => (
                                            <div
                                                key={opt.value}
                                                className={`flex items-center cursor-pointer rounded px-1 py-0.5 hover:bg-gray-100 ${isOptionSelected(opt.value) ? 'bg-gray-200' : ''
                                                    }`}
                                                onClick={() => toggleOption(opt.value)}
                                            >
                                                {multiple && (
                                                    <Checkbox checked={isOptionSelected(opt.value)} onChange={() => toggleOption(opt.value)} />
                                                )}
                                                {opt.icon && <span className="ml-2">{opt.icon}</span>}
                                                <span className="ml-2 truncate">{opt.label}</span>
                                                {isOptionSelected(opt.value) && (
                                                    <svg
                                                        className="w-4 h-4 ml-auto text-green-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // Single option case
                        return (
                            <div
                                key={item.value}
                                className={`flex items-center cursor-pointer rounded px-3 py-2 hover:bg-gray-100 ${isOptionSelected(item.value) ? 'bg-gray-200' : ''
                                    }`}
                                onClick={() => toggleOption(item.value)}
                            >
                                {multiple && <Checkbox checked={isOptionSelected(item.value)} onChange={() => toggleOption(item.value)} />}
                                {item.icon && <span className="ml-2">{item.icon}</span>}
                                <span className="ml-2 truncate">{item.label}</span>
                                {isOptionSelected(item.value) && (
                                    <svg
                                        className="w-4 h-4 ml-auto text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Select;
