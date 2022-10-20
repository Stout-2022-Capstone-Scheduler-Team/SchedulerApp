import assert from 'assert'
import { Shift } from './shift'

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
    if (this.current_hours < this.min_hours) {
      return -10000 + (this.min_hours - this.current_hours)
    }
    return this.current_hours + shift.duration
  }
}
