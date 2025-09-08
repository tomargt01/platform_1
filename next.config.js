const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: '/:path*',
  //     },
  //   ];
  // },
};

// Wrap with bundle analyzer first
const configWithAnalyzer = withBundleAnalyzer(nextConfig);

// Export final config with Sentry
module.exports = withSentryConfig(configWithAnalyzer, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: process.env.npm_package_version,
  dryRun: process.env.NODE_ENV !== 'production',
});

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

// Injected content via Sentry wizard below

// const { withSentryConfig } = require('@sentry/nextjs');

// module.exports = withSentryConfig(module.exports, {
//   // For all available options, see:
//   // https://www.npmjs.com/package/@sentry/webpack-plugin#options

//   org: 'kiduart',
//   project: 'saas-frontend',

//   // Only print logs for uploading source maps in CI
//   silent: !process.env.CI,

//   // For all available options, see:
//   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//   // Upload a larger set of source maps for prettier stack traces (increases build time)
//   widenClientFileUpload: true,

//   // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
//   // This can increase your server load as well as your hosting bill.
//   // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//   // side errors will fail.
//   // tunnelRoute: "/monitoring",

//   // Automatically tree-shake Sentry logger statements to reduce bundle size
//   disableLogger: true,

//   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//   // See the following for more information:
//   // https://docs.sentry.io/product/crons/
//   // https://vercel.com/docs/cron-jobs
//   automaticVercelMonitors: true,
// });
