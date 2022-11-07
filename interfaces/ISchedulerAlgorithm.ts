import { Employee, Shift } from "../entities";

export type ISchedulerAlgorithm = (
  shifts: Shift[],
  staff: Employee[]
) => boolean;
