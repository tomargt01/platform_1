import { OffCanvasPosition } from '../OffCanvas.types';

export const getRevealAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;

    // Reveal animation: drawer slides in while content slides out
    const transforms: Record<OffCanvasPosition, string> = {
        left: isOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0',
        right: isOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0',
        top: isOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0',
        bottom: isOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0',
    };

    return `${baseClasses} ${transforms[position]}`;
};

export const getRevealBodyAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;

    // Body moves in opposite direction with clipping effect
    const bodyTransforms: Record<OffCanvasPosition, string> = {
        left: isOpen
            ? 'translate-x-80 clip-path-inset-0-0-0-20'
            : 'translate-x-0 clip-path-inset-0-0-0-0',
        right: isOpen
            ? '-translate-x-80 clip-path-inset-0-20-0-0'
            : 'translate-x-0 clip-path-inset-0-0-0-0',
        top: isOpen
            ? 'translate-y-80 clip-path-inset-20-0-0-0'
            : 'translate-y-0 clip-path-inset-0-0-0-0',
        bottom: isOpen
            ? '-translate-y-80 clip-path-inset-0-0-20-0'
            : 'translate-y-0 clip-path-inset-0-0-0-0',
    };

    return `${baseClasses} ${bodyTransforms[position]}`;
};

export const getRevealMaskAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;

    const maskTransforms: Record<OffCanvasPosition, string> = {
        left: isOpen
            ? 'scale-x-100 origin-left'
            : 'scale-x-0 origin-left',
        right: isOpen
            ? 'scale-x-100 origin-right'
            : 'scale-x-0 origin-right',
        top: isOpen
            ? 'scale-y-100 origin-top'
            : 'scale-y-0 origin-top',
        bottom: isOpen
            ? 'scale-y-100 origin-bottom'
            : 'scale-y-0 origin-bottom',
    };

    return `${baseClasses} ${maskTransforms[position]}`;
};
