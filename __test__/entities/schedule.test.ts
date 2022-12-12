import { Color, Schedule } from "../../entities";

import { shift, Monday, person } from "../utils";

test("Schedule", () => {
  const s = new Schedule();
  expect(s.maxHoursWorked).toBeCloseTo(400);
  expect(s.minHoursWorked).toBeCloseTo(0);
  s.maxHoursWorked = 10;
  s.minHoursWorked = 10;
  expect(s.maxHoursWorked).toBeCloseTo(10);
  expect(s.minHoursWorked).toBeCloseTo(10);
});

test("Adding and removing Shifts", () => {
  const s = new Schedule();
  const shifts = [
    shift("01:00", "02:00", Monday),
    shift("02:00", "03:00", Monday, 1, "Bart")
  ];
  s.addShift(shifts[0]);
  s.addShift(shifts[1]);
  expect(s.shifts).toStrictEqual(shifts);
  s.removeShift(shifts[0]);
  expect(s.shifts).toStrictEqual([shifts[1]]);
});

test("Can update shift", () => {
  const s = new Schedule();

  // Add shift
  const testShift = shift("06:00", "07:00", Monday, 1, "Bart");
  s.addShift(testShift);
  expect(s.shifts).toStrictEqual([testShift]);

  // Update shift
  testShift.name = "Not Bart";
  s.addShift(testShift);
  expect(s.shifts.length).toBe(1);
  expect(s.shifts[0].name).toBe("Not Bart");
});

test("Adding and removing Employees", () => {
  const s = new Schedule();
  const staff = [
    person("a", 1, 2, [], new Color("blue")),
    person("b", 1, 2, [], new Color("red"))
  ];
  s.addEmployee(staff[0]);
  s.addEmployee(staff[1]);
  expect(s.employees).toStrictEqual(staff);
  s.removeEmployee(staff[0]);
  expect(s.employees).toStrictEqual([staff[1]]);
});

test("Error on duplicate names", () => {
  const s = new Schedule();
  const staff = [
    person("a", 1, 2, [], new Color("blue")),
    person("a", 1, 2, [], new Color("red"))
  ];
  s.addEmployee(staff[0]);
  expect(() => s.addEmployee(staff[1])).toThrowError("");
});
