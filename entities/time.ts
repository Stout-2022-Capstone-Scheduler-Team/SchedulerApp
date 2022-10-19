import assert from 'assert'

/**
 * Represents a point in time
 */
export class Time {
  hours: number
  constructor(hours: number) {
    this.hours = hours
  }

  /**
   * Time.FromString("05:15") -> 5.25
   * */
  static fromString(s: string): Time {
    const hours = Number(s.substring(0, 2))
    assert(s.charAt(2) === ':')
    const minutes = Number(s.substring(3, 5))
    return new Time(hours + minutes / 60)
  }

  static toString(t: Time): string {
    const minute = t.hours - Math.floor(t.hours)
    const hour = t.hours - minute
    return String(hour) + ':' + String(minute * 60)
  }

  hoursBetween(other: Time): number {
    return Math.abs(other.hours - this.hours)
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
  Sunday = 6,
}

export function compareDaytimes(
  aDay: DayOftheWeek,
  aTime: Time,
  bDay: DayOftheWeek,
  bTime: Time
): number {
  if (aDay !== bDay) {
    return aDay - bDay
  }
  return aTime.hours - bTime.hours
}

export function dayName(d: DayOftheWeek): string {
  switch (d) {
    case DayOftheWeek.Monday:
      return 'Monday'
    case DayOftheWeek.Tuesday:
      return 'Tuesday'
    case DayOftheWeek.Wednesday:
      return 'Wednesday'
    case DayOftheWeek.Thursday:
      return 'Thursday'
    case DayOftheWeek.Friday:
      return 'Friday'
    case DayOftheWeek.Saturday:
      return 'Saturday'
    case DayOftheWeek.Sunday:
      return 'Sunday'
  }
}
