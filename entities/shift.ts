import { Time, DayOftheWeek } from './time'

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
