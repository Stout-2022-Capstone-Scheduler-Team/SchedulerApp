import assert from "assert"

/**
 * Represents a point in time
 */
export class Time {
  hours: number;
  constructor(hours: number) {
    this.hours = hours;
  }
  /**
   * Time.FromString("05:15") -> 5.25
  * */
  static FromString(s: string): Time {
    return new Time(0);
  }
}

/**
 * Represents a specific day of the week
 */
export enum DayOftheWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

/**
 * A Shift that can be assigned to an Employee
 */
export class Shift {
  name: string;
  start: Time;
  end: Time;
  day: DayOftheWeek;
  owner: string = '';

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
  current_hours: number = 0;
  available: Shift[] = [];
  busy: Shift[] = [];
  constructor(name: string, min_hours: number, max_hours: number) {
    assert(min_hours <= max_hours);
    this.name = name;
    this.min_hours = min_hours;
    this.max_hours = max_hours;
  }
}

