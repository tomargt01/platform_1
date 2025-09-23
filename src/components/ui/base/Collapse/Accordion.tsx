'use client';

import React, { useState } from 'react';
import { AccordionProps } from './Collapse.types';
import Collapse from './Collapse';

const Accordion: React.FC<AccordionProps> = ({
    items,
    theme = 'light',
    variant = 'accordion',
    size = 'md',
    allowMultiple = false,
    defaultOpenItems = [],
    className = '',
    customColors,
}) => {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set(defaultOpenItems));

    const toggleItem = (itemId: number) => {
        const newOpenItems = new Set(openItems);

        if (newOpenItems.has(itemId)) {
            newOpenItems.delete(itemId);
        } else {
            if (!allowMultiple) {
                newOpenItems.clear();
            }
            newOpenItems.add(itemId);
        }

        setOpenItems(newOpenItems);
    };

    return (
        <div className={`space-y-0 ${className}`}>
            {items.map((item, index) => (
                <Collapse
                    key={item.id}
                    isOpen={openItems.has(item.id)}
                    onToggle={() => toggleItem(item.id)}
                    title={item.title}
                    icon={item.icon}
                    disabled={item.disabled}
                    theme={theme}
                    variant={variant}
                    size={size}
                    customColors={customColors}
                    className={index === 0 ? 'rounded-t-lg' : index === items.length - 1 ? 'rounded-b-lg border-t-0' : 'border-t-0'}
                >
                    {item.content}
                </Collapse>
            ))}
        </div>
    );
};

export default Accordion;
