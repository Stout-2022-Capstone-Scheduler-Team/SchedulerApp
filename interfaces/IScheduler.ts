import { Employee, Shift } from "../entities";

export default interface IScheduler {
  generate: (shifts: Shift[], staff: Employee[]) => Shift[];
}
