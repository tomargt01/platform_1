"use client";
import React, { useState } from "react";
import { Button, Theme } from "#/components/ui/base/Button"; // Import Theme type
import { ArrowRight, Loader2 } from "lucide-react";

const Dashboard = () => {
    const [theme, setTheme] = useState<Theme>("light"); // Type theme as Theme

    const handleClick = () => {
        alert("Button clicked!");
    };

    // Theme toggle function
    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>

            {/* Theme Toggle Buttons */}
            <div className="mb-4 space-x-2">
                {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
                    (t) => (
                        <Button
                            key={t}
                            intent="secondary"
                            size="sm"
                            onClick={() => toggleTheme(t)}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </Button>
                    )
                )}
            </div>

            {/* Basic Button */}
            <Button onClick={handleClick}>Click Me</Button>

            {/* Button with Variants */}
            <div className="mt-4 space-y-4">
                <Button intent="primary" size="lg" theme={theme}>
                    Primary Large Button
                </Button>
                <Button intent="secondary" size="md" theme={theme}>
                    Secondary Button
                </Button>
                <Button intent="ghost" size="sm" theme={theme}>
                    Ghost Button
                </Button>
                <Button intent="destructive" size="md" theme={theme}>
                    Destructive Button
                </Button>
                <Button intent="destructive" size="xs" theme={theme}>
                    Small Button
                </Button>
            </div>

            {/* Button with Icons */}
            <div className="mt-4 space-y-4">
                <Button leftIcon={ArrowRight} onClick={handleClick}>
                    Button with Left Icon
                </Button>
                <Button rightIcon={ArrowRight} onClick={handleClick}>
                    Button with Right Icon
                </Button>
            </div>

            {/* Loading and Disabled States */}
            <div className="mt-4 space-y-4">
                <Button loading={true}>Loading Button</Button>
                <Button disabled={true}>Disabled Button</Button>
            </div>
        </div>
    );
};

export default Dashboard;
