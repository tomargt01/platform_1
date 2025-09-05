// app/client-page.tsx
"use client";
import { useEffect } from "react";

export default function ClientPage() {
    useEffect(() => {
        // Trigger an error (for testing)
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Test error from client component');
        }
    }, []);
    return <div>Client Page</div>;
}
