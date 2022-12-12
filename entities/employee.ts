import assert from "assert";
import { Shift } from "./shift";
import { Color } from "./color";

export class Employee {
  readonly name: string;
  readonly min_hours: number;
  readonly max_hours: number;
  readonly available: Shift[] = [];
  readonly color: Color;
  current_hours: number = 0;
  constructor(
    name: string,
    minHours: number,
    maxHours: number,
    color: Color,
    availability: Shift[] = []
  ) {
    assert(minHours <= maxHours);
    this.name = name;
    this.min_hours = minHours;
    this.max_hours = maxHours;
    this.current_hours = 0;
    this.available = [];
    this.color = color;
    this.available = availability;
  }

  /**
   * Removes an availability block from this employee's availability array
   * @param availabilityToRemove Availability block to remove
   * @returns The removed availability block
   */
  removeAvailability(availabilityToRemove: Shift): Shift {
    const indexToRemove = this.available.indexOf(availabilityToRemove);
    return this.available.splice(indexToRemove, 1)[0];
  }

  isAvailable(inputShift: Shift): boolean {
    if (!this.canTakeHours(inputShift.duration)) {
      return false;
    }
    const ranges = [inputShift];
    for (let i = 0; i < this.available.length; i++) {
      for (let j = 0; j < ranges.length; j++) {
        if (ranges[j].duration === 0) {
          ranges.splice(j, 1);
          j--;
        } else if (this.available[i].overlaps(ranges[j])) {
          ranges.splice(j, 1, ...this.available[i].splitOn(ranges[j]));
          j--;
        }
      }
    }
    return ranges.length === 0;
  }

  addAvailability(inputShift: Shift): void {
    this.available.push(inputShift);
  }

  canTakeHours(input: number): boolean {
    return this.current_hours + input <= this.max_hours;
  }

  /**
   * Score on how good a shift is to take. Better scores are lower
   *
   */
  score(shift: Shift): number {
    if (this.current_hours < this.min_hours) {
      return -10000 + (this.min_hours - this.current_hours);
    }
    return this.current_hours + shift.duration;
  }

  get remainingHours(): number {
    return Math.max(this.min_hours - this.current_hours, 0);
  }

  get remainingMaxHours(): number {
    return Math.max(this.max_hours - this.current_hours, 0);
  }

  get sortedAvailable(): Shift[] {
    this.available.sort((a, b) => a.start.totalHours - b.start.totalHours);
    return this.available;
  }

  combineAvailable(): Shift[] {
    const available = this.available.map(
      (s) => new Shift(s.name, s.start, s.end)
    );
    for (let i = 0; i < available.length; i++) {
      for (let z = i + 1; z < available.length; z++) {
        if (available[i].overlapsAvalible(available[z])) {
          if (available[z].start.totalHours < available[i].start.totalHours) {
            available[i].start = available[z].start;
          }
          if (available[z].end.totalHours > available[i].end.totalHours) {
            available[i].end = available[z].end;
          }
          available.splice(z, 1);
          z--;
        }
      }
    }
    return available;
  }
}
