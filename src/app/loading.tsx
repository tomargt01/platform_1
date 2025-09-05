"use client";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-t-transparent"></div>
        </div>
    );
}
