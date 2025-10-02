import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva('', {
    variants: {
        intent: {
            primary: 'text-[var(--primary)]',
            secondary: 'text-[var(--secondary)]',
            ghost: 'text-[var(--text)]',
            destructive: 'text-[var(--destructive)]', // Add --destructive in globals.css
            success: 'text-[var(--success)]',         // Add --success in globals.css
            white: 'text-white',
            gray: 'text-gray-500',
            'theme-adaptive': 'text-[var(--primary)]',
        },
        variantSize: {
            xs: 'text-xs px-[var(--pad8px)] py-[var(--pad4px)]', // Add --pad4px in globals.css
            sm: 'text-sm px-[var(--pad8px)] py-[var(--pad6px)]', // Add --pad6px in globals.css
            md: 'text-base px-[var(--pad12px)] py-[var(--pad8px)]',
            lg: 'text-lg px-[var(--pad12px)] py-[var(--pad10px)]', // Add --pad10px in globals.css
            xl: 'text-xl px-[var(--pad12px)] py-[var(--pad10px)]', // Add --pad10px in globals.css
            xxl: 'text-xxl px-[var(--pad12px)] py-[var(--pad10px)]', // Add --pad10px in globals.css
        },
        type: {
            standard: 'rounded-[var(--radius4px)] border-[var(--1pxSolidBorder)] border-[var(--border)]',
            toggle: 'rounded-full border-[var(--1pxSolidBorder)] border-[var(--border)]',
        },
    },
    defaultVariants: {
        intent: 'primary',
        variantSize: 'md',
        type: 'standard',
    },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
