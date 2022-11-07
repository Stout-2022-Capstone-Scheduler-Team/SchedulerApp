import { Employee, Shift } from "../entities";

export interface IScheduler {
  generate: (shifts: Shift[], staff: Employee[]) => Shift[];
}
