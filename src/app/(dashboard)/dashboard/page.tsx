"use client";
import React, { useState } from "react";
import { DatePicker, DateRangePicker } from '#/components/ui/base/DatePicker';
import { Checkbox } from "#/components/ui/base/CheckBox";
import { Theme } from "#/lib/hooks/useThemeStore";

const Dashboard = () => {

    // Single Date Picker
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Date Range Picker
    const [dateRange, setDateRange] = useState<{ startDate: Date | null, endDate: Date | null }>({
        startDate: null,
        endDate: null
    }); 
    
    const [theme, setTheme] = useState<Theme>("blue");

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

            {/* <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                theme="purple"
                size="md"
                label="Select Date"
                customColors={{
                    selectedDate: 'bg-purple-600 text-white',
                    currentDate: 'bg-purple-100 text-purple-800'
                }}
            /> */}

            <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                theme={theme}
                size="md"
                label="Select Date"
            />

            <DateRangePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={setDateRange}
                theme={theme}
                size="md"
                label="Select Date Range"
            />
        </div>
    );
};

export default Dashboard;
