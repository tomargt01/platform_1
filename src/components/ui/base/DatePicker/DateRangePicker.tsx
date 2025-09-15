'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { DateRangePickerProps } from './DatePicker.types';
import { getThemeColors, getSizeClasses } from './DatePicker.styles';

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate = null,
  endDate = null,
  onChange,
  theme = 'light',
  size = 'md',
  customColors,
  placeholder = 'Select date range',
  placeholderStart = 'Start date',
  placeholderEnd = 'End date',
  disabled = false,
  required = false,
  className = '',
  label,
  error,
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(startDate || new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const themeColors = getThemeColors(theme);
  const sizeClasses = getSizeClasses(size);

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

  const formatDateRange = () => {
    if (!startDate && !endDate) return '';
    if (startDate && !endDate) return formatDate(startDate);
    if (!startDate && endDate) return formatDate(endDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isRangeStart = (date: Date) => {
    return startDate && date.getTime() === startDate.getTime();
  };

  const isRangeEnd = (date: Date) => {
    return endDate && date.getTime() === endDate.getTime();
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      onChange({ startDate: date, endDate: null });
    } else if (startDate && !endDate) {
      // Complete the range
      if (date >= startDate) {
        onChange({ startDate, endDate: date });
        setIsOpen(false);
      } else {
        onChange({ startDate: date, endDate: startDate });
        setIsOpen(false);
      }
    }
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startCalendar = new Date(firstDayOfMonth);
    startCalendar.setDate(startCalendar.getDate() - firstDayOfMonth.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startCalendar);
      date.setDate(startCalendar.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.getTime() === today.getTime();
      const isDisabled =
        (minDate && date < minDate) ||
        (maxDate && date > maxDate);

      days.push({
        date,
        isCurrentMonth,
        isToday,
        isDisabled,
        isInRange: isInRange(date),
        isRangeStart: isRangeStart(date),
        isRangeEnd: isRangeEnd(date),
      });
    }

    return days;
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

  // Range date styling ke liye inline styles function
  const getRangeDateStyle = (day: any): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {};

    if (day.isRangeStart || day.isRangeEnd) {
      // Start aur End dates ke liye accent color
      baseStyle.backgroundColor = 'var(--accent)';
      baseStyle.color = 'white';
      baseStyle.fontWeight = '600';
    } else if (day.isInRange) {
      // Range ke beech ke dates ke liye light background
      baseStyle.backgroundColor = 'var(--secondary)';
      baseStyle.color = 'var(--accent)';
      baseStyle.fontWeight = '400';
    } else if (day.isToday) {
      // Today's date highlighting
      baseStyle.backgroundColor = 'var(--secondary)';
      baseStyle.color = 'var(--accent)';
      baseStyle.fontWeight = '500';
      baseStyle.outline = `2px solid var(--accent)`;
      baseStyle.outlineOffset = '-2px';
    }

    return baseStyle;
  };

  // Hover effect ke liye preview range
  // Hover effect ke liye preview range
  const isInHoverRange = (date: Date) => {
    if (!startDate || endDate || !hoverDate) return false;
    const start = startDate;
    const end = hoverDate;

    // FIX: Date.getTime() use kariye comparison ke liye
    return date.getTime() > Math.min(start.getTime(), end.getTime()) &&
      date.getTime() < Math.max(start.getTime(), end.getTime());
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
          value={formatDateRange()}
          onClick={() => !disabled && setIsOpen(!isOpen)}
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

      {isOpen && !disabled && (
        <div
          className={`
            absolute top-full left-0 mt-1 z-50 shadow-lg rounded-lg border min-w-[320px]
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
                onMouseEnter={() => {
                  if (startDate && !endDate && !day.isDisabled) {
                    setHoverDate(day.date);
                  }
                }}
                onMouseLeave={() => setHoverDate(null)}
                className={`
                  ${sizeClasses.day} rounded flex items-center justify-center transition-all
                  ${day.isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                  ${isInHoverRange(day.date) ? 'bg-opacity-30' : ''}
                `}
                style={{
                  color: day.isCurrentMonth ? 'var(--text)' : 'var(--text)',
                  opacity: day.isCurrentMonth ? 1 : 0.4,
                  ...getRangeDateStyle(day),
                  ...(isInHoverRange(day.date) ? {
                    backgroundColor: 'var(--secondary)',
                    opacity: 0.6
                  } : {})
                }}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Range Selection Info */}
          <div
            className="p-2 text-center text-xs border-t"
            style={{
              color: 'var(--text)',
              borderColor: 'var(--secondary)',
              backgroundColor: 'var(--secondary)',
              opacity: 0.8
            }}
          >
            {startDate && !endDate && (
              <span>Select end date</span>
            )}
            {startDate && endDate && (
              <span>
                {Math.abs(Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))) + 1} days selected
              </span>
            )}
            {!startDate && (
              <span>Select start date</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
