import { Employee, Shift } from "../entities";

/**
 * Defines a function that modifies the shifts and staff objects in-place
 * @param shifts The array of shifts to be assigned an employee
 * @param staff The array of employees to be assigned shifts
 * @Returns a boolean representing whether the schedule assignment fully completed
 */
export type ISchedulerAlgorithm = (
  shifts: Shift[],
  staff: Employee[]
) => boolean;
