// pages/SkeletonDashboard.tsx
'use client';

import React from "react";
import Skeleton, { SkeletonType, ThemeType, SizeType } from "#/components/ui/base/Skeleton";

const skeletonTypes: SkeletonType[] = [
    "table", "card", "button", "avatar", "text", "header", "sidebar", "banner"
    // add all other types in the category order you want
];

const themes: ThemeType[] = ["light", "dark", "purple", "pink", "green", "blue"];
const sizes: SizeType[] = ["medium"];   // you can add more size variations

export default function SkeletonDashboard() {
    return (
        <div>
            <h2>Skeleton Variant Tester</h2>
            {themes.map(theme =>
                <div key={theme}>
                    <h3>Theme: {theme}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                        {skeletonTypes.map(type => (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={type}>
                                <Skeleton type={type} theme={theme} />
                                <span style={{ fontSize: 10, marginTop: 4 }}>{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}















// import React, { useState } from 'react';
// import { Select, SelectOption } from '#/components/ui/base/Select';

// const subjectOptions: SelectOption[] = [
//     {
//         type: "group",
//         groupName: "Class 1",
//         options: [
//             { type: "option", value: "math-c1", label: "Mathematics" },
//             { type: "option", value: "eng-c1", label: "English" },
//         ],
//     },
    
//     {
//         type: "group",
//         groupName: "Class 2",
//         options: [
//             { type: "option", value: "math-c2", label: "Mathematics" },
//             { type: "option", value: "eng-c2", label: "English" },
//         ],
//     },
    
//     {
//         type: "group",
//         groupName: "Class 3",
//         options: [
//             { type: "option", value: "math-c3", label: "Mathematics" },
//             { type: "option", value: "eng-c3", label: "English" },
//         ],
//     },
    
//     {
//         type: "group",
//         groupName: "Class 4",
//         options: [
//             { type: "option", value: "math-c4", label: "Mathematics" },
//             { type: "option", value: "eng-c4", label: "English" },
//         ],
//     },
    
//     {
//         type: "group",
//         groupName: "Class 5",
//         options: [
//             { type: "option", value: "math-c5", label: "Mathematics" },
//             { type: "option", value: "eng-c5", label: "English" },
//         ],
//     },
    
//     {
//         type: "group",
//         groupName: "Class 6",
//         options: [
//             { type: "option", value: "math-c6", label: "Mathematics" },
//             { type: "option", value: "eng-c6", label: "English" },
//         ],
//     },
    
// ];

// const flatOptions: SelectOption[] = [
//     { type: "option", value: "opt1", label: "Option 1" },
//     { type: "option", value: "opt2", label: "Option 2" },
//     { type: "option", value: "opt3", label: "Option 3" },
// ];

// export default function Dashboard() {
//     const [selectedMultiGroup, setSelectedMultiGroup] = useState<string[]>([]);
//     const [selectedSingleFlat, setSelectedSingleFlat] = useState<string[]>([]);
//     const [selectedMultiFlat, setSelectedMultiFlat] = useState<string[]>([]);

//     return (
//         <div className="max-w-4xl mx-auto p-4 space-y-10">
//             {/* Multi select with grouped options */}
//             <div>
//                 <h2 className="text-xl font-bold mb-4">Multi Select with Groups</h2>
//                 <Select
//                     options={subjectOptions}
//                     multiple
//                     searchable
//                     theme="purple"
//                     selectedValues={selectedMultiGroup}
//                     onChange={setSelectedMultiGroup}
//                     placeholder="Select class subjects"
//                 />
//             </div>

//             {/* Single select with flat options */}
//             <div>
//                 <h2 className="text-xl font-bold mb-4">Single Select (Flat Options)</h2>
//                 <Select
//                     options={flatOptions}
//                     multiple={false}
//                     searchable
//                     theme="blue"
//                     selectedValues={selectedSingleFlat}
//                     onChange={setSelectedSingleFlat}
//                     placeholder="Select an option"
//                 />
//             </div>

//             {/* Multi select with flat options */}
//             <div>
//                 <h2 className="text-xl font-bold mb-4">Multi Select (Flat Options)</h2>
//                 <Select
//                     options={flatOptions}
//                     multiple
//                     searchable
//                     theme="green"
//                     selectedValues={selectedMultiFlat}
//                     onChange={setSelectedMultiFlat}
//                     placeholder="Select multiple options"
//                 />
//             </div>
//         </div>
//     );
// }
