import assert from "assert";

/**
 * Represents a point in time
 */
export class Time {
  hours: number;
  constructor(hours: number) {
    this.hours = hours;
  }

  /**
   * Time.fromString("05:15") -> 5.25
   * */
  static fromString(s: string): Time {
    const hours = Number(s.substring(0, 2));
    assert(s.charAt(2) === ":");
    const minutes = Number(s.substring(3, 5));
    return new Time(hours + minutes / 60);
  }

  /**
   * Time.toString(5.25) -> "5:15"
   * */
  toString(): string {
    let minute = this.hours - Math.floor(this.hours);
    let hour = this.hours - minute;
    minute = Math.round(minute * 60);
    let zone = "am";
    // Set hours
    if (hour > 12) {
      hour -= 12;
      zone = "pm";
    } else if (hour === 0) {
      hour = 12;
    }
    // Set minute
    if (minute < 10) {
      return String(hour) + ":0" + String(minute) + zone;
    }
    return String(hour) + ":" + String(minute) + zone;
  }

  hoursBetween(other: Time): number {
    return Math.abs(other.hours - this.hours);
  }
}

/**
 * Represents a specific day of the week
 */
export enum DayOftheWeek {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6
}

export function compareDaytimes(
  aDay: DayOftheWeek,
  aTime: Time,
  bDay: DayOftheWeek,
  bTime: Time
): number {
  if (aDay !== bDay) {
    return aDay - bDay;
  }
  return aTime.hours - bTime.hours;
}

export function dayName(d: DayOftheWeek): string {
  switch (d) {
    case DayOftheWeek.Monday:
      return "Monday";
    case DayOftheWeek.Tuesday:
      return "Tuesday";
    case DayOftheWeek.Wednesday:
      return "Wednesday";
    case DayOftheWeek.Thursday:
      return "Thursday";
    case DayOftheWeek.Friday:
      return "Friday";
    case DayOftheWeek.Saturday:
      return "Saturday";
    case DayOftheWeek.Sunday:
      return "Sunday";
  }
}
