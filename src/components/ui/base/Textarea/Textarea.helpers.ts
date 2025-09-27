export function getWordCount(text: string = ""): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}
export function getReadingTime(text: string = ""): number {
    return Math.ceil(getWordCount(text) / 200); // 200 wpm
}
// ...add debounce, autosave, etc.
