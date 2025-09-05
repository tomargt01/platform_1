import RootLayout from './layout';

export const metadata = {
    title: 'SaaS ERP Platform',
    description: 'A scalable ERP solution built with Next.js and TypeScript',
};

export default function Root({ children }: { children: React.ReactNode }) {
    return <RootLayout>{children}</RootLayout>;
}
