"use client";
import React, { useState } from "react";
import { Checkbox, Theme } from "#/components/ui/base/CheckBox";

const Dashboard = () => {
    const [theme, setTheme] = useState<Theme>("blue"); // Test with blue theme
    const [isChecked, setIsChecked] = useState(false);
    const [isYChecked, setIsYChecked] = useState(false);

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Checkbox Component Test</h1>

            <div className="mb-4 space-y-2">
                {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
                    (t) => (
                        <Checkbox
                            key={t}
                            intent="secondary"
                            variantSize="sm"
                            label={t.charAt(0).toUpperCase() + t.slice(1)}
                            onChange={() => toggleTheme(t)}
                        />
                    )
                )}
            </div>

            <Checkbox
                type="toggle"
                intent="success"
                theme={theme}
                label="Success Toggle (YES/NO)"
                onChange={(e) => setIsYChecked(e.target.checked)}
                checked={isYChecked}
                onText="YES"
                offText="NO"
            />

            <Checkbox
                type="toggle"
                intent="destructive"
                theme={theme}
                label="Destructive Toggle (✓/✕)"
                onChange={(e) => setIsChecked(e.target.checked)}
                checked={isChecked}
                onText="✓"
                offText="✕"
            />

            <Checkbox
                type="toggle"
                intent="white"
                theme={theme}
                label="White Toggle (ON/OFF)"
                onChange={(e) => setIsChecked(e.target.checked)}
                checked={isChecked}
                onText="ON"
                offText="OFF"
            />
        </div>
    );
};

export default Dashboard;
