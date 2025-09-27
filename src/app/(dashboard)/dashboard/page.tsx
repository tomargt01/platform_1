'use client';

import React, { useState } from 'react';
import { Tabs, TabItem } from '#/components/ui/base/Tabs';
import { FaHome, FaEnvelope, FaUser } from 'react-icons/fa';

const exampleTabs: TabItem[] = [
    {
        id: 'home',
        label: 'Home',
        icon: <FaHome />,
        content: <div>Home content here</div>,
    },
    {
        id: 'messages',
        label: 'Messages',
        badge: 5,
        icon: <FaEnvelope />,
        closable: true,
        content: <div>Messages content with badge</div>,
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: <FaUser />,
        disabled: false,
        content: <div>User Profile content</div>,
    },
    {
        id: 'disabled',
        label: 'Disabled',
        disabled: true,
        content: <div>This tab is disabled</div>,
    },
];

export default function TabsExample() {
    const [activeId, setActiveId] = useState('home');
    const [dynamicTabs, setDynamicTabs] = useState(exampleTabs);

    const handleTabClose = (id: string) => {
        setDynamicTabs((prev) => prev.filter((tab) => tab.id !== id));
        if (activeId === id && dynamicTabs.length > 1) {
            const nextTab = dynamicTabs.find((t) => t.id !== id);
            if (nextTab) setActiveId(nextTab.id);
        }
    };

    return (
        <div className="p-6 space-y-10">
            <h2 className="text-2xl font-semibold">Tabs Component Dashboard</h2>

            <section>
                <h3 className="mb-2 font-medium">Horizontal, Rounded, Medium (Default)</h3>
                <Tabs
                    tabs={dynamicTabs}
                    activeTabId={activeId}
                    onTabChange={setActiveId}
                    onTabClose={handleTabClose}
                    shape="rounded"
                    orientation="horizontal"
                    size="md"
                    theme="light"
                    scrollable
                    draggable
                    sticky
                    lazyLoad
                    keyboardNav
                    animated
                    multiRow
                    customSlotEnd={<button onClick={() => alert('Add tab clicked')} className="ml-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Add Tab</button>}
                />
            </section>

            <section>
                <h3 className="mb-2 font-medium">Vertical Tabs, Pill Shape, Large Size</h3>
                <Tabs
                    tabs={exampleTabs}
                    activeTabId={activeId}
                    onTabChange={setActiveId}
                    shape="pill"
                    orientation="vertical"
                    size="lg"
                    theme="dark"
                    scrollable={false}
                    draggable={false}
                />
            </section>

            <section>
                <h3 className="mb-2 font-medium">Underline Tabs, Small Size, Purple Theme</h3>
                <Tabs
                    tabs={exampleTabs}
                    activeTabId={activeId}
                    onTabChange={setActiveId}
                    shape="underline"
                    size="sm"
                    theme="purple"
                    scrollable
                    draggable
                />
            </section>

            {/* You can add more demos here for all requested variants */}
        </div>
    );
}
