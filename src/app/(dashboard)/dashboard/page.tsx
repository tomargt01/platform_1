'use client';

import { Textarea } from "#/components/ui/base/Textarea";
// import all supported icons, helpers, etc.

export default function TextareaDashboard() {
    // local theme switcher logic here

    return (
        <div className="space-y-8">
            <h1>Textarea Component Dashboard</h1>

            <section>
                <h2>Sizes & Shapes</h2>
                <Textarea size="sm" placeholder="Small" />
                <Textarea size="md" placeholder="Medium" />
                <Textarea size="lg" placeholder="Large" />
                <Textarea rounded="pill" placeholder="Rounded Pill" />
                <Textarea rounded="none" placeholder="Sharp edges" />
                <Textarea stretch="no" placeholder="Resize disabled" />

                <Textarea stretch="yes" placeholder="Resize enabled" />

                {/* ...theme switcher here */}
            </section>

            <section>
                <h2>Functional States</h2>
                <Textarea errorMessage="Field required" status="error" />
                <Textarea warningMessage="Be careful" status="warning" />
                <Textarea successMessage="All good!" status="success" />
                <Textarea disabled placeholder="Disabled" />
                <Textarea readOnly defaultValue="Read-only content" />
                <Textarea characterLimit={50} showCharacterCount placeholder="Limit 50" />
                {/* ...clear button example */}
            </section>

            <section>
                <h2>Content Features</h2>
                <Textarea placeholder="Supports @mentions and #tags" />
                <Textarea markdown placeholder="Write *markdown* here" />
                <Textarea syntaxHighlight placeholder="Paste your code…" />
                <Textarea placeholderHint="You can paste from templates" />
                {/* ...suggestion example, autosave example */}
            </section>

            <section>
                <h2>Advanced UX & Theming</h2>
                <Textarea wordCount readingTime autosaveKey="blog-draft" />
                <Textarea rtl placeholder="RTL example" />
                {/* ...custom scrollbar example, focus glow, etc. */}
            </section>
        </div>
    );
}
