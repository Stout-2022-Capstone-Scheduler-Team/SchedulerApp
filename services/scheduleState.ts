import { useState } from "react";
import { Color, Employee, Schedule, Shift, Time } from "../entities";
import { generate } from "./waveform_collapse";
import { or, log } from "./util";
import { LocalStorage } from "./storageService";
import { Dayjs } from "dayjs";

interface Add {
  add: Employee | Shift;
}

interface Remove {
  remove: Employee | Shift;
}

interface Set {
  set: Schedule;
}

interface UpdateEmployee {
  update: Employee;
  color?: Color;
  name?: string;
  maxHours?: number;
  minHours?: number;
}

interface UpdateShift {
  update: Shift;
  name?: string;
  start?: Time;
  end?: Time;
}

interface UpdateBase {
  update: "default";
  maxHours?: number;
  minHours?: number;
  name?: string;
  weekDate?: Dayjs;
}

export type ScheduleAction =
  | Add
  | Remove
  | Set
  | UpdateEmployee
  | UpdateShift
  | UpdateBase;

export async function updateSchedule(
  state: Schedule,
  action: ScheduleAction
): Promise<Schedule> {
  const storage = new LocalStorage();
  // Create a deep copy so the generate schedule is allowed to mutate it
  let scheduleCopy = Schedule.createDeepCopy(state);

  let needToRecompute = true;

  if ("set" in action) {
    scheduleCopy = Schedule.createDeepCopy(action.set);
  } else if ("add" in action) {
    if (action.add instanceof Employee) {
      scheduleCopy.addEmployee(action.add);
    } else if (action.add instanceof Shift) {
      scheduleCopy.addShift(action.add);
    }
  } else if ("remove" in action) {
    if (action.remove instanceof Employee) {
      scheduleCopy.removeEmployee(action.remove);
    } else if (action.remove instanceof Shift) {
      scheduleCopy.removeShift(action.remove);
    }
  } else if ("update" in action) {
    if (action.update === "default") {
      needToRecompute = false;
      if (action.maxHours !== undefined) {
        scheduleCopy.maxHoursWorked = action.maxHours;
      }
      if (action.minHours !== undefined) {
        scheduleCopy.minHoursWorked = action.minHours;
      }
      if (action.name !== undefined) {
        // Delete old name
        await storage.delete(scheduleCopy.name);
        scheduleCopy.name = action.name;
        const newUrl = window.location;
        newUrl.hash = `#${scheduleCopy.name}`;
        window.location.replace(newUrl.href);
      }
      if (action.weekDate !== undefined) {
        // Delete old name
        scheduleCopy.weekDate = action.weekDate;
      }
    } else if (action.update instanceof Shift) {
      const a = action as UpdateShift;
      const e = scheduleCopy.removeShift(a.update);
      scheduleCopy.addShift(
        new Shift(or(a.name, e.name), or(a.start, e.start), or(a.end, e.end))
      );
    } else if (action.update instanceof Employee) {
      const a = action as UpdateEmployee;
      const e = scheduleCopy.removeEmployee(a.update);
      scheduleCopy.addEmployee(
        new Employee(
          or(a.name, e.name),
          or(a.minHours, e.min_hours),
          or(a.maxHours, e.max_hours),
          or(a.color, e.color),
          e.available
        )
      );
    }
  }

  await storage.update(scheduleCopy.name, scheduleCopy);

  // Generate the schedule
  if (needToRecompute) {
    const schedulePromise = await generate(
      scheduleCopy.shifts,
      scheduleCopy.employees
    );
    if (schedulePromise !== undefined) {
      // If the scheduler failed, error out
      console.error("Unable to build schedule completely");
    }
    log(scheduleCopy);
  }
  return scheduleCopy;
}

export type Dispatch<A> = (action: A) => void;

/**
 * Async equavalent to React.useReducer
 * */
export function useAsyncReducer<T, A>(
  reducer: (state: T, action: A) => Promise<T>,
  initialState: T
): [T, Dispatch<A>] {
  const [state, setState] = useState(initialState);
  let current: Promise<T> = Promise.resolve(state);

  const dispatch = (action: A): void => {
    // We need to be able to handle multiple in-flight requests
    //
    // The idea is this will force multiple requests to wait in line. Ideally,
    // we would also be able to tell the reducer that there are more (i.e. don't
    // bother fully generating the schedule), but that doesn't seem like something
    // JS can do.
    current = current.then(async (state) => {
      const newState = await reducer(state, action);
      setState(newState);
      return newState;
    });
  };

  return [state, dispatch];
}
