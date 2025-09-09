import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-full font-medium transition-colors border border-[var(--border)]",
    {
        variants: {
            intent: {
                primary: "bg-[var(--primary)] text-[var(--text)]",
                secondary: "bg-[var(--secondary)] text-[var(--text)]",
                ghost: "bg-transparent text-[var(--text)] border-[var(--text)]/20",
                destructive: "bg-red-500 text-white border-red-600",
            },
            size: {
                xs: "px-2 py-0.5 text-xs",
                sm: "px-2.5 py-0.5 text-sm",
                md: "px-3 py-1 text-base",
                lg: "px-4 py-1.5 text-lg",
            },
            theme: {
                light: "",
                dark: "",
                purple: "",
                pink: "",
                green: "",
                blue: "",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
            theme: "light",
        },
    }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
