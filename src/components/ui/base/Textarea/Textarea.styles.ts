export const textareaBase = `
  w-full min-h-[32px] px-3 py-2 transition
  focus:outline-none
`;

export const borderStyles: Record<string, string> = {
    default: "border border-[var(--primary)]",
    error: "border border-red-500 focus:ring-red-600",
    warning: "border border-yellow-400 focus:ring-yellow-500",
    success: "border border-green-500 focus:ring-green-600"
};

export function getRoundedStyle(variant: string = "soft") {
    switch (variant) {
        case "none": return "rounded-none";
        case "soft": return "rounded-lg";
        case "pill": return "rounded-full";
        default: return "rounded-lg";
    }
}
