'use client';

import ThemeSwitcher from '#/components/ThemeSwitcher';
import {
    ImageCarousel,
    ProductCarousel,
    TestimonialCarousel,
    ContentCarousel,
    HeroCarousel,
    SingleItemCarousel,
    VerticalCarousel,
    MultiBrowseCarousel,
} from '#/components/ui/base/Carousel';

// Sample data for each carousel type
const imageSlides = [
    { id: '1', src: '/sample1.jpg', alt: 'Sample 1' },
    { id: '2', src: '/sample2.jpg', alt: 'Sample 2' },
    { id: '3', src: '/sample3.jpg', alt: 'Sample 3' },
];
const productSlides = [
    { id: 'p1', name: 'Product 1', price: 100, image: '/prod1.jpg' },
    { id: 'p2', name: 'Product 2', price: 200, image: '/prod2.jpg' },
    { id: 'p3', name: 'Product 3', price: 300, image: '/prod3.jpg' },
];
const testimonials = [
    { id: 't1', content: 'Great product!', author: 'John Doe' },
    { id: 't2', content: 'Amazing service.', author: 'Jane Smith' },
];
const contentSlides = [
    { id: 'c1', title: 'Content 1', content: 'Lorem ipsum', cta: { text: 'Read More', onClick: () => alert('Clicked!') } },
    { id: 'c2', title: 'Content 2', content: 'Dolor sit amet' },
];
const heroSlides = [
    { id: 'h1', title: 'Hero Slide 1', backgroundImage: '/hero1.jpg' },
    { id: 'h2', title: 'Hero Slide 2', backgroundImage: '/hero2.jpg' },
];

export default function CarouselDashboardPage() {
    return (
        <div className="p-6 space-y-10">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Carousel Dashboard</h1>
                <ThemeSwitcher />
            </header>
            <section>
                <h2 className="font-semibold mb-3">Image Carousel</h2>
                <ImageCarousel images={imageSlides} />
            </section>
            <section>
                <h2 className="font-semibold mb-3">Product Carousel</h2>
                <ProductCarousel products={productSlides} />
            </section>
            <section>
                <h2 className="font-semibold mb-3">Testimonial Carousel</h2>
                <TestimonialCarousel testimonials={testimonials} />
            </section>
            <section>
                <h2 className="font-semibold mb-3">Content Carousel</h2>
                <ContentCarousel content={contentSlides} />
            </section>
            <section>
                <h2 className="font-semibold mb-3">Hero Carousel</h2>
                <HeroCarousel slides={heroSlides} />
            </section>
            <section>
                <h2 className="font-semibold mb-3">Single Item Carousel</h2>
                <SingleItemCarousel>
                    <div className="p-6 rounded border">Item 1</div>
                    <div className="p-6 rounded border">Item 2</div>
                    <div className="p-6 rounded border">Item 3</div>
                </SingleItemCarousel>
            </section>
            <section>
                <h2 className="font-semibold mb-3">Vertical Carousel</h2>
                <VerticalCarousel height="300px">
                    <div className="p-6 mb-4 rounded border">Vertical 1</div>
                    <div className="p-6 mb-4 rounded border">Vertical 2</div>
                    <div className="p-6 mb-4 rounded border">Vertical 3</div>
                </VerticalCarousel>
            </section>
            <section>
                <h2 className="font-semibold mb-3">Multi Browse Carousel</h2>
                <MultiBrowseCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} gap="1rem">
                    <div className="p-6 rounded border mr-4">Multi 1</div>
                    <div className="p-6 rounded border mr-4">Multi 2</div>
                    <div className="p-6 rounded border">Multi 3</div>
                    <div className="p-6 rounded border mr-4">Multi 4</div>
                    <div className="p-6 rounded border mr-4">Multi 5</div>
                </MultiBrowseCarousel>
            </section>
        </div>
    );
}
