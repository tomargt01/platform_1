export type ThemeType = "light" | "dark" | "purple" | "pink" | "green" | "blue";
export type SizeType = "small" | "medium" | "large";

export type SkeletonType =
    | "table"
    | "card"
    | "button"
    | "text"
    | "circular"
    | "square"
    | "rectangular"
    | "avatar"
    | "list"
    | "chart"
    | "image"
    | "form"
    | "sidebar"
    | "menu"
    | "header"
    | "footer"
    | "profile"
    | "search"
    | "filter"
    | "tabs"
    | "grid"
    | "banner"
    | "timeline";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    type?: SkeletonType;
    theme?: ThemeType;
    size?: SizeType;
    color?: string; // override color
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
}
