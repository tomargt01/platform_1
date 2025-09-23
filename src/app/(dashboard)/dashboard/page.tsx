'use client';

import React, { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import {
    // Basic Modals (3)
    ConfirmationModal,
    AlertModal,
    InformationModal,
    // Form Modals (3)
    InputModal,
    WizardModal,
    SearchModal,
    // Content Display Modals (3)
    LightboxModal,
    PreviewModal,
    FullscreenModal,
    // Action Modals (3)
    ActionChoiceModal,
    ContextualModal,
    ProgressModal,
    // Interactive Modals (4)
    DraggableModal,
    DrawerModal,
    BottomSheetModal,
    ResizableModal,
    // Feedback Modals (5)
    SuccessModal,
    ErrorModal,
    WarningModal,
    InfoModal,
    LoadingModal,
    // Specialized Modals (3)
    LoginModal,
    FilterModal,
    ChatModal,
    // Advanced Modals (4)
    NestedModal,
    MultiContentModal,
    SplitModal,
    PersistentModal,
} from '#/components/ui/base/Modal';

import {
    Download, Archive, Trash2, BarChart3, Users, Settings, AlertTriangle,
    Calendar, MessageCircle, Filter, Search, Eye, Grid, Layout, Move,
    Maximize2, Info, CheckCircle, XCircle, Play, Upload, Edit, Plus
} from 'lucide-react';

const Dashboard = () => {

    const contextButtonRef = useRef<HTMLButtonElement>(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    // All 28 modal states
    const [modals, setModals] = useState({
        // Basic Modals (3)
        confirmation: false,
        alert: false,
        information: false,

        // Form Modals (3)
        input: false,
        wizard: false,
        search: false,

        // Content Display Modals (3)
        lightbox: false,
        preview: false,
        fullscreen: false,

        // Action Modals (3)
        actionChoice: false,
        contextual: false,
        progress: false,

        // Interactive Modals (4)
        draggable: false,
        drawer: false,
        bottomSheet: false,
        resizable: false,

        // Feedback Modals (5)
        success: false,
        error: false,
        warning: false,
        info: false,
        loading: false,

        // Specialized Modals (3)
        login: false,
        filter: false,
        chat: false,

        // Advanced Modals (4)
        nested: false,
        nestedChild: false,
        multiContent: false,
        split: false,
        persistent: false,
    });

    // Stable modal handlers
    const openModal = (modalType: keyof typeof modals) => {
        flushSync(() => {
            setModals(prev => ({ ...prev, [modalType]: true }));
        });
    };

    const closeModal = (modalType: keyof typeof modals) => {
        flushSync(() => {
            setModals(prev => ({ ...prev, [modalType]: false }));
        });
    };

    const [bottomSheetHeight, setBottomSheetHeight] = useState('50vh');

    // Custom snap points for bottom sheet
    const customSnapPoints = [
        { label: 'Peek', height: '20vh', percentage: 20 },
        { label: 'Half', height: '50vh', percentage: 50 },
        { label: 'Large', height: '80vh', percentage: 80 },
        { label: 'Almost Full', height: '95vh', percentage: 95 }
    ];

    // Sample data
    const lightboxItems = [
        {
            type: 'image' as const,
            src: 'https://picsum.photos/800/600?random=1',
            title: 'School Building',
            description: 'Main campus building with modern facilities'
        },
        {
            type: 'image' as const,
            src: 'https://picsum.photos/900/700?random=2',
            title: 'Library',
            description: 'State-of-the-art library with digital resources'
        },
        {
            type: 'image' as const,
            src: 'https://picsum.photos/800/800?random=3',
            title: 'Playground',
            description: 'Outdoor sports and recreational facilities'
        },
    ];

    const sampleMessages = [
        { id: '1', sender: 'other' as const, message: 'Hello! How can I help you?', timestamp: new Date() },
        { id: '2', sender: 'user' as const, message: 'I need help with my account', timestamp: new Date() },
    ];

    const inputFields = [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: false },
    ];

    const wizardSteps = [
        {
            title: 'Personal Info',
            content: <div className="space-y-4">
                <input type="text" placeholder="First Name" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" />
            </div>
        },
        {
            title: 'Address',
            content: <div className="space-y-4">
                <input type="text" placeholder="Street" className="w-full p-2 border rounded" />
                <input type="text" placeholder="City" className="w-full p-2 border rounded" />
            </div>
        },
        {
            title: 'Review',
            content: <div className="text-center py-8">
                <h3>Please review your information</h3>
            </div>
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Modal Testing Dashboard</h1>
                    <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 font-medium">Testing All 28 Modal Types</p>
                        <p className="text-blue-600 text-sm">Click any button to test the modal functionality</p>
                    </div>
                </div>

                {/* Modal Testing Grid - 7 columns x 4 rows = 28 modals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">

                    {/* Basic Modals (3) */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-blue-600 mb-2">Basic (3)</h3>
                        <button
                            onClick={() => openModal('confirmation')}
                            className="w-full p-2 bg-red-500 text-white text-xs rounded hover:bg-red-600 flex items-center justify-center"
                        >
                            <AlertTriangle size={14} className="mr-1" />
                            Confirm
                        </button>
                        <button
                            onClick={() => openModal('alert')}
                            className="w-full p-2 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 flex items-center justify-center"
                        >
                            <Info size={14} className="mr-1" />
                            Alert
                        </button>
                        <button
                            onClick={() => openModal('information')}
                            className="w-full p-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 flex items-center justify-center"
                        >
                            <Info size={14} className="mr-1" />
                            Info
                        </button>
                    </div>

                    {/* Form Modals (3) */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-green-600 mb-2">Forms (3)</h3>
                        <button
                            onClick={() => openModal('input')}
                            className="w-full p-2 bg-green-500 text-white text-xs rounded hover:bg-green-600 flex items-center justify-center"
                        >
                            <Edit size={14} className="mr-1" />
                            Input
                        </button>
                        <button
                            onClick={() => openModal('wizard')}
                            className="w-full p-2 bg-emerald-500 text-white text-xs rounded hover:bg-emerald-600 flex items-center justify-center"
                        >
                            <Play size={14} className="mr-1" />
                            Wizard
                        </button>
                        <button
                            onClick={() => openModal('search')}
                            className="w-full p-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600 flex items-center justify-center"
                        >
                            <Search size={14} className="mr-1" />
                            Search
                        </button>
                    </div>

                    {/* Content Display (3) */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-purple-600 mb-2">Content (3)</h3>
                        <button
                            onClick={() => openModal('lightbox')}
                            className="w-full p-2 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 flex items-center justify-center"
                        >
                            <Eye size={14} className="mr-1" />
                            Lightbox
                        </button>
                        <button
                            onClick={() => openModal('preview')}
                            className="w-full p-2 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 flex items-center justify-center"
                        >
                            <Eye size={14} className="mr-1" />
                            Preview
                        </button>
                        <button
                            onClick={() => openModal('fullscreen')}
                            className="w-full p-2 bg-violet-500 text-white text-xs rounded hover:bg-violet-600 flex items-center justify-center"
                        >
                            <Maximize2 size={14} className="mr-1" />
                            Fullscreen
                        </button>
                    </div>

                    {/* Action Modals (3) */}
                    <div className="space-y-2">
                        {/* Action Modals column */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-pink-600 mb-2">Actions (3)</h3>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openModal('actionChoice');
                                }}
                                className="w-full p-2 bg-pink-500 text-white text-xs rounded hover:bg-pink-600"
                            >
                                Choice
                            </button>

                            {/* FIXED: Contextual Modal Button */}
                            <button
                                ref={contextButtonRef}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openModal('contextual');
                                }}
                                className="w-full p-2 bg-rose-500 text-white text-xs rounded hover:bg-rose-600"
                            >
                                Context
                            </button>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openModal('progress');
                                }}
                                className="w-full p-2 bg-fuchsia-500 text-white text-xs rounded hover:bg-fuchsia-600"
                            >
                                Progress
                            </button>
                        </div>
                    </div>

                    {/* Interactive Modals (4) */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-cyan-600 mb-2">Interactive (4)</h3>
                        <button
                            onClick={() => openModal('draggable')}
                            className="w-full p-2 bg-cyan-500 text-white text-xs rounded hover:bg-cyan-600 flex items-center justify-center"
                        >
                            <Move size={14} className="mr-1" />
                            Drag
                        </button>
                        <button
                            onClick={() => openModal('drawer')}
                            className="w-full p-2 bg-sky-500 text-white text-xs rounded hover:bg-sky-600 flex items-center justify-center"
                        >
                            <Layout size={14} className="mr-1" />
                            Drawer
                        </button>
                        <button
                            onClick={() => openModal('bottomSheet')}
                            className="w-full p-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 flex items-center justify-center"
                        >
                            <Layout size={14} className="mr-1" />
                            Sheet
                        </button>
                        <button
                            onClick={() => openModal('resizable')}
                            className="w-full p-2 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 flex items-center justify-center"
                        >
                            <Maximize2 size={14} className="mr-1" />
                            Resize
                        </button>
                    </div>

                    {/* Feedback Modals (5) */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-emerald-600 mb-2">Feedback (5)</h3>
                        <button
                            onClick={() => openModal('success')}
                            className="w-full p-2 bg-emerald-500 text-white text-xs rounded hover:bg-emerald-600 flex items-center justify-center"
                        >
                            <CheckCircle size={14} className="mr-1" />
                            Success
                        </button>
                        <button
                            onClick={() => openModal('error')}
                            className="w-full p-2 bg-red-500 text-white text-xs rounded hover:bg-red-600 flex items-center justify-center"
                        >
                            <XCircle size={14} className="mr-1" />
                            Error
                        </button>
                        <button
                            onClick={() => openModal('warning')}
                            className="w-full p-2 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 flex items-center justify-center"
                        >
                            <AlertTriangle size={14} className="mr-1" />
                            Warning
                        </button>
                        <button
                            onClick={() => openModal('info')}
                            className="w-full p-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 flex items-center justify-center"
                        >
                            <Info size={14} className="mr-1" />
                            Info
                        </button>
                        <button
                            onClick={() => openModal('loading')}
                            className="w-full p-2 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 flex items-center justify-center"
                        >
                            <Upload size={14} className="mr-1" />
                            Loading
                        </button>
                    </div>

                    {/* Specialized Modals (3) + Advanced (4) */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-amber-600 mb-2">Special (7)</h3>
                        <button
                            onClick={() => openModal('login')}
                            className="w-full p-2 bg-amber-500 text-white text-xs rounded hover:bg-amber-600 flex items-center justify-center"
                        >
                            <Users size={14} className="mr-1" />
                            Login
                        </button>
                        <button
                            onClick={() => openModal('filter')}
                            className="w-full p-2 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 flex items-center justify-center"
                        >
                            <Filter size={14} className="mr-1" />
                            Filter
                        </button>
                        <button
                            onClick={() => openModal('chat')}
                            className="w-full p-2 bg-green-500 text-white text-xs rounded hover:bg-green-600 flex items-center justify-center"
                        >
                            <MessageCircle size={14} className="mr-1" />
                            Chat
                        </button>
                        <button
                            onClick={() => openModal('nested')}
                            className="w-full p-2 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 flex items-center justify-center"
                        >
                            <Layout size={14} className="mr-1" />
                            Nested
                        </button>
                        <button
                            onClick={() => openModal('multiContent')}
                            className="w-full p-2 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 flex items-center justify-center"
                        >
                            <Grid size={14} className="mr-1" />
                            Multi
                        </button>
                        <button
                            onClick={() => openModal('split')}
                            className="w-full p-2 bg-violet-500 text-white text-xs rounded hover:bg-violet-600 flex items-center justify-center"
                        >
                            <Layout size={14} className="mr-1" />
                            Split
                        </button>
                        <button
                            onClick={() => openModal('persistent')}
                            className="w-full p-2 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 flex items-center justify-center"
                        >
                            <Settings size={14} className="mr-1" />
                            Persist
                        </button>
                    </div>
                </div>

                {/* Modal Counter */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4">Modal Status Counter</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-blue-50 p-4 rounded">
                            <div className="text-2xl font-bold text-blue-600">
                                {Object.values(modals).filter(Boolean).length}
                            </div>
                            <div className="text-sm text-blue-800">Currently Open</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded">
                            <div className="text-2xl font-bold text-green-600">28</div>
                            <div className="text-sm text-green-800">Total Types</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded">
                            <div className="text-2xl font-bold text-purple-600">8</div>
                            <div className="text-sm text-purple-800">Categories</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded">
                            <div className="text-2xl font-bold text-orange-600">6</div>
                            <div className="text-sm text-orange-800">Themes</div>
                        </div>
                    </div>
                </div>

                {/* ALL 28 MODALS - Complete Implementation */}

                {/* 1. Basic Modals (3) */}
                <ConfirmationModal
                    isOpen={modals.confirmation}
                    onClose={() => closeModal('confirmation')}
                    title="Delete Item"
                    message="Are you sure you want to delete this item? This action cannot be undone."
                    type="danger"
                    onConfirm={() => {
                        alert('Item deleted!');
                        closeModal('confirmation');
                    }}
                />

                <AlertModal
                    isOpen={modals.alert}
                    onClose={() => closeModal('alert')}
                    type="success"
                    title="Operation Complete"
                    message="Your request has been processed successfully."
                />

                <InformationModal
                    isOpen={modals.information}
                    onClose={() => closeModal('information')}
                    showHeader={false}  // No header
                    showFooter={false}  // No footer
                    closeButtonPosition="body"
                    content={
                        <div>
                            <h3 className="text-lg font-semibold mb-4">System Information</h3>
                            <p>Current system status and details:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Version: 2.1.4</li>
                                <li>Status: Active</li>
                                <li>Users: 1,234 online</li>
                                <li>Uptime: 99.9%</li>
                            </ul>
                        </div>
                    }
                />

                <ContextualModal
                    isOpen={modals.contextual}
                    onClose={() => closeModal('contextual')}
                    triggerElement={contextButtonRef.current}
                    content={
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">Quick Actions</h4>
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        alert('Action 1 performed');
                                        closeModal('contextual');
                                    }}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                                >
                                    📊 View Analytics
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Action 2 performed');
                                        closeModal('contextual');
                                    }}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                                >
                                    ⚙️ Settings
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Action 3 performed');
                                        closeModal('contextual');
                                    }}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                                >
                                    📝 Edit Profile
                                </button>
                            </div>
                        </div>
                    }
                />

                {/* 2. Form Modals (3) */}
                <InputModal
                    isOpen={modals.input}
                    onClose={() => closeModal('input')}
                    // title="User Information"
                    fields={inputFields}
                    onSubmit={(data) => {
                        console.log('Form submitted:', data);
                        alert('Data saved!');
                        closeModal('input');
                    }}
                />

                <WizardModal
                    isOpen={modals.wizard}
                    onClose={() => closeModal('wizard')}
                    steps={wizardSteps}
                    onSubmit={(data) => {
                        alert('Wizard completed!');
                        closeModal('wizard');
                    }}
                />

                <SearchModal
                    isOpen={modals.search}
                    onClose={() => closeModal('search')}
                    onSearch={(query) => console.log('Searching:', query)}
                    placeholder="Search students, teachers, classes..."
                    results={
                        <div className="space-y-2">
                            <div className="p-3 hover:bg-gray-100 rounded cursor-pointer">John Doe - Student</div>
                            <div className="p-3 hover:bg-gray-100 rounded cursor-pointer">Jane Smith - Teacher</div>
                            <div className="p-3 hover:bg-gray-100 rounded cursor-pointer">Class 10-A</div>
                        </div>
                    }
                />

                {/* 3. Content Display Modals (3) */}
                <LightboxModal
                    isOpen={modals.lightbox}
                    onClose={() => closeModal('lightbox')}
                    items={lightboxItems}
                    currentIndex={lightboxIndex}
                    onIndexChange={setLightboxIndex}
                    showThumbnails={true}
                    allowDownload={true}
                />

                <PreviewModal
                    isOpen={modals.preview}
                    onClose={() => closeModal('preview')}
                    title="Student Report"
                    previewType="document"
                    content={
                        <div className="space-y-4">
                            <h3>Academic Performance Report</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>Math: 95%</div>
                                <div>Science: 92%</div>
                                <div>English: 88%</div>
                                <div>History: 85%</div>
                            </div>
                        </div>
                    }
                />

                <FullscreenModal
                    isOpen={modals.fullscreen}
                    onClose={() => closeModal('fullscreen')}
                    title="School Dashboard"
                >
                    <div className="p-6">
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            <div className="bg-blue-500 text-white p-6 rounded">
                                <h3 className="text-2xl font-bold">1,234</h3>
                                <p>Students</p>
                            </div>
                            <div className="bg-green-500 text-white p-6 rounded">
                                <h3 className="text-2xl font-bold">89</h3>
                                <p>Teachers</p>
                            </div>
                            <div className="bg-purple-500 text-white p-6 rounded">
                                <h3 className="text-2xl font-bold">24</h3>
                                <p>Classes</p>
                            </div>
                            <div className="bg-orange-500 text-white p-6 rounded">
                                <h3 className="text-2xl font-bold">96.5%</h3>
                                <p>Attendance</p>
                            </div>
                        </div>
                        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                            <p>Dashboard Content Goes Here</p>
                        </div>
                    </div>
                </FullscreenModal>

                {/* Continue with remaining 22 modals... */}
                {/* 4-8: Action, Interactive, Feedback, Specialized, Advanced Modals */}

                {/* Action Modals (3) */}
                <ActionChoiceModal
                    isOpen={modals.actionChoice}
                    onClose={() => closeModal('actionChoice')}
                    title="Choose Action"
                    message="What would you like to do with selected items?"
                    actions={[
                        {
                            label: 'Export Data',
                            action: () => alert('Exporting...'),
                            variant: 'primary',
                            icon: <Download size={16} />
                        },
                        {
                            label: 'Archive',
                            action: () => alert('Archiving...'),
                            variant: 'secondary',
                            icon: <Archive size={16} />
                        },
                        {
                            label: 'Delete',
                            action: () => alert('Deleting...'),
                            variant: 'danger',
                            icon: <Trash2 size={16} />
                        }
                    ]}
                />

                <ProgressModal
                    isOpen={modals.progress}
                    onClose={() => closeModal('progress')}
                    title="Processing Data"
                    progress={65}
                    status="loading"
                    message="Uploading files..."
                    onCancel={() => closeModal('progress')}
                />

                {/* Interactive Modals (4) */}
                <DraggableModal
                    isOpen={modals.draggable}
                    onClose={() => closeModal('draggable')}
                    title="Enhanced Draggable Modal"
                    initialPosition={{ x: 50, y: 50 }}
                    onPositionChange={(pos) => console.log('New position:', pos)}
                >
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-medium text-blue-800 mb-2">✅ Fixed Features:</h5>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Drag from anywhere on modal (header, content, borders)</li>
                                <li>• Correct directional movement (up = up, down = down)</li>
                                <li>• Smooth dragging without jumps</li>
                                <li>• Position indicator while dragging</li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="font-medium">Drag Test Areas:</div>
                                <div className="text-gray-600">Try dragging from:</div>
                                <div>• Header bar</div>
                                <div>• This content area</div>
                                <div>• Modal borders</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="font-medium">Direction Test:</div>
                                <div className="text-gray-600">Movement should be:</div>
                                <div>• Up → Up</div>
                                <div>• Down → Down</div>
                                <div>• Left → Left</div>
                                <div>• Right → Right</div>
                            </div>
                        </div>
                    </div>
                </DraggableModal>


                <DrawerModal
                    isOpen={modals.drawer}
                    onClose={() => closeModal('drawer')}
                    title="Settings Panel"
                    position="right"
                >
                    <div className="space-y-4">
                        <h4 className="font-medium">Account Settings</h4>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Email notifications
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Push notifications
                            </label>
                        </div>
                        <button
                            onClick={() => {
                                alert('Settings saved!');
                                closeModal('drawer');
                            }}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save Settings
                        </button>
                    </div>
                </DrawerModal>

                <BottomSheetModal
                    isOpen={modals.bottomSheet}
                    onClose={() => closeModal('bottomSheet')}
                    title="Enhanced Bottom Sheet"
                    initialHeight={bottomSheetHeight}
                    minHeight={150}
                    maxHeight={window.innerHeight - 50}
                    snapPoints={customSnapPoints}
                    onHeightChange={setBottomSheetHeight}
                >
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 className="font-medium text-green-800 mb-2">✅ Enhanced Features:</h5>
                            <ul className="text-sm text-green-700 space-y-1">
                                <li>• Functional drag handle (grey bar at top)</li>
                                <li>• Custom snap points with labels</li>
                                <li>• Interactive dot indicators</li>
                                <li>• Real-time height adjustment</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h6 className="font-medium mb-2">Instructions:</h6>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div>1. Drag the grey handle at top to resize</div>
                                    <div>2. Click the dots at bottom for quick heights</div>
                                    <div>3. Hover dots to see height labels</div>
                                    <div>4. Current height: <span className="font-mono bg-gray-100 px-1 rounded">{bottomSheetHeight}</span></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {customSnapPoints.map((point, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setBottomSheetHeight(point.height);
                                            // This will trigger the onHeightChange in the modal
                                        }}
                                        className={`p-2 rounded text-sm transition-colors ${bottomSheetHeight === point.height
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        {point.label} ({point.percentage}%)
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sample content to test scrolling */}
                        <div className="space-y-2">
                            <h6 className="font-medium">Sample Content:</h6>
                            {Array.from({ length: 20 }, (_, i) => (
                                <div key={i} className="p-3 bg-gray-50 rounded">
                                    Content item {i + 1} - This demonstrates scrolling in the bottom sheet
                                </div>
                            ))}
                        </div>
                    </div>
                </BottomSheetModal>

                <ResizableModal
                    isOpen={modals.resizable}
                    onClose={() => closeModal('resizable')}
                    title="Resizable Window"
                >
                    <div>
                        <p>This modal can be resized!</p>
                        <div className="mt-4 space-y-2">
                            <div className="bg-gray-100 p-3 rounded">Item 1</div>
                            <div className="bg-gray-100 p-3 rounded">Item 2</div>
                            <div className="bg-gray-100 p-3 rounded">Item 3</div>
                        </div>
                    </div>
                </ResizableModal>

                {/* Feedback Modals (5) */}
                <SuccessModal
                    isOpen={modals.success}
                    onClose={() => closeModal('success')}
                    title="Success!"
                    message="Operation completed successfully."
                    actionText="View Details"
                    onAction={() => alert('Details...')}
                />

                <ErrorModal
                    isOpen={modals.error}
                    onClose={() => closeModal('error')}
                    title="Error Occurred"
                    message="Something went wrong while processing your request."
                    retryAction={() => alert('Retrying...')}
                />

                <WarningModal
                    isOpen={modals.warning}
                    onClose={() => closeModal('warning')}
                    title="Warning"
                    message="This action may have unintended consequences."
                    onProceed={() => alert('Proceeding...')}
                />

                <InfoModal
                    isOpen={modals.info}
                    onClose={() => closeModal('info')}
                    title="Information"
                    message="Here's some important information:"
                    details={[
                        'System version: 2.1.4',
                        'Last update: Today',
                        'Status: Operational'
                    ]}
                />

                <LoadingModal
                    isOpen={modals.loading}
                    onClose={() => closeModal('loading')} // Now works
                    title="Processing Data..."
                    message="Please wait while we process your request"
                    showProgress={true}
                    progress={75}
                    allowClose={true} // NEW: Allow user to close
                />

                {/* Specialized Modals (3) */}
                <LoginModal
                    isOpen={modals.login}
                    onClose={() => closeModal('login')}
                    onLogin={(credentials) => {
                        alert(`Login: ${credentials.email}`);
                        closeModal('login');
                    }}
                />

                <FilterModal
                    isOpen={modals.filter}
                    onClose={() => closeModal('filter')}
                    filters={[
                        {
                            name: 'category',
                            label: 'Category',
                            type: 'select',
                            options: [
                                { value: 'students', label: 'Students' },
                                { value: 'teachers', label: 'Teachers' }
                            ]
                        }
                    ]}
                    onApply={(filters) => {
                        console.log('Filters:', filters);
                        closeModal('filter');
                    }}
                    onReset={() => alert('Reset filters')}
                />

                <ChatModal
                    isOpen={modals.chat}
                    onClose={() => closeModal('chat')}
                    title="Support Chat"
                    messages={sampleMessages}
                    onSendMessage={(msg) => console.log('New message:', msg)}
                />

                {/* Advanced Modals (4) */}
                <NestedModal
                    isOpen={modals.nested}
                    onClose={() => closeModal('nested')}
                    title="Parent Modal"
                    nested={{
                        title: 'Child Modal',
                        content: <div className="text-center p-4">This is a nested modal!</div>,
                        isOpen: modals.nestedChild,
                        onClose: () => closeModal('nestedChild')
                    }}
                >
                    <div>
                        <p>This is the parent modal.</p>
                        <button
                            onClick={() => openModal('nestedChild')}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Open Child Modal
                        </button>
                    </div>
                </NestedModal>

                <MultiContentModal
                    isOpen={modals.multiContent}
                    onClose={() => closeModal('multiContent')}
                    tabs={[
                        {
                            id: 'tab1',
                            label: 'Overview',
                            icon: <BarChart3 size={16} />,
                            content: <div className="p-4">Overview content here</div>
                        },
                        {
                            id: 'tab2',
                            label: 'Users',
                            icon: <Users size={16} />,
                            content: <div className="p-4">Users content here</div>
                        },
                        {
                            id: 'tab3',
                            label: 'Settings',
                            icon: <Settings size={16} />,
                            content: <div className="p-4">Settings content here</div>
                        }
                    ]}
                />

                <SplitModal
                    isOpen={modals.split}
                    onClose={() => closeModal('split')}
                    title="Split View"
                    leftTitle="Left Panel"
                    rightTitle="Right Panel"
                    leftContent={<div className="p-4">Left side content</div>}
                    rightContent={<div className="p-4">Right side content</div>}
                />

                <PersistentModal
                    isOpen={modals.persistent}
                    onClose={() => { }}  // Can't close easily
                    title="Persistent Modal"
                    warningMessage="Complete the form to close this modal"
                >
                    <div className="space-y-4">
                        <p>This modal requires action before closing.</p>
                        <input type="text" placeholder="Required field" className="w-full p-2 border rounded" />
                        <button
                            onClick={() => closeModal('persistent')}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Complete & Close
                        </button>
                    </div>
                </PersistentModal>
            </div>
        </div>
    );
};

export default Dashboard;
