'use client';

import React, { useState } from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import { Calendar, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface DateRangePopoverProps extends Omit<BasePopoverProps, 'children'> {
    startDate?: Date | null;
    endDate?: Date | null;
    onChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
    presets?: Array<{
        label: string;
        getValue: () => { startDate: Date; endDate: Date };
    }>;
    showPresets?: boolean;
    minDate?: Date;
    maxDate?: Date;
    children: React.ReactNode;
}

const DateRangePopover: React.FC<DateRangePopoverProps> = ({
    startDate,
    endDate,
    onChange,
    presets,
    showPresets = true,
    minDate,
    maxDate,
    children,
    ...popoverProps
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const defaultPresets = [
        {
            label: 'Today',
            getValue: () => {
                const today = new Date();
                return { startDate: today, endDate: today };
            }
        },
        {
            label: 'Yesterday',
            getValue: () => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return { startDate: yesterday, endDate: yesterday };
            }
        },
        {
            label: 'Last 7 Days',
            getValue: () => {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 6);
                return { startDate: start, endDate: end };
            }
        },
        {
            label: 'Last 30 Days',
            getValue: () => {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 29);
                return { startDate: start, endDate: end };
            }
        },
        {
            label: 'This Month',
            getValue: () => {
                const now = new Date();
                const start = new Date(now.getFullYear(), now.getMonth(), 1);
                const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                return { startDate: start, endDate: end };
            }
        },
        {
            label: 'Last Month',
            getValue: () => {
                const now = new Date();
                const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const end = new Date(now.getFullYear(), now.getMonth(), 0);
                return { startDate: start, endDate: end };
            }
        }
    ];

    const finalPresets = presets || defaultPresets;

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newMonth = new Date(currentMonth);
        if (direction === 'prev') {
            newMonth.setMonth(newMonth.getMonth() - 1);
        } else {
            newMonth.setMonth(newMonth.getMonth() + 1);
        }
        setCurrentMonth(newMonth);
    };

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const isCurrentMonth = date.getMonth() === month;
            const isToday = date.getTime() === today.getTime();
            const isDisabled =
                (minDate && date < minDate) ||
                (maxDate && date > maxDate);

            const isStart = startDate && date.getTime() === startDate.getTime();
            const isEnd = endDate && date.getTime() === endDate.getTime();
            const isInRange = startDate && endDate && date >= startDate && date <= endDate;
            const isHoverInRange = startDate && !endDate && hoverDate &&
                ((date >= startDate && date <= hoverDate) || (date <= startDate && date >= hoverDate));

            days.push({
                date,
                isCurrentMonth,
                isToday,
                isDisabled,
                isStart,
                isEnd,
                isInRange,
                isHoverInRange,
            });
        }

        return days;
    };

    const handleDateClick = (date: Date) => {
        if (!startDate || (startDate && endDate)) {
            // Start new selection
            onChange?.({ startDate: date, endDate: null });
        } else if (startDate && !endDate) {
            // Complete the range
            if (date >= startDate) {
                onChange?.({ startDate, endDate: date });
            } else {
                onChange?.({ startDate: date, endDate: startDate });
            }
        }
    };

    const handlePresetClick = (preset: typeof finalPresets[0]) => {
        const { startDate: start, endDate: end } = preset.getValue();
        onChange?.({ startDate: start, endDate: end });
    };

    const formatDateRange = () => {
        if (!startDate && !endDate) return 'Select date range';
        if (startDate && !endDate) return `${startDate.toLocaleDateString()} - ...`;
        if (!startDate && endDate) return `... - ${endDate.toLocaleDateString()}`;
        return `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`;
    };

    return (
        <BasePopover {...popoverProps} size="xl" className="p-0">
            <div className="flex">
                {/* Presets Sidebar */}
                {showPresets && (
                    <div className="w-48 bg-gray-50 p-4 border-r">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Select</h4>
                        <div className="space-y-1">
                            {finalPresets.map((preset, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePresetClick(preset)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-colors"
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Calendar */}
                <div className="flex-1 p-4 min-w-80">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <CalendarDays className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold">Select Date Range</h3>
                        </div>
                    </div>

                    {/* Selected Range Display */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">
                            {formatDateRange()}
                        </p>
                    </div>

                    {/* Calendar Navigation */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => navigateMonth('prev')}
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <h4 className="text-lg font-semibold">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h4>

                        <button
                            onClick={() => navigateMonth('next')}
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays().map((day, index) => (
                            <button
                                key={index}
                                onClick={() => !day.isDisabled && handleDateClick(day.date)}
                                onMouseEnter={() => setHoverDate(day.date)}
                                onMouseLeave={() => setHoverDate(null)}
                                disabled={day.isDisabled}
                                className={`
                  w-10 h-10 text-sm rounded-md transition-all flex items-center justify-center
                  ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${day.isStart || day.isEnd
                                        ? 'bg-blue-600 text-white font-semibold'
                                        : day.isInRange || day.isHoverInRange
                                            ? 'bg-blue-100 text-blue-800'
                                            : day.isToday
                                                ? 'bg-gray-100 text-gray-900 font-medium'
                                                : 'hover:bg-gray-100'
                                    }
                  ${day.isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                `}
                            >
                                {day.date.getDate()}
                            </button>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <button
                            onClick={() => onChange?.({ startDate: null, endDate: null })}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Clear
                        </button>

                        <div className="text-xs text-gray-500">
                            {startDate && !endDate && 'Click another date to complete range'}
                            {!startDate && !endDate && 'Click a date to start selecting range'}
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </BasePopover>
    );
};

export default DateRangePopover;
