'use client'

// TooltipsDashboard.tsx
import React from "react";
import {
    Tooltips,
    TooltipPosition,
    TooltipTrigger,
    TooltipSize,
    TooltipTheme,
    TooltipShape,
    TooltipVariant,
} from "#/components/ui/base/Tooltips";

const positions: TooltipPosition[] = [
    "top",
    "bottom",
    "left",
    "right",
    "auto",
];

const triggers: TooltipTrigger[] = ["hover", "click", "focus"];

const sizes: TooltipSize[] = ["sm", "md", "lg"];

const themes: TooltipTheme[] = [
    "light",
    "dark",
    "purple",
    "pink",
    "green",
    "blue",
];

const shapes: TooltipShape[] = ["rounded", "sharp", "pill"];

const variants: TooltipVariant[] = ["flat", "shadow", "bordered"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="flex flex-wrap gap-4">{children}</div>
        </div>
    );
}

export function TooltipsDashboard() {
    return (
        <div className="p-6">
            <Section title="Position Variants">
                {positions.map((pos) => (
                    <Tooltips key={pos} content={`Position: ${pos}`} position={pos}>
                        <button className="btn">{`Hover me (${pos})`}</button>
                    </Tooltips>
                ))}
            </Section>

            <Section title="Trigger Variants">
                {triggers.map((trigger) => (
                    <Tooltips key={trigger} content={`Trigger: ${trigger}`} trigger={trigger}>
                        <button className="btn">{`Trigger: ${trigger}`}</button>
                    </Tooltips>
                ))}
            </Section>

            <Section title="Size Variants">
                {sizes.map((size) => (
                    <Tooltips key={size} content={`Size: ${size}`} size={size}>
                        <button className="btn">{`Size: ${size}`}</button>
                    </Tooltips>
                ))}
            </Section>

            <Section title="Theme Variants">
                {themes.map((theme) => (
                    <Tooltips key={theme} content={`Theme: ${theme}`} theme={theme}>
                        <button className="btn">{`Theme: ${theme}`}</button>
                    </Tooltips>
                ))}
            </Section>

            <Section title="Shape Variants">
                {shapes.map((shape) => (
                    <Tooltips key={shape} content={`Shape: ${shape}`} shape={shape}>
                        <button className="btn">{`Shape: ${shape}`}</button>
                    </Tooltips>
                ))}
            </Section>

            <Section title="Variant Types">
                {variants.map((variant) => (
                    <Tooltips key={variant} content={`Variant: ${variant}`} variant={variant}>
                        <button className="btn">{`Variant: ${variant}`}</button>
                    </Tooltips>
                ))}
            </Section>
        </div>
    );
}

export default TooltipsDashboard;
