export type Theme = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type CarouselSize = "sm" | "md" | "lg";

// New indicator types
export type IndicatorType = "dots" | "numeric" | "roman" | "alphabetic" | "squares" | "diamonds";

// New layout types
export type ProductLayoutType = "scrollable" | "grid";
export type ImageOverlayType = "none" | "bottom" | "center" | "top";

export interface CarouselControls {
    showArrows?: boolean;
    showDots?: boolean;
    showThumbnails?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    infiniteLoop?: boolean; // New: seamless infinite loop
    indicatorType?: IndicatorType; // New: different indicator styles
}

export interface CustomColors {
    background?: string;
    border?: string;
    text?: string;
    accent?: string;
    arrow?: string;
    dot?: string;
    activeDot?: string;
    overlay?: string; // New: for text overlays
}

export interface BaseCarouselProps {
    theme?: Theme;
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
    title?: string; // New: for overlay text
    description?: string; // New: for overlay text
}

export interface ImageCarouselProps extends BaseCarouselProps {
    images: ImageSlide[];
    aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
    objectFit?: "cover" | "contain" | "fill";
    overlayType?: ImageOverlayType; // New: text overlay options
    showTextOverlay?: boolean; // New: enable/disable text overlay
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
    layoutType?: ProductLayoutType; // New: scrollable vs grid
    gridRows?: number; // New: number of rows in grid layout
}

// Keep other interfaces same...
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
    layout?: "image-left" | "image-right" | "image-top";
}

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

export interface SingleItemCarouselProps extends BaseCarouselProps {
    children: React.ReactNode[];
    fade?: boolean;
}

export interface VerticalCarouselProps extends BaseCarouselProps {
    children: React.ReactNode[];
    height: string;
    itemHeight?: string;
}

export interface MultiBrowseCarouselProps extends BaseCarouselProps {
    children: React.ReactNode[];
    itemsPerView: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    gap?: string;
}
