// app/test-error/page.tsx
"use client";
import { useCallback } from "react";
import * as Sentry from "@sentry/nextjs";

export default function TestErrorPage() {
    const triggerError = useCallback(() => {
        try {
            throw new Error("This is a test client-side error for Sentry");
        } catch (error) {
            Sentry.captureException(error);
            alert("Error sent to Sentry, check your dashboard!");
        }
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Sentry Client Error Test</h1>
            <button
                onClick={triggerError}
                style={{ padding: 10, background: "red", color: "white" }}
            >
                Click here to send error to Sentry
            </button>
            <p>Open browser console to see Sentry SDK logs.</p>
        </div>
    );
}
