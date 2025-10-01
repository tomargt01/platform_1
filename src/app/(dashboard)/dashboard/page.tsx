'use client';
import React, { useState, useEffect } from 'react';
import { BreadcrumbItem } from '#/components/ui/base/Breadcrumb';
import ThemeSwitcher from '#/components/ThemeSwitcher';
import Breadcrumb from '#/components/ui/base/Breadcrumb/Breadcrumb';

// Example dashboard page to test Breadcrumb
const BreadcrumbDashboardTest = () => {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'Home', href: '/', },//icon: <Home size={14} />
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', href: '/settings', isActive: true },
    ];

    return (
        <div
            style={{
                padding: '16px',
                border: '1px solid var(--borderColor)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--background)',
                color: 'var(--text)'
            }}
        >
            <h1 style={{ marginTop: 0 }}>Breadcrumb Test Dashboard</h1>
            <ThemeSwitcher />
            <div style={{ margin: '8px 0 16px' }}>
                <Breadcrumb
                    items={breadcrumbItems}
                    size="md"
                    separator="›"
                    showHomeIcon={false}
                    maxItems={5}
                    onItemClick={(item, index) => console.log(item, index)}
                />
                <Breadcrumb
                    items={breadcrumbItems}
                    size="md"
                    separator="#"
                    showHomeIcon={false}
                    maxItems={5}
                    onItemClick={(item, index) => console.log(item, index)}
                />
            </div>
            <p style={{ marginTop: '24px' }}>
                Theme switch will update colors globally. No manual theme prop is passed to Breadcrumb.
            </p>
        </div>
    );
};

export default BreadcrumbDashboardTest;
