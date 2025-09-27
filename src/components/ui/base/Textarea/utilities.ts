export function extractMentions(text: string) {
    return text.match(/@\w+/g) ?? [];
}
export function extractTags(text: string) {
    return text.match(/#\w+/g) ?? [];
}
