import { Time } from "./time";

/**
 * A Shift that can be assigned to an Employee
 */
export class Shift {
  id: number;
  name: string;
  start: Time;
  end: Time;
  owner: string = "";

  assigned: number = 0;
  option: number = 0;
  first_try: string | undefined;

  constructor(
    name: string,
    start: Time,
    end: Time,
    id?: number,
    owner?: string
  ) {
    this.id = id ?? -1;
    this.name = name;
    this.start = start;
    this.end = end;
    if (this.start.hoursBetween(this.end) < 0) {
      throw new Error("Shift cannot end before it starts");
    }
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

  splitOn(other: Shift): Shift[] {
    const ret = [];
    if (other.start.totalHours < this.start.totalHours) {
      ret.push(new Shift("", other.start, this.start));
    }
    if (other.end.totalHours > this.end.totalHours) {
      ret.push(new Shift("", this.end, other.end));
    }
    return ret;
  }
}
