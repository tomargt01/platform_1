// utilities.ts

import { useEffect, useRef, useState } from "react";

// Hook to detect clicks outside element to close interactive tooltip
export function useClickOutside(
    ref: React.RefObject<HTMLElement>,
    handler: () => void
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

// Hook to handle show/hide delays
export function useDelayedVisibility(
    visible: boolean,
    showDelay = 0,
    hideDelay = 0
) {
    const [shouldRender, setShouldRender] = useState(false);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (visible) {
            if (timeoutId.current) clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() => setShouldRender(true), showDelay);
        } else {
            if (timeoutId.current) clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() => setShouldRender(false), hideDelay);
        }

        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        };
    }, [visible, showDelay, hideDelay]);

    return shouldRender;
}

// Keyboard accessibility helper as needed can be added here

