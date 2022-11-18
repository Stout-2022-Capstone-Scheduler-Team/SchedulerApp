import { Color, Employee, Schedule, Shift, Time } from "../../entities";
import { updateSchedule, useAsyncReducer } from "../../services/scheduleState";
import { Monday, Tuesday } from "../utils";
import { generate } from "../../services/waveform_collapse";
import { sleepTask } from "../../services";
import React, { SetStateAction } from "react";

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

test("Schedule Error reporting", async () => {
  const schedule = new Schedule([], []);
  console.error = jest.fn();
  const mocked = jest.mocked(console.error);
  jest.mocked(generate).mockResolvedValueOnce(false);
  await updateSchedule(schedule, {
    update: "default"
  });

  expect(mocked).toBeCalled();
});

function defined<T>(val: T | undefined): T {
  if (val === undefined) {
    throw new Error("Expected val to be defined");
  } else {
    return val;
  }
}

test("Async Reducer", async () => {
  React.useState = jest.fn();
  const a: { a: number } | undefined = { a: 0 };
  jest.mocked(React.useState<typeof a>).mockReturnValueOnce([
    a,
    (value: SetStateAction<typeof a | undefined>): void => {
      if (value !== undefined) {
        if (typeof value === "function") {
          const v = value(a);
          if (v !== undefined) {
            a.a = v.a;
          }
        } else {
          a.a = value.a;
        }
      }
    }
  ]);

  const resolvers: Array<(v: unknown) => void> = [];
  const [val, dispatch] = useAsyncReducer(
    async (a: { a: number }, b: number) => {
      await new Promise((resolve) => resolvers.push(resolve));
      return { a: a.a + b };
    },
    { a: 0 }
  );

  expect(val.a).toBe(0);
  dispatch(1);
  await sleepTask(0);
  expect(val.a).toBe(0);
  defined(resolvers.pop())(undefined);
  await sleepTask(0);
  expect(val.a).toBe(1);
  dispatch(1);
  await sleepTask(0);
  expect(val.a).toBe(1);
  dispatch(2);
  await sleepTask(0);
  expect(val.a).toBe(1);
  defined(resolvers.pop())(undefined);
  await sleepTask(0);
  expect(val.a).toBe(2);
  defined(resolvers.pop())(undefined);
  await sleepTask(0);
  expect(val.a).toBe(4);
});
