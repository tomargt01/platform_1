'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionIconProps } from './Accordion.types';

const AccordionIcon: React.FC<AccordionIconProps> = ({
    isExpanded,
    size = 'md',
    customIcon,
    animationDuration = 300,
    color = 'var(--background)',
}) => {
    const sizeMap = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    const iconSize = sizeMap[size];

    const iconStyle: React.CSSProperties = {
        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: `transform ${animationDuration}ms ease-in-out`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    if (customIcon) {
        return <div className="accordion-icon" style={iconStyle}>{customIcon}</div>;
    }

    return (
        <div className="accordion-icon" style={iconStyle}>
            <ChevronDown size={iconSize} />
        </div>
    );
};

export default AccordionIcon;
