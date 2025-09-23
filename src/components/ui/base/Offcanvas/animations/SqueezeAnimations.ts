import { OffCanvasPosition } from '../OffCanvas.types';

export const getSqueezeAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;

    const transforms: Record<OffCanvasPosition, string> = {
        left: isOpen
            ? 'translate-x-0 scale-x-100 scale-y-100'
            : '-translate-x-full scale-x-0 scale-y-100',
        right: isOpen
            ? 'translate-x-0 scale-x-100 scale-y-100'
            : 'translate-x-full scale-x-0 scale-y-100',
        top: isOpen
            ? 'translate-y-0 scale-x-100 scale-y-100'
            : '-translate-y-full scale-x-100 scale-y-0',
        bottom: isOpen
            ? 'translate-y-0 scale-x-100 scale-y-100'
            : 'translate-y-full scale-x-100 scale-y-0',
    };

    return `${baseClasses} ${transforms[position]}`;
};

export const getSqueezeBodyAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;

    const bodyTransforms: Record<OffCanvasPosition, string> = {
        left: isOpen ? 'scale-x-95 translate-x-4' : 'scale-x-100 translate-x-0',
        right: isOpen ? 'scale-x-95 -translate-x-4' : 'scale-x-100 translate-x-0',
        top: isOpen ? 'scale-y-95 translate-y-4' : 'scale-y-100 translate-y-0',
        bottom: isOpen ? 'scale-y-95 -translate-y-4' : 'scale-y-100 translate-y-0',
    };

    return `${baseClasses} ${bodyTransforms[position]}`;
};
