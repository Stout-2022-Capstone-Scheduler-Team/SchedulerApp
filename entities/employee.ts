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
    return (
      this.canTakeHours(inputShift.duration) &&
      this.available.some((a) => a.contains(inputShift))
    );
  }

  /**
   * When a new availablity is added it will check with all other avalibilities first and if any overlap they will combine.
   *
   */
  addAvailability(inputShift: Shift): void {
    for (let z = 0; z < this.available.length; z++) {
      if (inputShift.overlapsAvalible(this.available[z])) {
        if (this.available[z].start.totalHours < inputShift.start.totalHours) {
          inputShift.start = this.available[z].start;
        }
        if (this.available[z].end.totalHours > inputShift.end.totalHours) {
          inputShift.end = this.available[z].end;
        }
        this.available.splice(z, 1);
        z--;
      }
    }
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

  splitAvailable(removeShift: Shift): void {
    for (let i = 0; i < this.available.length; i++) {
      assert(this.available.length < 10000);
      if (removeShift.contains(this.available[i])) {
        this.available.splice(i, 1);
        i--;
      } else if (this.available[i].containsRemove(removeShift)) {
        this.available.unshift(
          new Shift("", removeShift.end, this.available[i].end)
        );
        i++;
        this.available[i].end = removeShift.start;
      } else if (this.available[i].overlaps(removeShift)) {
        if (this.available[i].start.totalHours > removeShift.start.totalHours) {
          this.available[i].start = removeShift.end;
        }
        if (this.available[i].end.totalHours < removeShift.end.totalHours) {
          this.available[i].end = removeShift.start;
        }
      }
    }
  }

  get sortedAvailable(): Shift[] {
    this.available.sort((a, b) => a.start.totalHours - b.start.totalHours);
    return this.available;
  }
}
