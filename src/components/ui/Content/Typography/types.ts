// src/components/ui/content/Typography/types.ts
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type ThemeColor = 'text' | 'primary' | 'secondary' | 'accent' | 'lightBg';
type TextTag = 'span' | 'p' | 'div';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    as?: TextTag;
    size?: TextSize;
    color?: ThemeColor;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    className?: string;
    children: React.ReactNode;
}
