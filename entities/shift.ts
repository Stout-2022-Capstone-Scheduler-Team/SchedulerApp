import { Time, DayOftheWeek } from "./time";

/**
 * A Shift that can be assigned to an Employee
 */
export class Shift {
  name: string;
  start: Time;
  end: Time;
  day: DayOftheWeek;
  owner: string = "";

  assigned: number = 0;
  option: number = 0;
  first_try: string | undefined;

  constructor(
    name: string,
    start: Time,
    end: Time,
    day: DayOftheWeek,
    owner?: string
  ) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.day = day;
    if (owner !== undefined) {
      this.owner = owner;
    }
  }

  overlaps(other: Shift): boolean {
    const thisStart = this.start.hours + 24 * this.day;
    const thisEnd = this.end.hours + 24 * this.day + (this.end.hours <= this.start.hours ? 24 : 0);
    const otherStart = other.start.hours + 24 * other.day;
    const otherEnd = other.end.hours + 24 * other.day + (other.end.hours <= other.start.hours ? 24 : 0);
    return thisStart <= otherEnd && otherStart <= thisEnd;
  }

  contains(other: Shift): boolean {
    if (this.day === other.day) {
      return (
        this.start.hours <= other.start.hours &&
        other.end.hours <= this.end.hours
      );
    }
    return false;
  }

  get duration(): number {
    return this.start.hoursBetween(this.end);
  }
}
