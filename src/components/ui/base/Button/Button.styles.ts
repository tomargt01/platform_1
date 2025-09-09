import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils/cn";

export const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            intent: {
                primary: "bg-[var(--primary)] text-white hover:bg-[var(--accent)]",
                secondary: "bg-[var(--secondary)] text-[var(--text)] hover:bg-[var(--accent)]",
                ghost: "bg-transparent hover:bg-[var(--accent)]/20 text-[var(--text)]",
                destructive: "bg-red-500 text-white hover:bg-red-600",
            },
            size: {
                xs: "h-6 px-2 text-xs",
                sm: "h-9 px-3 text-sm",
                md: "h-10 px-4 text-base",
                lg: "h-11 px-6 text-lg",
            },
            theme: {
                light: "", // CSS variables handle styling
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

export type ButtonVariants = VariantProps<typeof buttonVariants>;
