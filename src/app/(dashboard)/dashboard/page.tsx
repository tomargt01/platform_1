'use client';
import React from 'react';
import ThemeSwitcher from '#/components/ThemeSwitcher';
import { Button, OneButtonMultiFunctional } from '#/components/ui/base/Button';
import { Camera, Home, Mic, Share2 } from "lucide-react";

const ButtonDashboardTest = () => {

    const actions = [
        { icon: <Camera className="w-5 h-5" />, onClick: () => console.log("Camera clicked"), ariaLabel: "Camera" },
        { icon: <Mic className="w-5 h-5" />, onClick: () => console.log("Mic clicked"), ariaLabel: "Microphone" },
        { icon: <Share2 className="w-5 h-5" />, onClick: () => console.log("Share clicked"), ariaLabel: "Share" },
    ];

    return (
        <div
            style={{
                padding: 'var(--pad16px)',
                border: 'var(--border-width) var(--border-style) var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--background)',
                color: 'var(--text)',
                maxWidth: 800,
                margin: 'auto',
                fontFamily: 'sans-serif',
            }}
        >
            <h1 style={{ marginTop: 0 }}>Button Test Dashboard</h1>
            <ThemeSwitcher />

            <section style={{ marginBottom: 'var(--pad16px)' }}>
                <h2>Intents</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pad12px)' }}>
                    <Button intent="primary">Primary</Button>
                    <Button intent="secondary">Secondary</Button>
                    <Button intent="ghost">Ghost</Button>
                    <Button intent="destructive">Destructive</Button>
                    <Button intent="outline">Outline</Button>
                </div>
            </section>

            <section style={{ marginBottom: 'var(--pad16px)' }}>
                <h2>Size Variants</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pad12px)' }}>
                    <Button intent="primary" size="xs">Extra Small</Button>
                    <Button intent="primary" size="sm">Small</Button>
                    <Button intent="primary" size="md">Medium</Button>
                    <Button intent="primary" size="lg">Large</Button>
                </div>
            </section>

            <section style={{ marginBottom: 'var(--pad16px)' }}>
                <h2>Variants</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pad12px)' }}>
                    <Button intent="primary" variant="default">Default</Button>
                    <Button intent="primary" variant="pill">Pill</Button>
                    <Button intent="primary" variant="square">Square</Button>
                    <Button intent="primary" variant="raised">Raised</Button>
                    <Button intent="primary" variant="expandable">Expandable</Button>
                    <Button intent="primary" variant="iconOnly" aria-label="Icon only button">🟢</Button>
                    <OneButtonMultiFunctional
                        mainIcon={<Home className="w-6 h-6" />}
                        actions={actions}
                        direction="top"  // or 'bottom', 'left', 'right'
                        intent="primary"
                        size="md"
                        variant="iconOnly"
                    />
                </div>
                
            </section>
        </div>
    );
};

export default ButtonDashboardTest;
