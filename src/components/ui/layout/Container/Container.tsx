import React from 'react';

type ContainerVariant = 'fluid' | 'container' | 'custom1' | 'custom2' | 'custom3';

const containerMaxWidths: Record<ContainerVariant, string> = {
    fluid: '100%',         // Full page width
    container: '1140px',   // Bootstrap style
    custom1: '900px',
    custom2: '650px',
    custom3: '450px',
};

export interface ContainerProps {
    variant?: ContainerVariant;
    className?: string;
    children: React.ReactNode;
}

/** 
 * Each inner container is horizontally centered (mx-auto) in its parent and has a decreasing maxWidth.
 * No horizontal/side margin or padding logic, just maxWidth + mx-auto.
 */
export const Container: React.FC<ContainerProps> = ({
    variant = 'container',
    className = '',
    children,
}) => {
    const maxWidth = containerMaxWidths[variant];
    // Center everything except fluid
    const mxAuto = variant !== 'fluid' ? 'mx-auto' : '';
    return (
        <div
            className={`${mxAuto} w-full ${className}`.trim()}
            style={{
                maxWidth,
                boxSizing: 'border-box',
            }}
        >
            {children}
        </div>
    );
};
