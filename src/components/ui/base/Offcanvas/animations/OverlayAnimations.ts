import { OffCanvasPosition } from '../OffCanvas.types';

export const getOverlayAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;

    const transforms: Record<OffCanvasPosition, string> = {
        left: isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
        right: isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        top: isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
        bottom: isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
    };

    return `${baseClasses} ${transforms[position]}`;
};

export const getOverlayBackdropAnimation = (isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;
    const backdropClass = isOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 backdrop-blur-none';

    return `${baseClasses} ${backdropClass}`;
};

export const getOverlayContentAnimation = (isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    const contentClass = isOpen ? 'scale-100 opacity-100' : 'scale-110 opacity-80';

    return `${baseClasses} ${contentClass}`;
};
