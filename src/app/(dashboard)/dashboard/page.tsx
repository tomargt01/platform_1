import { Container } from '#/components/ui/layout/Container';

export default function ContainerDemoPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Container variant="fluid" className="bg-gray-300">
                <div className="bg-white p-4">Container Fluid</div>
                <Container variant="container" className="bg-gray-400 mt-8">
                    <div className="bg-white p-4">Container</div>
                    <Container variant="custom1" className="bg-gray-500 mt-8">
                        <div className="bg-white p-4">Custom Container 1</div>
                        <Container variant="custom2" className="bg-gray-600 mt-8">
                            <div className="bg-white p-4">Custom Container 2</div>
                            <Container variant="custom3" className="bg-gray-700 mt-8">
                                <div className="bg-white p-4">Custom Container 3</div>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </div>
    );
}







// // src/pages/ui/typography.tsx
// import { Typography } from '#/components/ui/Content/Typography';

// export default function TypographyDashboard() {
//     return (
//         <div className="p-6 space-y-6">
//             <h1 className="text-2xl font-bold mb-4">Typogrphy Test Dashboard</h1>
//             <Typography as="h1">Heading 1 (h1)</Typography>
//             <Typography as="h2">Heading 2 (h2)</Typography>
//             <Typography as="h3">Heading 3 (h3)</Typography>
//             <Typography as="h4">Heading 4 (h4)</Typography>
//             <Typography as="h5">Heading 5 (h5)</Typography>
//             <Typography as="h6">Heading 6 (h6)</Typography>
//             <Typography as="p">
//                 Paragraph (p) — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </Typography>
//             <Typography as="span" color="primary">
//                 Span with primary color
//             </Typography>
//             <Typography as="span" color="secondary">
//                 Span with primary color
//             </Typography>
//             <Typography as="span" color="accent">
//                 Span with primary color
//             </Typography>
//             <Typography as="span" color="lightBg">
//                 Span with primary color
//             </Typography>
//             <Typography as="span">
//                 Regular span — Resize your window to see responsive sizing
//             </Typography>
//             <Typography as="span" className="spanlg">
//                 span.spanlg (large span)
//             </Typography>
//             <Typography as="span" className="spanmd">
//                 span.spanmd (medium span)
//             </Typography>
//             <Typography as="span" className="spansm">
//                 span.spansm (small span)
//             </Typography>
//             <Typography as="span" className="spanxl">
//                 span.spanxl (extra large span)
//             </Typography>
//             <Typography as="strong">Bold text (strong)</Typography>
//             <Typography as="em">Italic text (em)</Typography>
//             {/* <Typography as="u">Underline text (u)</Typography> */}
//             <Typography as="small">Small text (small)</Typography>
//             <Typography as="mark">Highlighted text (mark)</Typography>
//         </div>
//     );
// }
