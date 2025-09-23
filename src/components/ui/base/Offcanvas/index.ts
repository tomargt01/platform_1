// Main Components
export { default as OffCanvas } from './OffCanvas';

// Variant Components
export { default as NavigationDrawer } from './variants/NavigationDrawer';
export { default as FilterDrawer } from './variants/FilterDrawer';

// Types
export type {
    OffCanvasProps,
    Theme,
    OffCanvasPosition,
    OffCanvasSize,
    AnimationType,
    BackdropType,
    CustomColors,
    DrawerState
} from './OffCanvas.types';

// Animation Functions
export {
    getSlideAnimation,
    getSlideBodyAnimation
} from './animations/SlideAnimations';

export {
    getPushAnimation,
    getPushBodyAnimation
} from './animations/PushAnimations';

export {
    getOverlayAnimation,
    getOverlayBackdropAnimation,
    getOverlayContentAnimation
} from './animations/OverlayAnimations';

export {
    getParallaxAnimation,
    getParallaxBackdropAnimation,
    getParallaxLayerAnimation
} from './animations/ParallaxAnimations';

export {
    getScaleAnimation,
    getScaleBackdropAnimation
} from './animations/ScaleAnimations';

export {
    getFoldAnimation,
    getFoldBackdropAnimation
} from './animations/FoldAnimations';

export {
    getSqueezeAnimation,
    getSqueezeBodyAnimation
} from './animations/SqueezeAnimations';

export {
    getRevealAnimation,
    getRevealBodyAnimation,
    getRevealMaskAnimation
} from './animations/RevealAnimations';

// Style Functions
export {
    getThemeColors,
    getSizeClasses,
    getBackdropClasses,
    getPositionClasses
} from './OffCanvas.styles';
