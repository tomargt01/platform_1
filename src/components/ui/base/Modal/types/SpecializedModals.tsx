'use client';

import React, { useState } from 'react';
import Modal from '../Modal';
import { BaseModalProps } from '../Modal.types';
import { User, Lock, Eye, EyeOff, Filter, Calendar, MessageCircle, Send, Paperclip } from 'lucide-react';

// Login/Authentication Modal
export const LoginModal: React.FC<BaseModalProps & {
    onLogin: (credentials: { email: string; password: string }) => void;
    showSignup?: boolean;
    onSignup?: () => void;
    loading?: boolean;
}> = ({ onLogin, showSignup = true, onSignup, loading = false, ...modalProps }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <Modal
            {...modalProps}
            title="Welcome Back"
            size="sm"
            content={
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                required
                                value={credentials.email}
                                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={credentials.password}
                                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </button>
                    </div>
                </form>
            }
            footer={
                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    {showSignup && (
                        <div className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={onSignup}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Sign up
                            </button>
                        </div>
                    )}
                </div>
            }
        />
    );
};

// Filter & Sort Modal
export const FilterModal: React.FC<BaseModalProps & {
    filters: Array<{
        name: string;
        label: string;
        type: 'select' | 'range' | 'checkbox' | 'date';
        options?: Array<{ value: string; label: string }>;
        value?: any;
    }>;
    onApply: (filters: Record<string, any>) => void;
    onReset: () => void;
}> = ({ filters, onApply, onReset, ...modalProps }) => {
    const [filterValues, setFilterValues] = useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        filters.forEach(filter => {
            initial[filter.name] = filter.value || '';
        });
        return initial;
    });

    const handleFilterChange = (name: string, value: any) => {
        setFilterValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Modal
            {...modalProps}
            title="Filter & Sort"
            size="md"
            content={
                <div className="space-y-4">
                    {filters.map((filter) => (
                        <div key={filter.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {filter.label}
                            </label>

                            {filter.type === 'select' && (
                                <select
                                    value={filterValues[filter.name]}
                                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All</option>
                                    {filter.options?.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {filter.type === 'checkbox' && filter.options && (
                                <div className="space-y-2">
                                    {filter.options.map(option => (
                                        <label key={option.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filterValues[filter.name]?.includes(option.value)}
                                                onChange={(e) => {
                                                    const current = filterValues[filter.name] || [];
                                                    if (e.target.checked) {
                                                        handleFilterChange(filter.name, [...current, option.value]);
                                                    } else {
                                                        handleFilterChange(filter.name, current.filter((v: string) => v !== option.value));
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-blue-600"
                                            />
                                            <span className="ml-2 text-sm">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {filter.type === 'date' && (
                                <input
                                    type="date"
                                    value={filterValues[filter.name]}
                                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            )}

                            {filter.type === 'range' && (
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={filterValues[filter.name] || 0}
                                        onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                                        className="w-full"
                                    />
                                    <div className="text-sm text-gray-600 text-center">
                                        Value: {filterValues[filter.name] || 0}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            }
            footer={
                <div className="flex justify-between">
                    <button
                        onClick={() => {
                            onReset();
                            modalProps.onClose();
                        }}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        Reset
                    </button>
                    <div className="space-x-2">
                        <button
                            onClick={modalProps.onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onApply(filterValues);
                                modalProps.onClose();
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            }
        />
    );
};

// Chat/Messaging Modal
export const ChatModal: React.FC<BaseModalProps & {
    title?: string;
    messages: Array<{
        id: string;
        sender: 'user' | 'other';
        message: string;
        timestamp: Date;
        avatar?: string;
    }>;
    onSendMessage: (message: string) => void;
}> = ({ title = 'Chat', messages, onSendMessage, ...modalProps }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <Modal
            {...modalProps}
            title={title}
            size="lg"
            content={
                <div className="flex flex-col h-96">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-gray-50 rounded-lg">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-800'
                                        }`}
                                >
                                    <p className="text-sm">{msg.message}</p>
                                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                        {msg.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-4">
                        <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-700"
                        >
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            }
        />
    );
};
