export type GridProps = {
    columns?: number;
    gap?: number;
    className?: string;
    children: React.ReactNode;
};

export type GridItemProps = {
    colSpan?: number;
    className?: string;
    children: React.ReactNode;
};
