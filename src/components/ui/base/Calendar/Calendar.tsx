"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "#/lib/utils/cn";
import { calendarVariants, type CalendarVariants } from "./Calendar.styles";
import type { CalendarProps, Event, Deadline, Holiday } from "./Calendar.types";

type CalendarItem = Event | Deadline | Holiday;

export const Calendar = ({
    events = [],
    deadlines = [],
    holidays = [],
    className,
    intent = "primary",
    theme = "light",
    ...props
}: CalendarProps) => {
    const { t } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    // Normalize data to arrays
    const normalizedEvents = Array.isArray(events) ? events : [events];
    const normalizedDeadlines = Array.isArray(deadlines) ? deadlines : [deadlines];
    const normalizedHolidays = Array.isArray(holidays) ? holidays : [holidays];

    // Get days in month
    const daysInMonth = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = lastDay.getDate();
        const startDay = firstDay.getDay();
        return { days, startDay };
    }, [currentDate]);

    const calendarDays = useMemo(() => {
        const days = [];
        const { days: totalDays, startDay } = daysInMonth;
        for (let i = 0; i < startDay; i++) days.push(null);
        for (let day = 1; day <= totalDays; day++) days.push(day);
        return days;
    }, [daysInMonth]);

    const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    // Current date logic (06:32 PM IST, September 14, 2025)
    const today = new Date("2025-09-14T18:32:00+05:30");
    const isToday = (day: number) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return checkDate.toDateString() === today.toDateString();
    };

    const getDayItems = (date: Date) => {
        const dayEvents = normalizedEvents.filter(e => new Date(e.date).toDateString() === date.toDateString());
        const dayDeadlines = normalizedDeadlines.filter(d => new Date(d.date).toDateString() === date.toDateString());
        const dayHolidays = normalizedHolidays.filter(h => new Date(h.date).toDateString() === date.toDateString());
        return { dayEvents, dayDeadlines, dayHolidays };
    };

    const displayDate = hoveredDate || today;
    const { dayEvents, dayDeadlines, dayHolidays } = getDayItems(displayDate);

    const getDayContent = (day: number | null) => {
        if (!day) return null;

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isHovered = hoveredDate && hoveredDate.toDateString() === date.toDateString();
        const { dayEvents: dateEvents, dayDeadlines: dateDeadlines, dayHolidays: dateHolidays } = getDayItems(date);

        const hasEvents = dateEvents.length > 0;
        const hasDeadlines = dateDeadlines.length > 0;
        const hasHolidays = dateHolidays.length > 0;

        // Calculate right offset for circles to avoid overlap
        let offset = 1; // Starting right offset in rem
        const circleSize = "w-2 h-2"; // Circle size
        const offsetIncrement = 3; // Space between circles in rem (2 for circle width + 1 for gap)

        return (
            <div
                className={cn("relative p-1 h-full text-center", isHovered && "bg-[var(--accent)]/10")}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
            >
                <span
                    className={cn(
                        "text-xs font-medium block mb-1",
                        isToday(day) && "bg-[var(--accent)] text-white rounded-full px-2 py-1"
                    )}
                >
                    {day}
                </span>
                <div className="absolute bottom-1 right-1 flex flex-row-reverse gap-1">
                    {hasEvents && (
                        <span className={cn("bg-blue-500 rounded-full", circleSize)} />
                    )}
                    {hasDeadlines && (
                        <span className={cn("bg-yellow-500 rounded-full", circleSize)} />
                    )}
                    {hasHolidays && (
                        <span className={cn("bg-red-500 rounded-full", circleSize)} />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex w-full max-w-6xl mx-auto p-4" {...props}>
            <div className={cn("w-2/3 mr-4 rounded-sm bg-[var(--lightBg)] shadow-lg", className)}>
                <div className="flex items-center justify-between p-4 border-b">
                    <button onClick={goToPreviousMonth} className="p-2 hover:bg-[var(--accent)]/20 rounded" aria-label={t("calendar.previousMonth")}>
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-semibold">
                        {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </h2>
                    <button onClick={goToNextMonth} className="p-2 hover:bg-[var(--accent)]/20 rounded" aria-label={t("calendar.nextMonth")}>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-px">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="bg-[var(--lightBg)] text-center font-medium text-sm p-2">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px min-h-[400px]">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={cn(
                                "bg-[var(--lightBg)] hover:bg-[var(--accent)]/10 transition-colors",
                                day ? "border border-[var(--secondary)]" : "bg-[var(--lightBg)]" // for date-specific border
                            )}
                        >
                            {getDayContent(day)}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px p-2 bg-[var(--lightBg)]">
                    <div className="col-span-7 flex items-center space-x-4 pl-2">
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            <span className="text-sm">Events</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                            <span className="text-sm">Deadlines</span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            <span className="text-sm">Holidays</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-1/3 bg-[var(--lightBg)] p-4 border rounded shadow-lg">
                <h3 className="text-lg font-semibold mb-2">
                    Schedule for {displayDate.toLocaleDateString()}
                </h3>

                {dayEvents.length === 0 && dayDeadlines.length === 0 && dayHolidays.length === 0 ? (
                    <div className="py-1 text-[var(--text)]">No data</div>
                ) : (
                    <>
                        {/* Events */}
                        {dayEvents.length > 0 ? (
                            <div className="mb-2">
                                <h4 className="font-bold text-[var(--blue-500)]">Events</h4>
                                {dayEvents.map((e, idx) => (
                                    <div key={idx} className="py-1 text-[var(--text)]">{e.title}</div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-1 text-[var(--text)]">No events for today</div>
                        )}

                        {/* Deadlines */}
                        {dayDeadlines.length > 0 ? (
                            <div className="mb-2">
                                <h4 className="font-bold text-[var(--yellow-500)]">Deadlines</h4>
                                {dayDeadlines.map((d, idx) => (
                                    <div key={idx} className="py-1 text-[var(--text)]">{d.title}</div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-1 text-[var(--text)]">No deadlines for today</div>
                        )}

                        {/* Holidays */}
                        {dayHolidays.length > 0 ? (
                            <div>
                                <h4 className="font-bold text-[var(--red-500)]">Holidays</h4>
                                {dayHolidays.map((h, idx) => (
                                    <div key={idx} className="py-1 text-[var(--text)]">{`${h.name} (Off)`}</div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-1 text-[var(--text)]">No holidays for today</div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
};

Calendar.displayName = "Calendar";
