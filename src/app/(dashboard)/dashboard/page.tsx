'use client';
import React from 'react';
import ThemeSwitcher from '#/components/ThemeSwitcher';
import { Card, CardAction, CardLink } from '#/components/ui/base/Card';

const CardDashboardTest = () => {
    const actions: CardAction[]=[
        { label: "Action 1", intent: "primary",size: 'sm', onClick: () => alert("Action 1") },
        { label: "Action 2", intent: "secondary",size: 'sm', onClick: () => alert("Action 2")
},
    ];
    const links: CardLink[] = [
    { label: "Link 1", intent: "ghost", size: 'sm', onClick: () => alert("Link 1") },
    { label: "Link 2", intent: "ghost", size: 'sm', onClick: () => alert("Link 2") },
];
return (
    <div className="p-[var(--pad16px)] grid gap-[var(--margin16px)]">
        <h1 className="color-[var(--text)]">Card Test Dashboard</h1>
        <ThemeSwitcher />
        {/* Default Card */}
        <Card
            intent="default"
            title="Default Card"
            description="This is a default card with global theme."
            actions={actions}
        />
        {/* Outlined Card */}
        <Card
            intent="outlined"
            title="Outlined Card"
            description="This card has a primary color border."
        />
        {/* Elevated Card */}
        <Card
            intent="elevated"
            title="Elevated Card"
            description="This card has a large shadow."
        />
        {/* Count Card */}
        <Card
            intent="count"
            title="Total Students"
            count="1,250"
        // icon={Users} // Uncomment when you have the icon
        />
        {/* Two Row Card */}
        <Card
            intent="twoRow"
            title="Attendance Summary"
            description="View detailed attendance reports."
            links={links}
            dataContent={<div className="color-[var(--text)]">Custom data here</div>}
        />
        {/* With Image */}
        <Card
            intent="default"
            title="School Building"
            description="Our beautiful school campus."
            imageSrc="/images/school.jpg"
            imageAlt="School Building"
        />
        {/* Different Sizes */}
        <Card intent="default" size="sm" title="Small Card" description="Compact size." />
        <Card intent="default" size="md" title="Medium Card" description="Standard size." />
        <Card intent="default" size="lg" title="Large Card" description="Larger size." />
    </div>
);
};

export default CardDashboardTest;
