// useTooltip.ts

import { useCallback, useEffect, useRef, useState } from "react";
import { TooltipTrigger } from "./Tooltips.types";

export function useTooltip(trigger: TooltipTrigger = "hover") {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLElement | null>(null);

    // Handlers for different triggers
    const openTooltip = useCallback(() => setIsOpen(true), []);
    const closeTooltip = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (trigger === "hover") {
            const el = triggerRef.current;
            if (!el) return;
            const onMouseEnter = () => setIsOpen(true);
            const onMouseLeave = () => setIsOpen(false);
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
            return () => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            };
        } else if (trigger === "click") {
            const el = triggerRef.current;
            if (!el) return;
            const onClick = () => setIsOpen((v) => !v);
            el.addEventListener("click", onClick);
            return () => {
                el.removeEventListener("click", onClick);
            };
        } else if (trigger === "focus") {
            const el = triggerRef.current;
            if (!el) return;
            const onFocus = () => setIsOpen(true);
            const onBlur = () => setIsOpen(false);
            el.addEventListener("focus", onFocus);
            el.addEventListener("blur", onBlur);
            return () => {
                el.removeEventListener("focus", onFocus);
                el.removeEventListener("blur", onBlur);
            };
        }
        // Long press can be handled here with touch events
    }, [trigger]);

    return {
        isOpen,
        setIsOpen,
        triggerRef,
        openTooltip,
        closeTooltip,
    };
}
