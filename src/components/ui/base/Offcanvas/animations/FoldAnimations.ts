import { OffCanvasPosition } from '../OffCanvas.types';

export const getFoldAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out transform-gpu`;

    const transforms: Record<OffCanvasPosition, string> = {
        left: isOpen
            ? 'translate-x-0 rotateY-0 scale-100'
            : '-translate-x-full rotateY-90 scale-75',
        right: isOpen
            ? 'translate-x-0 rotateY-0 scale-100'
            : 'translate-x-full rotateY-90 scale-75',
        top: isOpen
            ? 'translate-y-0 rotateX-0 scale-100'
            : '-translate-y-full rotateX-90 scale-75',
        bottom: isOpen
            ? 'translate-y-0 rotateX-0 scale-100'
            : 'translate-y-full rotateX-90 scale-75',
    };

    return `${baseClasses} ${transforms[position]} perspective-1000`;
};

export const getFoldBackdropAnimation = (isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;
    const foldClass = isOpen
        ? 'opacity-100 backdrop-blur-md'
        : 'opacity-0 backdrop-blur-none';

    return `${baseClasses} ${foldClass}`;
};
