import type { ComponentPropsWithoutRef } from "react";

export type Intent = "primary" | "secondary" | "ghost" | "destructive";

export interface Event {
    date: string | Date;
    title: string;
}

export interface Deadline {
    date: string | Date;
    title: string;
}

export interface Holiday {
    date: string | Date;
    name: string;
}

export interface CalendarProps extends ComponentPropsWithoutRef<"div"> {
    events?: Event | Event[];
    deadlines?: Deadline | Deadline[];
    holidays?: Holiday | Holiday[];
    intent?: Intent;
}
