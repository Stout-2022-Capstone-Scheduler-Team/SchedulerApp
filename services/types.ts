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
  static FromString(s: string): Time {
    const hours = Number(s.substring(0, 2))
    assert(s.charAt(2) === ':')
    const minutes = Number(s.substring(3, 5))
    return new Time(hours + minutes / 60)
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

/**
 * A Shift that can be assigned to an Employee
 */
export class Shift {
  name: string
  start: Time
  end: Time
  day: DayOftheWeek
  owner: string = ''

  constructor(name: string, start: Time, end: Time, day: DayOftheWeek) {
    this.name = name
    this.start = start
    this.end = end
    this.day = day
  }

  overlaps(other: Shift): boolean {
    if (this.day === other.day) {
      return (
        this.start.hours <= other.end.hours &&
        other.start.hours <= this.end.hours
      )
    }
    return false
  }

  contains(other: Shift): boolean {
    if (this.day === other.day) {
      return (
        this.start.hours <= other.start.hours &&
        other.end.hours <= this.end.hours
      )
    }
    return false
  }

  get duration(): number {
    return this.start.hoursBetween(this.end)
  }
}

export class Employee {
  name: string
  min_hours: number
  max_hours: number
  current_hours: number = 0
  available: Shift[] = []
  constructor(name: string, minHours: number, maxHours: number) {
    assert(minHours <= maxHours)
    this.name = name
    this.min_hours = minHours
    this.max_hours = maxHours
    this.current_hours = 0
    this.available = []
  }

  isAvailable(inputShift: Shift): boolean {
    return (
      this.canTakeHours(inputShift.duration) &&
      this.available.some((a) => a.contains(inputShift))
    )
  }

  canTakeHours(input: number): boolean {
    return this.current_hours + input <= this.max_hours
  }

  /**
   * Score on how good a shift is to take. Better scores are lower
   *
   * */
  score(shift: Shift): number {
    return this.current_hours + shift.duration
  }
}
