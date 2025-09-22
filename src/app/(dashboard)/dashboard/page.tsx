'use client';

import React, { useState } from 'react';
import {
    Home,
    Settings,
    Users,
    BarChart3,
    FileText,
    School,
    GraduationCap,
    Calendar,
    BookOpen,
    ChevronRight,
    ArrowRight,
    Slash,
    Dot,
    Triangle,
    Star,
    Heart,
    ArrowBigRight,
    MoveRight,
    ChevronDown,
    Plus,
    Minus,
    X
} from 'lucide-react';
import Breadcrumb from '#/components/ui/base/Breadcrumb/Breadcrumb';
import { BreadcrumbItem, Theme } from '#/components/ui/base/Breadcrumb/Breadcrumb.types';

const Dashboard: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>('light');
    const [currentSeparator, setCurrentSeparator] = useState<string>('chevron');

    // Sample breadcrumb data for different scenarios
    const breadcrumbScenarios = {
        dashboard: [
            { label: 'Dashboard', href: '/dashboard', icon: <Home /> }
        ],
        students: [
            { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
            { label: 'Students', href: '/students', icon: <Users /> },
        ],
        studentProfile: [
            { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
            { label: 'Students', href: '/students', icon: <Users /> },
            { label: 'Student Profile', href: '/students/123', icon: <GraduationCap /> },
        ],
        deepNavigation: [
            { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
            { label: 'Academic', href: '/academic', icon: <School /> },
            { label: 'Classes', href: '/academic/classes', icon: <BookOpen /> },
            { label: 'Class 10th', href: '/academic/classes/10', icon: <Calendar /> },
            { label: 'Section A', href: '/academic/classes/10/a', icon: <Users /> },
            { label: 'Attendance', href: '/academic/classes/10/a/attendance', icon: <BarChart3 /> },
            { label: 'Monthly Report', href: '/academic/classes/10/a/attendance/monthly', icon: <FileText /> },
        ],
    };

    // Custom separator options with actual icons
    const separatorOptions = {
        chevron: <ChevronRight className="w-4 h-4" />,
        arrow: <ArrowRight className="w-4 h-4" />,
        moveRight: <MoveRight className="w-4 h-4" />,
        arrowBig: <ArrowBigRight className="w-4 h-4" />,
        slash: <Slash className="w-4 h-4" />,
        dot: <Dot className="w-4 h-4" />,
        triangle: <Triangle className="w-3 h-3" />,
        star: <Star className="w-3 h-3" />,
        heart: <Heart className="w-3 h-3" />,
        plus: <Plus className="w-3 h-3" />,
        minus: <Minus className="w-3 h-3" />,
        chevronDown: <ChevronDown className="w-4 h-4" />,
        x: <X className="w-3 h-3" />,
        text: '→',
        textSlash: '/',
        textPipe: '|',
        textBullet: '•',
        textGreater: '>',
    };

    const getSeparatorIcon = () => {
        return separatorOptions[currentSeparator as keyof typeof separatorOptions] || separatorOptions.chevron;
    };

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        console.log('Breadcrumb clicked:', item, 'at index:', index);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Breadcrumb Component Testing Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Test different breadcrumb configurations with perfect alignment
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Customization Controls</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Theme Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Theme
                            </label>
                            <select
                                value={currentTheme}
                                onChange={(e) => setCurrentTheme(e.target.value as Theme)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="purple">Purple</option>
                                <option value="pink">Pink</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                            </select>
                        </div>

                        {/* Separator Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Separator Icon/Text
                            </label>
                            <select
                                value={currentSeparator}
                                onChange={(e) => setCurrentSeparator(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="chevron">Chevron Right (Icon)</option>
                                <option value="arrow">Arrow Right (Icon)</option>
                                <option value="moveRight">Move Right (Icon)</option>
                                <option value="arrowBig">Arrow Big Right (Icon)</option>
                                <option value="slash">Slash (Icon)</option>
                                <option value="dot">Dot (Icon)</option>
                                <option value="triangle">Triangle (Icon)</option>
                                <option value="star">Star (Icon)</option>
                                <option value="heart">Heart (Icon)</option>
                                <option value="plus">Plus (Icon)</option>
                                <option value="minus">Minus (Icon)</option>
                                <option value="chevronDown">Chevron Down (Icon)</option>
                                <option value="x">X (Icon)</option>
                                <option value="text">→ (Text)</option>
                                <option value="textSlash">/ (Text)</option>
                                <option value="textPipe">| (Text)</option>
                                <option value="textBullet">• (Text)</option>
                                <option value="textGreater">&gt; (Text)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Breadcrumb Examples */}
                <div className="space-y-6">

                    {/* Simple Dashboard */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Simple Dashboard Navigation</h3>
                        <Breadcrumb
                            items={breadcrumbScenarios.dashboard}
                            theme={currentTheme}
                            separator={getSeparatorIcon()}
                            size="md"
                            onItemClick={handleBreadcrumbClick}
                        />
                    </div>

                    {/* Students Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Students Section</h3>
                        <Breadcrumb
                            items={breadcrumbScenarios.students}
                            theme={currentTheme}
                            separator={getSeparatorIcon()}
                            size="md"
                            onItemClick={handleBreadcrumbClick}
                        />
                    </div>

                    {/* Student Profile */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Student Profile Page</h3>
                        <Breadcrumb
                            items={breadcrumbScenarios.studentProfile}
                            theme={currentTheme}
                            separator={getSeparatorIcon()}
                            size="md"
                            onItemClick={handleBreadcrumbClick}
                        />
                    </div>

                    {/* Deep Navigation with Overflow */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                        <h3 className="text-lg font-semibold mb-4">Deep Navigation (Overflow Handling)</h3>
                        <Breadcrumb
                            items={breadcrumbScenarios.deepNavigation}
                            theme={currentTheme}
                            separator={getSeparatorIcon()}
                            size="md"
                            maxItems={4}
                            onItemClick={handleBreadcrumbClick}
                        />
                    </div>

                    {/* Different Sizes with Perfect Alignment */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Different Sizes (Perfect Alignment)</h3>

                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-600 mb-3">Small Size</h4>
                                <Breadcrumb
                                    items={breadcrumbScenarios.studentProfile}
                                    theme={currentTheme}
                                    separator={getSeparatorIcon()}
                                    size="sm"
                                    onItemClick={handleBreadcrumbClick}
                                />
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-600 mb-3">Medium Size</h4>
                                <Breadcrumb
                                    items={breadcrumbScenarios.studentProfile}
                                    theme={currentTheme}
                                    separator={getSeparatorIcon()}
                                    size="md"
                                    onItemClick={handleBreadcrumbClick}
                                />
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-600 mb-3">Large Size</h4>
                                <Breadcrumb
                                    items={breadcrumbScenarios.studentProfile}
                                    theme={currentTheme}
                                    separator={getSeparatorIcon()}
                                    size="lg"
                                    onItemClick={handleBreadcrumbClick}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Custom Colors with Different Icons */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Custom Colors with Creative Separators</h3>

                        <div className="space-y-4">
                            {/* Heart separator */}
                            <div>
                                <h4 className="text-xs font-medium text-gray-500 mb-2">With Heart Separator</h4>
                                <Breadcrumb
                                    items={breadcrumbScenarios.studentProfile}
                                    theme={currentTheme}
                                    separator={<Heart className="w-3 h-3" />}
                                    size="md"
                                    customColors={{
                                        text: 'text-pink-600',
                                        activeText: 'text-pink-900',
                                        separator: 'text-pink-400',
                                    }}
                                    onItemClick={handleBreadcrumbClick}
                                />
                            </div>

                            {/* Star separator */}
                            <div>
                                <h4 className="text-xs font-medium text-gray-500 mb-2">With Star Separator</h4>
                                <Breadcrumb
                                    items={breadcrumbScenarios.studentProfile}
                                    theme={currentTheme}
                                    separator={<Star className="w-3 h-3" />}
                                    size="md"
                                    customColors={{
                                        text: 'text-yellow-600',
                                        activeText: 'text-yellow-900',
                                        separator: 'text-yellow-400',
                                    }}
                                    onItemClick={handleBreadcrumbClick}
                                />
                            </div>

                            {/* Text bullet separator */}
                            <div>
                                <h4 className="text-xs font-medium text-gray-500 mb-2">With Text Bullet Separator</h4>
                                <Breadcrumb
                                    items={breadcrumbScenarios.studentProfile}
                                    theme={currentTheme}
                                    separator="•"
                                    size="md"
                                    customColors={{
                                        text: 'text-indigo-600',
                                        activeText: 'text-indigo-900',
                                        separator: 'text-indigo-400',
                                    }}
                                    onItemClick={handleBreadcrumbClick}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Without Home Icon */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Without Home Icon</h3>
                        <Breadcrumb
                            items={breadcrumbScenarios.studentProfile}
                            theme={currentTheme}
                            separator={getSeparatorIcon()}
                            size="md"
                            showHomeIcon={false}
                            onItemClick={handleBreadcrumbClick}
                        />
                    </div>

                </div>

                {/* Usage Guide */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Usage Guide</h2>

                    <div className="prose max-w-none">
                        <h3 className="text-lg font-medium">Basic Usage with Custom Icon Separator:</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            {`import { Breadcrumb } from '@/components/ui-components/Breadcrumb';
import { Home, Users, Heart, Star, ArrowRight } from 'lucide-react';

const breadcrumbItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
  { label: 'Students', href: '/students', icon: <Users /> },
];

// With Icon Separator
<Breadcrumb
  items={breadcrumbItems}
  separator={<ArrowRight className="w-4 h-4" />}
  theme="light"
  size="md"
/>

// With Creative Icon Separators
<Breadcrumb
  items={breadcrumbItems}
  separator={<Heart className="w-3 h-3" />}
  theme="purple"
/>

<Breadcrumb
  items={breadcrumbItems}
  separator={<Star className="w-3 h-3" />}
  theme="blue"
/>`}
                        </pre>

                        <h3 className="text-lg font-medium mt-6">Text-based Custom Separators:</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            {`// Text separators
<Breadcrumb items={breadcrumbItems} separator="→" />
<Breadcrumb items={breadcrumbItems} separator="•" />
<Breadcrumb items={breadcrumbItems} separator="|" />
<Breadcrumb items={breadcrumbItems} separator=">" />`}
                        </pre>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
