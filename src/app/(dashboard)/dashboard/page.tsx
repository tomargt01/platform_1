"use client";
import React, { useState } from "react";
import { Badge, Theme } from "#/components/ui/base/Badge";

const Dashboard = () => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Badge Component Testing</h1>

            {/* Theme Toggle Buttons */}
            <div className="mb-4 space-x-2">
                {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
                    (t) => (
                        <button
                            key={t}
                            onClick={() => toggleTheme(t)}
                            className="inline-flex items-center justify-center rounded-md font-medium transition-colors h-9 px-3 text-sm bg-[var(--secondary)] text-[var(--text)] hover:bg-[var(--accent)]"
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    )
                )}
            </div>

            {/* Basic Badge */}
            <div className="mt-4 space-y-4">
                <Badge>Default Badge</Badge>
            </div>

            {/* Badge with Variants */}
            <div className="mt-4 space-y-4">
                <Badge intent="primary" size="lg" theme={theme}>
                    Primary Large Badge
                </Badge>
                <Badge intent="secondary" size="md" theme={theme}>
                    Secondary Badge
                </Badge>
                <Badge intent="ghost" size="sm" theme={theme}>
                    Ghost Badge
                </Badge>
                <Badge intent="destructive" size="sm" theme={theme}>
                    1
                </Badge>
                <Badge intent="destructive" size="xs" theme={theme}>
                    Small Badge
                </Badge>
            </div>
        </div>
    );
};

export default Dashboard;






























// "use client";
// import React, { useState, ReactNode } from "react";
// import { Alert, Theme } from "#/components/ui/base/Alert";
// import { Button } from "#/components/ui/base/Button";
// import { Toast } from "#/components/ui/base/Toast";
// import { CheckCircle, Loader2, Save, XCircle } from "lucide-react"; // Example icons
// import myGif from "./my-gif.gif"; // Example GIF (add to public/ or import path)

// const Dashboard = () => {
//     const [theme, setTheme] = useState<Theme>("light");
//     const [deletedItem, setDeletedItem] = useState<string | null>(null);
//     const [showToast, setShowToast] = useState(false);
//     const [customToastData, setCustomToastData] = useState({
//         title: "",
//         description: "",
//         customIcon: null as ReactNode | null,
//         theme: "light" as Theme,
//     });

//     const toggleTheme = (newTheme: Theme) => {
//         setTheme(newTheme);
//         document.documentElement.setAttribute("data-theme", newTheme);
//     };

//     const handleDismiss = () => {
//         console.log("Dismissed");
//         setShowToast(false);
//     };

//     const showCustomToast = (title: string, description: string, icon: ReactNode, theme: Theme) => {
//         setCustomToastData({ title, description, customIcon: icon, theme });
//         setShowToast(true);
//     };

//     const handleDelete = () => {
//         setDeletedItem("Project X");
//         console.log("Project deleted");
//         setShowToast(true);
//         setCustomToastData({
//             title: "Deletion Success",
//             description: "Project X deleted.",
//             customIcon: <CheckCircle className="w-5 h-5" />,
//             theme: "green",
//         });
//     };

//     const handleUndo = () => {
//         console.log("Undo deletion for", deletedItem);
//         setDeletedItem(null);
//         setShowToast(false);
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>

//             {/* Theme Toggle Buttons */}
//             <div className="mb-4 space-x-2">
//                 {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
//                     (t) => (
//                         <Button
//                             key={t}
//                             intent="secondary"
//                             size="sm"
//                             onClick={() => toggleTheme(t)}
//                         >
//                             {t.charAt(0).toUpperCase() + t.slice(1)}
//                         </Button>
//                     )
//                 )}
//             </div>

//             {/* Trigger Buttons for Custom Toasts */}
//             <div className="space-x-2 mb-4">
//                 <Button
//                     intent="primary"
//                     size="sm"
//                     onClick={() =>
//                         showCustomToast(
//                             "Success",
//                             "Request sent successfully",
//                             <CheckCircle className="w-5 h-5" />,
//                             "green"
//                         )
//                     }
//                 >
//                     Send Request
//                 </Button>
//                 <Button
//                     intent="secondary"
//                     size="sm"
//                     onClick={() =>
//                         showCustomToast(
//                             "In Progress",
//                             "File generating",
//                             <Loader2 className="w-5 h-5 animate-spin" />,
//                             "pink"
//                         )
//                     }
//                 >
//                     Generate File
//                 </Button>
//                 <Button
//                     intent="ghost"
//                     size="sm"
//                     onClick={() =>
//                         showCustomToast(
//                             "Draft Saved",
//                             "Form saved as draft",
//                             <Save className="w-5 h-5" />,
//                             "blue"
//                         )
//                     }
//                 >
//                     Save as Draft
//                 </Button>
//                 <Button
//                     intent="destructive"
//                     size="sm"
//                     onClick={() =>
//                         showCustomToast(
//                             "Error",
//                             "An error occurred",
//                             <XCircle className="w-5 h-5" />,
//                             "pink"
//                         )
//                     }
//                 >
//                     Trigger Error
//                 </Button>
//                 <Button
//                     intent="primary"
//                     size="sm"
//                     onClick={() =>
//                         showCustomToast(
//                             "GIF Toast",
//                             "Check the GIF!",
//                             <XCircle className="w-5 h-5" />,
//                             "purple"
//                         )
//                     }
//                 >
//                     Show GIF
//                 </Button>
//             </div>

