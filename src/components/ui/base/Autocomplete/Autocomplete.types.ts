export type AutocompleteIntent = "primary" | "secondary" | "ghost" | "destructive" | "success" | "warning";
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

interface BaseAutocompleteProps {
    intent?: AutocompleteIntent;
    size?: AutocompleteSize;
    className?: string;
    options: AutocompleteOption[] | string[];

    onInputChange?: (inputValue: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSelect?: (option: AutocompleteOption) => void;

    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    clearable?: boolean;
    freeSolo?: boolean;

    filterType?: FilterType;
    minInputLength?: number;
    maxResults?: number;
    noResultsText?: string;
    loadingText?: string;

    isLoading?: boolean;
    onLoadOptions?: (inputValue: string) => Promise<AutocompleteOption[]>;

    label?: string;
    error?: string;
    helperText?: string;
    showIcon?: boolean;
    showClear?: boolean;

    groupBy?: string;
    renderOption?: (option: AutocompleteOption) => React.ReactNode;
    renderInput?: (params: any) => React.ReactNode;

    'aria-label'?: string;
    'aria-describedby'?: string;

    customColors?: {
        background?: string;
        border?: string;
        text?: string;
        placeholder?: string;
        selectedOption?: string;
        hoveredOption?: string;
        dropdownBackground?: string;
        dropdownBorder?: string;
        noResultsText?: string;
    };
}

export interface SingleAutocompleteProps extends BaseAutocompleteProps {
    multiple?: false;
    value?: string | number | AutocompleteOption | null;
    defaultValue?: string | number | AutocompleteOption | null;
    onChange?: (value: AutocompleteOption | string | null, option?: AutocompleteOption) => void;
}

export interface MultipleAutocompleteProps extends BaseAutocompleteProps {
    multiple: true;
    value?: AutocompleteOption[];
    defaultValue?: AutocompleteOption[];
    onChange?: (value: AutocompleteOption[], lastSelected?: AutocompleteOption) => void;
}

export type AutocompleteProps = SingleAutocompleteProps | MultipleAutocompleteProps;
