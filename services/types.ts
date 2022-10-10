import assert from "assert";

export class Time {
    hours: number;
    constructor(hours: number) {
        this.hours = hours;
    }
    static FromString(s: string): Time {
        return new Time(0);
    }
}

export enum DayOftheWeek {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}

export class Shift {
    name: string;
    start: Time;
    end: Time;
    day: DayOftheWeek;

    constructor(name: string, start: Time, end: Time, day: DayOftheWeek) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.day = day;
    }

    overlaps(other: Shift): boolean {
        if (this.day == other.day) {
            return this.start <= other.end && other.start <= this.end;
        } else {
            return false;
        }
    }
}

export class Employee {
    name: string;
    min_hours: number;
    max_hours: number;
    current_hours: number;
    constructor(name: string, min_hours: number, max_hours: number) {
        assert(min_hours <= max_hours);
        this.name = name;
        this.min_hours = min_hours;
        this.max_hours = max_hours;
        this.current_hours = 0;
    }
}

// let a = { name: "", min_hours: 0, max_hours: 0, current_hours: 0 };
