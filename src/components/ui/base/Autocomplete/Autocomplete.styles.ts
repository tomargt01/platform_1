import { AutocompleteSize } from './Autocomplete.types';

export const getSizeClasses = (size: AutocompleteSize) => {
    const sizes = {
        sm: {
            input: 'px-[var(--pad8px)] py-[var(--pad4px)] text-sm',
            option: 'px-[var(--pad8px)] py-[var(--pad4px)] text-sm',
            icon: 'w-4 h-4',
            dropdown: 'text-sm',
        },
        md: {
            input: 'px-[var(--pad12px)] py-[var(--pad8px)] text-base',
            option: 'px-[var(--pad12px)] py-[var(--pad8px)] text-base',
            icon: 'w-5 h-5',
            dropdown: 'text-base',
        },
        lg: {
            input: 'px-[var(--pad16px)] py-[var(--pad12px)] text-lg',
            option: 'px-[var(--pad16px)] py-[var(--pad12px)] text-lg',
            icon: 'w-6 h-6',
            dropdown: 'text-lg',
        },
    };
    return sizes[size];
};
