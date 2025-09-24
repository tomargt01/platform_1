'use client'; 

import { useState } from "react";
import { RadioGroup } from "#/components/ui/base/RadioGroup";

const Dashboard = () => {

    const [value, setValue] = useState("a");
    return (
        <RadioGroup
            name="demo"
            value={value}
            onChange={setValue}
            options={[
                { value: "a", label: "Alpha" },
                { value: "b", label: "Beta" }
            ]}
            theme="purple"
            size="md"
            label="Theme Radio Example"
            row
        />
    );
}

export default Dashboard;
