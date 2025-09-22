export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type AutocompleteSize = "sm" | "md" | "lg";
export type FilterType = "contains" | "startsWith" | "endsWith";

export interface AutocompleteOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    group?: string;
    icon?: React.ReactNode;
    description?: string;
}

export interface CustomColors {
    background?: string;
    border?: string;
    text?: string;
    placeholder?: string;
    selectedOption?: string;
    hoveredOption?: string;
    dropdownBackground?: string;
    dropdownBorder?: string;
    noResultsText?: string;
}

// Base interface with common properties
interface BaseAutocompleteProps {
    // Data props
    options: AutocompleteOption[] | string[];

    // Event handlers  
    onInputChange?: (inputValue: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSelect?: (option: AutocompleteOption) => void;

    // Styling props
    theme?: Theme;
    size?: AutocompleteSize;
    customColors?: CustomColors;
    className?: string;

    // Configuration props
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    clearable?: boolean;
    freeSolo?: boolean;

    // Search & filtering
    filterType?: FilterType;
    minInputLength?: number;
    maxResults?: number;
    noResultsText?: string;
    loadingText?: string;

    // Async data loading
    isLoading?: boolean;
    onLoadOptions?: (inputValue: string) => Promise<AutocompleteOption[]>;

    // UI customization
    label?: string;
    error?: string;
    helperText?: string;
    showIcon?: boolean;
    showClear?: boolean;

    // Advanced features
    groupBy?: string;
    renderOption?: (option: AutocompleteOption) => React.ReactNode;
    renderInput?: (params: any) => React.ReactNode;

    // Accessibility
    'aria-label'?: string;
    'aria-describedby'?: string;
}

// Single selection interface
export interface SingleAutocompleteProps extends BaseAutocompleteProps {
    multiple?: false;
    value?: string | number | AutocompleteOption | null;
    defaultValue?: string | number | AutocompleteOption | null;
    onChange?: (value: AutocompleteOption | string | null, option?: AutocompleteOption) => void;
}

// Multiple selection interface
export interface MultipleAutocompleteProps extends BaseAutocompleteProps {
    multiple: true;
    value?: AutocompleteOption[];
    defaultValue?: AutocompleteOption[];
    onChange?: (value: AutocompleteOption[], lastSelected?: AutocompleteOption) => void;
}

// Union type for the main component
export type AutocompleteProps = SingleAutocompleteProps | MultipleAutocompleteProps;
