'use client';

import React, { useState } from 'react';
import {
    User,
    Settings,
    LogOut,
    Edit,
    Trash,
    Eye,
    Heart,
    Star,
    Home,
    Building,
    Users,
    Calendar,
    Mail,
    Phone,
    Globe,
    Code,
    Database,
    Server
} from 'lucide-react';
import { DropdownMenu, DropdownSelect, DropdownMultiSelect } from '#/components/ui/base/Dropdown';
import type { DropdownOption, Theme } from '#/components/ui/base/Dropdown';

const Dashboard = () => {
    const [selectedTheme, setSelectedTheme] = useState<Theme>('light');
    const [selectedUser, setSelectedUser] = useState<string | number | null>(null);
    const [selectedTechnologies, setSelectedTechnologies] = useState<(string | number)[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | number | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<(string | number)[]>([]);

    // Sample data
    const themes: DropdownOption[] = [
        { id: 1, label: 'Light Theme', value: 'light', icon: <Sun className="w-4 h-4" /> },
        { id: 2, label: 'Dark Theme', value: 'dark', icon: <Moon className="w-4 h-4" /> },
        { id: 3, label: 'Purple Theme', value: 'purple', icon: <Palette className="w-4 h-4" /> },
        { id: 4, label: 'Pink Theme', value: 'pink', icon: <Heart className="w-4 h-4" /> },
        { id: 5, label: 'Green Theme', value: 'green', icon: <Leaf className="w-4 h-4" /> },
        { id: 6, label: 'Blue Theme', value: 'blue', icon: <Droplets className="w-4 h-4" /> },
    ];

    const userMenuOptions: DropdownOption[] = [
        { id: 1, label: 'Profile', value: 'profile', icon: <User />, description: 'View and edit profile' },
        { id: 2, label: 'Settings', value: 'settings', icon: <Settings />, description: 'Application settings' },
        { id: 3, label: 'Help', value: 'help', icon: <Calculator />, description: 'Get help and support' },
        { id: 4, label: 'Logout', value: 'logout', icon: <LogOut />, description: 'Sign out of account' },
    ];

    const actionMenuOptions: DropdownOption[] = [
        { id: 1, label: 'Edit', value: 'edit', icon: <Edit /> },
        { id: 2, label: 'View', value: 'view', icon: <Eye /> },
        { id: 3, label: 'Delete', value: 'delete', icon: <Trash /> },
    ];

    const userOptions: DropdownOption[] = [
        { id: 1, label: 'John Doe', value: 1, icon: <User />, description: 'Administrator' },
        { id: 2, label: 'Jane Smith', value: 2, icon: <User />, description: 'Teacher' },
        { id: 3, label: 'Bob Johnson', value: 3, icon: <User />, description: 'Student' },
        { id: 4, label: 'Alice Brown', value: 4, icon: <User />, description: 'Parent', disabled: true },
    ];

    const technologyOptions: DropdownOption[] = [
        { id: 1, label: 'React', value: 'react', icon: <Code />, category: 'Frontend' },
        { id: 2, label: 'Next.js', value: 'nextjs', icon: <Server />, category: 'Frontend' },
        { id: 3, label: 'TypeScript', value: 'typescript', icon: <Code />, category: 'Language' },
        { id: 4, label: 'JavaScript', value: 'javascript', icon: <Code />, category: 'Language' },
        { id: 5, label: 'Node.js', value: 'nodejs', icon: <Server />, category: 'Backend' },
        { id: 6, label: 'MongoDB', value: 'mongodb', icon: <Database />, category: 'Database' },
        { id: 7, label: 'PostgreSQL', value: 'postgresql', icon: <Database />, category: 'Database' },
    ];

    const countryOptions: DropdownOption[] = [
        { id: 1, label: 'India', value: 'in', icon: <Globe /> },
        { id: 2, label: 'United States', value: 'us', icon: <Globe /> },
        { id: 3, label: 'United Kingdom', value: 'uk', icon: <Globe /> },
        { id: 4, label: 'Canada', value: 'ca', icon: <Globe /> },
        { id: 5, label: 'Australia', value: 'au', icon: <Globe /> },
    ];

    const subjectOptions: DropdownOption[] = [
        { id: 1, label: 'Mathematics', value: 'math', icon: <Calculator /> },
        { id: 2, label: 'Physics', value: 'physics', icon: <Atom /> },
        { id: 3, label: 'Chemistry', value: 'chemistry', icon: <Flask /> },
        { id: 4, label: 'Biology', value: 'biology', icon: <Dna /> },
        { id: 5, label: 'English', value: 'english', icon: <BookOpen /> },
        { id: 6, label: 'History', value: 'history', icon: <Clock /> },
        { id: 7, label: 'Geography', value: 'geography', icon: <Map /> },
    ];

    // Custom colors for testing
    const customPurpleColors = {
        background: 'bg-purple-50',
        border: 'border-purple-300',
        text: 'text-purple-900',
        hoverBackground: 'hover:bg-purple-100',
        selectedBackground: 'bg-purple-200',
        selectedText: 'text-purple-800',
        iconColor: 'text-purple-600',
    };

    const customGreenColors = {
        background: 'bg-green-50',
        border: 'border-green-400',
        text: 'text-green-900',
        hoverBackground: 'hover:bg-green-100',
        selectedBackground: 'bg-green-200',
        selectedText: 'text-green-800',
        iconColor: 'text-green-600',
    };

    return (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${selectedTheme === 'dark'
                ? 'bg-gray-900 text-white'
                : selectedTheme === 'purple'
                    ? 'bg-purple-50 text-purple-900'
                    : selectedTheme === 'pink'
                        ? 'bg-pink-50 text-pink-900'
                        : selectedTheme === 'green'
                            ? 'bg-green-50 text-green-900'
                            : selectedTheme === 'blue'
                                ? 'bg-blue-50 text-blue-900'
                                : 'bg-gray-50 text-gray-900'
            }`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Dropdown Components Testing Dashboard</h1>
                    <p className="opacity-70">Test करें सभी dropdown variants के साथ themes और custom colors</p>
                </div>

                {/* Theme Selector */}
                <div className="mb-8 p-6 rounded-lg bg-white/10 ">
                    <h2 className="text-xl font-semibold mb-4">Theme Selection</h2>
                    <div className="w-64">
                        <DropdownSelect
                            label="Select Theme"
                            options={themes}
                            value={selectedTheme}
                            onChange={(value) => setSelectedTheme(value as Theme)}
                            theme={selectedTheme}
                            size="md"
                            searchable
                            clearable
                            showIcons
                        />
                    </div>
                </div>

                {/* Dropdown Menu Examples */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 rounded-lg bg-white/10 ">
                        <h3 className="font-semibold mb-4">Dropdown Menu - User Actions</h3>
                        <div className="flex flex-wrap gap-4">
                            <DropdownMenu
                                trigger={
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        <User className="w-4 h-4" />
                                        <span>User Menu</span>
                                    </button>
                                }
                                options={userMenuOptions}
                                onOptionClick={(option) => console.log('User action:', option)}
                                theme={selectedTheme}
                                size="md"
                                showIcons
                                showDescriptions
                            />

                            <DropdownMenu
                                options={actionMenuOptions}
                                onOptionClick={(option) => console.log('Action:', option)}
                                theme={selectedTheme}
                                size="sm"
                                showIcons
                            />
                        </div>
                    </div>

                    <div className="p-6 rounded-lg bg-white/10 ">
                        <h3 className="font-semibold mb-4">Custom Colors Example</h3>
                        <DropdownMenu
                            trigger={
                                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                    <Star className="w-4 h-4" />
                                    <span>Custom Menu</span>
                                </button>
                            }
                            options={actionMenuOptions}
                            onOptionClick={(option) => console.log('Custom action:', option)}
                            theme={selectedTheme}
                            size="md"
                            customColors={customPurpleColors}
                            showIcons
                        />
                    </div>

                    <div className="p-6 rounded-lg bg-white/10 ">
                        <h3 className="font-semibold mb-4">Large Size Menu</h3>
                        <DropdownMenu
                            options={userMenuOptions}
                            onOptionClick={(option) => console.log('Large menu:', option)}
                            theme={selectedTheme}
                            size="lg"
                            showIcons
                            showDescriptions
                        />
                    </div>
                </div>

                {/* Dropdown Select Examples */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 rounded-lg bg-white/10 ">
                        <h3 className="font-semibold mb-4">Dropdown Select Examples</h3>
                        <div className="space-y-4">
                            <DropdownSelect
                                label="Select User"
                                options={userOptions}
                                value={selectedUser}
                                onChange={setSelectedUser}
                                theme={selectedTheme}
                                size="md"
                                placeholder="Choose a user..."
                                searchable
                                clearable
                                showIcons
                                required
                            />

                            <DropdownSelect
                                label="Select Country"
                                options={countryOptions}
                                value={selectedCountry}
                                onChange={setSelectedCountry}
                                theme={selectedTheme}
                                size="sm"
                                placeholder="Choose country..."
                                showIcons
                            />
                        </div>
                    </div>

                    <div className="p-6 rounded-lg bg-white/10 ">
                        <h3 className="font-semibold mb-4">Custom Colors Select</h3>
                        <DropdownSelect
                            label="Technologies (Custom Style)"
                            options={technologyOptions.slice(0, 4)}
                            value={selectedUser}
                            onChange={setSelectedUser}
                            theme={selectedTheme}
                            size="md"
                            customColors={customGreenColors}
                            placeholder="Select technology..."
                            searchable
                            showIcons
                        />
                    </div>
                </div>

                {/* Multi-Select Examples */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 rounded-lg bg-white/10 ">
                        <h3 className="font-semibold mb-4">Multi-Select Examples</h3>
                        <div className="space-y-4">
                            <DropdownMultiSelect
                                label="Select Technologies"
                                options={technologyOptions}
                                value={selectedTechnologies}
                                onChange={setSelectedTechnologies}
                                theme={selectedTheme}
                                size="md"
                                placeholder="Choose technologies..."
                                searchable
                                clearable
                                showIcons
                                selectAllOption
                                maxSelectedShow={2}
                                groupByCategory
                            />

                            <DropdownMultiSelect
                                label="Select Subjects"
                                options={subjectOptions}
                                value={selectedSubjects}
                                onChange={setSelectedSubjects}
                                theme={selectedTheme}
                                size="sm"
                                placeholder="Choose subjects..."
                                showIcons
                                maxSelectedShow={3}
                            />
                        </div>
                    </div>

                    <div className="p-6 rounded-lg bg-white/10 ">
                        <h3 className="font-semibold mb-4">Advanced Multi-Select</h3>
                        <DropdownMultiSelect
                            label="Advanced Selection (Custom)"
                            options={technologyOptions}
                            value={selectedTechnologies}
                            onChange={setSelectedTechnologies}
                            theme={selectedTheme}
                            size="lg"
                            customColors={customPurpleColors}
                            placeholder="Advanced selection..."
                            searchable
                            clearable
                            showIcons
                            selectAllOption
                            maxSelectedShow={1}
                            groupByCategory
                        />
                    </div>
                </div>

                {/* Size Comparison */}
                <div className="p-6 rounded-lg bg-white/10  mb-8">
                    <h3 className="font-semibold mb-4">Size Comparison</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h4 className="text-sm font-medium mb-2">Small Size</h4>
                            <DropdownSelect
                                options={countryOptions.slice(0, 3)}
                                value={null}
                                onChange={() => { }}
                                theme={selectedTheme}
                                size="sm"
                                placeholder="Small dropdown..."
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-2">Medium Size</h4>
                            <DropdownSelect
                                options={countryOptions.slice(0, 3)}
                                value={null}
                                onChange={() => { }}
                                theme={selectedTheme}
                                size="md"
                                placeholder="Medium dropdown..."
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-2">Large Size</h4>
                            <DropdownSelect
                                options={countryOptions.slice(0, 3)}
                                value={null}
                                onChange={() => { }}
                                theme={selectedTheme}
                                size="lg"
                                placeholder="Large dropdown..."
                            />
                        </div>
                    </div>
                </div>

                {/* Current Selections Display */}
                <div className="p-6 rounded-lg bg-white/10 ">
                    <h3 className="font-semibold mb-4">Current Selections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                            <strong>Theme:</strong> {selectedTheme}
                        </div>
                        <div>
                            <strong>Selected User:</strong> {
                                selectedUser
                                    ? userOptions.find(u => u.value === selectedUser)?.label
                                    : 'None'
                            }
                        </div>
                        <div>
                            <strong>Selected Country:</strong> {
                                selectedCountry
                                    ? countryOptions.find(c => c.value === selectedCountry)?.label
                                    : 'None'
                            }
                        </div>
                        <div>
                            <strong>Technologies:</strong> {selectedTechnologies.length} selected
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Missing icons (add these imports at the top)
const Sun = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
);

const Moon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const Palette = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
);

const Leaf = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
);

const Droplets = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2.26 4.89 4.56 6.96A7.58 7.58 0 0 1 20 15a4 4 0 0 1-7.78 1.3" />
    </svg>
);

const Calculator = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="10" x2="16" y2="10" />
        <line x1="12" y1="10" x2="12" y2="10" />
        <line x1="8" y1="10" x2="8" y2="10" />
        <line x1="16" y1="14" x2="16" y2="14" />
        <line x1="12" y1="14" x2="12" y2="14" />
        <line x1="8" y1="14" x2="8" y2="14" />
        <line x1="16" y1="18" x2="16" y2="18" />
        <line x1="12" y1="18" x2="12" y2="18" />
        <line x1="8" y1="18" x2="8" y2="18" />
    </svg>
);

const Atom = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="1" />
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5" />
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5" />
    </svg>
);

const Flask = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 3V9l-4 6.5c0 4.5 5 4.5 5 4.5h4s5 0 5-4.5L15 9V3" />
        <path d="M9 3h6" />
    </svg>
);

const Dna = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M2 15c6.67-6 13.33 0 20-6" />
        <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
        <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
        <path d="M17 6.1c.64.64 1.095 1.23 1.427 1.8" />
        <path d="M12.04 7.888c-.04.002-.082.014-.124.025" />
        <path d="M22 9c-6.67 6-13.33 0-20 6" />
    </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const Clock = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
    </svg>
);

const Map = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
);

export default Dashboard;
