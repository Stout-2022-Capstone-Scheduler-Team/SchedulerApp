import { Employee, Shift } from "../entities";

export interface ISchedulerAlgorithm {
  readonly generate: (shifts: Shift[], staff: Employee[]) => Shift[];
}
