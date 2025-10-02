"use client";
import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "#/lib/utils/cn";
import { calendarVariants } from "./Calendar.styles";
import type { CalendarProps, Event, Deadline, Holiday } from "./Calendar.types";

export const Calendar = ({
    events = [],
    deadlines = [],
    holidays = [],
    className,
    intent = "primary",
    ...props
}: CalendarProps) => {
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

    const goToPreviousMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const goToNextMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const today = new Date();
    const isToday = (day: number) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return checkDate.toDateString() === today.toDateString();
    };

    const getDayItems = (date: Date) => {
        const dayEvents = normalizedEvents.filter((e) => new Date(e.date).toDateString() === date.toDateString());
        const dayDeadlines = normalizedDeadlines.filter((d) => new Date(d.date).toDateString() === date.toDateString());
        const dayHolidays = normalizedHolidays.filter((h) => new Date(h.date).toDateString() === date.toDateString());
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

        const circleSize = "w-2 h-2";

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
                    {hasEvents && <span className={cn("bg-blue-500 rounded-full", circleSize)} />}
                    {hasDeadlines && <span className={cn("bg-yellow-500 rounded-full", circleSize)} />}
                    {hasHolidays && <span className={cn("bg-red-500 rounded-full", circleSize)} />}
                </div>
            </div>
        );
    };

    return (
        <div className={cn("flex w-full mx-auto p-[var(--pad12px)]")}>
            <div className={cn(calendarVariants({ intent, className }))}>
                <div className="flex items-center justify-between p-[var(--pad8px)] bg-[var(--lightBg)] border-b border-[var(--borderColor)]">
                    <button
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-[var(--accent)]/20 rounded"
                        aria-label="calendar.previousMonth"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-semibold">
                        {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </h2>
                    <button
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-[var(--accent)]/20 rounded"
                        aria-label="calendar.nextMonth"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-px">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="bg-[var(--lightBg)] text-center font-medium text-sm p-[var(--pad8px)]">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px min-h-[400px]">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={cn(
                                "bg-[var(--lightBg)] hover:bg-[var(--accent)]/10 transition-colors",
                                day ? "border border-[var(--secondary)]" : ""
                            )}
                        >
                            {getDayContent(day)}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px p-[var(--pad8px)] bg-[var(--lightBg)]">
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
            <div className="w-1/4 bg-[var(--lightBg)] p-[var(--pad12px)] ms-2 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">
                    Schedule for {displayDate.toLocaleDateString()}
                </h3>
                {dayEvents.length === 0 && dayDeadlines.length === 0 && dayHolidays.length === 0 ? (
                    <div className="py-1 text-[var(--text)]">No data</div>
                ) : (
                    <>
                        <h4 className="font-bold text-[var(--blue-500)]">Events</h4>
                        {dayEvents.length > 0 ? (
                            <div className="mb-2">
                                {dayEvents.map((e, idx) => (
                                    <div key={idx} className="py-1 text-[var(--text)]">{e.title}</div>
                                ))}
                            </div>
                        ) : (
                        <div className="py-1 text-[var(--text)] font-thin text-sm">No events for today</div>
                        )}
                        <h4 className="font-bold text-[var(--yellow-500)]">Deadlines</h4>
                        {dayDeadlines.length > 0 ? (
                            <div className="mb-2">
                                {dayDeadlines.map((d, idx) => (
                                    <div key={idx} className="py-1 text-[var(--text)]">{d.title}</div>
                                ))}
                            </div>
                        ) : (
                        <div className="py-1 text-[var(--text)] font-thin text-sm">No deadlines for today</div>
                        )}
                        <h4 className="font-bold text-[var(--red-500)]">Holidays</h4>
                        {dayHolidays.length > 0 ? (
                            <div>
                                {dayHolidays.map((h, idx) => (
                                    <div key={idx} className="py-1 text-[var(--text)]">{`${h.name} (Off)`}</div>
                                ))}
                            </div>
                        ) : (
                        <div className="py-1 text-[var(--text)] font-thin text-sm">No holidays for today</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

Calendar.displayName = "Calendar";
