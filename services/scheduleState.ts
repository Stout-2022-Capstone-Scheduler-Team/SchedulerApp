import React, { useState } from "react";
import { Color, Employee, Schedule, Shift } from "../entities";
import { generate } from "./waveform_collapse";

export type ScheduleAction =
  | { add: Employee | Shift }
  | { remove: Employee | Shift }
  | {
      update: Employee;
      color?: Color;
      name?: string;
      maxHours?: number;
      minHours?: number;
    };

export async function updateSchedule(
  state: Schedule,
  action: ScheduleAction
): Promise<Schedule> {
  // Create a deep copy so the generate schedule is allowed to mutate it
  const scheduleCopy = Schedule.createDeepCopy(state);
  if ("add" in action) {
    if (action.add instanceof Employee) {
      scheduleCopy.addEmployee(action.add);
    } else if (action.add instanceof Shift) {
      scheduleCopy.addShift(action.add);
    }
  }

  // Generate the schedule
  // setBuildingSchedule(true);
  const schedulePromise = await generate(
    scheduleCopy.shifts,
    scheduleCopy.employees
  );
  // // setBuildingSchedule(false);
  if (schedulePromise) {
    console.log(scheduleCopy);
    // If the scheduler finished successfully, update the schedule object
    return scheduleCopy;
  } else {
    // If the scheduler failed, error out
    console.error(
      "Unable to build schedule completely, schedule was not updated"
    );
    return scheduleCopy;
  }
}

export type Dispatch<A> = (action: A) => Promise<void>;

export function useAsyncReducer<T, A>(
  reducer: (state: T, action: A) => Promise<T>,
  initialState: T
): [T, Dispatch<A>] {
  const [state, setState] = useState(initialState);

  const dispatch = async (action: A): Promise<void> => {
    const result = await reducer(state, action);
    setState(result);
  };

  return [state, dispatch];
}
