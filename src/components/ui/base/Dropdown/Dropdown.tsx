'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, Loader2 } from 'lucide-react';
import { BaseDropdownProps, DropdownOption, CustomColors } from './Dropdown.types';
import { getThemeColors, getSizeClasses, getDropdownZIndex } from './Dropdown.styles';

interface DropdownProps extends BaseDropdownProps {
    children?: React.ReactNode;
    trigger?: React.ReactNode;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    trigger,
    theme = 'light',
    size = 'md',
    customColors,
    disabled = false,
    className = '',
    isOpen: controlledIsOpen,
    onToggle,
    loading = false,
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
    const setIsOpen = onToggle || setInternalIsOpen;

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);
    const zIndexClasses = getDropdownZIndex();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, setIsOpen]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const getCustomStyle = (property: keyof CustomColors) => {
        return customColors?.[property] || '';
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {trigger ? (
                <div
                    onClick={toggleDropdown}
                    className={`cursor-pointer relative ${zIndexClasses.trigger}`}
                >
                    {trigger}
                </div>
            ) : (
                <button
                    type="button"
                    onClick={toggleDropdown}
                    disabled={disabled || loading}
                    className={`
            w-full flex items-center justify-between rounded-lg border transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-opacity-50 relative
            ${getCustomStyle('background') || themeColors.background}
            ${getCustomStyle('border') || themeColors.border}
            ${getCustomStyle('text') || themeColors.text}
            ${sizeClasses.trigger}
            ${zIndexClasses.trigger}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-opacity-80'}
            ${isOpen ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
          `}
                >
                    <span className="truncate">Default Trigger</span>
                    <div className="flex items-center space-x-2">
                        {loading && <Loader2 className={`${sizeClasses.chevron} animate-spin`} />}
                        <ChevronDown
                            className={`
                ${sizeClasses.chevron} transition-transform duration-200
                ${isOpen ? 'transform rotate-180' : ''}
                ${getCustomStyle('iconColor') || themeColors.iconColor}
              `}
                        />
                    </div>
                </button>
            )}

            {isOpen && (
                <>
                    {/* Invisible overlay for better click outside detection */}
                    <div
                        className={`fixed inset-0 ${zIndexClasses.overlay}`}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Main dropdown menu */}
                    <div className={`
            absolute top-full left-0 right-0 mt-1 rounded-lg border
            ${zIndexClasses.dropdown}
            ${getCustomStyle('background') || themeColors.dropdownBackground}
            ${getCustomStyle('border') || themeColors.dropdownBorder}
            ${themeColors.dropdownShadow}
            max-h-60 overflow-y-auto
            transform transition-all duration-200 ease-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}>
                        {children}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dropdown;
