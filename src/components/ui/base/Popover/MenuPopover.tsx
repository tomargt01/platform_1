'use client';

import React from 'react';
import BasePopover from './BasePopover';
import { MenuItem, BasePopoverProps } from './Popover.types';
import { ChevronRight } from 'lucide-react';

interface MenuPopoverProps extends Omit<BasePopoverProps, 'children'> {
    items: MenuItem[];
    onItemClick?: (item: MenuItem) => void;
    children: React.ReactNode;
}

const MenuPopover: React.FC<MenuPopoverProps> = ({
    items,
    onItemClick,
    children,
    ...popoverProps
}) => {
    const handleItemClick = (item: MenuItem, event: React.MouseEvent) => {
        if (item.disabled) return;

        if (item.onClick) {
            event.preventDefault();
            item.onClick();
        }

        onItemClick?.(item);
    };

    const renderMenuItem = (item: MenuItem, index: number) => {
        if (item.divider) {
            return <hr key={`divider-${index}`} className="my-1 border-gray-200" />;
        }

        const MenuItemComponent = item.href ? 'a' : 'button';

        return (
            <MenuItemComponent
                key={item.id}
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                disabled={item.disabled}
                className={`
          w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left
          ${item.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
        `}
            >
                <div className="flex items-center space-x-2">
                    {item.icon && (
                        <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                </div>

                {item.submenu && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
            </MenuItemComponent>
        );
    };

    return (
        <BasePopover {...popoverProps} className="p-1">
            <div className="space-y-1">
                {items.map((item, index) => renderMenuItem(item, index))}
            </div>
            {children}
        </BasePopover>
    );
};

export default MenuPopover;
