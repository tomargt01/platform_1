/** @type {import('next').NextConfig} */
const withSentry = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // App Router configuration (Remove i18n for App Router)
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
    },

    // Enhanced image configuration for SAAS
    images: {
        domains: [
            'localhost',
            'your-domain.com',
            'cdn.your-domain.com',
            'res.cloudinary.com',
            's3.amazonaws.com'
        ],
        formats: ['image/webp', 'image/avif'],
    },

    // API rewrites for multi-tenant SAAS
    async rewrites() {
        return [
            {
                source: '/api/tenant/:tenant/:path*',
                destination: '/api/:path*',
            },
        ];
    },

    // Security headers for SAAS
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Environment variables
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },
};

module.exports = withSentry(withBundleAnalyzer(nextConfig));
