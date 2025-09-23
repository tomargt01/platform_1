import { OffCanvasPosition } from '../OffCanvas.types';

export const getParallaxAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-out`;

    const transforms: Record<OffCanvasPosition, string> = {
        left: isOpen
            ? 'translate-x-0 perspective-1000 rotateY-0'
            : '-translate-x-full perspective-1000 rotateY-45',
        right: isOpen
            ? 'translate-x-0 perspective-1000 rotateY-0'
            : 'translate-x-full perspective-1000 rotateY-45',
        top: isOpen
            ? 'translate-y-0 perspective-1000 rotateX-0'
            : '-translate-y-full perspective-1000 rotateX-45',
        bottom: isOpen
            ? 'translate-y-0 perspective-1000 rotateX-0'
            : 'translate-y-full perspective-1000 rotateX-45',
    };

    return `${baseClasses} ${transforms[position]}`;
};

export const getParallaxBackdropAnimation = (isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    const parallaxClass = isOpen
        ? 'opacity-100 scale-100 blur-0'
        : 'opacity-0 scale-105 blur-sm';

    return `${baseClasses} ${parallaxClass}`;
};

export const getParallaxLayerAnimation = (layer: number, isOpen: boolean, duration: number) => {
    const delay = layer * 50; // Staggered animation
    const baseClasses = `transition-all duration-${duration} ease-out`;
    const layerClass = isOpen
        ? `opacity-100 translate-z-0 delay-${delay}`
        : `opacity-60 translate-z-${layer * 10} delay-${delay}`;

    return `${baseClasses} ${layerClass}`;
};
