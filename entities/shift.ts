import { Time, DayOftheWeek } from "./time";

/**
 * A Shift that can be assigned to an Employee
 */
export class Shift {
  name: string;
  start: Time;
  end: Time;
  day: DayOftheWeek;
  day2: DayOftheWeek;
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
    this.day2 = day;
    if(start > end){
      this.day2 = day++;
      if(this.day2 > 6){
        this.day2 = 0;
      }
    }
    if (owner !== undefined) {
      this.owner = owner;
    }
  }

  overlaps(other: Shift): boolean {
    if (this.day === other.day) {
      return (
        this.start.hours <= other.end.hours &&
        other.start.hours <= this.end.hours
      );
    }
    if (this.day === other.day2) {
      return (
        this.start.hours <= other.end.hours &&
        other.start.hours-24 <= this.end.hours
      );
    }
    if (this.day2 === other.day) {
      return (
        this.start.hours-24 <= other.end.hours &&
        other.start.hours <= this.end.hours
      );
    }
    if (this.day2 === other.day2) {
      return (
        this.start.hours-24 <= other.end.hours &&
        other.start.hours-24 <= this.end.hours
      );
    }
    return false;
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
