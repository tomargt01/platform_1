"use client";
import React, { useState } from "react";
import { Checkbox } from "#/components/ui/base/CheckBox";
import { Theme } from "#/lib/hooks/useThemeStore";
import { Dialog } from '#/components/ui/base/Dialog';
import { Button } from "#/components/ui/base/Button";
import { ArrowRight, Loader2 } from "lucide-react";

const Dashboard = () => {

    // Basic Dialog
    const [isOpen, setIsOpen] = useState(false);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isCustomOpen, setIsCustomOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [theme, setTheme] = useState<Theme>("blue");

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Checkbox Component Test</h1>

            <div className="mb-4 space-y-2">
                {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
                    (t) => (
                        <Checkbox
                            key={t}
                            intent="secondary"
                            variantSize="sm"
                            label={t.charAt(0).toUpperCase() + t.slice(1)}
                            onChange={() => toggleTheme(t)}
                        />
                    )
                )}
            </div>
           <Button
            className=""
            size="sm"
            intent="secondary"
            theme={theme}
            // children="New"
            rightIcon={Loader2}
            loading={false}
            onClick={() => setIsOpen(true)}
            disabled={false}
           >New2</Button>
            <Dialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Basic Dialog"
                theme={theme}
                size="md"
            >
                <p>This is a basic dialog content.</p>
                <p>This is a basic dialog content.</p>
                <p>This is a basic dialog content.</p>
                <p>This is a basic dialog content.</p>
                <p>This is a basic dialog content.</p>
                <p>This is a basic dialog content.</p>
                <p>This is a basic dialog content.</p>
                <p>This is a basic dialog content.</p>
            </Dialog>

            <Dialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                title="Delete Item"
                variant="error"
                theme="dark"
                size="sm"
                showFooter={true}
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
                onPrimaryAction={() => {
                    // Delete logic
                    setIsConfirmOpen(false);
                }}
            >
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </Dialog>

            <Dialog
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                title="Success!"
                variant="success"
                theme="green"
                size="md"
                showFooter={true}
                primaryButtonText="Continue"
                customColors={{
                    primaryButton: 'bg-green-600 hover:bg-green-700 text-white'
                }}
            >
                <p>Your operation completed successfully!</p>
            </Dialog>


            <Dialog
                isOpen={isCustomOpen}
                onClose={() => setIsCustomOpen(false)}
                title="Custom Dialog"
                theme="blue"
                size="lg"
                showFooter={true}
                primaryButtonText="Save Changes"
                secondaryButtonText="Cancel"
                primaryButtonLoading={isLoading}
                onPrimaryAction={() => {
                    setIsLoading(true);
                    // Simulate API call
                    setTimeout(() => {
                        setIsLoading(false);
                        setIsCustomOpen(false);
                    }, 2000);
                }}
                customColors={{
                    background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
                    primaryButton: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                }}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                </div>
            </Dialog>

        </div>
    );
};

export default Dashboard;
