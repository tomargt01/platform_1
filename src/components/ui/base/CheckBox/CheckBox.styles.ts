import { cva, type VariantProps } from "class-variance-authority";

export const checkboxVariants = cva("", {
    variants: {
        intent: {
            primary: "text-[var(--primary)]",
            secondary: "text-[var(--secondary)]",
            ghost: "text-[var(--text)]",
            destructive: "text-red-500",
            success: "text-green-500 bg-green",
            white: "text-white",
            gray: "text-gray-500",
            "theme-adaptive": "text-[var(--primary)]",
        },
        variantSize: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
        },
        theme: {
            light: `
        --primary: #008000;
        --secondary: #666666;
        --background: #ffffff;
        --border: #cccccc;
        --text: #333333;
      `,
            dark: `
        --primary: #1f2937;
        --secondary: #bbbbbb;
        --background: #1a1a1a;
        --border: #444444;
        --text: #cccccc;#1f2937
      `,
            purple: `
        --primary: #800080;
        --secondary: #d8bfd8;
        --background: #ffffff;
        --border: #a0522d;
        --text: #4b0082;
      `,
            pink: `
        --primary: #ff69b4;
        --secondary: #ffb6c1;
        --background: #ffffff;
        --border: #c71585;
        --text: #ff1493;
      `,
            green: `
        --primary: #008000;
        --secondary: #9acd32;
        --background: #ffffff;
        --border: #228b22;
        --text: #006400;
      `,
            blue: `
        --primary: #0000ff;
        --secondary: #87ceeb;
        --background: #ffffff;
        --border: #1e90ff;
        --text: #00008b;
      `,
        },
        type: {
            standard: "",
            toggle: "",
        },
    },
    defaultVariants: {
        intent: "primary",
        variantSize: "md",
        theme: "light",
        type: "standard",
    },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
