export type CarouselSize = 'sm' | 'md' | 'lg';

export interface CarouselControls {
    showArrows?: boolean;
    showDots?: boolean;
    showThumbnails?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    infiniteLoop?: boolean;
}

export interface CarouselProps {
    /** Array of React nodes (slides) */
    items: React.ReactNode[];
    /** Size variant, affects maxWidth via CSS var `--maxWidth-${size}` */
    size?: CarouselSize;
    /** Controls for arrows, dots, autoplay, etc. */
    controls?: CarouselControls;
    /** Custom class applied to the root container */
    className?: string;
}

export type IndicatorType =
    | 'dots'
    | 'numeric'
    | 'roman'
    | 'alphabetic'
    | 'squares'
    | 'diamonds';

export type ProductLayoutType = 'scrollable' | 'grid';

export type ImageOverlayType = 'none' | 'bottom' | 'center' | 'top';

export interface CarouselControls {
    showArrows?: boolean;
    showDots?: boolean;
    showThumbnails?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    infiniteLoop?: boolean;
    indicatorType?: IndicatorType;
}

export interface CustomColors {
    background?: string;
    border?: string;
    text?: string;
    accent?: string;
    arrow?: string;
    dot?: string;
    activeDot?: string;
    overlay?: string;
}

export interface BaseCarouselProps {
    // theme prop removed – theme is now purely global (CSS variables)
    size?: CarouselSize;
    customColors?: CustomColors;
    controls?: CarouselControls;
    className?: string;
}

// Enhanced Image Carousel
export interface ImageSlide {
    id: string;
    src: string;
    alt: string;
    caption?: string;
    title?: string;
    description?: string;
}

export interface ImageCarouselProps extends BaseCarouselProps {
    images: ImageSlide[];
    aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
    objectFit?: 'cover' | 'contain' | 'fill';
    overlayType?: ImageOverlayType;
    showTextOverlay?: boolean;
}

// Enhanced Product Carousel
export interface ProductSlide {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    badge?: string;
    onAddToCart?: () => void;
    onQuickView?: () => void;
}

export interface ProductCarouselProps extends BaseCarouselProps {
    products: ProductSlide[];
    showPrice?: boolean;
    showRating?: boolean;
    showActions?: boolean;
    itemsPerView?: number;
    layoutType?: ProductLayoutType;
    gridRows?: number;
}

// Testimonial Carousel
export interface TestimonialSlide {
    id: string;
    content: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
}

export interface TestimonialCarouselProps extends BaseCarouselProps {
    testimonials: TestimonialSlide[];
    showAvatar?: boolean;
    showRating?: boolean;
}

// Content Carousel
export interface ContentSlide {
    id: string;
    title: string;
    content: string;
    image?: string;
    cta?: {
        text: string;
        onClick: () => void;
    };
}

export interface ContentCarouselProps extends BaseCarouselProps {
    content: ContentSlide[];
    layout?: 'image-left' | 'image-right' | 'image-top';
}

// Hero Carousel
export interface HeroSlide {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage: string;
    overlay?: boolean;
    cta?: {
        primary?: { text: string; onClick: () => void };
        secondary?: { text: string; onClick: () => void };
    };
}

export interface HeroCarouselProps extends BaseCarouselProps {
    slides: HeroSlide[];
    height?: string;
    overlayOpacity?: number;
}

// Single Item Carousel
export interface SingleItemCarouselProps extends BaseCarouselProps {
    children: React.ReactNode[];
    fade?: boolean;
}

// Vertical Carousel
export interface VerticalCarouselProps extends BaseCarouselProps {
    children: React.ReactNode[];
    height: string;
    itemHeight?: string;
}

// Multi Browse Carousel
export interface MultiBrowseCarouselProps extends BaseCarouselProps {
    children: React.ReactNode[];
    itemsPerView: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    gap?: string;
}
