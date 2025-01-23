export interface ShiftRoster {
    names: Array<string>;
    shift: "Day Shift" | "Night Shift";
    eventId: string;
    date: string;
}

export const defaultShiftRoster = {
    names: [],
    shift: "Day Shift",
    eventId: "",
    date: ""
}