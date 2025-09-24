'use client';

import React, { useState } from 'react';
import { Scrollspy } from '#/components/ui/base/Scrollspy';

const sampleSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'students', label: 'Students' },
    { id: 'academics', label: 'Academics' },
    { id: 'classes', label: 'Classes' },
];

const DashboardExample = () => {
    const [activeSection, setActiveSection] = useState(sampleSections[0].id);

    const handleSectionChange = (id: string) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="flex">
            <aside className="w-60 p-4 border-r sticky top-0 h-screen overflow-auto">
                <Scrollspy
                    items={sampleSections}
                    activeId={activeSection}
                    onChange={handleSectionChange}
                    theme="purple"
                    variant="left-border"
                    numbering="1234"
                />
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                {sampleSections.map((section) => (
                    <section key={section.id} id={section.id} className="mb-16">
                        <h2 className="text-xl font-semibold mb-3">{section.label}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim, nunc at
                            efficitur facilisis, nulla lacus interdum nisl, nec ornare arcu sapien eget metus.
                        </p>
                    </section>
                ))}
            </main>
        </div>
    );
};


export default DashboardExample;
