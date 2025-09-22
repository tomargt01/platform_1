import { useState, useEffect, useCallback, useMemo } from 'react';
import { AutocompleteOption, FilterType } from './Autocomplete.types';

export const useAutocompleteLogic = (
    options: AutocompleteOption[] | string[],
    filterType: FilterType = 'contains',
    maxResults?: number
) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Normalize options to consistent format
    const normalizedOptions = useMemo(() => {
        return options.map((option, index) => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option,
                    index
                };
            }
            return { ...option, index };
        });
    }, [options]);

    // Filter options based on input
    const filteredOptions = useMemo(() => {
        if (!inputValue.trim()) return normalizedOptions;

        const filtered = normalizedOptions.filter(option => {
            const label = option.label.toLowerCase();
            const input = inputValue.toLowerCase();

            switch (filterType) {
                case 'startsWith':
                    return label.startsWith(input);
                case 'endsWith':
                    return label.endsWith(input);
                case 'contains':
                default:
                    return label.includes(input);
            }
        });

        return maxResults ? filtered.slice(0, maxResults) : filtered;
    }, [normalizedOptions, inputValue, filterType, maxResults]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredOptions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
                    return filteredOptions[selectedIndex];
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                break;
        }
        return null;
    }, [isOpen, selectedIndex, filteredOptions]);

    return {
        inputValue,
        setInputValue,
        isOpen,
        setIsOpen,
        selectedIndex,
        setSelectedIndex,
        filteredOptions,
        handleKeyDown
    };
};

// Hook for async data loading
export const useAsyncOptions = (
    onLoadOptions?: (inputValue: string) => Promise<AutocompleteOption[]>,
    minInputLength: number = 1
) => {
    const [asyncOptions, setAsyncOptions] = useState<AutocompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadOptions = useCallback(async (inputValue: string) => {
        if (!onLoadOptions || inputValue.length < minInputLength) {
            setAsyncOptions([]);
            return;
        }

        setIsLoading(true);
        try {
            const options = await onLoadOptions(inputValue);
            setAsyncOptions(options);
        } catch (error) {
            console.error('Error loading options:', error);
            setAsyncOptions([]);
        } finally {
            setIsLoading(false);
        }
    }, [onLoadOptions, minInputLength]);

    return { asyncOptions, isLoading, loadOptions };
};
