'use client';

import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { DropdownMenuProps } from './Dropdown.types';
import { getThemeColors, getSizeClasses } from './Dropdown.styles';
import Dropdown from './Dropdown';

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    trigger, // Now optional
    options,
    onOptionClick,
    theme = 'light',
    size = 'md',
    customColors,
    disabled = false,
    className = '',
    showIcons = true,
    showDescriptions = false,
    groupByCategory = false,
    maxHeight = '15rem',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const themeColors = getThemeColors(theme);
    const sizeClasses = getSizeClasses(size);

    const handleOptionClick = (option: any) => {
        if (!option.disabled && onOptionClick) {
            onOptionClick(option);
            setIsOpen(false);
        }
    };

    const getCustomStyle = (property: string) => {
        if (!customColors) return '';
        return (customColors as any)[property] || '';
    };

    const renderOptions = () => {
        if (groupByCategory) {
            const categories = Array.from(new Set(options.map(opt => opt.category || 'Other')));

            return categories.map((category, categoryIndex) => (
                <div key={category}>
                    {categoryIndex > 0 && (
                        <hr className={`my-1 ${getCustomStyle('separatorColor') || themeColors.separatorColor}`} />
                    )}
                    <div className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${themeColors.disabledText}`}>
                        {category}
                    </div>
                    {options
                        .filter(option => (option.category || 'Other') === category)
                        .map(option => renderOption(option))
                    }
                </div>
            ));
        }

        return options.map(option => renderOption(option));
    };

    const renderOption = (option: any) => (
        <button
            key={option.id}
            type="button"
            onClick={() => handleOptionClick(option)}
            disabled={option.disabled}
            className={`
        w-full flex items-center space-x-3 text-left transition-all duration-150
        ${sizeClasses.option}
        ${option.disabled
                    ? `${getCustomStyle('disabledText') || themeColors.disabledText} cursor-not-allowed`
                    : `${getCustomStyle('text') || themeColors.text} ${getCustomStyle('hoverBackground') || themeColors.hoverBackground} ${getCustomStyle('hoverText') || themeColors.hoverText} cursor-pointer`
                }
      `}
        >
            {showIcons && option.icon && (
                <span className={`${sizeClasses.icon} ${getCustomStyle('iconColor') || themeColors.iconColor}`}>
                    {option.icon}
                </span>
            )}
            <div className="flex-1 min-w-0">
                <div className="truncate">{option.label}</div>
                {showDescriptions && option.description && (
                    <div className={`text-xs ${themeColors.disabledText} truncate`}>
                        {option.description}
                    </div>
                )}
            </div>
        </button>
    );

    // Default trigger if none provided
    const defaultTrigger = (
        <button
            className={`
        p-2 rounded-lg transition-colors
        ${getCustomStyle('background') || themeColors.background}
        ${getCustomStyle('border') || themeColors.border}
        ${getCustomStyle('hoverBackground') || themeColors.hoverBackground}
        border hover:shadow-sm
      `}
            disabled={disabled}
        >
            <MoreVertical className={sizeClasses.icon} />
        </button>
    );

    return (
        <Dropdown
            trigger={trigger || defaultTrigger} // Use provided trigger or default
            theme={theme}
            size={size}
            customColors={customColors}
            disabled={disabled}
            className={className}
            isOpen={isOpen}
            onToggle={setIsOpen}
        >
            <div className={`py-1`} style={{ maxHeight }}>
                {renderOptions()}
            </div>
        </Dropdown>
    );
};

export default DropdownMenu;
