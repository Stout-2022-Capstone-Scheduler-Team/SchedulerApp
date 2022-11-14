import { Time, Shift, DayOftheWeek, Employee } from "../../entities/types";

export const Monday = DayOftheWeek.Monday;
export const Tuesday = DayOftheWeek.Tuesday;
export const Wednesday = DayOftheWeek.Wednesday;
export const Thursday = DayOftheWeek.Thursday;
export const Friday = DayOftheWeek.Friday;
export const Saturday = DayOftheWeek.Saturday;
export const Sunday = DayOftheWeek.Sunday;

export function shift(
  from: string,
  to: string,
  day: DayOftheWeek,
  owner?: string
): Shift {
  const s = new Shift("", Time.fromString(from), Time.fromString(to), day);
  if (owner !== undefined) {
    s.owner = owner;
  }
  return s;
}
export function allDay(day: DayOftheWeek): Shift {
  return new Shift("", Time.fromString("00:00"), Time.fromString("24:00"), day);
}

export function person(
  name: string,
  minHours: number,
  maxHours: number,
  available: Shift[]
): Employee {
  const ret = new Employee(name, minHours, maxHours);
  ret.available = available;
  return ret;
}
