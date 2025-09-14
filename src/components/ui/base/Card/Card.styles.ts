import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
    "rounded-md bg-[var(--background)] border border-[var(--border)]",
    {
        variants: {
            intent: {
                default: "shadow-sm",
                outlined: "border-2 border-[var(--primary)] shadow-none",
                elevated: "shadow-lg",
                count: "shadow-sm flex items-center",
                "two-row": "shadow-sm",
            },
            size: {
                sm: "w-64",
                md: "w-80",
                lg: "w-96",
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
            intent: "default",
            size: "md",
            theme: "light",
        },
    }
);

export type CardVariants = VariantProps<typeof cardVariants>;
