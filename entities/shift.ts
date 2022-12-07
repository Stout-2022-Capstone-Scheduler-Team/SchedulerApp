import { Time } from "./time";

/**
 * A Shift that can be assigned to an Employee
 */
export class Shift {
  name: string;
  start: Time;
  end: Time;
  owner: string = "";

  assigned: number = 0;
  option: number = 0;
  first_try: string | undefined;

  constructor(name: string, start: Time, end: Time, owner?: string) {
    this.name = name;
    this.start = start;
    this.end = end;
    if (owner !== undefined) {
      this.owner = owner;
    }
  }

  overlaps(other: Shift): boolean {
    return (
      this.start.totalHours < other.end.totalHours &&
      other.start.totalHours < this.end.totalHours
    );
  }

  overlapsAvalible(other: Shift): boolean {
    return (
      this.start.totalHours <= other.end.totalHours &&
      other.start.totalHours <= this.end.totalHours
    );
  }

  contains(other: Shift): boolean {
    return (
      this.start.totalHours <= other.start.totalHours &&
      other.end.totalHours <= this.end.totalHours
    );
  }

  containsRemove(other: Shift): boolean {
    return (
      this.start.totalHours < other.start.totalHours &&
      other.end.totalHours < this.end.totalHours
    );
  }

  get duration(): number {
    return this.start.hoursBetween(this.end);
  }
}
