'use client';
import React from 'react';
import { Autocomplete, AutocompleteIntent } from '#/components/ui/base/Autocomplete';
import ThemeSwitcher from '#/components/ThemeSwitcher';

const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
];

export default function AutocompleteDashboard() {
    return (
        <div className="p-6 space-y-6 bg-[var(--background)]">
            <h1 className="text-2xl font-bold">Autocomplete Component Dashboard</h1>
            <ThemeSwitcher />
            <h2 className="text-xl mt-6">Variants</h2>
            {(['primary', 'secondary', 'ghost', 'destructive', 'success', 'warning'] as AutocompleteIntent[]).map(intent => (
                <div key={intent} className="mb-4">
                    <p className="font-medium">{intent}</p>
                    <Autocomplete
                        intent={intent}
                        options={options}
                        label={`${intent} variant`}
                        filterType="contains"
                        size="md"
                    />
                </div>
            ))}
            <h2 className="text-xl mt-6">Sizes</h2>
            {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size} className="mb-4">
                    <p className="font-medium">{size}</p>
                    <Autocomplete
                        intent="primary"
                        options={options}
                        label={`${size} size`}
                        size={size}
                    />
                </div>
            ))}
            <h2 className="text-xl mt-6">Other modes</h2>
            <div className="space-y-4">
                <Autocomplete
                    intent="primary"
                    options={options}
                    label="Multiple selection"
                    multiple
                />
                <Autocomplete
                    intent="primary"
                    options={options}
                    label="Disabled"
                    disabled
                />
                <Autocomplete
                    intent="primary"
                    options={options}
                    label="Custom colors"
                    customColors={{
                        background: '#fffaf4',
                        border: '#e1c7a7',
                        text: '#3a3a3a',
                        selectedOption: '#d65c13',
                        noResultsText: '#888',
                    }}
                />
            </div>
        </div>
    );
}





// 'use client';

// import { Alert } from '#/components/ui/base/Alert';
// import { AlertAction } from '#/components/ui/base/Alert/Alert.types';
// import ThemeSwitcher from '#/components/ThemeSwitcher';

// export default function AlertDashboardPage() {
//     const alertActions: AlertAction[] = [
//         { label: 'View', onClick: () => alert('View') },
//         { label: 'Ignore', onClick: () => alert('Ignored'), intent: 'secondary' }
//     ];

//     return (
//         <div className="p-6 space-y-6 bg-[var(--background)]">
//             <h1 className="text-2xl font-bold">Alert Component Dashboard</h1>
//             <ThemeSwitcher />
//             <div className="space-y-4">
//                 <Alert
//                     title="Information"
//                     description="This is an informational alert."
//                     intent="info"
//                     showTimestamp
//                     dismissible
//                     actions={alertActions}
//                 />
//                 <Alert
//                     title="Success!"
//                     description="Your action was successful."
//                     intent="success"
//                     dismissible
//                 />
//                 <Alert
//                     title="Warning"
//                     description="Something might be wrong."
//                     intent="warning"
//                     dismissible
//                     actions={alertActions}
//                 />
//                 <Alert
//                     title="Error"
//                     description="Something went wrong."
//                     intent="error"
//                     dismissible
//                 />
//                 <Alert
//                     title="Critical"
//                     description="This is urgent!"
//                     intent="critical"
//                     dismissible
//                 />
//             </div>
//         </div>
//     );
// }







// // src/app/(dashboard)/accordion/page.tsx
// 'use client';

// import { AccordionGroup } from '#/components/ui/base/Accordion';
// import ThemeSwitcher from '#/components/ThemeSwitcher';

// const items = [
//     { id: '1', title: 'Default', content: 'Content for default accordion' },
//     { id: '2', title: 'Bordered', content: 'Content for bordered accordion' },
//     { id: '3', title: 'Separated', content: 'Content for separated accordion', disabled: true },
//     { id: '4', title: 'Flush', content: 'Content for flush accordion' },
//     { id: '5', title: 'Ghost', content: 'Content for ghost accordion' },
// ];

// export default function AccordionDashboard() {
//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-6">Accordion Component Test</h1>
//             <ThemeSwitcher />

//             <section className="mb-8 mt-6">
//                 <h2 className="text-lg font-semibold mb-3">Default Size (md)</h2>
//                 <AccordionGroup items={items} />
//             </section>

//             <section className="mb-8">
//                 <h2 className="text-lg font-semibold mb-3">Small Size</h2>
//                 <AccordionGroup items={items} size="sm" />
//             </section>

//             <section className="mb-8">
//                 <h2 className="text-lg font-semibold mb-3">Large Size</h2>
//                 <AccordionGroup items={items} size="lg" />
//             </section>

//             <section className="mb-8">
//                 <h2 className="text-lg font-semibold mb-3">Bordered Variant</h2>
//                 <AccordionGroup items={items} variant="bordered" />
//             </section>

//             <section className="mb-8">
//                 <h2 className="text-lg font-semibold mb-3">Separated Variant</h2>
//                 <AccordionGroup items={items} variant="separated" />
//             </section>

//             <section className="mb-8">
//                 <h2 className="text-lg font-semibold mb-3">Flush Variant</h2>
//                 <AccordionGroup items={items} variant="flush" />
//             </section>

//             <section className="mb-8">
//                 <h2 className="text-lg font-semibold mb-3">Ghost Variant</h2>
//                 <AccordionGroup items={items} variant="ghost" />
//             </section>
//         </div>
//     );
// }
