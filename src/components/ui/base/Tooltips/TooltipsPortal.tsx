// TooltipsPortal.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipsPortalProps {
    children: ReactNode;
}

export function TooltipsPortal({ children }: TooltipsPortalProps) {
    const [mounted, setMounted] = useState(false);
    const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let el = document.getElementById("tooltip-portal");
        if (!el) {
            el = document.createElement("div");
            el.setAttribute("id", "tooltip-portal");
            document.body.appendChild(el);
        }
        setPortalNode(el);
        setMounted(true);
    }, []);

    if (!mounted || !portalNode) return null;

    return createPortal(children, portalNode);
}
