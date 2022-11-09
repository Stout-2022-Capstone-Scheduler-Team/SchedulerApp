import assert from "assert";
import { Shift } from "./shift";

export class Employee {
  name: string;
  min_hours: number;
  max_hours: number;
  current_hours: number = 0;
  available: Shift[] = [];
  constructor(name: string, minHours: number, maxHours: number) {
    assert(minHours <= maxHours);
    this.name = name;
    this.min_hours = minHours;
    this.max_hours = maxHours;
    this.current_hours = 0;
    this.available = [];
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
   * */
  score(shift: Shift): number {
    if (this.current_hours < this.min_hours) {
      return -10000 + (this.min_hours - this.current_hours);
    }
    return this.current_hours + shift.duration;
  }

  get remainingHours(): number {
    return Math.max(this.min_hours - this.current_hours, 0);
  }

  // Can be inproved
  combineAvailable(): void {
    for (let i = 0; i < this.available.length; i++) {
      for (let z = i + 1; z < this.available.length; z++) {
        if (this.available[i].overlaps(this.available[z])) {
          if (this.available[z].start < this.available[i].start) {
            this.available[i].start = this.available[z].start;
          }
          if (this.available[z].end < this.available[i].end) {
            this.available[i].end = this.available[z].end;
          }
          this.available.splice(z);
          z--;
        }
      }
    }
  }
}
