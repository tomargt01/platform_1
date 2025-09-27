export function generateId(prefix = 'tab') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Find the next enabled tab index given current index and tabs array
 */
export function getNextEnabledTab(tabs: { disabled?: boolean }[], startIndex: number, step = 1) {
    const len = tabs.length;
    let idx = startIndex;

    for (let i = 0; i < len; i++) {
        idx = (idx + step + len) % len;
        if (!tabs[idx].disabled) return idx;
    }
    return startIndex; // fallback
}
