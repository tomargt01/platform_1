// src/components/ui/content/Typography/Typography.tsx
import React from 'react';

type TextTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'strong' | 'em' | 'small' | 'mark';
type ThemeColor = 'text' | 'primary' | 'secondary' | 'accent' | 'lightBg';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    as?: TextTag;
    color?: ThemeColor;
    className?: string;
    children: React.ReactNode;
}

/**
 * Applies your global theme variables and responsive sizing
 * directly to native HTML tags. Only adds classes if needed.
 */
export function Typography({
    as: Tag = 'span',
    color = 'text',
    className = '',
    children,
    ...props
}: TypographyProps) {
    return (
        <Tag
            style={{
                color: `var(--${color})`,
            }}
            className={className}
            {...props}
        >
            {children}
        </Tag>
    );
}
