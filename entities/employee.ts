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
   * Add an availability time block for this employee
   * @param newAvailability Availability to add to this employee's availability list
   * @throws If a duplicate availability shift exists already
   */
  addAvailability(newAvailability: Shift): void {
    if (
      // Make sure that there is not an availability already existing with the same start and end
      this.available.some(
        (avail) =>
          avail.start.totalHours === newAvailability.start.totalHours &&
          avail.end.totalHours === newAvailability.end.totalHours
      )
    ) {
      // If there is a duplicate availability already, throw an error
      throw new Error(
        "Cannot add duplicate availability to employee availability list"
      );
    } else {
      this.available.push(newAvailability);
    }
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

  combineAvailable(): void {
    for (let i = 0; i < this.available.length; i++) {
      for (let z = i + 1; z < this.available.length; z++) {
        if (this.available[i].overlapsAvalible(this.available[z])) {
          if (
            this.available[z].start.totalHours <
            this.available[i].start.totalHours
          ) {
            this.available[i].start = this.available[z].start;
          }
          if (
            this.available[z].end.totalHours > this.available[i].end.totalHours
          ) {
            this.available[i].end = this.available[z].end;
          }
          this.available.splice(z, 1);
          z--;
        }
      }
    }
  }
}
