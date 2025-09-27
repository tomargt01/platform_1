'use client';

import React, { useState } from "react";
import { TextareaProps } from "./Textarea.types";
import { textareaBase, borderStyles, getRoundedStyle } from "./Textarea.styles";
import { getWordCount, getReadingTime } from "./Textarea.helpers";

// Helper to convert 'yes'/'no' stretch prop to CSS resizable property values
function parseResizable(stretch?: 'yes' | 'no'): 'none' | 'both' {
    if (stretch === 'no') return 'none';    // disables resize
    if (stretch === 'yes') return 'both';   // resize enabled horizontally and vertically
    return 'none';                          // fallback: disable resize
}

// Normalize value for safe string operations
function safeString(value: string | number | readonly string[]): string {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (Array.isArray(value)) return value.join('');
    return '';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
    size = "md",
    rounded = "soft",
    stretch,
    status = "default",
    characterLimit,
    showCharacterCount,
    showClear,
    prefixIcon,
    suffixIcon,
    errorMessage,
    successMessage,
    warningMessage,
    autoResize,
    minRows = 2,
    maxRows = 8,
    spellCheck = true,
    markdown,
    syntaxHighlight,
    placeholder,
    placeholderHint,
    wordCount,
    readingTime,
    autosaveKey,
    rtl,
    theme,
    ...rest
}, ref) => {
    const controlledValue = rest.value ?? rest.defaultValue ?? "";
    const [value, setValue] = useState<string | number | readonly string[]>(controlledValue);

    const resizable = parseResizable(stretch);
    const normalizedValue = safeString(value);

    return (
        <div className={`relative ${rtl ? "text-right" : "text-left"}`}>
            {prefixIcon && <div className="absolute left-2 top-2">{prefixIcon}</div>}

            <textarea
                ref={ref}
                className={`
          ${textareaBase}
          ${getRoundedStyle(rounded)}
          ${borderStyles[status]}
          ${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"}
          ${resizable === "none" ? "resize-none" : "resize"}
          bg-[var(--background)] text-[var(--text)]
          ${rest.disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${rtl ? "dir-rtl" : ""}
        `}
                style={{ minHeight: `${minRows * 1.5}rem`, maxHeight: `${maxRows * 1.5}rem` }}
                spellCheck={spellCheck}
                maxLength={characterLimit}
                aria-label={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                {...rest}
            />

            {suffixIcon && <div className="absolute right-2 top-2">{suffixIcon}</div>}

            {showClear && normalizedValue && (
                <button className="absolute top-2 right-8 text-gray-500" type="button" onClick={() => setValue("")}>×</button>
            )}

            {showCharacterCount && characterLimit && (
                <div className="text-xs mt-1 text-gray-400">{normalizedValue.length}/{characterLimit}</div>
            )}

            {wordCount && (
                <div className="text-xs mt-1 text-gray-400">Words: {getWordCount(normalizedValue)}</div>
            )}

            {readingTime && (
                <div className="text-xs mt-1 text-gray-400">Reading time: {getReadingTime(normalizedValue)} min</div>
            )}

            {status === "error" && errorMessage && (
                <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
            )}
            {status === "warning" && warningMessage && (
                <div className="text-yellow-500 text-xs mt-1">{warningMessage}</div>
            )}
            {status === "success" && successMessage && (
                <div className="text-green-500 text-xs mt-1">{successMessage}</div>
            )}

            {placeholderHint && (
                <div className="text-xs text-gray-400 mt-1">{placeholderHint}</div>
            )}
        </div>
    );
});
