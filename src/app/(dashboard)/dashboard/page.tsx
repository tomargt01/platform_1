"use client";

import { useState } from 'react';
import { AccordionItem, AccordionGroup } from '#/components/ui/base/Accordion';
import { Card } from '#/components/ui/base/Card';
import { Button } from '#/components/ui/base/Button';
import { Badge } from '#/components/ui/base/Badge';
import {
    Settings,
    User,
    Bell,
    Shield,
    CreditCard,
    HelpCircle,
    FileText,
    Globe,
    Zap,
    Heart,
    Star,
    Bookmark
} from 'lucide-react';

const AccordionTestDashboard = () => {
    const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'purple' | 'pink' | 'green' | 'blue'>('light');
    const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [selectedVariant, setSelectedVariant] = useState<'default' | 'bordered' | 'separated' | 'flush' | 'ghost'>('default');
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [showIcons, setShowIcons] = useState(true);

    // Sample accordion data
    const faqData = [
        {
            id: 'faq1',
            title: 'What is your return policy?',
            content: (
                <div>
                    <p>We offer a 30-day return policy for all items. Items must be in original condition with tags attached.</p>
                    <ul className="mt-2 ml-4 list-disc">
                        <li>Returns are processed within 5-7 business days</li>
                        <li>Original shipping costs are non-refundable</li>
                        <li>Customer is responsible for return shipping costs</li>
                    </ul>
                </div>
            ),
            defaultExpanded: true,
        },
        {
            id: 'faq2',
            title: 'How do I track my order?',
            content: (
                <div>
                    <p>You can track your order using the tracking number provided in your confirmation email.</p>
                    <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                            <strong>Pro tip:</strong> Create an account to view all your orders in one place!
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 'faq3',
            title: 'Do you offer international shipping?',
            content: (
                <div>
                    <p>Yes! We ship to over 50 countries worldwide.</p>
                    <div className="mt-3">
                        <h4 className="font-semibold">Shipping times:</h4>
                        <ul className="mt-1 ml-4 list-disc">
                            <li>US & Canada: 3-5 business days</li>
                            <li>Europe: 5-7 business days</li>
                            <li>Asia & Australia: 7-10 business days</li>
                            <li>Rest of world: 10-15 business days</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            id: 'faq4',
            title: 'What payment methods do you accept?',
            content: (
                <div>
                    <p>We accept all major payment methods:</p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                            <h4 className="font-semibold">Credit Cards:</h4>
                            <ul className="list-disc ml-4">
                                <li>Visa</li>
                                <li>Mastercard</li>
                                <li>American Express</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Digital Wallets:</h4>
                            <ul className="list-disc ml-4">
                                <li>PayPal</li>
                                <li>Apple Pay</li>
                                <li>Google Pay</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'faq5',
            title: 'How can I contact customer support?',
            content: (
                <div>
                    <p>We're here to help! Contact us through any of these methods:</p>
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                            <Bell className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Email: support@example.com</span>
                        </div>
                        <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-green-500" />
                            <span>Live Chat: Available 24/7</span>
                        </div>
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-purple-500" />
                            <span>Phone: 1-800-123-4567</span>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    const settingsData = [
        {
            id: 'account',
            title: 'Account Settings',
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Display Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter your display name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="your@email.com"
                        />
                    </div>
                    <Button size="sm">Save Changes</Button>
                </div>
            ),
        },
        {
            id: 'privacy',
            title: 'Privacy & Security',
            content: (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span>Two-factor Authentication</span>
                        <Badge intent="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Data Export</span>
                        <Button intent="secondary" size="sm">Download</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Account Deletion</span>
                        <Button intent="destructive" size="sm">Delete Account</Button>
                    </div>
                </div>
            ),
        },
        {
            id: 'notifications',
            title: 'Notification Preferences',
            content: (
                <div className="space-y-3">
                    {[
                        'Email notifications',
                        'Push notifications',
                        'SMS notifications',
                        'Marketing emails'
                    ].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                            <span>{item}</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    const themes: Array<typeof selectedTheme> = ['light', 'dark', 'purple', 'pink', 'green', 'blue'];
    const sizes: Array<typeof selectedSize> = ['sm', 'md', 'lg'];
    const variants: Array<typeof selectedVariant> = ['default', 'bordered', 'separated', 'flush', 'ghost'];

    return (
        <div className=" space-y-2 min-h-screen">
            {/* Header Controls */}

                <div>
                    <label className="text-sm font-medium mb-2 block">Theme:</label>
                    <div className="flex flex-wrap gap-2">
                        {themes.map(theme => (
                            <Button
                                key={theme}
                                onClick={() => setSelectedTheme(theme)}
                                intent={selectedTheme === theme ? "primary" : "secondary"}
                                size="sm"
                                className="capitalize"
                            >
                                {theme}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Size Selection */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Size:</label>
                    <div className="flex gap-2">
                        {sizes.map(size => (
                            <Button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                intent={selectedSize === size ? "primary" : "secondary"}
                                size="sm"
                                className="uppercase"
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Variant Selection */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Variant:</label>
                    <div className="flex flex-wrap gap-2">
                        {variants.map(variant => (
                            <Button
                                key={variant}
                                onClick={() => setSelectedVariant(variant)}
                                intent={selectedVariant === variant ? "primary" : "secondary"}
                                size="sm"
                                className="capitalize"
                            >
                                {variant}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Options */}
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={allowMultiple}
                            onChange={(e) => setAllowMultiple(e.target.checked)}
                            className="mr-2"
                        />
                        Allow Multiple Open
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={showIcons}
                            onChange={(e) => setShowIcons(e.target.checked)}
                            className="mr-2"
                        />
                        Show Icons
                    </label>
                </div>


            {/* Single Accordion Items */}

                <AccordionItem
                    title="Simple Accordion Item"
                    theme={selectedTheme}
                    size={selectedSize}
                    variant={selectedVariant}
                    showIcon={showIcons}
                >
                    <p>This is a simple accordion item with basic content. Perfect for FAQ sections or collapsible content areas.</p>
                </AccordionItem>

                <AccordionItem
                    title="Accordion with Icon"
                    theme={selectedTheme}
                    size={selectedSize}
                    variant={selectedVariant}
                    icon={<Settings />}
                    showIcon={showIcons}
                    defaultExpanded
                >
                    <div>
                        <p>This accordion item includes a custom icon in the header.</p>
                        <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                            <p className="text-sm text-yellow-800">
                                Icons help users quickly identify content categories!
                            </p>
                        </div>
                    </div>
                </AccordionItem>

                <AccordionItem
                    title="Disabled Accordion"
                    theme={selectedTheme}
                    size={selectedSize}
                    variant={selectedVariant}
                    disabled
                    icon={<Shield />}
                    showIcon={showIcons}
                >
                    <p>This content cannot be accessed because the accordion is disabled.</p>
                </AccordionItem>

                <AccordionItem
                    title="Rich Content Accordion"
                    theme={selectedTheme}
                    size={selectedSize}
                    variant={selectedVariant}
                    icon={<Zap />}
                    showIcon={showIcons}
                >
                    <div className="space-y-4">
                        <h3 className="font-semibold">Advanced Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-50 rounded-md">
                                <h4 className="font-semibold text-blue-800">Feature 1</h4>
                                <p className="text-sm text-blue-600">Advanced analytics and reporting</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-md">
                                <h4 className="font-semibold text-green-800">Feature 2</h4>
                                <p className="text-sm text-green-600">Real-time collaboration tools</p>
                            </div>
                        </div>
                        <Button size="sm" className="mt-3">Learn More</Button>
                    </div>
                </AccordionItem>


            {/* FAQ Accordion Group */}

                <AccordionGroup
                items={faqData}
                theme={selectedTheme}
                size={selectedSize}
                variant={selectedVariant}
                allowMultiple={allowMultiple}
                defaultExpandedItems={['faq1']}
                    />


            {/* Settings Accordion Group */}

                <AccordionGroup
                    items={settingsData.map((item, index) => ({
                        ...item,
                        content: (
                            <div className="accordion-content-wrapper">
                                {item.content}
                            </div>
                        )
                    }))}
                    theme={selectedTheme}
                    size={selectedSize}
                    variant={selectedVariant}
                    allowMultiple={allowMultiple}
                />


            {/* Different Variants Showcase */}

                {variants.map(variant => (
                    <div key={variant}>
                        <h3 className="text-sm font-semibold mb-3 capitalize">{variant} Variant</h3>
                        <AccordionGroup
                            items={[
                                {
                                    id: `${variant}-1`,
                                    title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Example 1`,
                                    content: `This is an example of the ${variant} variant. Each variant has its own unique styling and appearance.`,
                                },
                                {
                                    id: `${variant}-2`,
                                    title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Example 2`,
                                    content: (
                                        <div>
                                            <p>This variant showcases different visual styles:</p>
                                            <ul className="mt-2 ml-4 list-disc">
                                                <li>Custom border styling</li>
                                                <li>Different spacing</li>
                                                <li>Unique visual hierarchy</li>
                                            </ul>
                                        </div>
                                    ),
                                },
                            ]}
                            theme={selectedTheme}
                            size="md"
                            variant={variant}
                            allowMultiple={true}
                        />
                    </div>
                ))}


            {/* Size Comparison */}

                {sizes.map(size => (
                    <div key={size}>
                        <h3 className="text-sm font-semibold mb-3 uppercase">{size} Size</h3>
                        <AccordionItem
                            title={`This is ${size.toUpperCase()} size accordion`}
                            theme={selectedTheme}
                            size={size}
                            variant="default"
                            icon={<Star />}
                            showIcon={showIcons}
                        >
                            <p>
                                The {size} size provides {size === 'sm' ? 'compact' : size === 'md' ? 'balanced' : 'spacious'} spacing
                                for {size === 'sm' ? 'mobile interfaces' : size === 'md' ? 'general use' : 'desktop applications'}.
                            </p>
                        </AccordionItem>
                    </div>
                ))}


            {/* Interactive Demo */}

                <AccordionGroup
                    items={[
                        {
                            id: 'demo1',
                            title: 'Click to expand this section',
                            content: (
                                <div>
                                    <p>Great! You've expanded this section. Here are some interactive elements:</p>
                                    <div className="mt-3 space-y-2">
                                        <Button size="sm" intent="secondary">Button 1</Button>
                                        <Button size="sm" intent="secondary">Button 2</Button>
                                        <Button size="sm" intent="secondary">Button 3</Button>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            id: 'demo2',
                            title: 'Nested content example',
                            content: (
                                <div>
                                    <p>This section contains nested accordions:</p>
                                    <div className="mt-3">
                                        <AccordionItem
                                            title="Nested Accordion 1"
                                            theme={selectedTheme}
                                            size="sm"
                                            variant="ghost"
                                        >
                                            <p>This is nested content inside another accordion!</p>
                                        </AccordionItem>
                                        <AccordionItem
                                            title="Nested Accordion 2"
                                            theme={selectedTheme}
                                            size="sm"
                                            variant="ghost"
                                        >
                                            <p>Nested accordions are perfect for complex hierarchical content.</p>
                                        </AccordionItem>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            id: 'demo3',
                            title: 'Form inside accordion',
                            content: (
                                <div>
                                    <form className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name</label>
                                            <input type="text" className="w-full p-2 border rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Message</label>
                                            <textarea className="w-full p-2 border rounded-md" rows={3}></textarea>
                                        </div>
                                        <Button size="sm">Submit</Button>
                                    </form>
                                </div>
                            ),
                        },
                    ]}
                    theme={selectedTheme}
                    size={selectedSize}
                    variant={selectedVariant}
                    allowMultiple={allowMultiple}
                />

        </div>
    );
};

export default AccordionTestDashboard;
