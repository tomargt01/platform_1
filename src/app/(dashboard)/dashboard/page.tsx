"use client";
import React, { useState } from "react";
import { Button, Theme } from "#/components/ui/base/Button";
import { Card } from "#/components/ui/base/Card";
import { Users, TrendingUp, ArrowRight } from "lucide-react";

const Dashboard = () => {
    const [theme, setTheme] = useState<Theme>("light");

    const handleAction = (action: string) => {
        alert(`${action} clicked!`);
    };

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
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

            {/* Count Cards */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                    intent="count"
                    size="sm"
                    theme={theme}
                    title="Total Users"
                    count="1,234"
                    icon={Users}
                />
                <Card
                    intent="count"
                    size="sm"
                    theme={theme}
                    title="Revenue"
                    count="$5,678"
                    icon={TrendingUp}
                />
                <Card
                    intent="count"
                    size="sm"
                    theme={theme}
                    title="Active Sessions"
                    count="89"
                />
            </div>

            {/* Two-Row Card with Table */}
            <div className="mt-4">
                <Card
                    intent="two-row"
                    size="lg"
                    theme={theme}
                    title="Recent Transactions"
                    links={[
                        { label: "View All", intent: "ghost", onClick: () => handleAction("View All") },
                        { label: "Filter", intent: "ghost", onClick: () => handleAction("Filter") },
                    ]}
                    dataContent={
                        <table className="w-full text-sm text-[var(--text)]">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">ID</th>
                                    <th className="text-left p-2">Date</th>
                                    <th className="text-left p-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2">TX123</td>
                                    <td className="p-2">2025-09-14</td>
                                    <td className="p-2">$100</td>
                                </tr>
                                <tr>
                                    <td className="p-2">TX124</td>
                                    <td className="p-2">2025-09-13</td>
                                    <td className="p-2">$250</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                />
            </div>

            {/* Basic Card */}
            <div className="mt-4">
                <Card
                    title="Basic Card"
                    description="This is a basic card with a title and description."
                    theme={theme}
                />
            </div>

            {/* Card with Image */}
            <div className="mt-4">
                <Card
                    intent="outlined"
                    size="lg"
                    theme={theme}
                    title="Card with Image"
                    description="This card includes an image and a longer description."
                    imageSrc="https://via.placeholder.com/300x200"
                    imageAlt="Sample image"
                >
                    <p>Additional content can go here.</p>
                </Card>
            </div>

            {/* Card with Actions */}
            <div className="mt-4">
                <Card
                    intent="elevated"
                    size="md"
                    theme={theme}
                    title="Card with Actions"
                    description="This card has action buttons."
                    actions={[
                        { label: "View", intent: "primary", onClick: () => handleAction("View") },
                        { label: "Edit", intent: "secondary", onClick: () => handleAction("Edit") },
                    ]}
                />
            </div>

            {/* Card with Custom Content */}
            <div className="mt-4">
                <Card
                    intent="default"
                    size="sm"
                    theme={theme}
                    title="Custom Content Card"
                >
                    <ul className="list-disc pl-5">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;






// "use client";
// import React, { useState } from "react";
// import { Button, Theme } from "#/components/ui/base/Button";
// import { Calendar } from "#/components/ui/base/Calendar";

// const Dashboard = () => {
//     const [theme, setTheme] = useState<Theme>("light");

//     const events = [
//         { date: "2025-09-10", title: "Team Meeting" },
//         { date: "2025-09-15", title: "Project Review" },
//         { date: "2025-09-15", title: "Client Call" },
//         { date: "2025-09-20", title: "Client Sync" },
//     ];

//     const deadlines = [
//         { date: "2025-09-15", title: "Project Deadline" },
//         { date: "2025-09-15", title: "Report Submission" },
//         { date: "2025-09-20", title: "Proposal Due" },
//     ];

//     const holidays = [
//         { date: "2025-09-05", name: "Labor Day" },
//         { date: "2025-09-15", name: "Company Holiday" },
//         { date: "2025-09-25", name: "National Day" },
//     ];

//     const toggleTheme = (newTheme: Theme) => {
//         setTheme(newTheme);
//         document.documentElement.setAttribute("data-theme", newTheme);
//     };

//     return (
//         <div className="p-4 max-w-4xl mx-auto">
//             <h1 className="text-2xl font-bold mb-4">Calendar Component Test</h1>
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
//             <Calendar
//                 events={events}
//                 deadlines={deadlines}
//                 holidays={holidays}
//                 intent="primary"
//                 theme={theme}
//                 className=""
//             />
//             <Calendar
//                 events={{ date: "2025-09-12", title: "Single Event" }}
//                 intent="secondary"
//                 theme={theme}
//                 className=""
//             />
//             <Calendar
//                 holidays={{ date: "2025-09-30", name: "Test Holiday" }}
//                 intent="ghost"
//                 theme={theme}
//                 className=""
//             />
//         </div>
//     );
// };

// export default Dashboard;
