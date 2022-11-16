import assert from "assert";
import { Shift } from "./shift";

export class Employee {
  name: string;
  min_hours: number;
  max_hours: number;
  current_hours: number = 0;
  available: Shift[] = [];
  hasCombined: boolean;
  constructor(name: string, minHours: number, maxHours: number) {
    assert(minHours <= maxHours);
    this.name = name;
    this.min_hours = minHours;
    this.max_hours = maxHours;
    this.current_hours = 0;
    this.available = [];
    this.hasCombined = false;
  }

  isAvailable(inputShift: Shift): boolean {
    return (
      this.canTakeHours(inputShift.duration) &&
      this.available.some((a) => a.contains(inputShift))
    );
  }

  addAvailable(inputShift: Shift): void {
    this.available.push(inputShift);
    this.hasCombined = false;
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
    this.available.sort((a, b) => a.start.totalHours - b.start.totalHours);
  }

  combineAvailable(): void {
    if (this.hasCombined) {
      return;
    }
    this.hasCombined = true;
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
