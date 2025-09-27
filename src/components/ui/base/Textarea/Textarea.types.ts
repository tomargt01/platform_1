import React from "react";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaRounded = "none" | "soft" | "pill";
export type Resizable = "none" | "vertical" | "horizontal" | "both";
export type TextareaStatus = "default" | "error" | "warning" | "success";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: TextareaSize;
    rounded?: TextareaRounded;
    stretch?: 'yes' | 'no';
    resizable?: Resizable;
    status?: TextareaStatus;
    characterLimit?: number;
    showCharacterCount?: boolean;
    showClear?: boolean;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    errorMessage?: string;
    successMessage?: string;
    warningMessage?: string;
    autoResize?: boolean;
    minRows?: number;
    maxRows?: number;
    spellCheck?: boolean;
    markdown?: boolean;
    syntaxHighlight?: boolean;
    placeholderHint?: string;
    wordCount?: boolean;
    readingTime?: boolean;
    autosaveKey?: string;
    rtl?: boolean;
    theme?: string;
}
