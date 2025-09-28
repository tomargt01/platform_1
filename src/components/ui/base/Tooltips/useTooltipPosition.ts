import { useState, useLayoutEffect } from "react";

interface Position { top: number; left: number; }

function useTooltipPosition(
    isVisible: boolean,
    position: string,
    align: string,
    triggerRef: React.RefObject<HTMLElement>,
    tooltipRef: React.RefObject<HTMLElement>
) {
    const [pos, setPos] = useState<Position>({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (!isVisible) { setPos({ top: 0, left: 0 }); return; }
        if (!triggerRef.current || !tooltipRef.current) return;

        const updatePosition = () => {
            const triggerRect = triggerRef.current!.getBoundingClientRect();
            const tooltipRect = tooltipRef.current!.getBoundingClientRect();

            if (tooltipRect.height === 0 || tooltipRect.width === 0) {
                // Try again immediately after next paint
                requestAnimationFrame(updatePosition);
                return;
            }

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            let top = 0, left = 0;
            switch (position) {
                case "top":
                    top = triggerRect.top + scrollTop - tooltipRect.height - 8;
                    left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case "bottom":
                    top = triggerRect.bottom + scrollTop + 8;
                    left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case "left":
                    top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipRect.height / 2;
                    left = triggerRect.left + scrollLeft - tooltipRect.width - 8;
                    break;
                case "right":
                    top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipRect.height / 2;
                    left = triggerRect.right + scrollLeft + 8;
                    break;
                default:
                    // For 'auto' or fallback, use top-center
                    top = triggerRect.top + scrollTop - tooltipRect.height - 8;
                    left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;
            }

            // Alignment
            if (position === "top" || position === "bottom") {
                switch (align) {
                    case "start": left = triggerRect.left + scrollLeft; break;
                    case "center": left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2; break;
                    case "end": left = triggerRect.right + scrollLeft - tooltipRect.width; break;
                }
            }

            setPos({ top, left });
        };

        updatePosition();
    }, [isVisible, position, align, triggerRef, tooltipRef]);

    return pos;
}

export default useTooltipPosition;
