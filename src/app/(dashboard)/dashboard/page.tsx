"use client";
import React, { useState } from "react";
import { Alert, Theme } from "#/components/ui/base/Alert";
import { Button } from "#/components/ui/base/Button";

const Dashboard = () => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const handleDismiss = () => {
        console.log("Alert dismissed");
    };

    const handleAction = () => {
        console.log("Action clicked");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>

            {/* Theme Toggle Buttons */}
            <div className="mb-4 space-x-2">
                {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
                    (t) => (
                        <Button
                            key={t}
                            intent="secondary"
                            size="sm"
                            onClick={() => toggleTheme(t)}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </Button>
                    )
                )}
            </div>

            {/* Alert Variants */}
            <div className="space-y-4 max-w-md">
                <Alert
                    variant="error"
                    theme={theme}
                    title="Form Validation Error"
                    description="The email address is invalid. Please enter a valid email."
                    dismissible
                    onDismiss={handleDismiss}
                    action={
                        <Button size="sm" intent="destructive" onClick={handleAction}>
                            Fix Now
                        </Button>
                    }
                />
                <Alert
                    variant="warning"
                    theme={theme}
                    title="Delete Confirmation"
                    description="Are you sure you want to delete this project? This action cannot be undone."
                    dismissible
                    onDismiss={handleDismiss}
                    action={
                        <Button size="sm" intent="secondary" onClick={handleAction}>
                            Cancel
                        </Button>
                    }
                />
                <Alert
                    variant="info"
                    theme={theme}
                    title="Session Expired"
                    description="Your session has expired. Please log in again to continue."
                    dismissible
                    onDismiss={handleDismiss}
                    action={
                        <Button size="sm" intent="primary" onClick={handleAction}>
                            Log In
                        </Button>
                    }
                />
                <Alert
                    variant="critical"
                    theme={theme}
                    title="System Outage"
                    description="Our servers are currently down. Please try again later."
                    action={
                        <Button size="sm" intent="destructive" onClick={handleAction}>
                            Contact Support
                        </Button>
                    }
                />
                <Alert
                    variant="error"
                    theme={theme}
                    description="Password must be at least 8 characters long."
                    dismissible
                    onDismiss={handleDismiss}
                />
            </div>
        </div>
    );
};

export default Dashboard;






























// "use client";
// import React, { useState } from "react";
// import { Input, Theme } from "#/components/ui/base/Input";
// import { Mail, Lock, Search, Phone, Calendar } from "lucide-react";
// import { Button } from "#/components/ui/base/Button";

// const Dashboard = () => {
//     const [theme, setTheme] = useState<Theme>("light");
//     const [inputValue, setInputValue] = useState("");

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputValue(e.target.value);
//     };

//     const toggleTheme = (newTheme: Theme) => {
//         setTheme(newTheme);
//         document.documentElement.setAttribute("data-theme", newTheme);
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Input Component Testing</h1>

//             {/* Theme Toggle Buttons */}
//             <div className="mb-4 space-x-2">
//                 {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
//                     (t) => (
//                         <Button
//                             key={t}
//                             intent="secondary"
//                             size="sm"
//                             onClick={() => toggleTheme(t)}
//                             className="hover:bg-gray-200"
//                         >
//                             {t.charAt(0).toUpperCase() + t.slice(1)}
//                         </Button>
//                     )
//                 )}
//             </div>

//             {/* Basic Input */}
//             <div className="space-y-4 max-w-md">
//                 <Input
//                     intent="primary"
//                     placeholder="Enter text..."
//                     value={inputValue}
//                     onChange={handleChange}
//                 />

//                 {/* Input Variants */}
//                 <Input
//                     intent="primary"
//                     inputSize="lg"
//                     theme={theme}
//                     placeholder="Primary Large Input"
//                 />
//                 <Input
//                     intent="secondary"
//                     inputSize="md"
//                     theme={theme}
//                     placeholder="Secondary Medium Input"
//                 />
//                 <Input
//                     intent="ghost"
//                     inputSize="sm"
//                     theme={theme}
//                     placeholder="Ghost Small Input"
//                 />
//                 <Input
//                     intent="destructive"
//                     inputSize="md"
//                     theme={theme}
//                     placeholder="Destructive Input"
//                 />
//                 <Input
//                     intent="primary"
//                     inputSize="xs"
//                     theme={theme}
//                     placeholder="Extra Small Input"
//                 />

//                 {/* Inputs with Icons */}
//                 <Input
//                     type="email"
//                     leftIcon={Mail}
//                     placeholder="Enter email..."
//                     intent="primary"
//                     theme={theme}
//                 />
//                 <Input
//                     type="password"
//                     rightIcon={Lock}
//                     placeholder="Enter password..."
//                     intent="secondary"
//                     theme={theme}
//                 />
//                 <Input
//                     type="search"
//                     placeholderIcon={Search}
//                     placeholder="Search..."
//                     intent="ghost"
//                     theme={theme}
//                 />

//                 {/* Inputs with Prefix/Suffix Buttons */}
//                 <Input
//                     type="tel"
//                     prefixButton={
//                         <Button intent="secondary" size="sm">
//                             +91
//                         </Button>
//                     }
//                     leftIcon={Phone}
//                     placeholder="Enter phone number..."
//                     intent="primary"
//                     theme={theme}
//                 />
//                 <Input
//                     type="email"
//                     suffixButton={
//                         <Button intent="secondary" size="sm">
//                             @gmail.com
//                         </Button>
//                     }
//                     rightIcon={Mail}
//                     placeholder="Enter username..."
//                     intent="secondary"
//                     theme={theme}
//                 />

//                 {/* Different Input Types */}
//                 <Input
//                     type="number"
//                     placeholder="Enter number..."
//                     intent="ghost"
//                     theme={theme}
//                 />
//                 <Input
//                     type="date"
//                     leftIcon={Calendar}
//                     placeholder="Select date..."
//                     intent="destructive"
//                     theme={theme}
//                 />

//                 {/* Disabled State */}
//                 <Input
//                     disabled
//                     placeholder="Disabled Input"
//                     intent="primary"
//                     theme={theme}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
