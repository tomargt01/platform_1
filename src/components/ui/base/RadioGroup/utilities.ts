export function joinClass(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(" ");
}
