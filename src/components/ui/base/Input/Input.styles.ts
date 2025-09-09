import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils/cn";

export const inputVariants = cva(
    "w-full rounded-md border border-solid !border-1 bg-white text-gray-800 transition-all duration-200 focus:outline-none ring-0 active:ring-0 hover:ring-0 focus:ring-0",
    {
        variants: {
            intent: {
                primary: "border-blue-500",
                secondary: "border-gray-400",
                ghost: "border-transparent bg-transparent",
                destructive: "border-red-500",
            },
            inputSize: {
                xs: "h-6 px-2 text-xs",
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4 text-base",
                lg: "h-12 px-5 text-lg",
            },
            theme: {
                light: "bg-white text-gray-800",
                dark: "bg-gray-800 text-gray-100",
                purple: "bg-white text-gray-800",
                pink: "bg-white text-gray-800",
                green: "bg-white text-gray-800",
                blue: "bg-white text-gray-800",
            },
            focused: {
                true: "!border-2",
                false: "!border-1",
            },
        },
        defaultVariants: {
            intent: "primary",
            inputSize: "md",
            theme: "light",
            focused: false,
        },
    }
);

export type InputVariants = VariantProps<typeof inputVariants>;
