import assert from "assert";
import { Shift } from "./shift";

export class Employee {
  name: string;
  min_hours: number;
  max_hours: number;
  current_hours: number = 0;
  private readonly _available: Shift[] = [];
  constructor(name: string, minHours: number, maxHours: number) {
    assert(minHours <= maxHours);
    this.name = name;
    this.min_hours = minHours;
    this.max_hours = maxHours;
    this.current_hours = 0;
    this._available = [];
  }

  get available(): Shift[] {
    return this._available;
  }

  isAvailable(inputShift: Shift): boolean {
    return (
      this.canTakeHours(inputShift.duration) &&
      this._available.some((a) => a.contains(inputShift))
    );
  }

  addAvailable(inputShift: Shift): void {
    for (let z = 0; z < this._available.length; z++) {
      if (inputShift.overlapsAvalible(this._available[z])) {
        if (this._available[z].start.totalHours < inputShift.start.totalHours) {
          inputShift.start = this._available[z].start;
        }
        if (this._available[z].end.totalHours > inputShift.end.totalHours) {
          inputShift.end = this._available[z].end;
        }
        this._available.splice(z, 1);
        z--;
      }
    }
    this._available.push(inputShift);
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
    for (let i = 0; i < this._available.length; i++) {
      assert(this._available.length < 10000);
      if (removeShift.contains(this._available[i])) {
        this._available.splice(i, 1);
        i--;
      } else if (this._available[i].containsRemove(removeShift)) {
        this._available.unshift(
          new Shift("", removeShift.end, this._available[i].end)
        );
        i++;
        this._available[i].end = removeShift.start;
      } else if (this._available[i].overlaps(removeShift)) {
        if (
          this._available[i].start.totalHours > removeShift.start.totalHours
        ) {
          this._available[i].start = removeShift.end;
        }
        if (this._available[i].end.totalHours < removeShift.end.totalHours) {
          this._available[i].end = removeShift.start;
        }
      }
    }
  }

  get sortedAvailable(): Shift[] {
    this._available.sort((a, b) => a.start.totalHours - b.start.totalHours);
    return this._available;
  }
}
