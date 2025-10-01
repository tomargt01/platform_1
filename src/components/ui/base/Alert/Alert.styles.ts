import { cva } from 'class-variance-authority';

// No theme variants, just intent using CSS vars
export const alertVariants = cva(
    // Base styles (all global vars)
    `p-[var(--pad12px)] rounded-[var(--radius-md)] 
   border-[var(--1pxSolidBorder)] shadow-[var(--shadow-sm)]
   transition-all duration-[var(--transition-medium)]`,
    {
        variants: {
            intent: {
                info: "bg-[var(--alert-bg-info)] text-[var(--text)] border-[var(--text)]",
                success: "bg-[var(--alert-bg-success)] text-[var(--text)] border-[var(--text)]",
                warning: "bg-[var(--alert-bg-warning)] text-[var(--text)] border-[var(--text)]",
                error: "bg-[var(--alert-bg-error)] text-[var(--text)] border-[var(--text)]",
                critical: "bg-[var(--alert-bg-critical)] text-[var(--text)] border-[var(--text)] ring-2 ring-[var(--red-500)]",
            },
        },
        defaultVariants: {
            intent: 'info'
        }
    }
);
