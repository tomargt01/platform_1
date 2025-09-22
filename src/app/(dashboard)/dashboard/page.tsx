'use client';

import React, { useState } from 'react';
import { Autocomplete } from '#/components/ui/base/Autocomplete';
import type { AutocompleteOption } from '#/components/ui/base/Autocomplete';

const Dashboard = () => {
    // State for different autocomplete examples
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [selectedTeachers, setSelectedTeachers] = useState<AutocompleteOption[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<AutocompleteOption | null>(null);
    const [customValue, setCustomValue] = useState<string>('');

    // Sample data for school ERP
    const studentOptions = [
        'Aarav Kumar',
        'Ananya Sharma',
        'Arjun Singh',
        'Diya Patel',
        'Ishaan Gupta',
        'Kavya Reddy',
        'Nikhil Agarwal',
        'Priya Joshi',
        'Rohan Mehta',
        'Shreya Verma'
    ];

    const teacherOptions: AutocompleteOption[] = [
        {
            label: 'Dr. Rajesh Kumar',
            value: 'teacher_001',
            description: 'Mathematics Department',
            group: 'Senior Faculty'
        },
        {
            label: 'Prof. Sunita Sharma',
            value: 'teacher_002',
            description: 'English Literature',
            group: 'Senior Faculty'
        },
        {
            label: 'Mr. Vikash Singh',
            value: 'teacher_003',
            description: 'Physics Department',
            group: 'Junior Faculty'
        },
        {
            label: 'Ms. Priyanka Gupta',
            value: 'teacher_004',
            description: 'Chemistry Department',
            group: 'Junior Faculty'
        },
        {
            label: 'Dr. Amit Verma',
            value: 'teacher_005',
            description: 'Computer Science',
            group: 'Senior Faculty'
        }
    ];

    const subjectOptions: AutocompleteOption[] = [
        { label: 'Mathematics', value: 'math', group: 'Core Subjects' },
        { label: 'Physics', value: 'physics', group: 'Science' },
        { label: 'Chemistry', value: 'chemistry', group: 'Science' },
        { label: 'Biology', value: 'biology', group: 'Science' },
        { label: 'English', value: 'english', group: 'Languages' },
        { label: 'Hindi', value: 'hindi', group: 'Languages' },
        { label: 'History', value: 'history', group: 'Social Studies' },
        { label: 'Geography', value: 'geography', group: 'Social Studies' },
        { label: 'Computer Science', value: 'computer', group: 'Technology' },
        { label: 'Physical Education', value: 'pe', group: 'Extra Curricular' }
    ];

    // Mock async function for demonstration
    const loadStudentsAsync = async (inputValue: string): Promise<AutocompleteOption[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Filter students based on input
        const filteredStudents = studentOptions
            .filter(student => student.toLowerCase().includes(inputValue.toLowerCase()))
            .map(student => ({
                label: student,
                value: student.toLowerCase().replace(' ', '_'),
                description: `Class: ${Math.floor(Math.random() * 12) + 1}`
            }));

        return filteredStudents;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    School ERP Dashboard
                </h1>
                <p className="text-gray-600">
                    Testing Autocomplete Components - Different Themes & Features
                </p>
            </div>

            {/* Grid Layout for Components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Card 1: Simple String Autocomplete */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Simple Student Search
                    </h3>
                    <Autocomplete
                        options={studentOptions}
                        value={selectedStudent}
                        onChange={(value) => setSelectedStudent(value as string)}
                        placeholder="Search student by name..."
                        theme="blue"
                        size="md"
                        label="Select Student"
                        clearable
                        showIcon
                        className="mb-4"
                    />
                    {selectedStudent && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-800">
                                <strong>Selected:</strong> {selectedStudent}
                            </p>
                        </div>
                    )}
                </div>

                {/* Card 2: Multiple Selection with Groups */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Multiple Teachers Selection
                    </h3>
                    <Autocomplete
                        options={teacherOptions}
                        value={selectedTeachers}
                        onChange={(value) => setSelectedTeachers(value)}
                        placeholder="Select multiple teachers..."
                        theme="purple"
                        size="md"
                        label="Teachers"
                        multiple={true}  // Explicitly set to true
                        clearable
                        groupBy="group"
                        className="mb-4"
                        customColors={{
                            selectedOption: 'bg-purple-600 text-white',
                            hoveredOption: 'bg-purple-50'
                        }}
                    />
                    {selectedTeachers.length > 0 && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-md">
                            <p className="text-sm text-purple-800 mb-2">
                                <strong>Selected Teachers:</strong>
                            </p>
                            <ul className="text-xs text-purple-700">
                                {selectedTeachers.map((teacher, index) => (
                                    <li key={index}>
                                        • {teacher.label} - {teacher.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Card 3: Subject with Custom Colors */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Subject Selection (Grouped)
                    </h3>
                    <Autocomplete
                        options={subjectOptions}
                        value={selectedSubject}
                        onChange={(value) => setSelectedSubject(value as AutocompleteOption)}
                        placeholder="Choose subject..."
                        theme="green"
                        size="lg"
                        label="Subject"
                        groupBy="group"
                        clearable
                        customColors={{
                            selectedOption: 'bg-green-600 text-white',
                            hoveredOption: 'bg-green-50',
                            border: 'border-green-300 focus:border-green-500'
                        }}
                        className="mb-4"
                    />
                    {selectedSubject && (
                        <div className="mt-3 p-3 bg-green-50 rounded-md">
                            <p className="text-sm text-green-800">
                                <strong>Selected:</strong> {selectedSubject.label}
                            </p>
                            <p className="text-xs text-green-600">
                                Category: {(selectedSubject as any).group}
                            </p>
                        </div>
                    )}
                </div>

                {/* Card 4: Async Loading */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Async Student Search
                    </h3>
                    <Autocomplete
                        options={[]}
                        placeholder="Type to search students..."
                        theme="pink"
                        size="md"
                        label="Dynamic Student Search"
                        onLoadOptions={loadStudentsAsync}
                        minInputLength={2}
                        loadingText="Searching students..."
                        noResultsText="No students found"
                        helperText="Type at least 2 characters to search"
                        className="mb-4"
                        customColors={{
                            selectedOption: 'bg-pink-600 text-white',
                            hoveredOption: 'bg-pink-50'
                        }}
                    />
                </div>

                {/* Card 5: Free Solo Mode */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Custom Value Entry
                    </h3>
                    <Autocomplete
                        options={['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']}
                        value={customValue}
                        onChange={(value) => setCustomValue(value as string)}
                        placeholder="Type or select class..."
                        theme="dark"
                        size="md"
                        label="Class Selection (Free Solo)"
                        freeSolo
                        clearable
                        helperText="You can type custom values or select from suggestions"
                        className="mb-4"
                    />
                    {customValue && (
                        <div className="mt-3 p-3 bg-gray-100 rounded-md">
                            <p className="text-sm text-gray-800">
                                <strong>Entered Value:</strong> {customValue}
                            </p>
                        </div>
                    )}
                </div>

                {/* Card 6: Different Sizes Demo */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Different Sizes
                    </h3>

                    <div className="space-y-4">
                        <Autocomplete
                            options={['Small Size', 'Option 2', 'Option 3']}
                            placeholder="Small size..."
                            theme="blue"
                            size="sm"
                            label="Small (sm)"
                        />

                        <Autocomplete
                            options={['Medium Size', 'Option 2', 'Option 3']}
                            placeholder="Medium size..."
                            theme="purple"
                            size="md"
                            label="Medium (md)"
                        />

                        <Autocomplete
                            options={['Large Size', 'Option 2', 'Option 3']}
                            placeholder="Large size..."
                            theme="green"
                            size="lg"
                            label="Large (lg)"
                        />
                    </div>
                </div>

                {/* Card 7: Error States */}
                <div className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2 xl:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Error & Disabled States
                    </h3>

                    <div className="space-y-4">
                        <Autocomplete
                            options={['Option 1', 'Option 2', 'Option 3']}
                            placeholder="With error..."
                            theme="light"
                            size="md"
                            label="Field with Error"
                            error="This field is required"
                            required
                        />

                        <Autocomplete
                            options={['Option 1', 'Option 2', 'Option 3']}
                            placeholder="Disabled field..."
                            theme="light"
                            size="md"
                            label="Disabled Field"
                            disabled
                            value="Pre-selected value"
                        />
                    </div>
                </div>

                {/* Card 8: Custom Rendering */}
                <div className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Custom Option Rendering
                    </h3>
                    <Autocomplete
                        options={teacherOptions}
                        placeholder="Search teachers with custom display..."
                        theme="blue"
                        size="md"
                        label="Teachers (Custom Rendering)"
                        renderOption={(option) => (
                            <div className="flex items-center gap-3 py-1">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-medium text-sm">
                                        {option.label.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{option.label}</div>
                                    <div className="text-xs text-gray-500">{option.description}</div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {(option as any).group}
                                </div>
                            </div>
                        )}
                        className="mb-4"
                    />
                </div>
            </div>

            {/* Results Summary */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Current Selections Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                        <strong>Selected Student:</strong> {selectedStudent || 'None'}
                    </div>
                    <div>
                        <strong>Selected Teachers:</strong> {selectedTeachers.length} selected
                    </div>
                    <div>
                        <strong>Selected Subject:</strong> {selectedSubject?.label || 'None'}
                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                        <strong>Custom Value:</strong> {customValue || 'None'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
