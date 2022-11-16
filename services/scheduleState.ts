import { useState } from "react";
import { Color, Employee, Schedule, Shift, Time } from "../entities";
import { generate } from "./waveform_collapse";

interface Add {
  add: Employee | Shift;
}

interface Remove {
  remove: Employee | Shift;
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
}

export type ScheduleAction =
  | Add
  | Remove
  | UpdateEmployee
  | UpdateShift
  | UpdateBase;

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
  } else if ("remove" in action) {
    if (action.remove instanceof Employee) {
      scheduleCopy.removeEmployee(action.remove);
    } else if (action.remove instanceof Shift) {
      scheduleCopy.removeShift(action.remove);
    }
  } else if ("update" in action) {
    // if (action.update === "default") {
    // }
    console.error("Update not implemented yet");
  }

  // Generate the schedule
  // setBuildingSchedule(true);
  const schedulePromise = await generate(
    scheduleCopy.shifts,
    scheduleCopy.employees
  );
  // // // setBuildingSchedule(false);
  if (!schedulePromise) {
    // If the scheduler failed, error out
    console.error(
      "Unable to build schedule completely, schedule was not updated"
    );
  }
  return scheduleCopy;
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
