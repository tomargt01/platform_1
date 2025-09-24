import React from "react";
import { RadioGroupProps, RadioProps } from "./RadioGroup.types";
import { THEME_STYLES, RADIO_SIZE, DOT_SIZE } from "./RadioGroup.styles";
import { joinClass } from "./utilities";

// Single Radio Button Component
export const Radio: React.FC<RadioProps> = ({
    checked, value, label, disabled, onChange, theme = "purple", size = "md", name
}) => {
    const cl = THEME_STYLES[theme];
    return (
        <label
            className={joinClass(
                "inline-flex items-center cursor-pointer select-none group relative",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <span className="sr-only">{label ?? "Radio button"}</span>
            <span
                className={joinClass(
                    "relative flex items-center justify-center",
                    RADIO_SIZE[size]
                )}
            >
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={() => !disabled && onChange(value)}
                    disabled={disabled}
                    className="absolute opacity-0 h-0 w-0 peer"
                />
                <span
                    className={joinClass(
                        "block rounded-full border-2 bg-white transition-all duration-150 box-content",
                        cl.border,
                        RADIO_SIZE[size],
                        "peer-focus-visible:ring-2",
                        cl.focus,
                        // active state
                        "peer-active:ring-2 peer-active:ring-opacity-40 peer-active:ring-offset-2",
                        // animate on select
                        checked
                            ? joinClass(cl.border, "border-2 ring-1 ring-opacity-40", cl.focus)
                            : ""
                    )}
                >
                    {checked && (
                        <span
                            className={joinClass(
                                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                                DOT_SIZE[size],
                                cl.dot
                            )}
                        />
                    )}
                </span>
            </span>
            {label && (
                <span className="ml-2 text-sm">{label}</span>
            )}
        </label>
    );
};

// RadioGroup Component
export const RadioGroup: React.FC<RadioGroupProps> = ({
    name, value, options, onChange, theme = "purple", size = "md", disabled, row, label, className
}) => (
    <div className={joinClass(className)}>
        {label && <div className="mb-1 font-medium">{label}</div>}
        <div className={row ? "flex flex-row gap-6" : "flex flex-col gap-2"}>
            {options.map((option, idx) => (
                <Radio
                    key={option.value}
                    name={name}
                    label={option.label}
                    value={option.value}
                    checked={value === option.value}
                    disabled={disabled || option.disabled}
                    theme={theme}
                    size={size}
                    onChange={onChange}
                />
            ))}
        </div>
    </div>
);
