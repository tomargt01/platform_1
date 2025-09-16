import { ReactNode } from 'react';

export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type DropdownSize = "sm" | "md" | "lg";
export type DropdownVariant = "menu" | "select" | "multiselect";

export interface DropdownOption {
    id: string | number;
    label: string;
    value: string | number;
    icon?: ReactNode;
    disabled?: boolean;
    description?: string;
    category?: string;
}

export interface CustomColors {
    background?: string;
    border?: string;
    text?: string;
    hoverBackground?: string;
    hoverText?: string;
    selectedBackground?: string;
    selectedText?: string;
    disabledText?: string;
    iconColor?: string;
    separatorColor?: string;
}

export interface BaseDropdownProps {
    theme?: Theme;
    size?: DropdownSize;
    customColors?: CustomColors;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    error?: string;
    label?: string;
    required?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    loading?: boolean;
    maxHeight?: string;
}

// Fixed: Made trigger optional with default
export interface DropdownMenuProps extends BaseDropdownProps {
    trigger?: ReactNode; // Made optional
    options: DropdownOption[];
    onOptionClick?: (option: DropdownOption) => void;
    showIcons?: boolean;
    showDescriptions?: boolean;
    groupByCategory?: boolean;
}

export interface DropdownSelectProps extends BaseDropdownProps {
    options: DropdownOption[];
    value?: string | number | null;
    onChange: (value: string | number | null) => void;
    showIcons?: boolean;
}

// Fixed: Added groupByCategory
export interface DropdownMultiSelectProps extends BaseDropdownProps {
    options: DropdownOption[];
    value?: (string | number)[];
    onChange: (value: (string | number)[]) => void;
    showIcons?: boolean;
    maxSelectedShow?: number;
    selectAllOption?: boolean;
    groupByCategory?: boolean; // Added this
}
