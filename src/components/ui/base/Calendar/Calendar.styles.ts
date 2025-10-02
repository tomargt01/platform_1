import { cva, type VariantProps } from "class-variance-authority";

export const calendarVariants = cva(
    "shadow-lg overflow-hidden bg-[var(--background)] text-[var(--text)] border-none w-5/12",
    {
        variants: {
            intent: {
                primary: "border-[var(--primary)]",
                secondary: "border-[var(--secondary)]",
                ghost: "border-transparent",
                destructive: "border-red-500",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
);

export type CalendarVariants = VariantProps<typeof calendarVariants>;
