export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";

export interface Option {
    type: "option"; // Literal string type
    value: string;
    label: string;
    icon?: React.ReactNode;
}

export interface OptionGroup {
    type: "group"; // Literal string type
    groupName: string;
    options: Option[];
}

export type SelectOption = Option | OptionGroup;

export interface SelectProps {
    options: SelectOption[];
    multiple?: boolean;
    searchable?: boolean;
    theme?: Theme;
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
}
