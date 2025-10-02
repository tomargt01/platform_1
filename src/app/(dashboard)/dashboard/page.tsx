"use client";
import React, { useState } from "react";
import { Checkbox } from "#/components/ui/base/CheckBox";
import ThemeSwitcher from "#/components/ThemeSwitcher";
import { cn } from "#/lib/utils/cn";

// Import the correct types if needed
import type { Intent, VariantSize } from "#/components/ui/base/CheckBox";

export default function CheckboxDashboard() {
    const [value1, setValue1] = useState(false);
    const [value2, setValue2] = useState(true);
    const [intent, setIntent] = useState<Intent>("primary");
    const [variantSize, setVariantSize] = useState<VariantSize>("md");
    const [type, setType] = useState<"standard" | "toggle">("standard");

    const intents: Intent[] = ["primary", "secondary", "ghost", "destructive", "success", "white", "gray", "theme-adaptive"];
    const sizes: VariantSize[] = ["xs", "sm", "md", "lg"];
    const types: ("standard" | "toggle")[] = ["standard", "toggle"];

    return (
        <div className="p-6">
            <h1 className="mb-4 font-bold text-lg">Checkbox Component Dashboard</h1>
            <ThemeSwitcher />

            <div className="mb-4 grid gap-2">
                <div>
                    <label>Intent: </label>
                    <select
                        value={intent}
                        onChange={(e) => setIntent(e.target.value as Intent)}
                        className="border p-1 rounded"
                    >
                        {intents.map((i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Size: </label>
                    <select
                        value={variantSize}
                        onChange={(e) => setVariantSize(e.target.value as VariantSize)}
                        className="border p-1 rounded"
                    >
                        {sizes.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Type: </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as "standard" | "toggle")}
                        className="border p-1 rounded"
                    >
                        {types.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Checkbox
                    label="Checkbox 1"
                    checked={value1}
                    onChange={(e) => setValue1(e.target.checked)}
                    intent={intent}
                    variantSize={variantSize}
                    type={type}
                />

                <Checkbox
                    label="Checkbox 2"
                    checked={value2}
                    onChange={(e) => setValue2(e.target.checked)}
                    intent={intent}
                    variantSize={variantSize}
                    type={type}
                    checkedContent={<span>Checked!</span>}
                    onText="On"
                    offText="Off"
                />
            </div>
        </div>
    );
}
