'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { SingleDatePickerProps } from './DatePicker.types';
import { getThemeColors, getSizeClasses } from './DatePicker.styles';

const DatePicker: React.FC<SingleDatePickerProps> = ({
    value = null,
    onChange,
    theme = 'light',
    size = 'md',
    customColors,
    placeholder = 'Select date',
    disabled = false,
    required = false,
    className = '',
    label,
    error,
    minDate,
    maxDate,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    // Close calendar on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const isCurrentMonth = date.getMonth() === month;
            const isSelected = value && date.getTime() === value.getTime();
            const isToday = date.getTime() === today.getTime();
            const isDisabled =
                (minDate && date < minDate) ||
                (maxDate && date > maxDate);

            days.push({
                date,
                isCurrentMonth,
                isSelected,
                isToday,
                isDisabled,
            });
        }

        return days;
    };

    const handleDateClick = (date: Date) => {
        if (!date) return;
        onChange(date);
        setIsOpen(false);
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newMonth = new Date(currentMonth);
        if (direction === 'prev') {
            newMonth.setMonth(newMonth.getMonth() - 1);
        } else {
            newMonth.setMonth(newMonth.getMonth() + 1);
        }
        setCurrentMonth(newMonth);
    };

    // Valid CSS properties ke liye inline styles
    const getDateButtonStyle = (day: any) => {
        const baseStyle: React.CSSProperties = {};

        if (day.isSelected) {
            baseStyle.backgroundColor = 'var(--accent)';
            baseStyle.color = 'white';
            baseStyle.fontWeight = '600';
        } else if (day.isToday) {
            baseStyle.backgroundColor = 'var(--secondary)';
            baseStyle.color = 'var(--accent)';
            baseStyle.fontWeight = '500';
        }

        return baseStyle;
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {label && (
                <label className={`block text-sm font-medium mb-1 ${themeColors.text}`}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    type="text"
                    value={formatDate(value)}
                    onClick={() => {
                        if (!disabled) {
                            setIsOpen(!isOpen);
                        }
                    }}
                    readOnly
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        w-full rounded-lg border-2 focus:ring-2 focus:ring-opacity-50 outline-none transition-all
                        ${themeColors.background} ${themeColors.border} ${themeColors.text}
                        ${sizeClasses.input}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        ${error ? 'border-red-500' : ''}
                        focus:border-[var(--primary)] focus:ring-[var(--primary)]
                    `}
                />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <CalendarIcon className={`w-4 h-4 ${themeColors.text}`} />
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

            {/* CALENDAR DROPDOWN */}
            {isOpen && !disabled && (
                <div
                    className={`
                        absolute top-full left-0 mt-1 z-50 shadow-lg rounded-lg border min-w-[280px]
                        ${themeColors.calendarBackground} ${themeColors.border}
                    `}
                    style={{
                        backgroundColor: 'var(--lightBg)',
                        borderColor: 'var(--secondary)'
                    }}
                >
                    {/* Calendar Header */}
                    <div
                        className={`flex items-center justify-between p-3 rounded-t-lg`}
                        style={{
                            backgroundColor: 'var(--secondary)'
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => navigateMonth('prev')}
                            className={`p-1 rounded transition-colors ${themeColors.text}`}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                                e.currentTarget.style.opacity = '0.8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.opacity = '1';
                            }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <h3
                            className={`font-medium ${sizeClasses.calendar}`}
                            style={{ color: 'var(--text)' }}
                        >
                            {currentMonth.toLocaleDateString('en-IN', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </h3>

                        <button
                            type="button"
                            onClick={() => navigateMonth('next')}
                            className={`p-1 rounded transition-colors`}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                                e.currentTarget.style.opacity = '0.8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.opacity = '1';
                            }}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-1 p-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div
                                key={day}
                                className={`text-center font-medium ${sizeClasses.day} flex items-center justify-center`}
                                style={{ color: 'var(--text)', opacity: 0.7 }}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 p-2">
                        {generateCalendarDays().map((day, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => !day.isDisabled && handleDateClick(day.date)}
                                disabled={day.isDisabled}
                                className={`
                                    ${sizeClasses.day} rounded flex items-center justify-center transition-all
                                    ${day.isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                                style={{
                                    color: day.isCurrentMonth ? 'var(--text)' : 'var(--text)',
                                    opacity: day.isCurrentMonth ? 1 : 0.4,
                                    ...getDateButtonStyle(day)
                                }}
                                onMouseEnter={(e) => {
                                    if (!day.isSelected && !day.isToday && !day.isDisabled) {
                                        e.currentTarget.style.backgroundColor = 'var(--secondary)';
                                        e.currentTarget.style.opacity = '0.8';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!day.isSelected && !day.isToday && !day.isDisabled) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.opacity = day.isCurrentMonth ? '1' : '0.4';
                                    }
                                }}
                            >
                                {day.date.getDate()}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
