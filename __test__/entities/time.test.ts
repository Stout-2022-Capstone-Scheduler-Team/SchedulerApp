import { dayName, DayOftheWeek, Time } from "../../entities/types";

import {
  shift,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
  person,
  allDay
} from "../utils";

function time(t: string, day: DayOftheWeek): Time {
  return Time.fromString(t, day);
}

test("Time", () => {
  expect(time("15:45", Monday).dayHours).toBeCloseTo(15.75);
  expect(time("15:45", Monday).hoursBetween(time("16:00", Monday))).toBeCloseTo(
    0.25
  );

  expect(time("0:00", Monday).toString()).toBe("12:00am");
  expect(time("24:00", Monday).toString()).toBe("12:00am");
  expect(time("12:00", Monday).toString()).toBe("12:00pm");
  expect(time("15:42", Monday).toString()).toBe("3:42pm");
  expect(time("06:42", Monday).toString()).toBe("6:42am");
  expect(time("06:02", Monday).toString()).toBe("6:02am");
  expect(time("6:42", Monday).toString()).toBe("6:42am");
  expect(time("6:02", Monday).toString()).toBe("6:02am");
  expect(`${time("00:02", Monday)}`).toBe("12:02am");

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

  expect(base.contains(shift("03:30", "04:00", Monday))).toBe(true);
  expect(base.contains(shift("03:30", "05:00", Monday))).toBe(false);
  expect(base.contains(shift("04:30", "05:00", Monday))).toBe(false);
  expect(base.contains(shift("03:30", "04:00", Tuesday))).toBe(false);
  expect(base.contains(shift("03:30", "05:00", Tuesday))).toBe(false);
  expect(base.contains(shift("04:30", "05:00", Tuesday))).toBe(false);

  expect(shift("03:30", "04:00", Monday).duration).toBeCloseTo(0.5);
  expect(shift("03:30", "05:00", Monday).duration).toBeCloseTo(1.5);
  expect(shift("04:30", "05:00", Monday).duration).toBeCloseTo(0.5);
  expect(shift("03:30", "04:00", Tuesday).duration).toBeCloseTo(0.5);
  expect(shift("03:30", "05:00", Tuesday).duration).toBeCloseTo(1.5);
  expect(shift("04:30", "05:00", Tuesday).duration).toBeCloseTo(0.5);
  expect(shift("23:00", "01:00", Wednesday, Thursday).duration).toBeCloseTo(2);
  expect(shift("10:30", "03:00", Thursday, Friday).duration).toBeCloseTo(16.5);

  const overnight = shift("22:00", "08:00", Monday, Tuesday);
  expect(overnight.overlaps(shift("16:00", "23:00", Monday))).toBe(true);
  expect(overnight.overlaps(shift("16:00", "23:00", Tuesday))).toBe(false);
  expect(overnight.overlaps(shift("05:00", "10:00", Tuesday))).toBe(true);
  expect(overnight.overlaps(shift("20:00", "09:00", Monday, Tuesday))).toBe(
    true
  );
  expect(overnight.overlaps(shift("20:00", "01:00", Monday, Tuesday))).toBe(
    true
  );

  expect(overnight.contains(shift("22:30", "05:00", Monday, Tuesday))).toBe(
    true
  );
  expect(overnight.contains(shift("21:30", "05:00", Monday, Tuesday))).toBe(
    false
  );
  expect(overnight.contains(shift("02:30", "10:00", Monday))).toBe(false);
  expect(overnight.contains(shift("01:00", "05:00", Tuesday))).toBe(true);
  expect(overnight.contains(shift("22:30", "05:00", Tuesday, Wednesday))).toBe(
    false
  );
});

test("Combine", () => {
  const alice = person("alice", 2, 12, [allDay(Monday), allDay(Tuesday)]);
  expect(alice.available).toStrictEqual([
    shift("00:00", "24:00", Monday, Tuesday)
  ]);

  const harry = person("harry", 2, 12, [
    allDay(Monday),
    allDay(Tuesday),
    allDay(Wednesday),
    allDay(Thursday),
    allDay(Friday),
    allDay(Saturday),
    allDay(Sunday)
  ]);
  expect(harry.available).toStrictEqual([
    shift("00:00", "24:00", Sunday, Saturday)
  ]);

  const bob = person("bob", 2, 12, [
    shift("09:00", "10:00", Monday),
    shift("09:30", "10:30", Monday)
  ]);
  expect(bob.available).toStrictEqual([shift("09:00", "10:30", Monday)]);

  const claire = person("claire", 2, 12, [
    allDay(Monday),
    shift("09:00", "10:00", Monday)
  ]);
  expect(claire.available).toStrictEqual([allDay(Monday)]);

  const david = person("david", 2, 12, [
    shift("09:00", "10:00", Monday),
    shift("09:00", "10:00", Tuesday)
  ]);
  expect(david.available).toStrictEqual([
    shift("09:00", "10:00", Monday),
    shift("09:00", "10:00", Tuesday)
  ]);

  const gary = person("gary", 2, 12, [
    shift("09:00", "10:00", Monday),
    shift("07:00", "10:30", Monday),
    shift("09:00", "10:00", Tuesday)
  ]);
  expect(gary.available).toStrictEqual([
    shift("07:00", "10:30", Monday),
    shift("09:00", "10:00", Tuesday)
  ]);

  const ethan = person("ethan", 2, 12, [
    shift("23:00", "04:00", Tuesday, Wednesday),
    shift("03:00", "07:00", Wednesday)
  ]);
  expect(ethan.available).toStrictEqual([
    shift("23:00", "07:00", Tuesday, Wednesday)
  ]);

  const nathan = person("nathan", 2, 12, [
    allDay(Monday),
    shift("09:00", "10:00", Monday),
    shift("23:00", "05:00", Monday, Tuesday),
    allDay(Wednesday),
    allDay(Thursday),
    shift("08:00", "09:00", Friday)
  ]);
  expect(nathan.available).toStrictEqual([
    shift("00:00", "05:00", Monday, Tuesday),
    shift("00:00", "24:00", Wednesday, Thursday),
    shift("08:00", "09:00", Friday)
  ]);
});

