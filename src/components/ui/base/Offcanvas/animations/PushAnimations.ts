import { OffCanvasPosition } from '../OffCanvas.types';

export const getPushAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number, size: string) => {
    const baseClasses = `transition-transform duration-${duration} ease-in-out`;

    const transforms: Record<OffCanvasPosition, string> = {
        left: isOpen ? 'translate-x-0' : '-translate-x-full',
        right: isOpen ? 'translate-x-0' : 'translate-x-full',
        top: isOpen ? 'translate-y-0' : '-translate-y-full',
        bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
    };

    return `${baseClasses} ${transforms[position]}`;
};

export const getPushBodyAnimation = (position: OffCanvasPosition, isOpen: boolean, duration: number) => {
    const baseClasses = `transition-transform duration-${duration} ease-in-out`;

    const sizeValues: Record<string, string> = {
        'w-64': '16rem',
        'w-80': '20rem',
        'w-96': '24rem',
        'w-[28rem]': '28rem',
        'w-[32rem]': '32rem',
        'h-64': '16rem',
        'h-80': '20rem',
        'h-96': '24rem',
        'h-[28rem]': '28rem',
        'h-[32rem]': '32rem',
    };

    if (!isOpen) return baseClasses;

    const transforms: Record<OffCanvasPosition, string> = {
        left: 'translate-x-80',
        right: '-translate-x-80',
        top: 'translate-y-80',
        bottom: '-translate-y-80',
    };

    return `${baseClasses} ${transforms[position]}`;
};
