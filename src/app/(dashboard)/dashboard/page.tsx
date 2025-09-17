"use client";
import React, { useState } from "react";
import { Theme } from "#/lib/hooks/useThemeStore";
import { Checkbox } from "#/components/ui/base/CheckBox";
import { Label, LabelGroup } from "#/components/ui/base/Label";
import { Lock, Mail, Phone, User } from "lucide-react";
import { Button } from "#/components/ui/base/Button";
import { ArrowRight } from 'lucide-react';
import { Input } from "#/components/ui/base/Input";

const Dashboard = () => {
    const [theme, setTheme] = useState<Theme>("blue");

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="min-h-screen transition-colors duration-200">
            <div className="container mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        School ERP Dashboard
                    </h1>
                    <p className="">
                        Manage your school operations with theme-based components
                    </p>
                </div>

                {/* Theme Selection */}
                <div className="rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Theme Selection
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {(["light", "dark", "purple", "pink", "green", "blue"] as const).map((t) => (
                            <Checkbox
                                key={t}
                                intent="secondary"
                                variantSize="sm"
                                label={t.charAt(0).toUpperCase() + t.slice(1)}
                                onChange={() => toggleTheme(t)}
                                checked={theme === t}
                            />
                        ))}
                    </div>
                    <div className="mt-4 p-3rounded-lg">
                        <p className="text-sm ">
                            Current Theme: <span className="font-semibold capitalize">{theme}</span>
                        </p>
                    </div>
                </div>
                <form className="space-y-6 p-6 bg-white rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>

                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <Label
                            variant="info"
                            theme={theme}
                            size="lg"
                            className="border-b border-blue-200 pb-2"
                        >
                            Personal Information
                        </Label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor="firstName"
                                    required
                                    theme={theme}
                                    icon={<User className="w-4 h-4" />}
                                    description="Enter your first name as per official documents"
                                >
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    intent="primary"
                                    placeholder="Enter text..."
                                    value={inputValue}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="lastName"
                                    required
                                    theme={theme}
                                    icon={<User className="w-4 h-4" />}
                                >
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    intent="primary"
                                    placeholder="Enter text..."
                                    value={inputValue}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <Label
                            variant="info"
                            theme={theme}
                            size="lg"
                            className="border-b border-green-200 pb-2"
                        >
                            Contact Information
                        </Label>

                        <div>
                            <Label
                                htmlFor="email"
                                required
                                theme={theme}
                                icon={<Mail className="w-4 h-4" />}
                                tooltip="We'll never share your email with anyone"
                            >
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                intent="primary"
                                placeholder="Enter text..."
                                value={inputValue}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="phone"
                                optional
                                theme={theme}
                                icon={<Phone className="w-4 h-4" />}
                                description="Include country code for international numbers"
                            >
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                intent="primary"
                                placeholder="Enter text..."
                                value={inputValue}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="space-y-4">
                        <Label
                            variant="warning"
                            theme={theme}
                            size="lg"
                            className="border-b border-purple-200 pb-2"
                        >
                            Security
                        </Label>

                        <div>
                            <Label
                                htmlFor="password"
                                required
                                theme={theme}
                                icon={<Lock className="w-4 h-4" />}
                                description="Password must be at least 8 characters long"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                intent="primary"
                                placeholder="Enter text..."
                                value={inputValue}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="confirmPassword"
                                required
                                theme={theme}
                                icon={<Lock className="w-4 h-4" />}
                            >
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                intent="primary"
                                placeholder="Enter text..."
                                value={inputValue}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <LabelGroup orientation="horizontal" spacing="normal" className="pt-4">
                        <Button intent="primary" size="md" theme="light" type="submit">
                            Button with Left Icon
                        </Button>
                        <Button intent="secondary" size="md" theme="light" type="button">
                            Button with Left Icon
                        </Button>
                    </LabelGroup>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
