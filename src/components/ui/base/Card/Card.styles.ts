import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
    `
    rounded-[var(--radius8px)]
    bg-[var(--background)]
    [border:var(--1pxSolidBorder)_var(--borderColor)]
    color-[var(--text)]
`,
    {
        variants: {
            intent: {
                default: "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
                outlined: "[border:var(--borderWidth)_solid_var(--primary)] shadow-none",
                elevated: "shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]",
                count: "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] flex items-center",
                twoRow: "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
            },
            size: {
                sm: "w-[256px]",
                md: "w-[320px]",
                lg: "w-[384px]",
            },
        },
        defaultVariants: {
            intent: "default",
            size: "md",
        },
    }
);

export type CardVariants = VariantProps<typeof cardVariants>;
