import clsx from 'clsx';

const baseTabClasses =
    'inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

const shapes: Record<'rounded' | 'square' | 'pill' | 'underline', string> = {
    rounded: 'rounded-md',
    square: '',
    pill: 'rounded-full',
    underline: 'border-b-2',
};

const sizes: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
};

const orientations: Record<'horizontal' | 'vertical', string> = {
    horizontal: 'flex-row border-b',
    vertical: 'flex-col border-r',
};

export const getTabsContainerClasses = ({
    orientation = 'horizontal',
    scrollable,
    sticky,
    multiRow,
}: {
    orientation?: 'horizontal' | 'vertical';
    scrollable?: boolean;
    sticky?: boolean;
    multiRow?: boolean;
}) =>
    clsx(
        'flex',
        orientations[orientation],
        scrollable && 'overflow-x-auto scrollbar-hide',
        sticky && 'sticky top-0 bg-inherit z-10',
        multiRow && 'flex-wrap'
    );

export const getTabClasses = ({
    shape = 'rounded',
    size = 'md',
    active = false,
    disabled = false,
    theme = 'light',
}: {
    shape?: 'rounded' | 'square' | 'pill' | 'underline';
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
    disabled?: boolean;
    theme?: string;
}) =>
    clsx(
        baseTabClasses,
        shapes[shape],
        sizes[size],
        disabled
            ? 'opacity-40 cursor-not-allowed'
            : active
                ? `text-[var(--primary)] border-b-2 border-[var(--primary)]`
                : 'text-[var(--text)] hover:text-[var(--primary)] hover:border-b-2 hover:border-[var(--primary)]',
        shape === 'underline' && 'border-transparent',
        'relative'
    );

export const getPanelClasses = () =>
    'p-4 rounded-b-md bg-[var(--lightBg)] text-[var(--text)]';

export const getBadgeClasses = () =>
    'ml-2 bg-[var(--primary)] text-white rounded-full text-xs font-semibold px-2';

export const getCloseButtonClasses = () =>
    'ml-2 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full';
