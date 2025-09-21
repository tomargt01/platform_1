"use client";

import { useState, useEffect } from 'react';
import {
    LinearProgress,
    CircularProgress,
    SemiCircularProgress,
    DottedProgress,
    StepProgress
} from '#/components/ui/base/ProgressBar';
import { Button } from '#/components/ui/base/Button';
import { Play, Pause, RefreshCw } from 'lucide-react';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Progress states for testing
    const [progressValues, setProgressValues] = useState({
        linear: 45,
        circular: 68,
        semiCircular: 85,
        dotted: 70,
        gradient: 30,
        striped: 55,
    });

    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'purple' | 'pink' | 'green' | 'blue'>('light');

    // Step progress data
    const [stepData, setStepData] = useState([
        { label: "Planning", completed: true },
        { label: "Development", completed: true },
        { label: "Testing", active: true, completed: false },
        { label: "Deployment", completed: false },
        { label: "Launch", completed: false }
    ]);

    // Auto increment progress for demo
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAnimating) {
            interval = setInterval(() => {
                setProgressValues(prev => ({
                    linear: (prev.linear + 2) % 100,
                    circular: (prev.circular + 1.5) % 100,
                    semiCircular: (prev.semiCircular + 1.2) % 100,
                    dotted: (prev.dotted + 1.8) % 100,
                    gradient: (prev.gradient + 2.5) % 100,
                    striped: (prev.striped + 1.3) % 100,
                }));
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isAnimating]);

    // Reset all progress values
    const resetProgress = () => {
        setProgressValues({
            linear: Math.floor(Math.random() * 100),
            circular: Math.floor(Math.random() * 100),
            semiCircular: Math.floor(Math.random() * 100),
            dotted: Math.floor(Math.random() * 100),
            gradient: Math.floor(Math.random() * 100),
            striped: Math.floor(Math.random() * 100),
        });
    };

    // Toggle step completion
    const toggleStep = (index: number) => {
        setStepData(prev => prev.map((step, i) => {
            if (i === index) {
                return { ...step, completed: !step.completed, active: false };
            } else if (i === index + 1 && !prev[index].completed) {
                return { ...step, active: true };
            }
            return step;
        }));
    };

    // Sample data for existing functionality
    const data = [
        { id: 1, name: "Sample Data 1" },
        { id: 2, name: "Sample Data 2" },
        { id: 3, name: "Sample Data 3" },
    ];

    const themes: Array<typeof selectedTheme> = ['light', 'dark', 'purple', 'pink', 'green', 'blue'];

    return (
        <div className="p-6 space-y-6 min-h-screen">
            {/* Header Controls */}
            <span>Progress Bar Testing Dashboard</span>
            <div className="flex items-center space-x-3">
                <Button
                    onClick={() => setIsAnimating(!isAnimating)}
                    intent={isAnimating ? "destructive" : "primary"}
                    size="sm"
                >
                    {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isAnimating ? 'Stop' : 'Start'} Animation
                </Button>
                <Button onClick={resetProgress} intent="secondary" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Values
                </Button>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Theme:</span>
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

            {/* Linear Progress Bars */}
            <div>
                <h3 className="text-sm font-semibold mb-3">Basic Linear Progress</h3>
                <LinearProgress
                    value={progressValues.linear}
                    theme={selectedTheme}
                    size="md"
                    showLabel
                    showPercentage
                    label="Download Progress"
                    animated
                />
            </div>

            {/* Gradient Linear Progress */}
            <div>
                <h3 className="text-sm font-semibold mb-3">Gradient Linear Progress</h3>
                <LinearProgress
                    value={progressValues.gradient}
                    theme={selectedTheme}
                    size="lg"
                    variant="gradient"
                    showPercentage
                    label="Upload Progress"
                    animated
                />
            </div>

            {/* Striped Linear Progress */}
            <div>
                <h3 className="text-sm font-semibold mb-3">Striped Linear Progress</h3>
                <LinearProgress
                    value={progressValues.striped}
                    theme={selectedTheme}
                    size="md"
                    showLabel
                    showPercentage
                    label="Processing..."
                    animated
                    striped
                />
            </div>

            {/* Different Sizes */}
            <div>
                <h3 className="text-sm font-semibold mb-3">Different Sizes</h3>
                <div className="space-y-3">
                    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                        <LinearProgress
                            key={size}
                            value={progressValues.linear}
                            theme={selectedTheme}
                            size={size}
                            showLabel
                            showPercentage
                            label={`Size: ${size.toUpperCase()}`}
                            animated
                        />
                    ))}
                </div>
            </div>

            {/* Circular Progress Bars */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* Different sizes */}
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                    <div key={size} className="text-center">
                        <h4 className="text-xs font-medium mb-2">{size.toUpperCase()}</h4>
                        <CircularProgress
                            value={progressValues.circular}
                            theme={selectedTheme}
                            size={size}
                            showText
                            showPercentage
                            animated
                            label="Complete"
                        />
                    </div>
                ))}
            </div>

            {/* Semi-Circular Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {themes.slice(0, 3).map(theme => (
                    <div key={theme} className="text-center">
                        <h4 className="text-sm font-medium mb-4 capitalize">{theme} Theme</h4>
                        <SemiCircularProgress
                            value={progressValues.semiCircular}
                            theme={theme}
                            size="md"
                            showText
                            showPercentage
                            animated
                            label={`${Math.round(progressValues.semiCircular)}% Complete`}
                        />
                    </div>
                ))}
            </div>

            {/* Dotted Progress */}
            <div>
                <h3 className="text-sm font-semibold mb-3">Different Dot Counts</h3>
                <div className="space-y-4">
                    {[10, 15, 20, 25].map(dotCount => (
                        <div key={dotCount}>
                            <span className="text-xs text-gray-600 mb-2 block">{dotCount} dots</span>
                            <DottedProgress
                                value={progressValues.dotted}
                                theme={selectedTheme}
                                size="md"
                                dotCount={dotCount}
                                animated
                                showPercentage
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Progress */}
            <div>
                <h3 className="text-sm font-semibold mb-3">Project Timeline</h3>
                <StepProgress
                    steps={stepData}
                    theme={selectedTheme}
                    size="md"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                    {stepData.map((step, index) => (
                        <Button
                            key={index}
                            onClick={() => toggleStep(index)}
                            intent="primary"
                            size="sm"
                        >
                            Toggle {step.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Different sizes */}
            <div>
                <h3 className="text-sm font-semibold mb-3">Different Sizes</h3>
                <div className="space-y-6">
                    {(['sm', 'md', 'lg'] as const).map(size => (
                        <div key={size}>
                            <span className="text-xs text-gray-600 mb-2 block">Size: {size.toUpperCase()}</span>
                            <StepProgress
                                steps={[
                                    { label: "Start", completed: true },
                                    { label: "Middle", active: true, completed: false },
                                    { label: "End", completed: false }
                                ]}
                                theme={selectedTheme}
                                size={size}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Real-time Progress Demo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-semibold mb-3">File Upload Simulation</h3>
                    <LinearProgress
                        value={progressValues.linear}
                        theme={selectedTheme}
                        size="md"
                        showLabel
                        showPercentage
                        label="Uploading files..."
                        animated
                        striped
                    />
                </div>
                <div>
                    <h3 className="text-sm font-semibold mb-3">System Status</h3>
                    <CircularProgress
                        value={progressValues.circular}
                        theme={selectedTheme}
                        size="lg"
                        showText
                        showPercentage
                        animated
                        label="System Health"
                    />
                </div>
            </div>

            {/* Original Dashboard Content */}
            <div className="data-container space-y-2">
                {data.map(item => (
                    <div key={item.id} className="p-2 rounded border">
                        {item.name}
                    </div>
                ))}
            </div>

            {/* Pagination with Progress */}
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages || 1}
                </span>
                <LinearProgress
                    value={(currentPage / (totalPages || 1)) * 100}
                    theme={selectedTheme}
                    size="sm"
                    width="200px"
                    showPercentage
                />
            </div>

            {/* Progress Values Display */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {Object.entries(progressValues).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-2 rounded">
                        <span className="capitalize">{key}:</span>
                        <span className="font-mono">{Math.round(value)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
