'use client';

import React, { useState, useEffect } from 'react';
import { AccordionGroupProps } from './Accordion.types';
import AccordionItem from './AccordionItem';

const AccordionGroup: React.FC<AccordionGroupProps> = ({
    items,
    theme = 'light',
    size = 'md',
    variant = 'default',
    allowMultiple = false,
    collapsible = true,
    className = '',
    onItemToggle,
    defaultExpandedItems = [],
    expandedItems: controlledExpandedItems,
    animationDuration = 300,
}) => {
    const [internalExpandedItems, setInternalExpandedItems] = useState<Set<string>>(
        new Set(defaultExpandedItems)
    );

    const expandedItems = controlledExpandedItems
        ? new Set(controlledExpandedItems)
        : internalExpandedItems;

    useEffect(() => {
        if (defaultExpandedItems.length > 0 && controlledExpandedItems === undefined) {
            setInternalExpandedItems(new Set(defaultExpandedItems));
        }
    }, [defaultExpandedItems, controlledExpandedItems]);

    const handleItemToggle = (itemId: string, expanded: boolean) => {
        if (controlledExpandedItems === undefined) {
            setInternalExpandedItems(prev => {
                const newSet = new Set(prev);

                if (expanded) {
                    if (!allowMultiple) {
                        newSet.clear();
                    }
                    newSet.add(itemId);
                } else {
                    if (collapsible) {
                        newSet.delete(itemId);
                    }
                }

                return newSet;
            });
        }

        onItemToggle?.(itemId, expanded);
    };

    return (
        <div className={`accordion-group ${className}`}>
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    title={item.title}
                    theme={theme}
                    size={size}
                    variant={variant}
                    disabled={item.disabled}
                    expanded={expandedItems.has(item.id)}
                    onToggle={(expanded) => handleItemToggle(item.id, expanded)}
                    animationDuration={animationDuration}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
};

export default AccordionGroup;
