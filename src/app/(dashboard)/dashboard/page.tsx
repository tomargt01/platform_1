'use client';

import React, { useState } from 'react';
import {
    BasePopover,
    UserProfilePopover,
    NotificationPopover,
    MenuPopover,
    QuickActionsPopover,
    SearchPopover,
    ColorPickerPopover,
    ConfirmationPopover,
    DateRangePopover,
    FilterPopover,
    HelpTooltipPopover,
    InfoPopover,
    SharePopover,
} from '#/components/ui/base/Popover';

import {
    Bell, User, Search, Menu, Zap, Palette, Trash2, Calendar, Filter, Info, HelpCircle, Share,
    Settings, BarChart3, Users as UsersIcon, GraduationCap, BookOpen, CreditCard, Clock,
    Activity, TrendingUp, FileText, Download, ChevronDown, AlertTriangle, CheckCircle,
    Award, MessageCircle, Mail, PieChart, Target, Plus, Circle, X, ChevronRight, Clock as ClockIcon,
    ArrowRight, Maximize2, Eye, Grid, Move, Play, Upload, Edit, Star, Heart, MapPin, Phone, DollarSign,
    LogOut,
} from 'lucide-react';

// Sample data interfaces matching your types
interface SampleUser {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'online' | 'offline' | 'away';
    avatar?: string;
    lastActive: Date;
}
interface SampleNotification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
}
interface SampleMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    divider?: boolean;
}
interface SampleFilterOption {
    id: string;
    label: string;
    value: string;
    type: 'checkbox' | 'radio' | 'select' | 'date' | 'range';
    options?: { label: string; value: string }[];
    checked?: boolean;
}

