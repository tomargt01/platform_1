import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils/cn";

export const buttonVariants = cva(
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            intent: {
                primary: "bg-[var(--primary)] text-white hover:bg-[var(--accent)] focus-visible:ring-[var(--primary)]",
                secondary: "bg-[var(--secondary)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white focus-visible:ring-[var(--accent)]",
                ghost: "bg-transparent hover:bg-[var(--accent)]/20 text-[var(--text)] hover:text-white focus-visible:ring-[var(--accent)]",
                destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
                outline: "bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white focus-visible:ring-[var(--primary)]",
            },
            size: {
                xs: "h-6 px-[var(--pad8px)] text-xs",
                sm: "h-9 px-[var(--pad12px)] text-sm",
                md: "h-10 px-[var(--pad16px)] text-base",
                lg: "h-11 px-[var(--pad16px)] text-lg",
            },
            variant: {
                default: "rounded-md",
                pill: "rounded-full",
                square: "rounded-none",
                raised: "shadow-md",
                expandable: "w-full justify-between",
                iconOnly: "p-0 w-auto h-auto rounded-full",
                fullWidth: "w-full justify-between",
            },
        },
        compoundVariants: [
            { variant: "iconOnly", size: "xs", className: "w-6 h-6" },
            { variant: "iconOnly", size: "sm", className: "w-8 h-8" },
            { variant: "iconOnly", size: "md", className: "w-10 h-10" },
            { variant: "iconOnly", size: "lg", className: "w-12 h-12" },
        ],
        defaultVariants: {
            intent: "primary",
            size: "md",
            variant: "default",
        },
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
