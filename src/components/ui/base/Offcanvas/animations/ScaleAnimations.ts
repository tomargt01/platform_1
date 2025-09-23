export const getScaleAnimation = (isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;
    const scaleClass = isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0';

    return `${baseClasses} ${scaleClass}`;
};

export const getScaleBackdropAnimation = (isOpen: boolean, duration: number) => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;
    const backdropClass = isOpen ? 'opacity-100' : 'opacity-0';

    return `${baseClasses} ${backdropClass}`;
};
