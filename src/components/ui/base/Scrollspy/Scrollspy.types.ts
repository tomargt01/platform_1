export type ScrollspyTheme = 'light' | 'dark' | 'purple' | 'pink' | 'green' | 'blue';

export type ScrollspyVariant =
    | 'background'
    | 'text'
    | 'left-border'
    | 'right-border'
    | 'number-circular'
    | 'number-boxed'
    | 'number-plain';

export type NumberingStyle = '1234' | 'abcd' | 'roman';

export interface ScrollspyProps {
    items: { id: string; label: string }[];
    activeId: string;
    onChange: (id: string) => void;
    variant?: ScrollspyVariant;
    theme?: ScrollspyTheme;
    numbering?: NumberingStyle;
    customClass?: string;
}
