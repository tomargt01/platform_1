import { cva, type VariantProps } from "class-variance-authority";

export const calendarVariants = cva(
    "rounded-lg shadow-lg overflow-hidden bg-[var(--background)] text-[var(--text)]",
    {
        variants: {
            intent: {
                primary: "border-[var(--primary)]",
                secondary: "border-[var(--secondary)]",
                ghost: "border-transparent",
                destructive: "border-red-500",
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
            theme: "light",
        },
    }
);

export type CalendarVariants = VariantProps<typeof calendarVariants>;