const PopoverTestDashboard = () => {
    // State for all popovers
    const [popoverStates, setPopoverStates] = useState({
        userProfile: false,
        notifications: false,
        menu: false,
        quickActions: false,
        search: false,
        colorPicker: false,
        confirmation: false,
        dateRange: false,
        filter: false,
        info: false,
        help: false,
        share: false,
    });

    // Sample user data
    const sampleUser: SampleUser = {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@brightacademy.edu',
        role: 'Principal',
        status: 'online',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
        lastActive: new Date(),
    };

    // Sample notifications
    const sampleNotifications: SampleNotification[] = [
        {
            id: '1',
            title: 'New Student Registration',
            message: 'Aarav Sharma has completed registration for Grade 10A',
            type: 'info',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            read: false,
        },
        {
            id: '2',
            title: 'Fee Payment Received',
            message: 'Monthly fee payment received from Priya Patel (Grade 8B)',
            type: 'success',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            read: false,
        },
        {
            id: '3',
            title: 'Attendance Alert',
            message: 'Low attendance alert for Mathematics class - Grade 9C',
            type: 'warning',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            read: true,
        },
    ];

    // Sample menu items
    const sampleMenuItems: SampleMenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" />, onClick: () => console.log('Dashboard clicked') },
        { id: 'students', label: 'Students', icon: <UsersIcon className="w-4 h-4" />, onClick: () => console.log('Students clicked') },
        { id: 'classes', label: 'Classes', icon: <BookOpen className="w-4 h-4" />, onClick: () => console.log('Classes clicked') },
        { id: 'divider', label: '', divider: true },
        { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, onClick: () => console.log('Settings clicked') },
        { id: 'logout', label: 'Logout', icon: <LogOut className="w-4 h-4" />, onClick: () => console.log('Logout clicked') },
    ];

    // Sample filter options
    const sampleFilterOptions: SampleFilterOption[] = [
        {
            id: 'grade',
            label: 'Grade Level',
            value: '',
            type: 'select',
            options: [
                { label: 'Pre-K', value: 'pre-k' },
                { label: 'Grade 1', value: 'grade-1' },
                { label: 'Grade 2', value: 'grade-2' },
                { label: 'Grade 3', value: 'grade-3' },
                { label: 'Grade 4', value: 'grade-4' },
                { label: 'Grade 5', value: 'grade-5' },
                { label: 'Grade 6', value: 'grade-6' },
                { label: 'Grade 7', value: 'grade-7' },
                { label: 'Grade 8', value: 'grade-8' },
                { label: 'Grade 9', value: 'grade-9' },
                { label: 'Grade 10', value: 'grade-10' },
                { label: 'Grade 11', value: 'grade-11' },
                { label: 'Grade 12', value: 'grade-12' },
            ],
        },
        {
            id: 'status',
            label: 'Active',
            value: 'active',
            type: 'checkbox',
            checked: true,
        },
        {
            id: 'attendance',
            label: 'Attendance Range (%)',
            value: '75',
            type: 'range',
        },
    ];

    // State for filtered data
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Toggle popover
    const togglePopover = (popover: keyof typeof popoverStates) => {
        setPopoverStates(prev => ({
            ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {} as typeof prev),
            [popover]: !prev[popover],
        }));
    };

    // Realistic event handlers that update UI
    const handleNotificationAction = (action: string, id?: string) => {
        const updated = sampleNotifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        );
        console.log('Notification action:', action, id);
        // In a real app, you'd update state/API here
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Simulate search results
        setFilteredData(
            sampleNotifications.filter(n =>
                n.title.toLowerCase().includes(query.toLowerCase()) ||
                n.message.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const handleFilterApply = (filters: SampleFilterOption[]) => {
        console.log('Filters applied:', filters);
        // Apply filters to data
        // In a real app, you'd filter your main data array
    };

    const handleColorChange = (color: string) => {
        console.log('Color selected:', color);
        // In a real app, you might update a theme color
    };

    const handleConfirm = () => {
        console.log('Action confirmed!');
        // Perform the real action
        setPopoverStates(prev => ({ ...prev, confirmation: false }));
    };

    const handleCancel = () => {
        console.log('Action cancelled');
        setPopoverStates(prev => ({ ...prev, confirmation: false }));
    };

    const handleDateRangeChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
        console.log('Date range selected:', dates);
        // Filter data by date range
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="ml-2 text-xl font-bold text-gray-900">Bright Academy</h1>
                        <span className="ml-4 text-sm text-gray-600">Popover Components Testing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <NotificationPopover
                            isOpen={popoverStates.notifications}
                            onClose={() => setPopoverStates(prev => ({ ...prev, notifications: false }))}
                            placement="bottom-end"
                            notifications={sampleNotifications}
                            onMarkAsRead={(id) => handleNotificationAction('markAsRead', id)}
                            onMarkAllAsRead={() => handleNotificationAction('markAllAsRead')}
                            onClearAll={() => setFilteredData([])}
                            onNotificationClick={(n) => console.log(n)}
                        >
                            <button
                                onClick={() => togglePopover('notifications')}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                                title="Notifications"
                            >
                                <Bell className="w-5 h-5 text-gray-500" />
                                {sampleNotifications.filter(n => !n.read).length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {sampleNotifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </button>
                        </NotificationPopover>
                        <UserProfilePopover
                            isOpen={popoverStates.userProfile}
                            onClose={() => setPopoverStates(prev => ({ ...prev, userProfile: false }))}
                            placement="bottom-end"
                            // user={sampleUser}
                            // onViewProfile={() => console.log('View profile')}
                            // onSettings={() => console.log('Settings')}
                            // onLogout={() => console.log('Logout')}
                        >
                            <button
                                onClick={() => togglePopover('userProfile')}
                                className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <img
                                    src={sampleUser.avatar}
                                    alt={sampleUser.name}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-blue-400"
                                />
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </UserProfilePopover>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Popover Components Testing</h2>
                    <p className="text-gray-600">This dashboard showcases all popover types relevant to a School ERP panel.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <UsersIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Total Students</p>
                                <p className="text-2xl font-bold text-gray-900">2,847</p>
                                <p className="text-xs text-green-600 flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" /> +12% from last month
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Active Classes</p>
                                <p className="text-2xl font-bold text-gray-900">156</p>
                                <p className="text-xs text-blue-600 flex items-center">
                                    <Activity className="w-3 h-3 mr-1" /> 8 new this week
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                                <p className="text-xs text-green-600 flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1" /> Above target
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popover Components Showcase */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Popover Components Showcase</h3>
                        <p className="text-sm text-gray-600">Click the buttons below to test each popover.</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* User Profile */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">User Profile</h4>
                                    <p className="text-sm text-gray-600 mb-4">Display user info, status, actions</p>
                                    <UserProfilePopover
                                        // user={sampleUser}
                                        placement="top"
                                        // onViewProfile={() => console.log('View profile clicked')}
                                        // onSettings={() => console.log('Settings clicked')}
                                        // onLogout={() => console.log('Logout clicked')}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
                                            <User className="w-4 h-4" />
                                            <span>View Profile</span>
                                        </button>
                                    </UserProfilePopover>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-yellow-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Bell className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Notifications</h4>
                                    <p className="text-sm text-gray-600 mb-4">System notifications, mark as read, clear all</p>
                                    <NotificationPopover
                                        notifications={sampleNotifications}
                                        placement="top"
                                        onMarkAsRead={(id) => handleNotificationAction('markAsRead', id)}
                                        onMarkAllAsRead={() => handleNotificationAction('markAllAsRead')}
                                        onClearAll={() => { }}
                                        onNotificationClick={(n) => console.log(n)}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors">
                                            <Bell className="w-4 h-4" />
                                            <span>Notifications</span>
                                        </button>
                                    </NotificationPopover>
                                </div>
                            </div>

                            {/* Menu */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Menu className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Menu</h4>
                                    <p className="text-sm text-gray-600 mb-4">Context menu with navigation and actions</p>
                                    <MenuPopover
                                        items={sampleMenuItems}
                                        placement="top"
                                        onItemClick={(item) => console.log('Menu:', item)}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors">
                                            <Menu className="w-4 h-4" />
                                            <span>Open Menu</span>
                                        </button>
                                    </MenuPopover>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Zap className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Quick Actions</h4>
                                    <p className="text-sm text-gray-600 mb-4">Grid of common actions</p>
                                    <QuickActionsPopover
                                        placement="top"
                                        onActionClick={(action) => console.log('Action:', action)}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors">
                                            <Zap className="w-4 h-4" />
                                            <span>Quick Actions</span>
                                        </button>
                                    </QuickActionsPopover>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Search className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Search</h4>
                                    <p className="text-sm text-gray-600 mb-4">Search with real-time results</p>
                                    <SearchPopover
                                        placement="top"
                                        onSearch={handleSearch}
                                        onResultClick={(result) => console.log('Result:', result)}
                                        results={filteredData}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors">
                                            <Search className="w-4 h-4" />
                                            <span>Search</span>
                                        </button>
                                    </SearchPopover>
                                </div>
                            </div>

                            {/* Color Picker */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-pink-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Palette className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Color Picker</h4>
                                    <p className="text-sm text-gray-600 mb-4">Select colors, presets, copy codes</p>
                                    <ColorPickerPopover
                                        placement="top"
                                        onChange={handleColorChange}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-pink-100 text-pink-800 rounded-lg hover:bg-pink-200 transition-colors">
                                            <Palette className="w-4 h-4" />
                                            <span>Pick Color</span>
                                        </button>
                                    </ColorPickerPopover>
                                </div>
                            </div>

                            {/* Confirmation */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Trash2 className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Confirmation</h4>
                                    <p className="text-sm text-gray-600 mb-4">Confirm destructive actions</p>
                                    <ConfirmationPopover
                                        title="Delete Student Record"
                                        message="Are you sure? This cannot be undone."
                                        type="danger"
                                        confirmText="Delete"
                                        onConfirm={handleConfirm}
                                        onCancel={handleCancel}
                                        placement="top"
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete Record</span>
                                        </button>
                                    </ConfirmationPopover>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Calendar className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Date Range</h4>
                                    <p className="text-sm text-gray-600 mb-4">Select start and end dates</p>
                                    <DateRangePopover
                                        placement="top"
                                        onChange={handleDateRangeChange}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-lg hover:bg-teal-200 transition-colors">
                                            <Calendar className="w-4 h-4" />
                                            <span>Select Range</span>
                                        </button>
                                    </DateRangePopover>
                                </div>
                            </div>

                            {/* Filter */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Filter className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Filter</h4>
                                    <p className="text-sm text-gray-600 mb-4">Apply multiple filters</p>
                                    <FilterPopover
                                        filters={sampleFilterOptions}
                                        placement="top"
                                        onApplyFilters={handleFilterApply}
                                        onClearFilters={() => { }}
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors">
                                            <Filter className="w-4 h-4" />
                                            <span>Apply Filters</span>
                                        </button>
                                    </FilterPopover>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Info className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Info</h4>
                                    <p className="text-sm text-gray-600 mb-4">Display contextual information</p>
                                    <InfoPopover
                                        title="Academic Calendar"
                                        message="The academic year starts on April 1st and ends on March 31st."
                                        type="info"
                                        placement="top"
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
                                            <Info className="w-4 h-4" />
                                            <span>Show Info</span>
                                        </button>
                                    </InfoPopover>
                                </div>
                            </div>

                            {/* Help Tooltip */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <HelpCircle className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Help Tooltip</h4>
                                    <p className="text-sm text-gray-600 mb-4">Context-sensitive help</p>
                                    <HelpTooltipPopover
                                        content="To enroll a new student, collect their information, documents, and assign them to a class."
                                        placement="top"
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors">
                                            <HelpCircle className="w-4 h-4" />
                                            <span>Get Help</span>
                                        </button>
                                    </HelpTooltipPopover>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-sky-300 transition-colors">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Share className="w-6 h-6 text-sky-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Share</h4>
                                    <p className="text-sm text-gray-600 mb-4">Share content with others</p>
                                    <SharePopover
                                        placement="top"
                                        title="Share Dashboard"
                                        description="Share this popover testing dashboard with your team"
                                    >
                                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-lg hover:bg-sky-200 transition-colors">
                                            <Share className="w-4 h-4" />
                                            <span>Share</span>
                                        </button>
                                    </SharePopover>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Award className="w-5 h-5 text-yellow-500 mr-2" />
                            Popover Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">12+ Popover Types</span>
                                </div>
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Responsive Layout</span>
                                </div>
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Keyboard Navigation</span>
                                </div>
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Real Data</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Theme Support</span>
                                </div>
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Production Ready</span>
                                </div>
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">TypeScript</span>
                                </div>
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Accessibility</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                            Usage Statistics
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>User Profile</span>
                                    <span>98%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Notifications</span>
                                    <span>95%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Search</span>
                                    <span>91%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Quick Actions</span>
                                    <span>89%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '89%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-8">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">© 2025 Bright Academy ERP</span>
                        <span className="text-sm text-gray-500">Popover Testing Dashboard v2.1</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Help">
                            <HelpCircle className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Settings">
                            <Settings className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Documentation">
                            <FileText className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PopoverTestDashboard;
