import { cva, type VariantProps } from "class-variance-authority";

export const toastVariants = cva("p-3 rounded-lg border shadow-lg", {
    variants: {
        variant: {
            info: "",
            success: "",
            inProgress: "",
            error: "",
        },
        theme: {
            light: "bg-white text-black border-gray-300",
            dark: "bg-gray-800 text-white border-gray-600",
            purple: "bg-purple-100 text-purple-800 border-purple-300",
            pink: "bg-pink-100 text-pink-800 border-pink-300",
            green: "bg-green-100 text-green-800 border-green-300",
            blue: "bg-blue-100 text-blue-800 border-blue-300",
        },
    },
    defaultVariants: {
        variant: "info",
        theme: "light",
    },
});
export type ToastVariants = VariantProps<typeof toastVariants>;
