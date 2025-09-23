'use client';

import React, { useState } from 'react';
import Modal from '../Modal';
import { FormModalProps } from '../Modal.types';

// Input/Data Entry Modal
export const InputModal: React.FC<FormModalProps & {
    fields: Array<{
        name: string;
        label: string;
        type: string;
        required?: boolean;
        placeholder?: string;
    }>;
}> = ({
    fields,
    onSubmit,
    submitText = 'Submit',
    cancelText = 'Cancel',
    loading = false,
    ...modalProps
}) => {
        const [formData, setFormData] = useState<Record<string, any>>({});

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit?.(formData);
        };

        const handleInputChange = (name: string, value: any) => {
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        return (
            <Modal
                {...modalProps}
                content={
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    <input
                                        type={field.type}
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            ))}
                        </div>
                    </form>
                }
                footer={
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={modalProps.onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Loading...' : submitText}
                        </button>
                    </div>
                }
            />
        );
    };

// Multi-step/Wizard Modal
export const WizardModal: React.FC<FormModalProps & {
    steps: Array<{
        title: string;
        content: React.ReactNode;
    }>;
}> = ({ steps, onSubmit, ...modalProps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <Modal
            {...modalProps}
            title={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].title}`}
            content={
                <div>
                    {/* Progress bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Step {currentStep + 1} of {steps.length}</span>
                            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Step content */}
                    <div className="min-h-[200px]">
                        {steps[currentStep].content}
                    </div>
                </div>
            }
            footer={
                <div className="flex justify-between">
                    <button
                        onClick={isFirstStep ? modalProps.onClose : prevStep}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                        {isFirstStep ? 'Cancel' : 'Previous'}
                    </button>

                    <button
                        onClick={isLastStep ? () => onSubmit?.({}) : nextStep}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        {isLastStep ? 'Complete' : 'Next'}
                    </button>
                </div>
            }
        />
    );
};

// Search Modal
export const SearchModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
    placeholder?: string;
    results?: React.ReactNode;
}> = ({ isOpen, onClose, onSearch, placeholder = 'Search...', results }) => {
    const [query, setQuery] = useState('');

    React.useEffect(() => {
        if (query) {
            const debounce = setTimeout(() => onSearch(query), 300);
            return () => clearTimeout(debounce);
        }
    }, [query, onSearch]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            content={
                <div>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />

                    {results && (
                        <div className="mt-4 max-h-96 overflow-y-auto">
                            {results}
                        </div>
                    )}
                </div>
            }
        />
    );
};
