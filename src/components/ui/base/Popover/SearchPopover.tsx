'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import { Search, Clock, TrendingUp, X, Filter, ArrowRight, FileText, Users, BarChart3, Calendar } from 'lucide-react';

interface SearchResult {
    id: string;
    title: string;
    description?: string;
    type: 'student' | 'teacher' | 'class' | 'report' | 'event' | 'general';
    url?: string;
    avatar?: string;
    metadata?: {
        grade?: string;
        subject?: string;
        date?: Date;
        status?: string;
    };
}

interface SearchCategory {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    count?: number;
}

interface SearchPopoverProps extends Omit<BasePopoverProps, 'children'> {
    placeholder?: string;
    recentSearches?: string[];
    trendingSearches?: string[];
    results?: SearchResult[];
    categories?: SearchCategory[];
    showCategories?: boolean;
    showRecentSearches?: boolean;
    showTrendingSearches?: boolean;
    maxResults?: number;
    debounceMs?: number;
    onSearch?: (query: string, category?: string) => void;
    onResultClick?: (result: SearchResult) => void;
    onRecentSearchClick?: (search: string) => void;
    onClearRecentSearches?: () => void;
    loading?: boolean;
    children: React.ReactNode;
}

const SearchPopover: React.FC<SearchPopoverProps> = ({
    placeholder = "Search students, classes, reports...",
    recentSearches = [],
    trendingSearches = [],
    results = [],
    categories = [],
    showCategories = true,
    showRecentSearches = true,
    showTrendingSearches = true,
    maxResults = 8,
    debounceMs = 300,
    onSearch,
    onResultClick,
    onRecentSearchClick,
    onClearRecentSearches,
    loading = false,
    children,
    ...popoverProps
}) => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>();

    // Default categories for School ERP
    const defaultCategories: SearchCategory[] = [
        {
            id: 'all',
            label: 'All',
            icon: <Search className="w-4 h-4" />,
            color: 'bg-gray-100 text-gray-800',
            count: results.length,
        },
        {
            id: 'student',
            label: 'Students',
            icon: <Users className="w-4 h-4" />,
            color: 'bg-blue-100 text-blue-800',
            count: results.filter(r => r.type === 'student').length,
        },
        {
            id: 'class',
            label: 'Classes',
            icon: <FileText className="w-4 h-4" />,
            color: 'bg-green-100 text-green-800',
            count: results.filter(r => r.type === 'class').length,
        },
        {
            id: 'report',
            label: 'Reports',
            icon: <BarChart3 className="w-4 h-4" />,
            color: 'bg-purple-100 text-purple-800',
            count: results.filter(r => r.type === 'report').length,
        },
        {
            id: 'event',
            label: 'Events',
            icon: <Calendar className="w-4 h-4" />,
            color: 'bg-orange-100 text-orange-800',
            count: results.filter(r => r.type === 'event').length,
        },
    ];

    const defaultRecentSearches = [
        "Class 10A attendance",
        "Mathematics teachers",
        "Monthly fee report",
        "Parent meeting schedule",
        "Student performance analytics",
    ];

    const defaultTrendingSearches = [
        "Exam results",
        "Holiday calendar",
        "Library books",
        "Sports events",
        "Fee collection",
    ];

    const finalCategories = categories.length > 0 ? categories : defaultCategories;
    const finalRecentSearches = recentSearches.length > 0 ? recentSearches : defaultRecentSearches;
    const finalTrendingSearches = trendingSearches.length > 0 ? trendingSearches : defaultTrendingSearches;

    // Sample results for demo
    const sampleResults: SearchResult[] = [
        {
            id: '1',
            title: 'Aarav Sharma',
            description: 'Grade 10A - Student ID: ST2025001',
            type: 'student',
            metadata: { grade: '10A', status: 'Active' }
        },
        {
            id: '2',
            title: 'Mathematics - Advanced',
            description: 'Grade 10 - Mrs. Priya Singh',
            type: 'class',
            metadata: { subject: 'Mathematics', grade: '10' }
        },
        {
            id: '3',
            title: 'Monthly Attendance Report',
            description: 'September 2025 - All Classes',
            type: 'report',
            metadata: { date: new Date(), status: 'Generated' }
        },
        {
            id: '4',
            title: 'Annual Sports Day',
            description: 'October 15, 2025 - Main Ground',
            type: 'event',
            metadata: { date: new Date('2025-10-15'), status: 'Scheduled' }
        },
    ];

    const finalResults = results.length > 0 ? results : sampleResults;

    // Filter results based on selected category
    const filteredResults = useMemo(() => {
        let filtered = finalResults;

        if (selectedCategory && selectedCategory !== 'all') {
            filtered = filtered.filter(result => result.type === selectedCategory);
        }

        if (query.trim()) {
            filtered = filtered.filter(result =>
                result.title.toLowerCase().includes(query.toLowerCase()) ||
                result.description?.toLowerCase().includes(query.toLowerCase())
            );
        }

        return filtered.slice(0, maxResults);
    }, [finalResults, selectedCategory, query, maxResults]);

    useEffect(() => {
        if (popoverProps.isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [popoverProps.isOpen]);

    // Debounced search
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (query.trim()) {
            debounceRef.current = setTimeout(() => {
                onSearch?.(query, selectedCategory);
            }, debounceMs);
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, selectedCategory, debounceMs, onSearch]);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        setShowResults(searchQuery.length > 0);
    };

    const clearSearch = () => {
        setQuery('');
        setShowResults(false);
        setSelectedCategory('');
        inputRef.current?.focus();
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSearch(suggestion);
        onRecentSearchClick?.(suggestion);
    };

    const handleResultClick = (result: SearchResult) => {
        onResultClick?.(result);
        // Optionally close popover or navigate
    };

    const getResultIcon = (type: SearchResult['type']) => {
        switch (type) {
            case 'student':
                return <Users className="w-4 h-4 text-blue-500" />;
            case 'teacher':
                return <Users className="w-4 h-4 text-green-500" />;
            case 'class':
                return <FileText className="w-4 h-4 text-purple-500" />;
            case 'report':
                return <BarChart3 className="w-4 h-4 text-orange-500" />;
            case 'event':
                return <Calendar className="w-4 h-4 text-pink-500" />;
            default:
                return <Search className="w-4 h-4 text-gray-500" />;
        }
    };

    const formatResultMetadata = (result: SearchResult) => {
        const { metadata } = result;
        if (!metadata) return '';

        const parts = [];
        if (metadata.grade) parts.push(`Grade ${metadata.grade}`);
        if (metadata.subject) parts.push(metadata.subject);
        if (metadata.status) parts.push(metadata.status);
        if (metadata.date) parts.push(metadata.date.toLocaleDateString());

        return parts.join(' • ');
    };

    return (
        <BasePopover {...popoverProps} size="xl" className="p-0 w-[500px]">
            <div>
                {/* Search Header */}
                <div className="p-4 border-b bg-gray-50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder={placeholder}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        />
                        {query && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        {loading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    {showCategories && (
                        <div className="flex items-center space-x-2 mt-3 overflow-x-auto">
                            {finalCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id === 'all' ? '' : category.id)}
                                    className={`
                    flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                    ${(selectedCategory === category.id || (selectedCategory === '' && category.id === 'all'))
                                            ? category.color + ' ring-2 ring-offset-1 ring-blue-300'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }
                  `}
                                >
                                    {category.icon}
                                    <span>{category.label}</span>
                                    {category.count !== undefined && category.count > 0 && (
                                        <span className="text-xs bg-white bg-opacity-60 px-1.5 py-0.5 rounded-full">
                                            {category.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="max-h-96 overflow-y-auto">
                    {showResults && (query.length > 0 || selectedCategory) ? (
                        /* Search Results */
                        <div className="p-2">
                            {filteredResults.length > 0 ? (
                                <>
                                    <div className="px-2 py-2 text-sm font-medium text-gray-700 flex items-center justify-between">
                                        <span>Search Results ({filteredResults.length})</span>
                                        {selectedCategory && (
                                            <button
                                                onClick={() => setSelectedCategory('')}
                                                className="text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                Clear filter
                                            </button>
                                        )}
                                    </div>

                                    {filteredResults.map((result) => (
                                        <button
                                            key={result.id}
                                            onClick={() => handleResultClick(result)}
                                            className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors group"
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    {result.avatar ? (
                                                        <img
                                                            src={result.avatar}
                                                            alt={result.title}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                            {getResultIcon(result.type)}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                                                            {result.title}
                                                        </h5>
                                                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>

                                                    {result.description && (
                                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                            {result.description}
                                                        </p>
                                                    )}

                                                    {result.metadata && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {formatResultMetadata(result)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </>
                            ) : (
                                /* No Results */
                                <div className="p-8 text-center text-gray-500">
                                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                    <p className="text-sm">
                                        No results found for "{query}"
                                        {selectedCategory && ` in ${finalCategories.find(c => c.id === selectedCategory)?.label}`}
                                    </p>
                                    <p className="text-xs mt-1">Try different keywords or check spelling</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Default Content - Recent & Trending */
                        <div className="p-2">
                            {/* Recent Searches */}
                            {showRecentSearches && finalRecentSearches.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between px-2 py-2 mb-2">
                                        <h4 className="text-sm font-medium text-gray-700 flex items-center">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Recent Searches
                                        </h4>
                                        {onClearRecentSearches && (
                                            <button
                                                onClick={onClearRecentSearches}
                                                className="text-xs text-gray-500 hover:text-gray-700"
                                            >
                                                Clear all
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        {finalRecentSearches.slice(0, 5).map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSuggestionClick(search)}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between group"
                                            >
                                                <span className="truncate">{search}</span>
                                                <ArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Trending Searches */}
                            {showTrendingSearches && finalTrendingSearches.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 px-2 py-2 mb-2 flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Trending Searches
                                    </h4>

                                    <div className="space-y-1">
                                        {finalTrendingSearches.slice(0, 5).map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSuggestionClick(search)}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between group"
                                            >
                                                <span className="truncate">{search}</span>
                                                <TrendingUp className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t bg-gray-50 text-center">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <span>Press <kbd className="px-2 py-1 bg-white rounded text-xs font-mono border">↵</kbd> to search</span>
                        <span>Press <kbd className="px-2 py-1 bg-white rounded text-xs font-mono border">Esc</kbd> to close</span>
                        {showCategories && (
                            <span>Use <kbd className="px-2 py-1 bg-white rounded text-xs font-mono border">Tab</kbd> to filter</span>
                        )}
                    </div>
                </div>
            </div>
            {children}
        </BasePopover>
    );
};

export default SearchPopover;
