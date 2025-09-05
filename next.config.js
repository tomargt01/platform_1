const { withSentryConfig } = require("@sentry/nextjs");
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/:path*',
            },
        ];
    },
};

module.exports = withBundleAnalyzer(nextConfig);



module.exports = withSentryConfig(
    nextConfig,
    {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options
        silent: true, // Suppresses source map upload logs during build
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        release: process.env.npm_package_version,
        // Set `dryRun: true` in development to test without uploading
        dryRun: process.env.NODE_ENV !== 'production',
    }
);



// /** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// const nextConfig = {
//   reactStrictMode: true,
//   i18n: {
//     locales: ['en', 'es', 'fr', 'hi', 'ar'],
//     defaultLocale: 'en',
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/:path*',
//         destination: '/:path*',
//       },
//     ];
//   },
//   images: {
//     domains: ['localhost'],
//   },
  
// };

// module.exports = withBundleAnalyzer(nextConfig);




// /** @type {import('next').NextConfig} */
// const withSentry = require('@sentry/nextjs');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });

// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,

//     // App Router configuration (Remove i18n for App Router)
//     experimental: {
//         serverComponentsExternalPackages: ['@prisma/client'],
//     },

//     // Enhanced image configuration for SAAS
//     images: {
//         domains: [
//             'localhost',
//             'your-domain.com',
//             'cdn.your-domain.com',
//             'res.cloudinary.com',
//             's3.amazonaws.com'
//         ],
//         formats: ['image/webp', 'image/avif'],
//     },

//     // API rewrites for multi-tenant SAAS
//     async rewrites() {
//         return [
//             {
//                 source: '/api/tenant/:tenant/:path*',
//                 destination: '/api/:path*',
//             },
//         ];
//     },

//     // Security headers for SAAS
//     async headers() {
//         return [
//             {
//                 source: '/(.*)',
//                 headers: [
//                     {
//                         key: 'X-Frame-Options',
//                         value: 'DENY',
//                     },
//                     {
//                         key: 'X-Content-Type-Options',
//                         value: 'nosniff',
//                     },
//                     {
//                         key: 'Referrer-Policy',
//                         value: 'origin-when-cross-origin',
//                     },
//                 ],
//             },
//         ];
//     },

//     // Environment variables
//     env: {
//         CUSTOM_KEY: process.env.CUSTOM_KEY,
//     },
// };

// module.exports = withSentry(withBundleAnalyzer(nextConfig));
