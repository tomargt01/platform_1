'use client';

import React, { useState } from 'react';
import {OffCanvas} from '#/components/ui/base/OffCanvas';
import NavigationDrawer from '#/components/ui/base/OffCanvas/variants/NavigationDrawer';
import FilterDrawer from '#/components/ui/base/OffCanvas/variants/FilterDrawer';
import {
    Menu,
    Filter,
    Bell,
    Settings,
    Search,
    Plus,
    MoreVertical,
    TrendingUp,
    Users,
    BookOpen,
    Calendar
} from 'lucide-react';

const DashboardTestPage = () => {
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
    const [animationType, setAnimationType] = useState<'slide' | 'push' | 'overlay' | 'scale'>('slide');
    const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple' | 'pink' | 'green' | 'blue'>('light');

    const openDrawer = (drawer: string) => setActiveDrawer(drawer);
    const closeDrawer = () => setActiveDrawer(null);

    const filterOptions = [
        {
            key: 'grade',
            label: 'Grade Level',
            type: 'select' as const,
            options: [
                { value: '1', label: 'Grade 1' },
                { value: '2', label: 'Grade 2' },
                { value: '3', label: 'Grade 3' },
                { value: '4', label: 'Grade 4' },
                { value: '5', label: 'Grade 5' },
            ]
        },
        {
            key: 'attendance',
            label: 'Attendance Rate',
            type: 'range' as const,
            min: 0,
            max: 100,
            value: 80
        },
        {
            key: 'active',
            label: 'Active Students Only',
            type: 'checkbox' as const
        }
    ];

    const stats = [
        { label: 'Total Students', value: '1,234', icon: <Users className="w-6 h-6" />, color: 'text-blue-600' },
        { label: 'Active Courses', value: '89', icon: <BookOpen className="w-6 h-6" />, color: 'text-green-600' },
        { label: 'Events This Month', value: '23', icon: <Calendar className="w-6 h-6" />, color: 'text-purple-600' },
        { label: 'Avg Performance', value: '87%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-orange-600' },
    ];

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => openDrawer('navigation')}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            School ERP Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={() => openDrawer('notifications')}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button>

                        <button
                            onClick={() => openDrawer('settings')}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                {/* Controls for Testing */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 shadow-sm`}>
                    <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        OffCanvas Testing Controls
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Animation Type</label>
                            <select
                                value={animationType}
                                onChange={(e) => setAnimationType(e.target.value as any)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="slide">Slide</option>
                                <option value="push">Push</option>
                                <option value="overlay">Overlay</option>
                                <option value="scale">Scale</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Position</label>
                            <select
                                value={position}
                                onChange={(e) => setPosition(e.target.value as any)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Theme</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as any)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="purple">Purple</option>
                                <option value="pink">Pink</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={() => openDrawer('filter')}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Filter className="w-4 h-4" />
                                <span>Test Filters</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => openDrawer('basic')}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Basic OffCanvas
                        </button>
                        <button
                            onClick={() => openDrawer('content')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Content Heavy
                        </button>
                        <button
                            onClick={() => openDrawer('form')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Form OffCanvas
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {stats.map((stat, index) => (
                        <div key={index} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                                    <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={stat.color}>{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sample Content */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
                    <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Recent Activities
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <Users className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            Student enrollment #{item}
                                        </p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                            2 minutes ago
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* OffCanvas Components */}
            <NavigationDrawer
                isOpen={activeDrawer === 'navigation'}
                onClose={closeDrawer}
                position={position}
                theme={theme}
                animationType={animationType}
                user={{
                    name: 'Admin User',
                    role: 'School Administrator'
                }}
                onNavigate={(item) => {
                    console.log('Navigate to:', item);
                    closeDrawer();
                }}
            />

            <FilterDrawer
                isOpen={activeDrawer === 'filter'}
                onClose={closeDrawer}
                position={position}
                theme={theme}
                animationType={animationType}
                filters={filterOptions}
                onApplyFilters={(filters) => {
                    console.log('Applied filters:', filters);
                }}
                onResetFilters={() => {
                    console.log('Filters reset');
                }}
            />

            {/* Basic OffCanvas */}
            <OffCanvas
                isOpen={activeDrawer === 'basic'}
                onClose={closeDrawer}
                position={position}
                theme={theme}
                animationType={animationType}
                header={<h3 className="text-lg font-medium">Basic OffCanvas</h3>}
            >
                <div className="p-4">
                    <p>This is a basic OffCanvas component with minimal content.</p>
                    <p className="mt-4 text-sm text-gray-600">
                        You can customize the position, theme, and animation type using the controls above.
                    </p>
                </div>
            </OffCanvas>

            {/* Content Heavy OffCanvas */}
            <OffCanvas
                isOpen={activeDrawer === 'content'}
                onClose={closeDrawer}
                position={position}
                theme={theme}
                animationType={animationType}
                size="lg"
                header={
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>Content Heavy Example</span>
                    </div>
                }
                footer={
                    <div className="flex space-x-3">
                        <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                }
            >
                <div className="p-4 space-y-4">
                    <h4 className="font-medium">Student Information</h4>
                    <div className="space-y-2">
                        <p><strong>Name:</strong> John Doe</p>
                        <p><strong>Grade:</strong> 10th Grade</p>
                        <p><strong>Roll Number:</strong> 2024001</p>
                        <p><strong>Contact:</strong> +91 98765 43210</p>
                    </div>

                    <h4 className="font-medium mt-6">Academic Performance</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Mathematics</span>
                            <span className="font-medium text-green-600">A+</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Science</span>
                            <span className="font-medium text-green-600">A</span>
                        </div>
                        <div className="flex justify-between">
                            <span>English</span>
                            <span className="font-medium text-blue-600">B+</span>
                        </div>
                    </div>

                    <h4 className="font-medium mt-6">Attendance Record</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p>Overall Attendance: <span className="font-medium text-green-600">95%</span></p>
                        <p className="text-sm text-gray-600 mt-1">Present: 190 days | Absent: 10 days</p>
                    </div>
                </div>
            </OffCanvas>

            {/* Form OffCanvas */}
            <OffCanvas
                isOpen={activeDrawer === 'form'}
                onClose={closeDrawer}
                position={position}
                theme={theme}
                animationType={animationType}
                size="md"
                header={
                    <div className="flex items-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Add New Student</span>
                    </div>
                }
                footer={
                    <div className="flex space-x-3">
                        <button
                            onClick={closeDrawer}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Add Student
                        </button>
                    </div>
                }
            >
                <div className="p-4">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter student name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter email address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Grade Level</label>
                            <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select grade</option>
                                <option value="1">Grade 1</option>
                                <option value="2">Grade 2</option>
                                <option value="3">Grade 3</option>
                                <option value="4">Grade 4</option>
                                <option value="5">Grade 5</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <textarea
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Enter complete address"
                            />
                        </div>
                    </form>
                </div>
            </OffCanvas>

            {/* Notifications OffCanvas */}
            <OffCanvas
                isOpen={activeDrawer === 'notifications'}
                onClose={closeDrawer}
                position="right"
                theme={theme}
                animationType="slide"
                size="sm"
                header={
                    <div className="flex items-center space-x-2">
                        <Bell className="w-5 h-5" />
                        <span>Notifications</span>
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                    </div>
                }
            >
                <div className="p-4 space-y-4">
                    {[
                        { title: 'New student enrolled', time: '2 minutes ago', type: 'success' },
                        { title: 'Payment overdue', time: '1 hour ago', type: 'warning' },
                        { title: 'System maintenance scheduled', time: '3 hours ago', type: 'info' }
                    ].map((notification, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                            <div className={`w-2 h-2 rounded-full mb-2 ${notification.type === 'success' ? 'bg-green-500' :
                                    notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                }`} />
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                    ))}
                </div>
            </OffCanvas>

            {/* Settings OffCanvas */}
            <OffCanvas
                isOpen={activeDrawer === 'settings'}
                onClose={closeDrawer}
                position="right"
                theme={theme}
                animationType="slide"
                header={
                    <div className="flex items-center space-x-2">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </div>
                }
            >
                <div className="p-4 space-y-6">
                    <div>
                        <h4 className="font-medium mb-3">Appearance</h4>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="theme" value="light" className="rounded" />
                                <span>Light Theme</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="theme" value="dark" className="rounded" />
                                <span>Dark Theme</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="theme" value="auto" className="rounded" />
                                <span>Auto (System)</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-3">Notifications</h4>
                        <div className="space-y-2">
                            <label className="flex items-center justify-between">
                                <span>Email notifications</span>
                                <input type="checkbox" className="rounded" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Push notifications</span>
                                <input type="checkbox" className="rounded" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>SMS notifications</span>
                                <input type="checkbox" className="rounded" />
                            </label>
                        </div>
                    </div>
                </div>
            </OffCanvas>
        </div>
    );
};

export default DashboardTestPage;
