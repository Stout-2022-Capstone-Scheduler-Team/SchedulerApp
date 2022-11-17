import { Color, Employee, Schedule, Shift, Time } from "../../entities";
import { updateSchedule } from "../../services/scheduleState";
import { Monday, Tuesday } from "../utils";
import { generate } from "../../services/waveform_collapse";

jest.mock("../../services/waveform_collapse");

beforeAll(() => {
  jest.mocked(generate).mockResolvedValue(true);
});

test("Insert Employee", async () => {
  const emp = new Employee("alice", 1, 1, new Color("red"));
  const schedule = new Schedule([], []);
  const ret = await updateSchedule(schedule, {
    add: emp
  });
  expect(ret.employees).toStrictEqual([emp]);
});

test("Insert Shift", async () => {
  const shift = new Shift(
    "alice",
    Time.fromString("00:00", Monday),
    Time.fromString("00:00", Monday)
  );
  const schedule = new Schedule([], []);
  const ret = await updateSchedule(schedule, {
    add: shift
  });
  expect(ret.shifts).toStrictEqual([shift]);
});

test("Remove Employee", async () => {
  const emp = new Employee("alice", 1, 1, new Color("red"));
  const schedule = new Schedule([emp], []);
  const ret = await updateSchedule(schedule, {
    remove: emp
  });
  expect(ret.employees).toStrictEqual([]);
});

test("Remove Shift", async () => {
  const shift = new Shift(
    "alice",
    Time.fromString("00:00", Monday),
    Time.fromString("00:00", Monday)
  );
  const schedule = new Schedule([], [shift]);
  const ret = await updateSchedule(schedule, {
    remove: shift
  });
  expect(ret.shifts).toStrictEqual([]);
});

test("Update Employee", async () => {
  const emp = new Employee("alice", 1, 1, new Color("red"));
  const schedule = new Schedule([emp], []);
  {
    const ret = await updateSchedule(schedule, {
      update: emp,
      name: "bob",
      maxHours: 2,
      minHours: 2,
      color: new Color("green")
    });
    expect(ret.employees).toStrictEqual([
      new Employee("bob", 2, 2, new Color("green"))
    ]);
  }
  {
    const ret = await updateSchedule(schedule, {
      update: emp,
      name: "bob"
    });
    expect(ret.employees).toStrictEqual([
      new Employee("bob", 1, 1, new Color("red"))
    ]);
  }
});

test("Update Shift", async () => {
  const shift = new Shift(
    "alice",
    Time.fromString("00:00", Monday),
    Time.fromString("00:00", Monday)
  );
  const schedule = new Schedule([], [shift]);
  const ret = await updateSchedule(schedule, {
    update: shift,
    name: "bob",
    start: Time.fromString("10:10", Tuesday),
    end: Time.fromString("10:10", Tuesday)
  });
  expect(ret.shifts).toStrictEqual([
    new Shift(
      "bob",
      Time.fromString("10:10", Tuesday),
      Time.fromString("10:10", Tuesday)
    )
  ]);
});

test("Update default", async () => {
  const schedule = new Schedule([], []);
  const ret = await updateSchedule(schedule, {
    update: "default",
    minHours: 1,
    maxHours: 2
  });
  expect(ret.minHoursWorked).toBe(1);
  expect(ret.maxHoursWorked).toBe(2);
});