//             {/* Alert Variants */}
//             <div className="space-y-4 max-w-md">
//                 {deletedItem && (
//                     <Alert
//                         variant="info"
//                         theme={theme}
//                         title="Project Deleted"
//                         description={`"${deletedItem}" has been deleted.`}
//                         dismissible
//                         onDismiss={handleDismiss}
//                         undoAction={handleUndo}
//                         timer={10}
//                         onTimerComplete={handleDismiss}
//                     />
//                 )}
//                 <Alert
//                     variant="warning"
//                     theme={theme}
//                     title="Confirm Deletion"
//                     description="Deleting this project will remove all associated data permanently."
//                     dismissible
//                     onDismiss={handleDismiss}
//                     actions={[
//                         {
//                             label: "Cancel",
//                             intent: "secondary",
//                             onClick: () => showCustomToast("Cancelled", "Action cancelled", <XCircle className="w-5 h-5" />, "purple"),
//                         },
//                         {
//                             label: "Delete",
//                             intent: "destructive",
//                             onClick: handleDelete,
//                         },
//                     ]}
//                     timer={5}
//                     onTimerComplete={handleDelete}
//                 />
//             </div>

//             {/* Toast Component */}
//             {showToast && (
//                 <Toast
//                     title={customToastData.title}
//                     description={customToastData.description}
//                     customIcon={customToastData.customIcon}
//                     theme={customToastData.theme}
//                     duration={5000}
//                     onDismiss={handleDismiss}
//                 />
//             )}
//         </div>
//     );
// };

// export default Dashboard;
























// "use client";
// import React, { useState } from "react";
// import { Alert, Theme } from "#/components/ui/base/Alert";
// import { Button } from "#/components/ui/base/Button";
// import { RefreshCcw } from "lucide-react";

// const Dashboard = () => {
//     const [theme, setTheme] = useState<Theme>("light");
//     const [deletedItem, setDeletedItem] = useState<string | null>(null);

//     const toggleTheme = (newTheme: Theme) => {
//         setTheme(newTheme);
//         document.documentElement.setAttribute("data-theme", newTheme);
//     };

//     const handleDismiss = () => {
//         console.log("Alert dismissed");
//     };

//     const handleAction = (action: string) => {
//         console.log(`${action} clicked`);
//     };

//     const handleDelete = () => {
//         setDeletedItem("Project X");
//         console.log("Project deleted");
//     };

//     const handleUndo = () => {
//         console.log("Undo deletion for", deletedItem);
//         setDeletedItem(null);
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>

//             {/* Theme Toggle Buttons */}
//             <div className="mb-4 space-x-2">
//                 {(["light", "dark", "purple", "pink", "green", "blue"] as const).map(
//                     (t) => (
//                         <Button
//                             key={t}
//                             intent="secondary"
//                             size="sm"
//                             onClick={() => toggleTheme(t)}
//                         >
//                             {t.charAt(0).toUpperCase() + t.slice(1)}
//                         </Button>
//                     )
//                 )}
//             </div>

//             {/* Alert Variants */}
//             <div className="space-y-4 max-w-md">
//                 {deletedItem && (
//                     <Alert
//                         variant="info"
//                         theme={theme}
//                         title="Project Deleted"
//                         description={`"${deletedItem}" has been deleted.`}
//                         dismissible
//                         onDismiss={handleDismiss}
//                         undoAction={handleUndo}
//                         timer={10} // Auto-dismiss after 10 seconds
//                         onTimerComplete={handleDismiss}
//                     />
//                 )}
//                 <Alert
//                     variant="error"
//                     theme={theme}
//                     title="Invalid Input"
//                     description="The email address is invalid. Please use a format like example@domain.com."
//                     dismissible
//                     onDismiss={handleDismiss}
//                     actions={[
//                         {
//                             label: "Fix Now",
//                             intent: "destructive",
//                             onClick: () => handleAction("Fix Now"),
//                         },
//                         {
//                             label: "Clear Form",
//                             intent: "ghost",
//                             onClick: () => handleAction("Clear Form"),
//                         },
//                     ]}
//                 />
//                 <Alert
//                     variant="warning"
//                     theme={theme}
//                     title="Confirm Deletion"
//                     description="Deleting this project will remove all associated data permanently."
//                     dismissible
//                     onDismiss={handleDismiss}
//                     actions={[
//                         {
//                             label: "Cancel",
//                             intent: "secondary",
//                             onClick: () => handleAction("Cancel"),
//                         },
//                         {
//                             label: "Delete",
//                             intent: "destructive",
//                             onClick: handleDelete,
//                         },
//                     ]}
//                     timer={5} // Auto-delete after 5 seconds
//                     onTimerComplete={handleDelete}
//                 />
//                 <Alert
//                     variant="info"
//                     theme={theme}
//                     title="Session Timeout"
//                     description="Your session has expired. Please log in to continue using the app."
//                     dismissible
//                     onDismiss={handleDismiss}
//                     actions={[
//                         {
//                             label: "Log In",
//                             intent: "primary",
//                             onClick: () => handleAction("Log In"),
//                         },
//                     ]}
//                     customIcon={RefreshCcw}
//                 />
//                 <Alert
//                     variant="critical"
//                     theme={theme}
//                     title="Server Down"
//                     description="Our servers are currently experiencing an outage. We're working to resolve this."
//                     showTimestamp
//                     details="Error Code: 503 Service Unavailable. Last attempted connection: 01:19 PM IST."
//                     actions={[
//                         {
//                             label: "Contact Support",
//                             intent: "destructive",
//                             onClick: () => handleAction("Contact Support"),
//                             loading: false,
//                         },
//                     ]}
//                 />
//                 <Alert
//                     variant="error"
//                     theme={theme}
//                     description="Password must be at least 8 characters with one number and one special character."
//                     dismissible
//                     onDismiss={handleDismiss}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
