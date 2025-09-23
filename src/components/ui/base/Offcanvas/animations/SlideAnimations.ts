import { OffCanvasPosition } from '../OffCanvas.types';

export const getSlideAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-transform duration-${duration} ease-in-out`;

    const transforms: Record<OffCanvasPosition, string> = {
        left: isOpen ? 'translate-x-0' : '-translate-x-full',
        right: isOpen ? 'translate-x-0' : 'translate-x-full',
        top: isOpen ? 'translate-y-0' : '-translate-y-full',
        bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
    };

    return `${baseClasses} ${transforms[position]}`;
};

export const getSlideBodyAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    return `transition-transform duration-${duration} ease-in-out`;
};
