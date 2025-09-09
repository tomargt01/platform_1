import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
    "p-5 rounded-lg border-2 border-[var(--border)] shadow-lg transition-all duration-200",
    {
        variants: {
            variant: {
                error: "bg-red-50 text-red-900 border-red-500",
                warning: "bg-yellow-50 text-yellow-900 border-yellow-500",
                info: "bg-blue-50 text-blue-900 border-blue-500",
                critical:
                    "bg-red-100 text-red-900 border-red-700 ring-2 ring-red-500/30",
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
            variant: "info",
            theme: "light",
        },
    }
);

export type AlertVariants = VariantProps<typeof alertVariants>;
