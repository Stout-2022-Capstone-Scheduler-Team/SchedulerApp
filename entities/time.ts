import { Dayjs } from "dayjs";

/**
 * Represents a point in time
 */
export class Time {
  dayHours: number;
  day: DayOftheWeek;
  constructor(hours: number, day: DayOftheWeek) {
    this.dayHours = hours;
    this.day = day;
  }

  /**
   * Computed property to get totalHours
   */
  get totalHours(): number {
    return this.dayHours + 24 * this.day;
  }

  /**
   * Convert Time to a string
   */
  toString(): string {
    let minute = this.dayHours - Math.floor(this.dayHours);
    let hour = this.dayHours - minute;
    minute = Math.round(minute * 60);
    let zone = "am";
    // Set hours
    if (hour >= 12) {
      hour -= 12;
      if (hour !== 12) {
        zone = "pm";
      }
    }
    if (hour === 0) {
      hour = 12;
    }
    // Set minute
    if (minute < 10) {
      return String(hour) + ":0" + String(minute) + zone;
    }
    return String(hour) + ":" + String(minute) + zone;
  }

  hoursBetween(other: Time): number {
    return Math.abs(other.totalHours - this.totalHours);
  }

  /**
   * Time.fromString("05:15") -> 5.25
   * */
  static fromString(s: string, day: DayOftheWeek): Time {
    const [hours, minutes] = s.split(":");
    return new Time(Number(hours) + Number(minutes) / 60, day);
  }

  /**
   * Convert to Time object from Dayjs object
   * @param time Time to convert from
   * @param day day of the time
   * @returns a Time object from Dayjs object
   */
  static fromDayjs(time: Dayjs, day: DayOftheWeek): Time {
    return new Time(time.hour() + time.minute() / 60, day);
  }

  /**
   * Get the week day names as an array
   * @returns array of week day names
   */
  static getWeekDays(): string[] {
    return Object.keys(DayOftheWeek).filter((v) => isNaN(Number(v)));
  }

  /**
   * Get the week days as an array of numbers
   * @returns array of week day numbers (start with sunday)
   */
  static getWeekDayNumbers(): number[] {
    return Object.keys(DayOftheWeek)
      .filter((v) => !isNaN(Number(v)))
      .map((day) => Number(day));
  }

  static compare(a: Time, other: Time): number {
    return other.totalHours - a.totalHours;
  }
}

/**
 * Represents a specific day of the week
 */
export enum DayOftheWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
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
