'use client';

import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from '#/components/ui/base/ListGroup';
import { DatePicker, DateRangePicker } from '#/components/ui/base/DatePicker';
import {
    Users,
    BookOpen,
    GraduationCap,
    Calendar,
    DollarSign,
    TrendingUp,
    Bell,
    Settings,
    Home,
    FileText,
    UserCheck,
    AlertCircle,
    CheckCircle,
    Clock,
    Star
} from 'lucide-react';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<{ startDate: Date | null, endDate: Date | null }>({
        startDate: null,
        endDate: null
    });
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "purple" | "pink" | "green" | "blue">('light');

    // Sample data for ERP Dashboard
    const quickStats = [
        { id: 1, title: 'Total Students', value: '1,234', icon: <Users className="w-5 h-5" />, trend: '+12%' },
        { id: 2, title: 'Active Teachers', value: '67', icon: <UserCheck className="w-5 h-5" />, trend: '+3%' },
        { id: 3, title: 'Total Classes', value: '45', icon: <BookOpen className="w-5 h-5" />, trend: '+8%' },
        { id: 4, title: 'Monthly Revenue', value: '₹2,45,000', icon: <DollarSign className="w-5 h-5" />, trend: '+15%' },
    ];

    const recentActivities = [
        { id: 1, activity: 'New student admission completed', time: '2 minutes ago', type: 'success' },
        { id: 2, activity: 'Fee payment received from Class 10-A', time: '15 minutes ago', type: 'info' },
        { id: 3, activity: 'Teacher leave application pending', time: '1 hour ago', type: 'warning' },
        { id: 4, activity: 'Monthly report generated', time: '2 hours ago', type: 'success' },
        { id: 5, activity: 'System maintenance scheduled', time: '1 day ago', type: 'info' },
    ];

    const navigationItems = [
        { id: 1, label: 'Dashboard', icon: <Home className="w-5 h-5" />, active: true },
        { id: 2, label: 'Students', icon: <Users className="w-5 h-5" />, badge: '1,234' },
        { id: 3, label: 'Teachers', icon: <GraduationCap className="w-5 h-5" />, badge: '67' },
        { id: 4, label: 'Classes', icon: <BookOpen className="w-5 h-5" />, badge: '45' },
        { id: 5, label: 'Attendance', icon: <Calendar className="w-5 h-5" /> },
        { id: 6, label: 'Fees', icon: <DollarSign className="w-5 h-5" /> },
        { id: 7, label: 'Reports', icon: <FileText className="w-5 h-5" /> },
        { id: 8, label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    ];

    const pendingTasks = [
        { id: 1, task: 'Review new teacher applications', priority: 'high', dueDate: 'Today' },
        { id: 2, task: 'Approve student fee waivers', priority: 'medium', dueDate: 'Tomorrow' },
        { id: 3, task: 'Update exam schedule', priority: 'high', dueDate: 'This Week' },
        { id: 4, task: 'Generate monthly reports', priority: 'low', dueDate: 'Next Week' },
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'info': return <Clock className="w-4 h-4 text-blue-500" />;
            default: return <Bell className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    return (
        <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className={`text-3xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            School ERP Dashboard
                        </h1>
                        <p className={`text-lg ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                            Welcome back! Here's what's happening at your school today.
                        </p>
                    </div>

                    {/* Theme Switcher */}
                    <div className="flex gap-2">
                        {(['light', 'dark', 'purple', 'pink', 'green', 'blue'] as const).map((theme) => (
                            <button
                                key={theme}
                                onClick={() => setCurrentTheme(theme)}
                                className={`w-8 h-8 rounded-full border-2 ${currentTheme === theme ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                                    } ${theme === 'light' ? 'bg-white border-gray-300' :
                                        theme === 'dark' ? 'bg-gray-800 border-gray-600' :
                                            `bg-${theme}-500 border-${theme}-600`
                                    }`}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-2 gap-8">

                {/* Left Column - Navigation & Tasks */}
                <div className="space-y-8">
                    {/* Navigation Menu */}
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Navigation
                        </h3>
                        <ListGroup theme={currentTheme} variant="default" size="md">
                            {navigationItems.map((item) => (
                                <ListGroupItem
                                    key={item.id}
                                    icon={item.icon}
                                    active={item.active}
                                    badge={item.badge}
                                    onClick={() => console.log(`Navigate to ${item.label}`)}
                                >
                                    {item.label}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>

                    {/* Pending Tasks */}
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            Pending Tasks
                        </h3>
                        <ListGroup theme={currentTheme} variant="flush" size="sm" numbered>
                            {pendingTasks.map((task) => (
                                <ListGroupItem
                                    key={task.id}
                                    variant={getPriorityColor(task.priority)}
                                    subtitle={`Due: ${task.dueDate}`}
                                    onClick={() => console.log(`Open task: ${task.task}`)}
                                >
                                    {task.task}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </div>

                {/* Middle Column - Recent Activities */}
                <div>
                    <h3 className={`text-lg font-semibold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Recent Activities
                    </h3>
                    <ListGroup theme={currentTheme} variant="bordered" size="md">
                        {recentActivities.map((activity) => (
                            <ListGroupItem
                                key={activity.id}
                                icon={getActivityIcon(activity.type)}
                                subtitle={activity.time}
                                variant={activity.type === 'warning' ? 'warning' : activity.type === 'success' ? 'success' : 'info'}
                            >
                                {activity.activity}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
