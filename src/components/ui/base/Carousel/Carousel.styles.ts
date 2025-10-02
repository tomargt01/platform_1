// Carousel.styles.ts

// Remove all Theme imports and theme logic

export const BASE_STYLE = 'bg-[var(--background)] text-[var(--text)]';
export const CARD_STYLE = `${BASE_STYLE}`;
export const SHADOW_STYLE = 'shadow-md';
export const OVERLAY_STYLE = 'bg-[var(--overlay)]';
export const ACCENT_STYLE = 'text-[var(--accent)]';

// --- Arrow Styles ---
export const ARROW_STYLE = 'bg-[var(--background)] text-[var(--text)] hover:bg-[var(--accent)]/10';
export const ARROW_SIZE = {
    sm: 'w-8 h-8 text-sm rounded-[var(--radius6px)] p-[var(--pad4px)]',
    md: 'w-10 h-10 text-base rounded-[var(--radius8px)] p-[var(--pad6px)]',
    lg: 'w-12 h-12 text-lg rounded-[var(--radius10px)] p-[var(--pad8px)]',
};

// --- Dot & Indicator Styles ---
export const DOT_STYLE = 'bg-[var(--gray)] text-[var(--text)]';
export const ACTIVE_DOT_STYLE = 'bg-[var(--primary)]';

// --- Size Classes ---
export const SIZE_STYLES = {
    sm: {
        container: 'max-w-sm',
        arrow: 'w-8 h-8 text-sm rounded-[var(--radius6px)] p-[var(--pad4px)]',
        dot: 'w-2 h-2',
        text: 'text-sm',
        padding: 'p-[var(--pad8px)]',
        title: 'text-lg',
        subtitle: 'text-sm',
        radius: 'rounded-[var(--radius6px)]',
    },
    md: {
        container: 'max-w-4xl',
        arrow: 'w-10 h-10 text-base rounded-[var(--radius8px)] p-[var(--pad6px)]',
        dot: 'w-3 h-3',
        text: 'text-base',
        padding: 'p-[var(--pad12px)]',
        title: 'text-xl',
        subtitle: 'text-base',
        radius: 'rounded-[var(--radius8px)]',
    },
    lg: {
        container: 'max-w-6xl',
        arrow: 'w-12 h-12 text-lg rounded-[var(--radius10px)] p-[var(--pad8px)]',
        dot: 'w-4 h-4',
        text: 'text-lg',
        padding: 'p-[var(--pad16px)]',
        title: 'text-2xl',
        subtitle: 'text-lg',
        radius: 'rounded-[var(--radius10px)]',
    },
} as const;

// --- Transitions ---
export const TRANSITION_CLASSES = {
    slide: 'transition-transform duration-300 ease-in-out',
    fade: 'transition-opacity duration-500 ease-in-out',
    scale: 'transition-all duration-300 ease-in-out transform hover:scale-105',
};

// --- Custom Border ---
export const SOLID_BORDER = 'border-[var(--1pxSolidBorder)] border-[var(--borderColor)]';
