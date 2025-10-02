'use client';
import React from 'react';
import ThemeSwitcher from '#/components/ThemeSwitcher';
import { Calendar, Deadline, Event, Holiday } from '#/components/ui/base/Calendar';

const CalendarDashboardTest = () => {

    const events: Event[] = [
        { date: "2025-10-01", title: "Board Meeting" },
        { date: "2025-10-15", title: "Training Session" },
        { date: "2025-10-22", title: "Parent-Teacher" },
        { date: "2025-10-10", title: "Gandhi Jayanti" },
    ];

    const deadlines: Deadline[] = [
        { date: "2025-10-05", title: "Fee Submission" },
        { date: "2025-10-18", title: "Exam Papers" },
    ];

    const holidays: Holiday[] = [
        { date: "2025-10-10", name: "Gandhi Jayanti" },
        { date: "2025-10-26", name: "Diwali" },
    ];

    return (
        <div>
            <h1 style={{ marginTop: 0 }}>Calendar Test Dashboard</h1>
            <ThemeSwitcher />
            <Calendar
                events={events}
                deadlines={deadlines}
                holidays={holidays}
                intent="primary"
                columns={7}
            />
        </div>
    );
};

export default CalendarDashboardTest;
