import { compareDaytimes, dayName, Time } from "../../entities/types";

import {
  shift,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
} from "./utils";

function time(t: string): Time {
  return Time.fromString(t);
}

test("Time", () => {
  expect(time("15:45").hours).toBeCloseTo(15.75);
  expect(time("15:45").hoursBetween(time("16:00"))).toBeCloseTo(0.25);
  expect(time("16:00").hoursBetween(time("15:15"))).toBeCloseTo(0.75);

  expect(time("15:42").toString()).toBe("3:42pm");
  expect(time("06:42").toString()).toBe("6:42am");
  expect(time("06:02").toString()).toBe("6:02am");
  expect(`${time("00:02")}`).toBe("12:02am");

  expect(
    compareDaytimes(Monday, time("04:00"), Monday, time("05:00"))
  ).toBeLessThan(0);
  expect(
    compareDaytimes(Monday, time("05:00"), Monday, time("04:00"))
  ).toBeGreaterThan(0);
  expect(
    compareDaytimes(Monday, time("05:00"), Monday, time("05:00"))
  ).toBeCloseTo(0);

  expect(
    compareDaytimes(Monday, time("04:00"), Tuesday, time("04:00"))
  ).toBeLessThan(0);
  expect(
    compareDaytimes(Tuesday, time("04:00"), Monday, time("04:00"))
  ).toBeGreaterThan(0);

  expect(dayName(Monday)).toBe("Monday");
  expect(dayName(Tuesday)).toBe("Tuesday");
  expect(dayName(Wednesday)).toBe("Wednesday");
  expect(dayName(Thursday)).toBe("Thursday");
  expect(dayName(Friday)).toBe("Friday");
  expect(dayName(Saturday)).toBe("Saturday");
  expect(dayName(Sunday)).toBe("Sunday");
});

test("Shift", () => {
  const base = shift("03:00", "04:00", Monday);
  expect(base.overlaps(shift("03:30", "05:00", Monday))).toBe(true);
  expect(base.overlaps(shift("04:30", "05:00", Monday))).toBe(false);
  expect(base.overlaps(shift("03:30", "05:00", Tuesday))).toBe(false);
  expect(base.overlaps(shift("04:30", "05:00", Tuesday))).toBe(false);

  const overnight = shift("22:00", "08:00", Monday);
  expect(overnight.overlaps(shift("16:00", "23:00", Monday))).toBe(true);
  expect(overnight.overlaps(shift("16:00", "23:00", Tuesday))).toBe(false);
  expect(overnight.overlaps(shift("05:00", "10:00", Tuesday))).toBe(true);
  expect(overnight.overlaps(shift("20:00", "9:00", Monday))).toBe(true);
  expect(overnight.overlaps(shift("20:00", "1:00", Monday))).toBe(true);

  expect(shift("03:30", "04:00", Monday).duration).toBeCloseTo(0.5);
  expect(shift("03:30", "05:00", Monday).duration).toBeCloseTo(1.5);
  expect(shift("04:30", "05:00", Monday).duration).toBeCloseTo(0.5);
  expect(shift("03:30", "04:00", Tuesday).duration).toBeCloseTo(0.5);
  expect(shift("03:30", "05:00", Tuesday).duration).toBeCloseTo(1.5);
  expect(shift("04:30", "05:00", Tuesday).duration).toBeCloseTo(0.5);
  expect(shift("23:00", "01:00", Wednesday).duration).toBeCloseTo(2);
  expect(shift("10:30", "03:00", Thursday).duration).toBeCloseTo(4.5);
});
